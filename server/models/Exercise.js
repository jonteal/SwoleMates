const mongoose = require("mongoose");

const { Schema } = mongoose;

const ExerciseSchema = new Schema({
    // add date so we could navigate through different workouts?
    // add autoincrement id
  date: {
    // get date only as  year\mth\day => no hours\min\sec 
    type: Date
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
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
