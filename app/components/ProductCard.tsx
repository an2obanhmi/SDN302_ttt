'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/app/models/Product';
import { Edit, Trash2, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DEFAULT_IMAGE = '/images/placeholder.svg';

interface ProductCardProps {
  product: IProduct;
  onDelete?: (id: string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  const { isAuthenticated, loading } = useAuth();

  return (
    <div className="group relative bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-hover">
      {/* Product Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-accent">
        <Image
          src={product.imageUrl || DEFAULT_IMAGE}
          alt={product.name}
          width={500}
          height={625}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_IMAGE;
          }}
        />
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <button className="p-2 rounded-full bg-white text-text hover:text-primary transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-white text-text hover:text-primary transition-colors">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-text line-clamp-1">
          <Link href={`/products/${product._id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <p className="mt-1 text-sm text-text-light line-clamp-2">{product.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-primary">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(product.price)}
          </p>
          
          {/* Admin Actions - Only show to authenticated users */}
          {!loading && isAuthenticated && onDelete && (
            <div className="flex space-x-2">
              <Link
                href={`/products/${product._id}/edit`}
                className="p-2 text-text hover:text-primary transition-colors"
                title="Chỉnh sửa sản phẩm"
              >
                <Edit className="h-5 w-5" />
              </Link>
              <button
                className="p-2 text-error hover:text-error/80 transition-colors"
                onClick={() => {
                  if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
                    onDelete(product._id as string);
                  }
                }}
                title="Xóa sản phẩm"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 