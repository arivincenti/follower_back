const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

var movementSchema = new Schema({
  area:{
    type: Schema.Types.ObjectId,
    ref: 'Area'
  },
  member:{
    type: Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('Movement', movementSchema);