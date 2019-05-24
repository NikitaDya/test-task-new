import { Application } from 'express';
import App from './app';
import { connectMongo } from './src/database';
import { constants } from './src/config';

const env = process.env;
const server: Application = App.getApp();

const preconfiguration: Array<Promise<any>> = [];

const url = `${constants.database}:27017/${env.DATABASE_NAME}`;
preconfiguration.push(connectMongo(url));

Promise.all(preconfiguration)
    .then(() => {
        server.listen(env.SERVER_PORT);
        console.log('Server ready ...');
    })
    .catch(err => {
        console.log('Error Server : ', err.message);
    });
