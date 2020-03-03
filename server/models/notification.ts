import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
    notification: string;
    object: string;
    objectType: string;
    users: any[];
    readed_by: any[];
    created_at: Date;
}

var notificationSchema = new Schema({
    notification: {
        type: String
    },
    object: {
        type: String
    },
    objectType: {
        type: String
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    readed_by: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default model("Notification", notificationSchema);