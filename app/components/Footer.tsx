'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background-dark text-text-light py-12 border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: About Us */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-text uppercase tracking-wider mb-4">Fashion.</h3>
          <p className="text-sm leading-relaxed">
            Khám phá phong cách độc đáo với bộ sưu tập thời trang mới nhất của chúng tôi. Chúng tôi cam kết mang đến chất lượng và sự tinh tế trong từng sản phẩm.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-text-light hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-text-light hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-text-light hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-text-light hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-text uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-sm hover:text-primary">Về chúng tôi</Link></li>
            <li><Link href="/products" className="text-sm hover:text-primary">Sản phẩm</Link></li>
            <li><Link href="/collections" className="text-sm hover:text-primary">Bộ sưu tập</Link></li>
            <li><Link href="/contact" className="text-sm hover:text-primary">Liên hệ</Link></li>
            <li><Link href="/faq" className="text-sm hover:text-primary">Câu hỏi thường gặp</Link></li>
          </ul>
        </div>

        {/* Section 3: Customer Service */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-text uppercase tracking-wider mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link href="/shipping" className="text-sm hover:text-primary">Giao hàng & Trả hàng</Link></li>
            <li><Link href="/privacy" className="text-sm hover:text-primary">Chính sách bảo mật</Link></li>
            <li><Link href="/terms" className="text-sm hover:text-primary">Điều khoản & Điều kiện</Link></li>
            <li><Link href="/sitemap" className="text-sm hover:text-primary">Sơ đồ trang</Link></li>
          </ul>
        </div>

        {/* Section 4: Contact Us */}
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-bold text-text uppercase tracking-wider mb-4">Contact Us</h3>
          <div className="space-y-2">
            <p className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-text" />
              <span>info@fashionstore.com</span>
            </p>
            <p className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-text" />
              <span>+84 123 456 789</span>
            </p>
            <p className="text-sm">123 Đường ABC, Quận XYZ, TP.HCM, Việt Nam</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border text-center text-sm text-text-lighter">
        &copy; {new Date().getFullYear()} Fashion. All rights reserved.
      </div>
    </footer>
  );
} 