const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

var ticketSchema = new Schema({
  movements:[{
    type: Schema.Types.ObjectId,
    ref: 'Movement'
  }],
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'An ticket required an owner']
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  deleted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date()
  },
  updated_at: {
    type: Date
  },
  deleted_at: {
    type: Date
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);