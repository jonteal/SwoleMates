const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

const { Schema } = mongoose;


const ExerciseSchema = new Schema({
    // add date so we could navigate through different workouts?
    // add autoincrement id
    id: {
      type: Number
    },
  date: {
    // get date only as  year\mth\day => no hours\min\sec 
    type: String
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  durationInMinutes: {
    type: String,
    required: false,
    trim: true,
  },
  cardioDistanceInMiles: {
    type: String,
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
