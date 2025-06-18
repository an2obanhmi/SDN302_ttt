'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/app/components/ProductForm';
import Navigation from '@/app/components/Navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { CreateProductInput } from '@/app/lib/validations/product';

export default function NewProductPage() {
  const router = useRouter();

  const handleCreateProduct = async (productData: CreateProductInput) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể tạo sản phẩm');
      }

      toast.success('Tạo sản phẩm thành công!');
      router.push('/products');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo sản phẩm');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pt-16">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-heading font-bold text-text mb-8">Thêm Sản Phẩm Mới</h1>
          <ProductForm onSubmit={handleCreateProduct} />
        </main>
      </div>
    </ProtectedRoute>
  );
} 