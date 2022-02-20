const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Error } = require("mongoose");
const { User, Exercise, Workout } = require('../models');

const resolvers = {
  Query: {
    // getUser query that returns a specific user on demand, e.g. firstName/lastName, or email, or id
    getUser: async (parent, args) => {
      try {
        const userData = await User.findOne(args).select(
          "-__v -password"
        ).populate("friends");
        return userData;
      } catch (err) {
        console.log(err);
      }
    },

    // getMe that returns only info about current user
    getMe: async (parent, args, context) => {
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

    
    // new queries start here
    // for now find all without date\user
    // allExercises: async () => {
    // return Exercise.find();

    // }
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

    // ADD FRIEND
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

    // REMOVE FRIEND
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
    },
    





    addCardio: async (parent, { id, type, durationInMinutes, cardioDistanceInMiles, date }) => {
      console.log(`hello, these are args for cardio : ${id, type, durationInMinutes, cardioDistanceInMiles, date}`)
      const cardio = await Exercise.create({ id, type, durationInMinutes, cardioDistanceInMiles, date });
      return cardio;
    },
    addStrength: async (parent, { id, type, repetitions, sets, weight, date }) => {
      console.log(`hello, these are args for strength: ${id, type, repetitions, sets, weight, date}`)
      const strength = await Exercise.create({ id, type, repetitions, sets, weight, date });
      return strength;
    },
    addStretching: async (parent, { id, type, durationInMinutes, date }) => {
      console.log(`hello, these are args for stretching: ${id, type, durationInMinutes}`)
      const stretching = await Exercise.create({ id, type, durationInMinutes, date });
      return stretching;
    },
 
    addWorkout: async (parent, {id, date, routine}) => {
      console.log(`hello, these are args for workout: ${date, routine}`)
      const workout = await Workout.create({id, date, routine});
      return workout;
    },

    updateWeight: async (parent, { weightData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedWeight: weightData } },
          { new: true }
        );
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // addExercise: async (parent, args) => {
    //   const exercise = await Exercise.create(args);
    //   return exercise;
    // }
    //new mutations start here
  },

}
//   throw new AuthenticationError({ msg: 'ID mismatch' })
// },




module.exports = resolvers;
