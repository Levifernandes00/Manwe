const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

// middleware
UserSchema.pre('save', async next => {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
})

module.exports = model('User', UserSchema);