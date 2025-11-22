import React from 'react';

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
}

export function TextAreaField({
  id,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-gray-600 font-light">
        {label}
        {required && <span className="text-gray-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <textarea
          id={id}
          className="w-full px-3 py-2 text-base border border-gray-300 focus:border-black focus:ring-0 focus:outline-none transition-colors placeholder:text-gray-400 placeholder:font-mono font-light bg-white resize-none"
          placeholder={placeholder}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          rows={rows}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {id === 'extraDetails' && value && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {value.length}/10000
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
