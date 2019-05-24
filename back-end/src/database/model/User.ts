import { Schema } from 'mongoose';

const User = {
    name: {
        type: String,
        required: true
    }
};

export const UserSchema = new Schema(User);
