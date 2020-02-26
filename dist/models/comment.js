"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: [true, "El comentario debe contener un cuerpo"]
    },
    type: {
        type: String
    },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.default = mongoose_1.model("Comment", commentSchema);
