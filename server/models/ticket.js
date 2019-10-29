const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

var ticketSchema = new Schema({
  movements: [{
    type: Schema.Types.ObjectId,
    ref: 'Movement'
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    body: {
      type: String,
      required: [true, 'El comentario debe contener un cuerpo']
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