const {
  User,
  Exercise,
  Workout,
  Order,
  Product,
  Category,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { Error } = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const dateCheck = new Date().toISOString().split("T")[0];

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
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    startProfile: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndUpdate({ _id: context.user._id }, args, {
          new: true,
        }); //return the user as the updated version
      }

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
      console.log(
        `hello, these are args for strength: ${
          (id, type, repetitions, sets, weight, date)
        }`
      );
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
      console.log(
        `hello, these are args for stretching: ${(id, type, durationInMinutes)}`
      );
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
      //   if(Workout.date === dateCheck){
      //     console.log("If")
      //     console.log(Workout.date);
      //     console.log(dateCheck);
      //     const workout = await Workout.findOneAndUpdate({date}, {
      //       $push: {routine}},
      //       {returnOriginal: false}
      //     )
      // }
      //   else{
      //     console.log("else")
      //     console.log(parent);
      //     console.log(dateCheck);
      //     const workout = await Workout.create({ id, date, routine });
      //   return workout
      //   }
      const workout = await Workout.findOne({date: dateCheck});
      if(workout){
        console.log("If")
        const updatedWorkout = await Workout.findOneAndUpdate({date}, {
                $addToSet: {routine}},
                {new: true}
              )
              return updatedWorkout 
      }
      else {
        console.log("else")
        const newWorkout = await Workout.create({ id, date, routine, caloriesBurnt }); 
        return newWorkout;
      }

    },

    updateWeight: async (parent, { weightData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedWeight: weightData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // addExercise: async (parent, args) => {
    //   const exercise = await Exercise.create(args);
    //   return exercise;
    // }
    //new mutations start here
    //stripe mutations
    addOrder: async (parent, { products }, context) => {
      console.log(context);
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
