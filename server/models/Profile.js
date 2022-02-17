const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  weight: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0
  },
  sex: {
    type: String,
  },
  goal: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = User;