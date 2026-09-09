import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle, Package } from 'lucide-react';
import type { ReactNode } from 'react';

// ---- Modal ----
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const modalSizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' };

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`relative glass rounded-2xl p-6 w-full ${modalSizes[size]} max-h-[85vh] overflow-y-auto`}>
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        {children}
      </motion.div>
    </div>
  );
}

// ---- SearchBar ----
interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...', onSubmit, className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSubmit?.()}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-charcoal-800/80 border border-charcoal-700/50 rounded-xl text-sm text-white placeholder:text-charcoal-500 focus:border-honey-500/50 focus:ring-1 focus:ring-honey-500/20 transition-all outline-none"
      />
    </div>
  );
}

// ---- Tabs ----
interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-charcoal-800/60 rounded-xl border border-charcoal-700/30">
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)}
          className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer
            ${activeTab === tab.id
              ? 'text-honey-400 bg-charcoal-700/80'
              : 'text-charcoal-400 hover:text-charcoal-200 hover:bg-charcoal-700/40'}`}>
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-2 px-1.5 py-0.5 text-[10px] rounded-full
              ${activeTab === tab.id ? 'bg-honey-500/20 text-honey-400' : 'bg-charcoal-700 text-charcoal-500'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ---- LoadingSkeleton ----
export function LoadingSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton rounded-lg h-4" style={{ width: `${85 - i * 15}%` }} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <div className="skeleton rounded h-4 w-1/3" />
      <div className="skeleton rounded h-8 w-1/2" />
      <div className="skeleton rounded h-3 w-2/3" />
    </div>
  );
}

// ---- EmptyState ----
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-2xl bg-charcoal-800/60 text-charcoal-500 mb-4">
        {icon || <Package className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-semibold text-charcoal-300">{title}</h3>
      {description && <p className="text-sm text-charcoal-500 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ---- ErrorState ----
interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-2xl bg-red-500/10 text-red-400 mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-charcoal-300">Error</h3>
      <p className="text-sm text-charcoal-500 mt-1">{message}</p>
      {onRetry && (
        <button onClick={onRetry}
          className="mt-4 px-4 py-2 text-sm font-medium bg-charcoal-800 text-charcoal-200 rounded-xl hover:bg-charcoal-700 transition-colors cursor-pointer">
          Try Again
        </button>
      )}
    </div>
  );
}

// ---- PageHeader ----
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ title, subtitle, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {breadcrumbs && (
        <nav className="flex items-center gap-2 text-xs text-charcoal-500 mb-3">
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {b.href ? <a href={b.href} className="hover:text-honey-400 transition-colors">{b.label}</a> : <span className="text-charcoal-300">{b.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">{title}</h1>
          {subtitle && <p className="text-sm text-charcoal-400 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

// ---- Animated Counter ----
export function AnimatedCounter({ value, duration = 2000, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ---- Loading Spinner ----
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return <Loader2 className={`${sizes[size]} animate-spin text-honey-400`} />;
}
