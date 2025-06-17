'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/app/components/ProductForm';
import Navigation from '@/app/components/Navigation';
import { IProduct } from '@/app/models/Product';
import toast from 'react-hot-toast';
import { CreateProductInput } from '@/app/lib/validations/product';

interface EditProductPageProps {
  params: { id: string };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Không thể tải sản phẩm');
        }

        setProduct(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        toast.error('Không thể tải thông tin sản phẩm');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (productData: CreateProductInput) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể cập nhật sản phẩm');
      }

      toast.success('Cập nhật sản phẩm thành công!');
      router.push('/products');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-text-light">Đang tải thông tin sản phẩm...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Có lỗi xảy ra</h2>
            <p className="text-text-light">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Không tìm thấy sản phẩm</h2>
            <p className="text-text-light">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold text-text mb-8">Chỉnh Sửa Sản Phẩm</h1>
        <ProductForm product={product} onSubmit={handleUpdateProduct} />
      </main>
    </div>
  );
} 