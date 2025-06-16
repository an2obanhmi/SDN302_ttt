import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={twMerge(
        'bg-white rounded-lg shadow-md overflow-hidden',
        hover && 'transition-shadow duration-300 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
} 