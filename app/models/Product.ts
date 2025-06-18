import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdBy?: string; // Reference to User ID
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tên sản phẩm là bắt buộc'],
    trim: true,
    maxlength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự']
  },
  description: {
    type: String,
    required: [true, 'Mô tả sản phẩm là bắt buộc'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Giá sản phẩm là bắt buộc'],
    min: [0, 'Giá sản phẩm không được âm']
  },
  imageUrl: {
    type: String,
    required: [true, 'Hình ảnh sản phẩm là bắt buộc']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional field
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo index cho các trường thường xuyên tìm kiếm
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ createdBy: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema); 