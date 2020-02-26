import { Schema, model, Document } from "mongoose";

export interface IMember extends Document {
    organization: string;
    user: string;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

var memberSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
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

export default model("Member", memberSchema);
