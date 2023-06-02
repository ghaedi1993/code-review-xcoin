import mongoose from 'mongoose';
import { ISimulator } from '../interfaces';

const { Schema } = mongoose;

const schema = new Schema<ISimulator>(
  {
    profile_id: Schema.Types.ObjectId,
    dateRecorded: Date,
    cryptocurrency: String,
    euros: Number,
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export const Simulator = mongoose.model<ISimulator>('Simulator', schema);
