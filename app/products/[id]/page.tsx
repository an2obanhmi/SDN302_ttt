'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navigation from '@/app/components/Navigation';
import Loading from '@/app/components/ui/Loading';
import Error from '@/app/components/ui/Error';
import { IProduct } from '@/app/models/Product';
import { Heart, ShoppingBag, Share2, ArrowLeft } from 'lucide-react';
import { ApiError, getErrorMessage } from '../../utils/errorHandler';

const DEFAULT_IMAGE = '/images/placeholder.svg';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params: paramsPromise }: ProductDetailPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Mock data for colors and sizes (assuming product doesn't have these fields yet)
  const availableColors = ['#000000', '#FAFAFA', '#9CA3AF', '#27C174', '#8B5CF6'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await paramsPromise;
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          const errorData = await response.json() as ApiError;
          setError(errorData.error);
          return;
        }

        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.imageUrl || DEFAULT_IMAGE);
        setSelectedColor(availableColors[0]);
        setSelectedSize(availableSizes[0]);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [paramsPromise, availableColors, availableSizes]);

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;

    try {
      const { id } = await paramsPromise;
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json() as ApiError;
        setError(errorData.error);
        return;
      }

      router.push('/products');
    } catch (error) {
      setError(getErrorMessage(error));
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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-text mb-4">Có lỗi xảy ra</h2>
            <p className="text-text-light">{error || 'Không tìm thấy sản phẩm'}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 btn-secondary flex items-center space-x-2 mx-auto"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Quay lại</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-8">
            {/* Product Images - Left Column (2/5 width on md) */}
            <div className="md:col-span-3 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 no-scrollbar">
                {[product.imageUrl, DEFAULT_IMAGE, DEFAULT_IMAGE].filter(Boolean).map((imgSrc, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(imgSrc || DEFAULT_IMAGE)}
                    className={`flex-shrink-0 relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === imgSrc
                        ? 'border-text'
                        : 'border-transparent hover:border-border'
                    } transition-colors duration-200`}
                  >
                    <Image
                      src={imgSrc || DEFAULT_IMAGE}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = DEFAULT_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex-1 relative aspect-square rounded-xl overflow-hidden bg-background-alt">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = DEFAULT_IMAGE;
                  }}
                />
              </div>
            </div>

            {/* Product Info - Right Column (3/5 width on md) */}
            <div className="md:col-span-2 space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text uppercase tracking-wider mb-2">{product.name}</h1>
                <p className="text-xl lg:text-2xl font-semibold text-text-light">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(product.price)}
                </p>
                <p className="mt-1 text-sm text-text-lighter">MRP incl. of all taxes</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-base font-medium text-text uppercase tracking-wider">Mô tả sản phẩm</h2>
                <p className="text-text-light whitespace-pre-line leading-relaxed">{product.description}</p>
              </div>

              {/* Color Options */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-text uppercase tracking-wider">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-text' : 'border-transparent'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200`}
                      style={{ backgroundColor: color, borderColor: selectedColor === color ? 'var(--text)' : 'var(--border)'}}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && (
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div className="space-y-4">
                <h3 className="text-base font-medium text-text uppercase tracking-wider">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border border-border rounded-md text-sm uppercase tracking-wide transition-all duration-200 ${
                        selectedSize === size ? 'bg-text text-white border-text' : 'text-text-light hover:bg-background-alt hover:border-text-light'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-6 border-t border-border">
                <button className="btn flex-1 flex items-center justify-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>ADD TO CART</span>
                </button>
                <button className="btn-icon">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="btn-icon">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 