import 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import mongoFactory from '../../src/db';
import { Profile } from '../../src/models';

describe('API profiles', () => {
  let connection: mongoose.Connection;
  before(async () => {
    connection = (await mongoFactory).getInstance();
  });
  beforeEach(async () => {
    try {
      await Profile.deleteMany({});
      await Profile.insertMany([
        {
          _id: '6093abb3dfd9da1deeae56f2',
          name: `John`,
          email: `John@gmail.com`,
          capital: `123`,
          divisa: `String`,
          prefered_cryptocurrency: `String`,
        },
        {
          _id: '6093abb3dfd9da1deeae56f9',
          name: `Javad`,
          email: `Javad@gmail.com`,
          capital: `123`,
          divisa: `String`,
          prefered_cryptocurrency: `String`,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  });
  it('should return 200 OK', async () => {
    const res = await request(app).get('/api/profiles');
    expect(res.status).to.equal(200);
  });
  it('should contain two documents', async () => {
    const res = await request(app).get('/api/profiles');
    expect(res.body).to.have.length(2);
  });
  it('should create a profile with 201 status', async () => {
    const res = await request(app).post('/api/profiles').send({
      name: 'Foo',
      email: 'Foo@gmail.com',
      nickname: 'Fooo',
    });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name');
    expect(res.body).to.have.property('email');
    expect(res.body).to.have.property('nickname');
  });
  it('should return a conflict error', async () => {
    const res = await request(app).post('/api/profiles').send({
      name: `Javad`,
      email: `Javad@gmail.com`,
      nickname: `Javad`,
    });
    expect(res.status).to.equal(409);
  });
});
