// ═══════════════════════════════════════
// CrumbleCo — Input Component
// ═══════════════════════════════════════

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-espresso-400 font-body"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso-200">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-xl border bg-white px-4 py-3 text-espresso-500 font-body
              placeholder:text-espresso-200
              focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400
              transition-all duration-200
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-400 focus:ring-red-400/50' : 'border-cream-300'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 font-body">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-espresso-200 font-body">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
