"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var notificationSchema = new mongoose_1.Schema({
    changes: [
        {
            type: String,
        },
    ],
    object: {
        type: String,
    },
    objectType: {
        type: String,
    },
    notificationTitle: {
        type: String,
    },
    operationType: {
        type: String,
    },
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    readed_by: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
exports.default = mongoose_1.model("Notification", notificationSchema);
