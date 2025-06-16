'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <button
        className="flex justify-between items-center w-full text-text font-semibold uppercase text-sm tracking-wider hover:text-primary transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="mt-4 space-y-3 animate-fade-in">{children}</div>}
    </div>
  );
};

export default function FilterSidebar() {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];
  const categories = ['Shirts', 'T-Shirts', 'Jeans', 'Jackets', 'Shorts', 'Coats'];
  const colors = ['#FAFAFA', '#000000', '#9CA3AF', '#27C174', '#8B5CF6', '#FBBF24']; // Placeholder colors

  return (
    <div className="w-full space-y-6 lg:sticky lg:top-24 lg:pb-8 lg:pr-8 bg-white lg:bg-transparent rounded-2xl p-6 lg:p-0 shadow-card lg:shadow-none border border-border lg:border-none">
      <h2 className="text-xl font-heading font-bold text-text mb-6 uppercase tracking-wider hidden lg:block">Filters</h2>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className="px-3 py-1 border border-border rounded-md text-sm text-text-light hover:bg-background-alt hover:border-text transition-colors duration-200"
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <label className="flex items-center space-x-2 text-text-light text-sm">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-border focus:ring-primary" />
          <span>Availability (450)</span>
        </label>
        <label className="flex items-center space-x-2 text-text-light text-sm">
          <input type="checkbox" className="form-checkbox h-4 w-4 text-primary rounded border-border focus:ring-primary" />
          <span>Out Of Stock (18)</span>
        </label>
      </FilterSection>

      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              className="flex justify-between items-center w-full text-text-light hover:text-text transition-colors duration-200 text-sm"
            >
              <span>{category}</span>
              <ChevronDown className="h-3 w-3 text-text-lighter" />
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary"
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <input
          type="range"
          min="0"
          max="1000"
          step="1"
          className="w-full h-1 bg-accent rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-text-light">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </FilterSection>

      <FilterSection title="Collections">
        <div className="space-y-2">
          <button className="flex justify-between items-center w-full text-text-light hover:text-text transition-colors duration-200 text-sm"><span>Summer Collection</span><ChevronDown className="h-3 w-3 text-text-lighter" /></button>
          <button className="flex justify-between items-center w-full text-text-light hover:text-text transition-colors duration-200 text-sm"><span>Winter Essentials</span><ChevronDown className="h-3 w-3 text-text-lighter" /></button>
        </div>
      </FilterSection>

      <FilterSection title="Tags">
        <div className="space-y-2">
          <button className="flex justify-between items-center w-full text-text-light hover:text-text transition-colors duration-200 text-sm"><span>New Arrivals</span><ChevronDown className="h-3 w-3 text-text-lighter" /></button>
          <button className="flex justify-between items-center w-full text-text-light hover:text-text transition-colors duration-200 text-sm"><span>Sale</span><ChevronDown className="h-3 w-3 text-text-lighter" /></button>
        </div>
      </FilterSection>

      <FilterSection title="Ratings">
        <div className="flex space-x-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <button key={star} className="text-text-light hover:text-warning transition-colors duration-200">
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
} 