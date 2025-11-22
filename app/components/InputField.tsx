import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-gray-600 font-light">
        {label}
        {required && <span className="text-gray-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type="text"
        className="w-full px-0 pb-2 text-base border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-colors placeholder:text-gray-400 placeholder:font-mono font-light bg-transparent"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
