const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var rolesValidos = {
  values: ["RESPONSABLE", "MIEMBRO"],
  message: "{VALUE} is not a valid role"
};

var memberSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  areas: [{
    type: Schema.Types.ObjectId,
    ref: 'Area'
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // role: {
  //   type: String,
  //   required: [true, "The Role is a required Field"],
  //   default: "MIEMBRO",
  //   enum: rolesValidos
  // },
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

module.exports = mongoose.model('Member', memberSchema);