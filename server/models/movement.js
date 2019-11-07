const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validStatus = {
  values: ["EN ESPERA", "DESPACHADO", "RECIBIDO", "EN PROCESO", "FINALIZADO"],
  message: "{VALUE} is not a valid status"
};

var movementSchema = new Schema({
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket'
  },
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
});

module.exports = mongoose.model('Movement', movementSchema);