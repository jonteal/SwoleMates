const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Error } = require('mongoose');

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // new queuries start here
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
        }
      },
      async getPost(_, { postId }) {
        try {
          const post = await Post.findById(postId);
          if(post) {
            return post;
          } else {
            throw new Error('Post not found')
          }
        } catch(err){
          throw new Error(err);
        }
      }
    }
  },

  Mutation: {
    //createUser
    createUser: async (parent, { email, password }) => {
      const user = await User.create({ email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    startProfile: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, args, { new: true }) //return the user as the updated version
      }

      throw new Error({ msg: 'ID mismatch' })
    },

    
    //new mutations start here

  },
};

module.exports = resolvers;