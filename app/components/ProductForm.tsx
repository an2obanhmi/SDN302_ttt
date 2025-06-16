'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductInput, createProductSchema } from '@/app/lib/validations/product';
import { IProduct } from '@/app/models/Product';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

const DEFAULT_IMAGE = '/images/placeholder.svg';

interface ProductFormProps {
  product?: IProduct;
  onSubmit: (data: CreateProductInput) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({ product, onSubmit, isLoading }: ProductFormProps) {
  const [previewImage, setPreviewImage] = useState(product?.imageUrl || DEFAULT_IMAGE);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
        }
      : {},
  });

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (product?.imageUrl) {
      setPreviewImage(product.imageUrl);
    } else {
      setPreviewImage(DEFAULT_IMAGE);
    }
  }, [selectedFile, product?.imageUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage(DEFAULT_IMAGE);
    setValue('imageUrl', '');
  };

  const handleFormSubmit = async (data: CreateProductInput) => {
    let finalImageUrl: string = product?.imageUrl || '';
    if (selectedFile) {
      finalImageUrl = URL.createObjectURL(selectedFile);
    } else if (!product && !finalImageUrl) {
      toast.error('Vui lòng chọn hình ảnh cho sản phẩm.');
      return;
    }
    
    const dataToSend: CreateProductInput = {
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: finalImageUrl,
    };

    try {
      await onSubmit(dataToSend);
      toast.success(product ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm mới thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Upload */}
        <div className="space-y-4">
          <label className="form-label">Hình ảnh sản phẩm</label>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-accent group">
            <img
              src={previewImage}
              alt="Preview"
              className="h-full w-full object-cover object-center"
              onError={() => setPreviewImage(DEFAULT_IMAGE)}
            />
            {previewImage !== DEFAULT_IMAGE && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md z-10"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-sm font-medium">Thay đổi ảnh</div>
            </div>
          </div>
          {/* File Input */}
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="btn btn-secondary w-full cursor-pointer flex items-center justify-center space-x-2"
            >
              <Upload className="h-5 w-5" />
              <span>{selectedFile ? selectedFile.name : 'Chọn ảnh từ máy tính'}</span>
            </label>
            <p className="form-hint mt-2">Ảnh sẽ được tải lên server và URL sẽ được lưu.</p>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Tên sản phẩm</label>
            <input
              id="name"
              type="text"
              className="input"
              placeholder="Nhập tên sản phẩm"
              {...register('name')}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="price" className="form-label">Giá</label>
            <div className="relative">
              <input
                id="price"
                type="number"
                step="0.01"
                className="input pl-8"
                placeholder="Nhập giá sản phẩm"
                {...register('price', { valueAsNumber: true })}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">₫</span>
            </div>
            {errors.price && <p className="form-error">{errors.price.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Mô tả</label>
            <textarea
              id="description"
              rows={4}
              className="input"
              placeholder="Nhập mô tả sản phẩm"
              {...register('description')}
            />
            {errors.description && <p className="form-error">{errors.description.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => window.history.back()}
        >
          Hủy
        </button>
        <button
          type="submit"
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Đang xử lý...</span>
            </div>
          ) : (
            product ? 'Cập nhật' : 'Tạo mới'
          )}
        </button>
      </div>
    </form>
  );
} 