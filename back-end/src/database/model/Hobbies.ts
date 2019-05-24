import {Schema, Types} from 'mongoose';
import {CollectionEmun, PassionEnum} from '../../shared/enum';

const Hobbies = {
    passionLevel: {
        type: String,
        required: true,
        enum: [
            PassionEnum.MEDIUM,
            PassionEnum.HIGH,
            PassionEnum.LOW,
            PassionEnum.VERY_HIGH
        ]
    },
    name: {
        type: String
    },
    year: {
        type: Number,
        min: new Date().getFullYear(),
        max: 2150,
        default: new Date().getFullYear()
    },
    user: {
        type: Types.ObjectId,
        ref: CollectionEmun.USER
    }
};

export const HobbiesSchema = new Schema(Hobbies);