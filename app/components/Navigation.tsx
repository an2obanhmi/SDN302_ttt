'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, User, Heart, Search, LogOut, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/collections', label: 'Collections' },
    { href: '/about', label: 'About' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-nav' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-text">FASHION.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  pathname === link.href
                    ? 'text-text font-medium'
                    : 'text-text-lighter hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="btn-icon">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/wishlist" className="btn-icon">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="btn-icon">
              <ShoppingBag className="h-5 w-5" />
            </Link>
            
            {/* Add Product Button - Only for authenticated users */}
            {!loading && isAuthenticated && (
              <Link 
                href="/products/new" 
                className="btn-icon bg-primary text-white hover:bg-primary/90"
                title="Thêm sản phẩm mới"
              >
                <Plus className="h-5 w-5" />
              </Link>
            )}
            
            {/* User Authentication */}
            {!loading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-background-alt rounded-lg">
                      <User className="h-4 w-4 text-text-light" />
                      <span className="text-sm text-text-light">
                        {user?.name || user?.email}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="btn-icon text-red-500 hover:text-red-600"
                      title="Đăng xuất"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link href="/auth/login" className="btn-secondary text-sm">
                      Đăng nhập
                    </Link>
                    <Link href="/auth/register" className="btn text-sm">
                      Đăng ký
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden btn-icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-text-light hover:bg-background-alt uppercase text-sm tracking-wide ${
                  pathname === link.href ? 'font-medium text-text' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Add Product - Mobile - Only for authenticated users */}
            {!loading && isAuthenticated && (
              <Link
                href="/products/new"
                className="flex items-center space-x-2 px-3 py-2 text-primary hover:bg-primary/10 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <Plus className="h-5 w-5" />
                <span>Thêm sản phẩm</span>
              </Link>
            )}
            
            <div className="flex items-center space-x-4 pt-4 border-t border-border">
              <Link
                href="/wishlist"
                className="flex items-center space-x-2 px-3 py-2 text-text-light hover:bg-background-alt rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="h-5 w-5" />
                <span>Yêu thích</span>
              </Link>
              <Link
                href="/cart"
                className="flex items-center space-x-2 px-3 py-2 text-text-light hover:bg-background-alt rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Giỏ hàng</span>
              </Link>
              
              {/* Mobile Authentication */}
              {!loading && (
                <>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 px-3 py-2 text-text-light">
                        <User className="h-5 w-5" />
                        <span>{user?.name || user?.email}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Đăng xuất</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="flex items-center space-x-2 px-3 py-2 text-text-light hover:bg-background-alt rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>Đăng nhập</span>
                      </Link>
                      <Link
                        href="/auth/register"
                        className="flex items-center space-x-2 px-3 py-2 text-text-light hover:bg-background-alt rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>Đăng ký</span>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 