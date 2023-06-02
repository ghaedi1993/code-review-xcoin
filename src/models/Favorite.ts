import mongoose from 'mongoose';
import { IFavorite } from '../interfaces';

const { Schema } = mongoose;

const schema = new Schema<IFavorite>(
  {
    profile_id: mongoose.Schema.Types.ObjectId,
    name: String,
    favorite1: String,
    favorite2: String,
    favorite3: String,
  },
  {
    timestamps: true,
  }
);

export const Favorite = mongoose.model<IFavorite>('Favorite', schema);
