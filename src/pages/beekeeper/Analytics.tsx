import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Award, Droplets, Hexagon,
  Calendar, ArrowUpRight, ShieldCheck, Sparkles
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import Card, { MetricCard } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { analyticsService } from '../../services/analyticsService';
import type { ChartDataPoint } from '../../types';

export default function BeekeeperAnalytics() {
  const [monthlyYield, setMonthlyYield] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsService.getMonthlyProduction().then(data => {
      setMonthlyYield(data);
      setLoading(false);
    });
  }, []);

  const floralShare = [
    { name: 'Acacia', value: 42, color: '#F5B731' },
    { name: 'Multifloral', value: 28, color: '#34D399' },
    { name: 'Mustard', value: 16, color: '#38BDF8' },
    { name: 'Jamun', value: 14, color: '#A78BFA' },
  ];

  const moistureTrends = [
    { batch: 'HC-2026-001', moisture: 17.8, standard: 20 },
    { batch: 'HC-2026-002', moisture: 18.2, standard: 20 },
    { batch: 'HC-2026-003', moisture: 17.4, standard: 20 },
    { batch: 'HC-2026-004', moisture: 18.9, standard: 20 },
    { batch: 'HC-2026-005', moisture: 18.0, standard: 20 },
    { batch: 'HC-2026-006', moisture: 17.6, standard: 20 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Beekeeping Analytics & Yield Intelligence"
        subtitle="Historical harvest performance, floral yield composition & climate correlation"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Seasonal Yield Total"
          value="1,420 kg"
          change={22.4}
          trend="up"
          icon={<TrendingUp className="w-5 h-5 text-honey-400" />}
          subtitle="Outperforming regional benchmark"
        />
        <MetricCard
          label="Avg. Yield Per Hive"
          value="29.5 kg"
          change={5.8}
          trend="up"
          icon={<Hexagon className="w-5 h-5 text-emerald-400" />}
          subtitle="48 active apiary boxes"
        />
        <MetricCard
          label="Moisture Variance"
          value="±0.4%"
          change={-1.2}
          trend="down"
          icon={<Droplets className="w-5 h-5 text-sky-400" />}
          subtitle="High extraction consistency"
        />
        <MetricCard
          label="Apiary Purity Grade"
          value="99.4%"
          change={0.8}
          trend="up"
          icon={<Award className="w-5 h-5 text-purple-400" />}
          subtitle="Grade A Raw Certification"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Yield Chart */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Monthly Honey Harvest Volume</h3>
              <p className="text-xs text-charcoal-400">Kilograms harvested across Solan & Kashmir apiary hubs</p>
            </div>
            <Badge variant="honey" size="sm">2026 Season</Badge>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyYield}>
                <defs>
                  <linearGradient id="beekeeperYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5B731" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F5B731" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c2c32" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#85858F' }} />
                <YAxis tick={{ fontSize: 11, fill: '#85858F' }} unit=" kg" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1c1c20', border: '1px solid #333', borderRadius: '10px' }}
                  formatter={(val: any) => [`${val} kg`, 'Harvest Volume']}
                />
                <Area type="monotone" dataKey="value" stroke="#F5B731" strokeWidth={2.5} fill="url(#beekeeperYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Floral Composition Pie */}
        <Card className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-white">Floral Nectar Origin Mix</h3>
            <p className="text-xs text-charcoal-400">Percentage distribution by botanical forage</p>
          </div>

          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={floralShare}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {floralShare.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1c1c20', border: '1px solid #333', borderRadius: '10px' }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-charcoal-800">
            {floralShare.map(item => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-charcoal-400">{item.name}</span>
                <span className="ml-auto font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Moisture Quality Audit Chart */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Moisture Stability Index Across Recent Batches</h3>
            <p className="text-xs text-charcoal-400">Comparing batch moisture to national safety threshold (20% maximum)</p>
          </div>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> 100% Within Safe Fermentation Bounds
          </span>
        </div>

        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={moistureTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2c2c32" />
              <XAxis dataKey="batch" tick={{ fontSize: 11, fill: '#85858F' }} />
              <YAxis domain={[12, 22]} tick={{ fontSize: 11, fill: '#85858F' }} unit="%" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1c1c20', border: '1px solid #333', borderRadius: '10px' }}
                formatter={(val: any) => [`${val}%`, 'Moisture']}
              />
              <Bar dataKey="moisture" fill="#38BDF8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
