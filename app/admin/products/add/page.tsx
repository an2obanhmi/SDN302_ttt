'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import LoadingSpinner from '@/app/components/LoadingSpinner';

const DEFAULT_IMAGE = '/images/default-product.jpg';

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
  imageUrl?: string;
}

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewImage, setPreviewImage] = useState<string>(DEFAULT_IMAGE);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    if (formData.imageUrl) {
      setPreviewImage(formData.imageUrl);
    } else {
      setPreviewImage(DEFAULT_IMAGE);
    }
  }, [formData.imageUrl]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên sản phẩm';
    }

    if (!formData.price) {
      newErrors.price = 'Vui lòng nhập giá sản phẩm';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Giá sản phẩm phải lớn hơn 0';
    }

    if (!formData.stock) {
      newErrors.stock = 'Vui lòng nhập số lượng tồn kho';
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Số lượng tồn kho không được âm';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'URL ảnh không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl || DEFAULT_IMAGE,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi thêm sản phẩm');
      }

      toast.success('Thêm sản phẩm thành công!');
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-heading font-bold mb-6">Thêm sản phẩm mới</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Nhập tên sản phẩm"
            disabled={loading}
          />
          {errors.name && (
            <p className="form-error">{errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input min-h-[100px]"
            placeholder="Nhập mô tả sản phẩm"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Giá <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`input ${errors.price ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Nhập giá sản phẩm"
              min="0"
              disabled={loading}
            />
            {errors.price && (
              <p className="form-error">{errors.price}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="form-label">
              Số lượng tồn kho <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={`input ${errors.stock ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Nhập số lượng"
              min="0"
              disabled={loading}
            />
            {errors.stock && (
              <p className="form-error">{errors.stock}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Danh mục
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
            disabled={loading}
          >
            <option value="">Chọn danh mục</option>
            <option value="ao">Áo</option>
            <option value="quan">Quần</option>
            <option value="phukien">Phụ kiện</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            Link ảnh sản phẩm
          </label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`input ${errors.imageUrl ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Nhập URL ảnh sản phẩm"
                disabled={loading}
              />
              {errors.imageUrl ? (
                <p className="form-error">{errors.imageUrl}</p>
              ) : (
                <p className="form-hint">
                  Nếu không nhập, hệ thống sẽ sử dụng ảnh mặc định
                </p>
              )}
            </div>
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setPreviewImage(DEFAULT_IMAGE)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-secondary"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="btn btn-primary min-w-[120px]"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" />
                <span className="ml-2">Đang xử lý...</span>
              </div>
            ) : (
              'Thêm sản phẩm'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 