import { Schema, model, Document } from "mongoose";

export interface IArea extends Document {
    name: string;
    organization: string;
    members: string[];
    responsible: string;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

var areaSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name is a required field"]
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "Member"
        }
    ],
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

export default model("Area", areaSchema);
