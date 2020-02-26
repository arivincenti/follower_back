"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var memberSchema = new mongoose_1.Schema({
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization"
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "The area required an owner"]
    },
    updated_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    deleted_by: {
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
exports.default = mongoose_1.model("Member", memberSchema);
