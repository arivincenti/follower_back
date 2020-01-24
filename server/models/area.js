const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} is not a valid role"
};

var areaSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is a required field"]
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "Organization"
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: "Member"
  }],
  responsible: {
    type: Schema.Types.ObjectId,
    ref: "Member"
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The area required an owner"]
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  deleted_by: {
    type: Schema.Types.ObjectId,
    ref: "User"
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

module.exports = mongoose.model("Area", areaSchema);
