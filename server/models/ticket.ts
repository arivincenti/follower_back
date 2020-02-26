import { Schema, model, Document } from "mongoose";

export interface ITicket extends Document {
    subject?: string;
    issue?: string;
    area?: string;
    responsible?: string[];
    followers?: string[];
    status?: string;
    priority?: string;
    movements?: any[];
    comments?: any[];
    created_by?: string;
    updated_by?: string;
    deleted_by?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

var ticketSchema = new Schema({
    subject: {
        type: String,
        required: [true, "El ticket debe contener un asunto"]
    },
    issue: {
        type: String,
        required: [true, "El ticket debe contener un problema"]
    },
    area: {
        type: Schema.Types.ObjectId,
        ref: "Area"
    },
    responsible: {
        type: Schema.Types.ObjectId,
        ref: "Member"
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
                ref: "Area"
            },
            responsible: {
                type: Schema.Types.ObjectId,
                ref: "Member"
            },
            followers: [
                {
                    type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An ticket required an owner"]
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
        default: new Date()
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    }
});

export default model("Ticket", ticketSchema);
