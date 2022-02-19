const { User, Post } = require("../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Error } = require("mongoose");

const checkAuth = require('../utils/auth');

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // new queries start here

    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    // CREATE USER
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },

    // LOGIN USER
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // START PROFILE
    startProfile: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        }); //return the user as the updated version
      }

      throw new Error({ msg: "ID mismatch" });
    },

    // CREATE POST MUTATION
    async createPost(_, { body, firstName }, context) {
      // const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: context.user._id,
        firstName,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },

    // DELETE POST MUTATION
    deletePost: async (_, { postId }, context) => {
      // const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (context.user.firstName === post.firstName) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    // CREATE COMMENT MUTATION
    createComment: async (_, { postId, body }, context) => {
      // const { firstName } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          user: context.user._id,
          firstName,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found!");
    },

    // DELETE COMMENT
    deleteComment: async (_, { postId, commentId }, context) => {
      // const { firstName } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].firstName === firstName) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found!");
      }
    },

    // LIKE POST
    likePost: async (_, { postId }, context) => {
      // const { firstName } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.firstName === firstName)) {
          post.likes = post.likes.filter(
            (like) => like.firstName !== firstName
          );
        } else {
          post.likes.push({
            firstName,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found!");
    },
  },
};

module.exports = resolvers;
