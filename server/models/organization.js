const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

var organizationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is a required field']
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An organization required an owner']
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  deleted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = mongoose.model('Organization', organizationSchema);