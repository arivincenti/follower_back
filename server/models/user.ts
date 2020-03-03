import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    img?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "The Name is a required field"]
    },
    last_name: {
        type: String,
        required: [true, "The Last Name field is a required field"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "The Email field is a required field"]
    },
    password: {
        type: String,
        required: [true, "The passowrd is a required field"]
    },
    img: {
        type: String,
        required: false
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

export default model("User", userSchema);
