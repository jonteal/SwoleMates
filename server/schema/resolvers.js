const { User } = require("../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Error } = require("mongoose");

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


  }

};

module.exports = resolvers;
