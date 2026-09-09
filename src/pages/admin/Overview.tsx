import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Hexagon, Package, Shield, Link2, AlertTriangle, BarChart3, TrendingUp, CheckCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import Card, { MetricCard } from '../../components/ui/Card';
import { PageHeader, CardSkeleton } from '../../components/ui/index';
import { analyticsService } from '../../services/analyticsService';
import { mockUsers, mockHoneyBatches, mockBeekeepers, mockAlerts } from '../../data/mockData';
import type { AnalyticsMetric, ChartDataPoint } from '../../types';

export default function AdminOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AnalyticsMetric[]>([]);
  const [production, setProduction] = useState<ChartDataPoint[]>([]);
  const [verification, setVerification] = useState<ChartDataPoint[]>([]);
  const [regional, setRegional] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsService.getDashboardStats(),
      analyticsService.getMonthlyProduction(),
      analyticsService.getBatchVerification(),
      analyticsService.getRegionalProduction(),
    ]).then(([s, p, v, r]) => {
      setStats(s);
      setProduction(p);
      setVerification(v);
      setRegional(r);
      setLoading(false);
    });
  }, []);

  const STAT_ICONS = [Users, Hexagon, Package, Package, Shield, AlertTriangle];
  const PIE_COLORS = ['#F5B731', '#34D399', '#38BDF8', '#A78BFA', '#F472B6', '#FB923C'];

  const roleData = [
    { name: 'Beekeepers', value: mockUsers.filter(u => u.role === 'beekeeper').length },
    { name: 'Processors', value: mockUsers.filter(u => u.role === 'processor').length },
    { name: 'Distributors', value: mockUsers.filter(u => u.role === 'distributor').length },
    { name: 'Consumers', value: mockUsers.filter(u => u.role === 'consumer').length },
    { name: 'Admins', value: mockUsers.filter(u => u.role === 'admin').length },
  ];

  return (
    <>
      <PageHeader title="Admin Dashboard" subtitle="Ecosystem overview and management" />

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = STAT_ICONS[i] || Package;
              return (
                <MetricCard key={stat.label} label={stat.label} value={stat.value.toLocaleString()}
                  change={stat.change} trend={stat.trend} icon={<Icon className="w-5 h-5" />} />
              );
            })}
          </div>

          {/* Charts Row 1 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Production Chart */}
            <Card>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-honey-400" /> Monthly Honey Production (kg)
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={production}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#353539" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#85858F' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#85858F' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#232327', border: '1px solid #353539', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                    <Bar dataKey="value" fill="#F5B731" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Verification Chart */}
            <Card>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Batch Verification Trend
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={verification}>
                    <defs>
                      <linearGradient id="verGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34D399" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#353539" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#85858F' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#85858F' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#232327', border: '1px solid #353539', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="value" stroke="#34D399" fill="url(#verGradient)" strokeWidth={2} name="Created" />
                    <Area type="monotone" dataKey="value2" stroke="#F5B731" fill="transparent" strokeWidth={2} strokeDasharray="4 4" name="Verified" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Regional */}
            <Card className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-honey-400" /> Regional Production (kg)
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regional} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#353539" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#85858F' }} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#85858F' }} width={120} />
                    <Tooltip contentStyle={{ backgroundColor: '#232327', border: '1px solid #353539', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                    <Bar dataKey="value" fill="#F5B731" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* User Roles Pie */}
            <Card>
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" /> Users by Role
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={roleData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                      {roleData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#232327', border: '1px solid #353539', borderRadius: '12px', fontSize: '12px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {roleData.map((d, i) => (
                  <span key={d.name} className="flex items-center gap-1 text-[10px] text-charcoal-400">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                    {d.name} ({d.value})
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users, color: 'from-sky-400 to-sky-600' },
              { label: 'Verifications', href: '/dashboard/admin/verifications', icon: Shield, color: 'from-emerald-400 to-emerald-600' },
              { label: 'Blockchain', href: '/dashboard/admin/blockchain', icon: Link2, color: 'from-violet-400 to-violet-600' },
              { label: 'Audit Log', href: '/dashboard/admin/audit', icon: CheckCircle, color: 'from-honey-400 to-honey-600' },
            ].map(link => {
              const Icon = link.icon;
              return (
                <Card key={link.label} hover className="cursor-pointer text-center" onClick={() => navigate(link.href)}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${link.color} mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-charcoal-200">{link.label}</p>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
