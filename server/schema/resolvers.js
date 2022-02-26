const { AuthenticationError, UserInputError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Error } = require("mongoose");
const { User, Exercise, Workout, Order, Product, Category } = require('../models');
const Auth = require('../utils/auth');
const stripe = require("stripe")(process.env.STRIPE_KEY);
const dateCheck = new Date().toISOString().split("T")[0];
const Mongoose = require("mongoose");

const resolvers = {

  Query: {

    // getUser query that returns a specific user on demand, e.g. firstName/lastName, or email, or id      
    getUsers: async (parent, args) => {
      try {
        const userData = await User.findOne(args).select(
          "-__v -password"
        ).populate("followers").populate("following");
        return userData;
      } catch (err) {
        console.log(err);
      }
    },

    getUser: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // getMe that returns only info about current user
    getMe: async (parent, args, context) => {
      if (context.user) {
        try {
          const userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          ).populate("followers").populate("following");
          return userData;
        } catch (err) {
          console.log(err);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    getAccount: async (parent, { firstName }, context) => {
      if (context.user) {
        try {
          const user = await User.find({ firstName });
          return user;
        } catch (error) {
          throw new Error(error);
        }
      }
      throw new AuthenticationError('You need to be logged in to search for other users!');
    },

    getSearchedUser: async (parent, { email }) => {
      try {
        const user = await User.find({ email });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },


    // new queries start here
    // for now find all without date\user
    allExercises: async () => {
      return Exercise.find();
    },

    allWorkouts: async () => {
      return Workout.find();
    },


    //stripe queries
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products").execPopulate();

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/sponsor`,
      });

      return { session: session.id };
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


    followUnfollow: async (_, { _id }, context) => {
      try {
        _id = Mongoose.Types.ObjectId(_id);
        const otherUser = await User.findById(_id).populate(
          "following followers"
        );
        const user = await User.findById(context.user._id).populate("following followers");
        if (otherUser.followers.find((m) => m._id == user._id.toString())) {

          const updatedOtherUser = await User.findByIdAndUpdate(
            _id,
            {
              $pull: { followers: user._id },
            },
            { new: true },
          );

          const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
              $pull: { following: _id },
            },
            { new: true }
          );

          // return [updatedOtherUser, updatedUser]
        } else {
          otherUser.followers.push(context.user._id);
          user.following.push(_id);
          otherUser.save();
          user.save();
          return user, otherUser;
        }
      } catch (error) {
        throw new Error(error);
      }
    },




    addCardio: async (parent, { id, type, durationInMinutes, cardioDistanceInMiles, date }) => {
      const cardio = await Exercise.create({ id, type, durationInMinutes, cardioDistanceInMiles, date });
      throw new AuthenticationError({ msg: "ID mismatch" });
    },

    addCardio: async (
      parent,
      { id, type, durationInMinutes, cardioDistanceInMiles, date, caloriesBurnt }
    ) => {
      const cardio = await Exercise.create({
        id,
        type,
        durationInMinutes,
        cardioDistanceInMiles,
        date,
        caloriesBurnt
      });
      return cardio;
    },
    addStrength: async (
      parent,
      { id, type, repetitions, sets, weight, date }
    ) => {
      const strength = await Exercise.create({
        id,
        type,
        repetitions,
        sets,
        weight,
        date,
      });
      return strength;
    },
    addStretching: async (parent, { id, type, durationInMinutes, date, caloriesBurnt }) => {

      const stretching = await Exercise.create({
        id,
        type,
        durationInMinutes,
        date,
        caloriesBurnt
      });
      return stretching;
    },

    addWorkout: async (parent, { id, date, routine, caloriesBurnt }, context) => {

      const workout = await Workout.findOne({ date: dateCheck });
      if (workout) {
        const updatedWorkout = await Workout.findOneAndUpdate({ date }, {
          $addToSet: { routine },
          $set: { caloriesBurnt }
        },
          { new: true },

        )
        return updatedWorkout
      }
      else {
        try {
          const newWorkout = await Workout.create({ id, date, routine, caloriesBurnt, userId: context.user._id });
          const updatedUser = await User.findByIdAndUpdate({ _id: context.user._id }, { $addToSet: { "workouts": newWorkout._id } }, { new: true });
          return { newWorkout, updatedUser };
        } catch (err) {
          console.log(err)
        }
      }
    },

    updateWeight: async (parent, { weight }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { weight: weight },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //new mutations start here
    //stripe mutations
    addOrder: async (parent, { products }, context) => {

      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
