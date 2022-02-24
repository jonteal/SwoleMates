const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkoutSchema = new Schema({
  // add autoincrement id
  id: {
    type: Number,
  },
  date: {
    type: String,
  },
  caloriesBurnt:{
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  routine: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
