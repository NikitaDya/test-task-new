import chai, {expect} from 'chai';
import {connection} from 'mongoose';
import chaiHttp from 'chai-http';
import { connectMongo } from '../src/database';
import app from '../app';

describe('Create new user.', () => {

    before(async () => {
        const env = process.env.MONGO_URL;
        chai.use(chaiHttp);
        await connectMongo(env);
    });

    it('Should be array of users.', async () => {
        chai.request(app.getApp())
            .get('/api/users')
            .end((err, res) => {
                const body = res.body;
                expect(body).to.have.property('error');
                expect(body).to.have.property('data');
                expect(body).to.be.an('object');
                expect(body.data).to.be.an('array');
                expect(body.data).to.have.lengthOf(0);
                expect(body.error).to.be.null;
            });
    });


    after(async () => {
        await connection.close();
    })
});