import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, LayoutDashboard, Hexagon, Activity, Scissors, Package,
  AlertTriangle, BarChart3, Truck, MapPin, Clock, Users, Shield,
  Link2, CheckCircle, FileText, Settings, Home, Search, ScanLine,
  History, ArrowDownToLine, FlaskConical, CheckCheck, ClipboardList
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types';

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  beekeeper: [
    { label: 'Overview', href: '/dashboard/beekeeper', icon: LayoutDashboard },
    { label: 'My Hives', href: '/dashboard/hives', icon: Hexagon },
    { label: 'Hive Monitoring', href: '/dashboard/monitoring', icon: Activity },
    { label: 'Harvesting', href: '/dashboard/harvesting', icon: Scissors },
    { label: 'Honey Batches', href: '/dashboard/batches', icon: Package },
    { label: 'Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  ],
  processor: [
    { label: 'Overview', href: '/dashboard/processor', icon: LayoutDashboard },
    { label: 'Incoming Batches', href: '/dashboard/processor/incoming', icon: ArrowDownToLine },
    { label: 'Processing', href: '/dashboard/processor/processing', icon: FlaskConical },
    { label: 'Quality Testing', href: '/dashboard/processor/quality', icon: CheckCircle },
    { label: 'Completed', href: '/dashboard/processor/completed', icon: CheckCheck },
  ],
  distributor: [
    { label: 'Overview', href: '/dashboard/distributor', icon: LayoutDashboard },
    { label: 'Shipments', href: '/dashboard/distributor/shipments', icon: Truck },
    { label: 'Batch Tracking', href: '/dashboard/distributor/tracking', icon: MapPin },
    { label: 'Distribution', href: '/dashboard/distributor/distribution', icon: Package },
    { label: 'Delivery History', href: '/dashboard/distributor/history', icon: Clock },
  ],
  consumer: [
    { label: 'Home', href: '/dashboard/consumer', icon: Home },
    { label: 'Verify Honey', href: '/verify', icon: Search },
    { label: 'Track Batch', href: '/trace', icon: MapPin },
    { label: 'My Scans', href: '/dashboard/consumer/scans', icon: ScanLine },
    { label: 'Scan History', href: '/dashboard/consumer/history', icon: History },
  ],
  admin: [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/dashboard/admin/users', icon: Users },
    { label: 'Beekeepers', href: '/dashboard/admin/beekeepers', icon: Hexagon },
    { label: 'Honey Batches', href: '/dashboard/admin/batches', icon: Package },
    { label: 'Blockchain Records', href: '/dashboard/admin/blockchain', icon: Link2 },
    { label: 'Verifications', href: '/dashboard/admin/verifications', icon: Shield },
    { label: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
    { label: 'Alerts', href: '/dashboard/admin/alerts', icon: AlertTriangle },
    { label: 'Audit Log', href: '/dashboard/admin/audit', icon: ClipboardList },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const navItems = NAV_BY_ROLE[user.role] || [];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 bg-charcoal-900/95 border-r border-charcoal-700/30 z-40"
      >
        {/* Collapse toggle */}
        <button onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-charcoal-800 border border-charcoal-700 flex items-center justify-center text-charcoal-400 hover:text-white transition-colors cursor-pointer z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Role label */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="px-5 py-4 border-b border-charcoal-700/30">
              <p className="text-[10px] uppercase tracking-widest text-charcoal-500 font-medium">Dashboard</p>
              <p className="text-sm font-semibold text-honey-400 capitalize mt-0.5">{user.role} Portal</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1" aria-label="Dashboard navigation">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}
                className={`flex items-center gap-3 rounded-xl transition-all group relative
                  ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5'}
                  ${isActive
                    ? 'bg-honey-500/10 text-honey-400'
                    : 'text-charcoal-400 hover:text-charcoal-200 hover:bg-charcoal-800/60'}`}
                title={collapsed ? item.label : undefined}>
                {isActive && (
                  <motion.div layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-honey-500 rounded-full" />
                )}
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }} className="text-sm font-medium whitespace-nowrap overflow-hidden">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Demo label */}
        <div className={`border-t border-charcoal-700/30 p-4 ${collapsed ? 'text-center' : ''}`}>
          <AnimatePresence>
            {!collapsed && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-[10px] text-charcoal-600 uppercase tracking-wider">
                Demo Mode Active
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-charcoal-700/30">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.slice(0, 5).map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg min-w-[52px] transition-all
                  ${isActive ? 'text-honey-400' : 'text-charcoal-500'}`}>
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium truncate max-w-[56px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
