'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import ProductCard from '@/app/components/ProductCard';
import FilterSidebar from '@/app/components/FilterSidebar';
import { IProduct } from '@/app/models/Product';
import toast from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { label: 'NEW', value: 'new' },
    { label: 'BEST SELLERS', value: 'best-sellers' },
    { label: 'SHIRTS', value: 'shirts' },
    { label: 'T-SHIRTS', value: 't-shirts' },
    { label: 'JEANS', value: 'jeans' },
    { label: 'JACKETS', value: 'jackets' },
    { label: 'COATS', value: 'coats' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Có lỗi xảy ra khi tải sản phẩm');
        }

        setProducts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        toast.error('Không thể tải danh sách sản phẩm');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Không thể xóa sản phẩm');
      }

      setProducts(products.filter(product => product._id !== id));
      toast.success('Xóa sản phẩm thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa sản phẩm');
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[calc(100vh-64px)]">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Listing Area */}
          <div className="flex-1">
            {/* Page Title & Search */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-text uppercase tracking-wider">Products</h1>
              <Link href="/products/new" className="btn inline-flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Thêm sản phẩm</span>
              </Link>
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-light" />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`px-4 py-2 rounded-md border border-border text-sm uppercase tracking-wide transition-all duration-200 ${
                    activeCategory === category.value
                      ? 'bg-background-alt border-text font-medium text-text'
                      : 'bg-white text-text-light hover:bg-background-alt hover:border-text-light'
                  }`}
                  onClick={() => setActiveCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-light text-lg">Chưa có sản phẩm nào.</p>
                <Link href="/products/new" className="btn mt-4 inline-flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Thêm sản phẩm đầu tiên</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 