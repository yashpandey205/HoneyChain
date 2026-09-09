import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, QrCode, LogIn, UserPlus, Bell, ChevronDown, LogOut,
  Home, Search, Hexagon, Link2, LayoutDashboard, Info, User,
  ScanLine
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { Notification } from '../../types';
import { mockNotifications } from '../../data/mockData';

const PUBLIC_NAV = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Trace Honey', href: '/trace', icon: Search },
  { label: 'Smart Hives', href: '/dashboard/beekeeper', icon: Hexagon },
  { label: 'Blockchain', href: '/blockchain', icon: Link2 },
  { label: 'About', href: '/about', icon: Info },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unread = mockNotifications.filter(n => !n.read).length;

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-charcoal-700/30" role="navigation" aria-label="Main navigation">
      <div className={`${isDashboard ? 'px-4 lg:px-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="HoneyChain Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center">
              <Hexagon className="w-4.5 h-4.5 text-charcoal-950" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold font-display text-white">
              Honey<span className="text-gradient-honey">Chain</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {PUBLIC_NAV.map(item => (
              <Link key={item.href} to={item.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all
                  ${location.pathname === item.href
                    ? 'text-honey-400 bg-honey-500/10'
                    : 'text-charcoal-300 hover:text-white hover:bg-charcoal-800/60'}`}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* QR Scan */}
            <button onClick={() => navigate('/verify')}
              className="p-2 rounded-lg text-charcoal-400 hover:text-honey-400 hover:bg-charcoal-800/60 transition-all cursor-pointer"
              aria-label="Scan QR Code">
              <ScanLine className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                    className="relative p-2 rounded-lg text-charcoal-400 hover:text-honey-400 hover:bg-charcoal-800/60 transition-all cursor-pointer"
                    aria-label={`Notifications ${unread > 0 ? `(${unread} unread)` : ''}`}>
                    <Bell className="w-5 h-5" />
                    {unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                        {unread}
                      </span>
                    )}
                  </button>
                  <AnimatePresence>
                    {notifOpen && <NotificationPanel notifications={mockNotifications} onClose={() => setNotifOpen(false)} />}
                  </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative">
                  <button onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-charcoal-800/60 border border-charcoal-700/50 hover:border-charcoal-600 transition-all cursor-pointer">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center text-charcoal-950 text-xs font-bold">
                      {user!.name.charAt(0)}
                    </div>
                    <span className="hidden sm:block text-sm text-charcoal-200 font-medium max-w-[100px] truncate">{user!.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-charcoal-500" />
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-charcoal-700/30 p-2 shadow-xl">
                        <div className="px-3 py-2 mb-1 border-b border-charcoal-700/30">
                          <p className="text-sm font-semibold text-white">{user!.name}</p>
                          <p className="text-xs text-charcoal-500">{user!.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-honey-500/15 text-honey-400 border border-honey-500/30 capitalize">
                            {user!.role} (Demo)
                          </span>
                        </div>
                        <Link to={`/dashboard/${user!.role}`} onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal-300 hover:text-white hover:bg-charcoal-800/60 rounded-lg transition-all">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/profile" onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-charcoal-300 hover:text-white hover:bg-charcoal-800/60 rounded-lg transition-all">
                          <User className="w-4 h-4" /> Profile
                        </Link>
                        <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"
                  className="px-4 py-2 text-sm font-medium text-charcoal-300 hover:text-white transition-colors">
                  <span className="flex items-center gap-1.5"><LogIn className="w-4 h-4" /> Login</span>
                </Link>
                <Link to="/signup"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-honey-500 to-honey-600 text-charcoal-950 rounded-xl hover:from-honey-400 hover:to-honey-500 transition-all">
                  <span className="flex items-center gap-1.5"><UserPlus className="w-4 h-4" /> Sign Up</span>
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-charcoal-400 hover:text-white hover:bg-charcoal-800/60 transition-all cursor-pointer"
              aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-charcoal-700/30">
            <div className="px-4 py-4 space-y-1">
              {PUBLIC_NAV.map(item => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all
                      ${location.pathname === item.href
                        ? 'text-honey-400 bg-honey-500/10'
                        : 'text-charcoal-300 hover:text-white hover:bg-charcoal-800/60'}`}>
                    <Icon className="w-4.5 h-4.5" /> {item.label}
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-3 border-t border-charcoal-700/30 mt-3">
                  <Link to="/login" onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-charcoal-800 text-charcoal-200 rounded-xl">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 text-sm font-medium bg-gradient-to-r from-honey-500 to-honey-600 text-charcoal-950 rounded-xl">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ---- Notification Panel ----
function NotificationPanel({ notifications, onClose }: { notifications: Notification[]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
      className="absolute right-0 top-full mt-2 w-80 glass rounded-xl border border-charcoal-700/30 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal-700/30">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>
        <button onClick={onClose} className="text-xs text-honey-400 hover:text-honey-300 cursor-pointer">Mark all read</button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.slice(0, 5).map(n => (
          <div key={n.id} className={`px-4 py-3 border-b border-charcoal-700/20 hover:bg-charcoal-800/40 transition-colors cursor-pointer
            ${!n.read ? 'bg-honey-500/5' : ''}`}>
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${!n.read ? 'bg-honey-400' : 'bg-charcoal-700'}`} />
              <div>
                <p className="text-xs font-semibold text-charcoal-200">{n.title}</p>
                <p className="text-xs text-charcoal-500 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-charcoal-600 mt-1">{new Date(n.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
