import { Schema, model, Document } from "mongoose";

export interface IOrganization extends Document {
    name: string;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

var organizationSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name is a required field"]
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An organization required an owner"]
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

export default model("Organization", organizationSchema);
