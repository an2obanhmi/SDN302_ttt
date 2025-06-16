import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String },
    stock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Product = (mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema)); 