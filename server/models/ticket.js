const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validStatus = {
  values: ["EN ESPERA", "DESPACHADO", "RECIBIDO", "EN PROCESO", "FINALIZADO"],
  message: "{VALUE} is not a valid status"
};

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
  movements: [{
    area: {
      type: Schema.Types.ObjectId,
      ref: 'Area'
    },
    member: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
        required: [true, "The status is a required Field"],
        default: "ENVIADO",
        enum: validStatus
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