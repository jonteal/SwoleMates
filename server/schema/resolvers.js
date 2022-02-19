const { User } = require("../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Error } = require("mongoose");

const resolvers = {
  Query: {
    // TODO: add a getUser query that returns a specific user on demand, e.g. firstName/lastName, or email, or id

    // TODO: rename to me {} so it clarifies this returns only info about current user
    getUser: async (parent, args, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          ).populate("friends");
          return userData;
        } catch (err) {
          console.log(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    
  },
    // new queries start here
  

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

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const addFriend = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId }},
          { new: true }
          );
          return addFriend;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const removeFriend = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId }},
          { new: true }
        );
        return removeFriend;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
    
  }

};

module.exports = resolvers;
