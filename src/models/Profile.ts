import mongoose from 'mongoose';
import { IProfile } from '../interfaces';

const { Schema } = mongoose;

const schema = new Schema<IProfile>({
  name: String,
  nickname: String,
  email: String,
  capital: Number,
  divisa: String,
  prefered_cryptocurrency: String,
});

export const Profile = mongoose.model<IProfile>('Profile', schema);
