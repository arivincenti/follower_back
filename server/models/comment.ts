import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
    user: string;
    comment: string;
    type: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

var commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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

export default model("Comment", commentSchema);
