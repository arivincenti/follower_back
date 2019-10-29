const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

  var userSchema = new Schema({
    name:{
      type: String,
      required: [true, 'The Name is a required field']
    },
    last_name: {
      type: String,
      required: [true, 'The Last Name field is a required field']
    },
    email:{
      type: String,
      unique: true,
      required: [true, 'The Email field is a required field']
    },
    password: {
      type: String,
      required: [true, 'The passowrd is a required field']
    },
    img:{
      type: String,
      required: false
    },
    created_at: {
      type: Date,
      required: true,
      default: Date.now
    },
    updated_at: {
      type: Date
    },
    deleted_at: {
      type: Date
    }
  });

  module.exports = mongoose.model('User', userSchema);

