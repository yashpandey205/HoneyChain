import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-400 hover:to-honey-500 text-charcoal-950 font-semibold shadow-lg shadow-honey-500/20',
  secondary: 'bg-charcoal-700 hover:bg-charcoal-600 text-charcoal-100 border border-charcoal-600',
  outline: 'bg-transparent border border-honey-500/40 text-honey-400 hover:bg-honey-500/10 hover:border-honey-500',
  ghost: 'bg-transparent hover:bg-charcoal-800 text-charcoal-300 hover:text-charcoal-100',
  danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

export default function Button({ variant = 'primary', size = 'md', loading, icon, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.02 }}
      whileTap={disabled || loading ? undefined : { scale: 0.98 }}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
}
