import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'honey' | 'green' | 'red' | 'blue' | 'amber' | 'emerald' | 'sky' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
}

const badgeVariants = {
  default: 'bg-charcoal-700 text-charcoal-300 border-charcoal-600',
  honey: 'bg-honey-500/15 text-honey-400 border-honey-500/30',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  red: 'bg-red-500/15 text-red-400 border-red-500/30',
  blue: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  sky: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

export default function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium
      ${badgeVariants[variant]} ${badgeSizes[size]} ${className}`}>
      {children}
    </span>
  );
}

// Status Badge with dot
interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical' | 'verified' | 'pending' | 'rejected' | 'active' | 'resolved' | 'acknowledged';
  label?: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { color: string; bg: string; border: string; label: string }> = {
  healthy: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: 'Healthy' },
  verified: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: 'Verified' },
  active: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: 'Active' },
  resolved: { color: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: 'Resolved' },
  warning: { color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', label: 'Warning' },
  pending: { color: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', label: 'Pending' },
  acknowledged: { color: 'text-sky-400', bg: 'bg-sky-500/15', border: 'border-sky-500/30', label: 'Acknowledged' },
  critical: { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', label: 'Critical' },
  rejected: { color: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', label: 'Rejected' },
};

export function StatusBadge({ status, label, size = 'md' }: StatusBadgeProps) {
  const cfg = statusConfig[status] || statusConfig.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium
      ${cfg.bg} ${cfg.border} ${cfg.color} ${badgeSizes[size]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.color.replace('text-', 'bg-')}`} />
      {label || cfg.label}
    </span>
  );
}
