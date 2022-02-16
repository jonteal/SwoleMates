const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  durationInMinutes: {
    type: Number,
    required: false,
    trim: true,
  },
  cardioDistanceInMiles: {
    type: Number,
    required: false,
    trim: true,
  },
  repetitions: {
    type: Number,
    required: false,
    trim: true,
  },
  sets: {
    type: Number,
    required: false,
    trim: true,
  },
  weight: {
    type: Number,
    required: false,
    trim: true,
  },
  caloriesBurtn: {
    type: Number,
    required: true,
  },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
