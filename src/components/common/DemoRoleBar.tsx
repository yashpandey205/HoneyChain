import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hexagon, Sparkles, ChevronUp, ChevronDown, Check,
  UserCheck, Shield, Truck, FlaskConical, Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/NotificationContext';
import type { UserRole } from '../../types';

const ROLES: { role: UserRole; label: string; icon: any; color: string }[] = [
  { role: 'beekeeper', label: 'Beekeeper', icon: Hexagon, color: 'text-amber-400' },
  { role: 'processor', label: 'Processor', icon: FlaskConical, color: 'text-sky-400' },
  { role: 'distributor', label: 'Distributor', icon: Truck, color: 'text-emerald-400' },
  { role: 'consumer', label: 'Consumer', icon: Home, color: 'text-purple-400' },
  { role: 'admin', label: 'Admin', icon: Shield, color: 'text-honey-400' },
];

export default function DemoRoleBar() {
  const { user, loginAsDemo } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleRoleSwitch = async (role: UserRole) => {
    await loginAsDemo(role);
    addToast('info', 'Demo Role Switched', `Now viewing platform as ${role.toUpperCase()}`);
    navigate(`/dashboard/${role}`);
  };

  const currentRole = user?.role || 'consumer';

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="mb-2 p-3 rounded-2xl bg-charcoal-900/95 border border-honey-500/30 shadow-2xl backdrop-blur-xl w-64 space-y-2"
          >
            <div className="flex items-center justify-between pb-2 border-b border-charcoal-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-honey-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Hackathon Demo Switcher
              </span>
              <span className="text-[10px] text-charcoal-500">1-Click Role Access</span>
            </div>

            <div className="space-y-1">
              {ROLES.map(({ role, label, icon: Icon, color }) => {
                const isActive = currentRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-honey-500/15 text-honey-400 border border-honey-500/30 shadow-sm'
                        : 'text-charcoal-300 hover:bg-charcoal-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                      <span>{label} Portal</span>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-honey-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-charcoal-900/90 hover:bg-charcoal-800 border border-honey-500/40 text-xs font-bold text-white shadow-xl shadow-honey-500/10 hover:shadow-honey-500/20 backdrop-blur-lg transition-all cursor-pointer group"
      >
        <div className="w-2 h-2 rounded-full bg-honey-400 animate-pulse" />
        <span className="text-honey-400">Demo Role:</span>
        <span className="capitalize font-semibold text-white group-hover:text-honey-300">
          {currentRole}
        </span>
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-charcoal-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-charcoal-400" />
        )}
      </button>
    </div>
  );
}
