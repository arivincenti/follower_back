"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var areaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "The name is a required field"]
    },
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization"
    },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Member"
        }
    ],
    responsible: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Member"
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
exports.default = mongoose_1.model("Area", areaSchema);
