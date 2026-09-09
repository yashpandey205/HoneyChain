import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Award, MapPin, Package, ShieldCheck } from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import Card, { MetricCard } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { analyticsService } from '../../services/analyticsService';
import type { ChartDataPoint } from '../../types';

export default function AdminAnalytics() {
  const [production, setProduction] = useState<ChartDataPoint[]>([]);
  const [regional, setRegional] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    Promise.all([
      analyticsService.getMonthlyProduction(),
      analyticsService.getRegionalProduction(),
    ]).then(([p, r]) => {
      setProduction(p);
      setRegional(r);
    });
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Apiculture & Supply Chain Intelligence"
        subtitle="Ecosystem harvest analytics, regional honey production & purity compliance tracking"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="National Yield" value="18,420 kg" change={16.2} trend="up" icon={<TrendingUp className="w-5 h-5 text-honey-400" />} subtitle="Season-to-date" />
        <MetricCard label="Consumer QR Scans" value="28,940" change={24.8} trend="up" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} subtitle="Active market demand" />
        <MetricCard label="Active Bee Colonies" value="860 Hives" change={8.4} trend="up" icon={<Package className="w-5 h-5 text-sky-400" />} subtitle="Across 6 states" />
        <MetricCard label="Mean Purity Index" value="99.6%" icon={<Award className="w-5 h-5 text-purple-400" />} subtitle="Grade A Export Grade" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Production */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Monthly Honey Production (kg)</h3>
            <Badge variant="honey" size="sm">2026</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={production}>
                <defs>
                  <linearGradient id="adminProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5B731" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F5B731" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2c32" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#85858F' }} />
                <YAxis tick={{ fontSize: 11, fill: '#85858F' }} unit=" kg" />
                <Tooltip contentStyle={{ backgroundColor: '#1c1c20', border: '1px solid #333', borderRadius: '10px' }} />
                <Area type="monotone" dataKey="value" stroke="#F5B731" strokeWidth={2.5} fill="url(#adminProd)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Regional Distribution */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Regional Production Share (kg)</h3>
            <Badge variant="emerald" size="sm">By State</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regional}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2c32" />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#85858F' }} />
                <YAxis tick={{ fontSize: 11, fill: '#85858F' }} unit=" kg" />
                <Tooltip contentStyle={{ backgroundColor: '#1c1c20', border: '1px solid #333', borderRadius: '10px' }} />
                <Bar dataKey="value" fill="#34D399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
