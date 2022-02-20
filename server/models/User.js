const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
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
  activity: {

    type: Number,
  },
  goal: {
    type: String
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ]

  // workouts: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Workout",
  //   },
  // ],

});

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next();
})

UserSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', UserSchema);



// ====================================================

const profileSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
})

module.exports = User;