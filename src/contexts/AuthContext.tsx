// ============================================================
// HoneyChain — Auth Context
// ============================================================
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; role: UserRole }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('honeychain_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const persistUser = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem('honeychain_user', JSON.stringify(u));
    else localStorage.removeItem('honeychain_user');
  };

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const u = await authService.login(email, password);
      if (u) { persistUser(u); return true; }
      return false;
    } finally { setIsLoading(false); }
  }, []);

  const loginAsDemo = useCallback(async (role: UserRole) => {
    setIsLoading(true);
    try {
      const u = await authService.loginAsDemo(role);
      persistUser(u);
    } finally { setIsLoading(false); }
  }, []);

  const signup = useCallback(async (data: { name: string; email: string; password: string; role: UserRole }) => {
    setIsLoading(true);
    try {
      const u = await authService.signup(data);
      persistUser(u);
    } finally { setIsLoading(false); }
  }, []);

  const logout = useCallback(() => {
    persistUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, loginAsDemo, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
