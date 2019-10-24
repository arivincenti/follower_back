const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not a valid role'};

  var userSchema = new Schema({
    name:{
      type: String,
      required: [true, 'The Name is a required field']
    },
    lastName: {
      type: String,
      required: [true, 'The LastName field is a required field']
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
    role: {
      type: String,
      required: [true, 'The Role is a required Field'],
      default: 'ADMIN_ROLE',
      enum: rolesValidos
    }
  });

  userSchema.plugin(uniqueValidator, {
    message: 'El {PATH} must be unique'
  });

  module.exports = mongoose.model('UserModel', userSchema);

