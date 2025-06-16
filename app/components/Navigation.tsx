'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, User, Heart, Search } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
            <Link href="/account" className="btn-icon">
              <User className="h-5 w-5" />
            </Link>
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
              <Link
                href="/account"
                className="flex items-center space-x-2 px-3 py-2 text-text-light hover:bg-background-alt rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Tài khoản</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 