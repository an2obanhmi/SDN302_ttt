'use client';

import { useAuth } from '@/hooks/useAuth';

export default function AuthTest() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed top-20 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded z-50">
        <div className="flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mr-2"></div>
          Đang tải thông tin đăng nhập...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
        <div className="font-bold">✅ Đã đăng nhập</div>
        <div className="text-sm">
          <div>Email: {user?.email}</div>
          <div>Tên: {user?.name || 'Chưa có tên'}</div>
          <div>Vai trò: {user?.role}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50">
      <div className="font-bold">⚠️ Chưa đăng nhập</div>
      <div className="text-sm">Vui lòng đăng nhập để tiếp tục</div>
    </div>
  );
} 