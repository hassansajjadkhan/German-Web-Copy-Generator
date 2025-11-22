import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  type = 'button',
  variant = 'primary',
  size = 'default',
  disabled = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-light tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 border border-gray-900',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 border-none',
  };

  const sizeStyles = {
    default: 'px-6 py-3 text-sm rounded-sm',
    sm: 'px-4 py-2 text-xs rounded-sm',
    lg: 'px-8 py-4 text-base rounded-sm',
    icon: 'p-2 rounded-sm',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
