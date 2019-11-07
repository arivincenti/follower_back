const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
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
});

module.exports = mongoose.model('Comment', commentSchema);