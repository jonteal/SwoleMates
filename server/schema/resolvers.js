const { User, Exercise } = require('../models');
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

    // new queries start here
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

    // startProfile: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate({ _id: context.user._id }, args, { new: true }) //return the user as the updated version
    //   }

    //   throw new AuthenticationError({ msg: 'ID mismatch' })
    // },
    //   throw new Error({ msg: 'ID mismatch' })
    // },

    addExercise: async (parent, {type, durationInMinutes, cardioDistanceInMiles, repetitions, sets, weight}) => {
      const exercise = await Exercise.create({type, durationInMinutes, cardioDistanceInMiles, repetitions, sets, weight});
      return exercise;
    },

    addCardio: async (parent, {id, type, durationInMinutes, cardioDistanceInMiles}) => {
      console.log(`hello, these are args: ${id, type, durationInMinutes, cardioDistanceInMiles}`)
      const cardio = await Exercise.create({id, type, durationInMinutes, cardioDistanceInMiles});
      return cardio;
    },

    updateWeight: async (parent, { weightData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedWeight: weightData }},
          { new: true }
        );
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    //new mutations start here
  },
};

module.exports = resolvers;