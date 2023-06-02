import 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import mongoFactory from '../src/db';
import { Favorite, Profile } from '../src/models';

describe('API /favorites', () => {
  let connection: mongoose.Connection;
  let profileId;
  before(async () => {
    connection = (await mongoFactory).getInstance();
  });
  beforeEach(async () => {
    try {
      await Profile.deleteMany({});
      await Favorite.deleteMany({});
      const profile = await Profile.create({
        name: `John`,
        email: `John@gmail.com`,
        capital: `123`,
        divisa: `String`,
        prefered_cryptocurrency: `String`,
      });
      profileId = profile._id;
      await Favorite.insertMany([
        {
          profile_id: profileId,
          name: `favorite_1`,
          favorite1: `String1`,
          favorite2: `String1`,
          favorite3: `String1`,
        },
        {
          profile_id: profileId,
          name: `favorite_2`,
          favorite1: `String2`,
          favorite2: `String2`,
          favorite3: `String2`,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  });
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/favorites');
    expect(res.status).to.equal(200);
  });
  it('should contain two documents', async () => {
    const res = await request(app).get('/api/favorites');
    expect(res.body).to.have.length(2);
  });
  it('should fetch 2 documents', async () => {
    const res = await request(app).get(`/api/favorites/${profileId}`);
    expect(res.body).to.have.length(2);
  });
});
