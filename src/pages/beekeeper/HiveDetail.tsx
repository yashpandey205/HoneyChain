import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Thermometer, Droplets, Weight, Activity, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Card from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { PageHeader, Tabs, Spinner } from '../../components/ui/index';
import Button from '../../components/ui/Button';
import { hiveService } from '../../services/hiveService';
import type { Hive, HiveReading } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function HiveDetail() {
  const { hiveId } = useParams<{ hiveId: string }>();
  const navigate = useNavigate();
  const [hive, setHive] = useState<Hive | null>(null);
  const [readings, setReadings] = useState<HiveReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartTab, setChartTab] = useState('temperature');

  useEffect(() => {
    if (!hiveId) return;
    Promise.all([
      hiveService.getHiveById(hiveId),
      hiveService.getHiveReadings(hiveId, 24),
    ]).then(([h, r]) => {
      setHive(h);
      setReadings(r);
      setLoading(false);
    });
  }, [hiveId]);

  if (loading) return <div className="flex items-center justify-center py-20"><Spinner size="lg" /></div>;
  if (!hive) return <div className="text-center py-20 text-charcoal-400">Hive not found</div>;

  const chartData = readings.map(r => ({
    time: new Date(r.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    temperature: r.temperature,
    humidity: r.humidity,
    weight: r.weight,
    activity: r.activity,
  }));

  const CHART_CONFIG: Record<string, { key: string; color: string; unit: string }> = {
    temperature: { key: 'temperature', color: '#F59E0B', unit: '°C' },
    humidity: { key: 'humidity', color: '#38BDF8', unit: '%' },
    weight: { key: 'weight', color: '#A78BFA', unit: 'kg' },
    activity: { key: 'activity', color: '#34D399', unit: '%' },
  };

  const cfg = CHART_CONFIG[chartTab];

  return (
    <>
      <PageHeader title={hive.name} subtitle={hive.location}
        breadcrumbs={[{ label: 'Hives', href: '/dashboard/hives' }, { label: hive.name }]}
        actions={<Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/dashboard/hives')}>Back</Button>} />

      {/* Info Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Thermometer, label: 'Temperature', value: `${hive.temperature}°C`, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { icon: Droplets, label: 'Humidity', value: `${hive.humidity}%`, color: 'text-sky-400', bg: 'bg-sky-500/10' },
          { icon: Weight, label: 'Weight', value: `${hive.weight} kg`, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { icon: Activity, label: 'Activity', value: `${hive.activity}%`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map(m => {
          const Icon = m.icon;
          return (
            <Card key={m.label}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${m.bg}`}><Icon className={`w-5 h-5 ${m.color}`} /></div>
                <div>
                  <p className="text-xs text-charcoal-500">{m.label}</p>
                  <p className="text-xl font-bold text-white">{m.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Details */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-white mb-4">Hive Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Status</span>
              <StatusBadge status={hive.healthStatus} size="sm" />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Hive ID</span>
              <span className="text-charcoal-200 font-mono text-xs">{hive.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Location</span>
              <span className="text-charcoal-200">{hive.location}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Installed</span>
              <span className="text-charcoal-200">{new Date(hive.installedAt).toLocaleDateString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Coordinates</span>
              <span className="text-charcoal-200 text-xs">{hive.latitude.toFixed(4)}, {hive.longitude.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Last Updated</span>
              <span className="text-charcoal-200 text-xs">{new Date(hive.lastUpdated).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </Card>

        {/* Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">24-Hour Readings</h3>
            <Tabs tabs={[
              { id: 'temperature', label: 'Temp' },
              { id: 'humidity', label: 'Humidity' },
              { id: 'weight', label: 'Weight' },
              { id: 'activity', label: 'Activity' },
            ]} activeTab={chartTab} onChange={setChartTab} />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`gradient-${chartTab}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={cfg.color} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={cfg.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#353539" />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#85858F' }} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: '#85858F' }} domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#232327', border: '1px solid #353539', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  labelStyle={{ color: '#85858F' }}
                  formatter={(value: any) => [`${value}${cfg.unit}`, chartTab.charAt(0).toUpperCase() + chartTab.slice(1)]}
                />
                <Area type="monotone" dataKey={cfg.key} stroke={cfg.color} fill={`url(#gradient-${chartTab})`} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  );
}
