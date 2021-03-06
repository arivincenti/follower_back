import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
    notification: string;
    object: string;
    objectType: string;
    notificationTitle: string;
    users: any[];
    readed_by: any[];
    operationType: string;
    created_by: string;
    created_at: Date;
}

var notificationSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    readed_by: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export default model("Notification", notificationSchema);
