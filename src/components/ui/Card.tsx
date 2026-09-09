import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'honey' | 'green' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' };

export default function Card({ children, className = '', hover = false, glow = 'none', padding = 'md', onClick }: CardProps) {
  const glowClass = glow === 'honey' ? 'glow-honey' : glow === 'green' ? 'glow-green' : '';

  return (
    <motion.div
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      onClick={onClick}
      className={`card ${hover ? 'card-hover cursor-pointer' : ''} ${glowClass} ${paddings[padding]} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}

// Glass Card
export function GlassCard({ children, className = '', padding = 'md' }: Omit<CardProps, 'hover' | 'glow'>) {
  return (
    <div className={`glass rounded-xl ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}

// Metric Card
interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  icon?: ReactNode;
  suffix?: string;
  subtitle?: string;
}

export function MetricCard({ label, value, change, trend, icon, suffix, subtitle }: MetricCardProps) {
  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-charcoal-400 uppercase tracking-wider font-medium">{label}</p>
          <p className="text-2xl font-bold text-white mt-1.5 font-display">
            {value}{suffix && <span className="text-sm font-normal text-charcoal-400 ml-1">{suffix}</span>}
          </p>
          {change !== undefined && (
            <p className={`text-xs mt-1.5 font-medium flex items-center gap-1
              ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-charcoal-400'}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {Math.abs(change)}%
              <span className="text-charcoal-500">vs last month</span>
            </p>
          )}
          {subtitle && (
            <p className="text-[11px] text-charcoal-400 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-honey-500/10 text-honey-400">
            {icon}
          </div>
        )}
      </div>
      {/* Decorative gradient */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-honey-500/5 rounded-full blur-2xl" />
    </Card>
  );
}
