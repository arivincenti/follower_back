"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var ticketSchema = new mongoose_1.Schema({
    subject: {
        type: String,
        required: [true, "El ticket debe contener un asunto"]
    },
    issue: {
        type: String,
        required: [true, "El ticket debe contener un problema"]
    },
    area: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Area"
    },
    responsible: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Member"
    },
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Member"
        }
    ],
    status: {
        type: String
    },
    priority: {
        type: String
    },
    movements: [
        {
            area: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Area"
            },
            responsible: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Member"
            },
            followers: [
                {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Member"
                }
            ],
            status: {
                type: String
            },
            priority: {
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
            }
        }
    ],
    comments: [
        {
            message: {
                type: String
            },
            created_by: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User"
            },
            created_at: {
                type: Date,
                required: true,
                default: new Date()
            },
            type: {
                type: String
            }
        }
    ],
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An ticket required an owner"]
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
        default: new Date()
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    }
});
exports.default = mongoose_1.model("Ticket", ticketSchema);
