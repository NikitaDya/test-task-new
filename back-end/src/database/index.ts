import { connect, model, connections } from 'mongoose';
import { HobbiesSchema, UserSchema } from './model';
import { CollectionEmun } from '../shared/enum';

export const connectMongo = async (url: string) => {
    await connect(url, {
        useNewUrlParser: true
    });

    model(CollectionEmun.USER, UserSchema);
    model(CollectionEmun.HOBBIES, HobbiesSchema);

    return true;
};