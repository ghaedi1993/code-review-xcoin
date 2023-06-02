import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import mongoFactory from '../src/db';
import { Profile, Simulator } from '../src/models';
import mongoose from 'mongoose';

describe('API Simulator', () => {
  let connection: mongoose.Connection;
  let profileId;
  before(async () => {
    connection = (await mongoFactory).getInstance();
  });
  beforeEach(async () => {
    try {
      await Profile.deleteMany({});
      await Simulator.deleteMany({});
      const profile = await Profile.create({
        name: `John`,
        email: `John@gmail.com`,
        capital: `123`,
        divisa: `String`,
        prefered_cryptocurrency: `String`,
      });
      profileId = profile._id;
      await Simulator.insertMany([
        {
          profile_id: profileId,
          dateRecorded: new Date(),
          cryptocurrency: `String1`,
          divisa: `String1`,
          euros: 100,
          price: 1000,
          quantity: 10,
        },
        {
          profile_id: profileId,
          dateRecorded: new Date(),
          cryptocurrency: `String2`,
          divisa: `String2`,
          euros: 200,
          price: 2000,
          quantity: 20,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  });
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/simulators');
    expect(res.status).to.equal(200);
  });
  it('should contain two documents', async () => {
    const res = await request(app).get('/api/simulators');
    expect(res.body).to.have.length(2);
  });
  it('should create a simulator with 201 status', async () => {
    const res = await request(app).post(`/api/simulators/${profileId}`).send({
      dateRecorded: new Date(),
      cryptocurrency: `String`,
      divisa: `String`,
      euros: 200,
      price: 2000,
      quantity: 20,
    });
    expect(res.status).to.equal(201);
  });
  it('should return 3 simulators associated to profileId', async () => {
    await request(app).post(`/api/simulators/${profileId}`).send({
      dateRecorded: new Date(),
      cryptocurrency: `String2`,
      divisa: `String2`,
      euros: 200,
      price: 2000,
      quantity: 20,
    });
    const res = await request(app).get(`/api/simulators/${profileId}`);
    expect(res.body).to.have.length(3);
  });
});
