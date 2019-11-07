const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ticketSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, 'El ticket debe estar asociado a una organización']
  },
  subject: {
    type: String,
    required: [true, 'El ticket debe contener un asunto']
  },
  issue: {
    type: String,
    required: [true, 'El ticket debe contener un problema']
  },
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