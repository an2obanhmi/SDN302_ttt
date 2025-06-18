'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/app/components/Navigation';
import ProductCard from '@/app/components/ProductCard';
import Loading from '@/app/components/ui/Loading';
import ErrorMessage from '@/app/components/ui/Error';
import AuthTest from '@/app/components/AuthTest';
import { IProduct } from '@/app/models/Product';

export default function HomePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (!response.ok) {
          let errorMessage = 'Có lỗi xảy ra khi tải danh sách sản phẩm';
          if (typeof data === 'object' && data !== null && 'error' in data && typeof (data as { error: string }).error === 'string') {
            errorMessage = (data as { error: string }).error;
          }
          else if (typeof data === 'string' && data.length > 0) {
            errorMessage = data;
          }
          throw new Error(errorMessage);
        }

        setProducts(data.data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = 'Có lỗi xảy ra khi xóa sản phẩm';
        if (typeof errorData === 'object' && errorData !== null && 'error' in errorData && typeof (errorData as any).error === 'string') {
          errorMessage = (errorData as any).error;
        }
        else if (typeof errorData === 'string' && errorData.length > 0) {
          errorMessage = errorData;
        }
        alert(errorMessage);
        return;
      }

      setProducts(products.filter(product => product._id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : String(err));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-text-light">Đang tải sản phẩm...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Có lỗi xảy ra</h2>
            <p className="text-text-light">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navigation />
      <AuthTest />
      
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-64px)] flex items-center justify-center text-center overflow-hidden mb-12">
        <Image
          src="/images/hero-banner.jpg" // Make sure to add this image to your public/images folder
          alt="New Collection"
          fill
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="relative z-10 text-white space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight drop-shadow-lg leading-tight">
            KHÁM PHÁ BỘ SƯU TẬP MỚI
          </h1>
          <p className="text-lg md:text-xl font-body drop-shadow-md max-w-2xl mx-auto">
            Nâng tầm phong cách của bạn với những thiết kế mới nhất, độc đáo và thời thượng.
          </p>
          <Link href="/products" className="btn bg-white text-primary hover:bg-gray-100 mt-6">
            MUA NGAY
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text uppercase tracking-wider mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-text-light max-w-xl mx-auto">
            Những sản phẩm được yêu thích nhất từ bộ sưu tập của chúng tôi.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">Chưa có sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id as string}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-text uppercase tracking-wider mb-4">
            Sản phẩm mới
          </h2>
          <p className="text-text-light max-w-xl mx-auto">
            Những sản phẩm mới nhất vừa cập bến cửa hàng của chúng tôi.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">Chưa có sản phẩm mới nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* For demonstration, reusing 'products'. In a real app, you'd fetch 'new arrivals' */}
            {products.slice(0, 8).map((product) => ( // Displaying a subset for new arrivals
              <ProductCard
                key={product._id as string}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
