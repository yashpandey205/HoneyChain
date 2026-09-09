import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Thermometer, Droplets, Weight, Activity, AlertTriangle, Package, TrendingUp, Plus } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge, { StatusBadge } from '../../components/ui/Badge';
import { PageHeader, CardSkeleton } from '../../components/ui/index';
import { hiveService } from '../../services/hiveService';
import { analyticsService } from '../../services/analyticsService';
import { batchService } from '../../services/batchService';
import type { Hive, HoneyBatch, AnalyticsMetric, Alert } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function BeekeeperOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AnalyticsMetric[]>([]);
  const [hives, setHives] = useState<Hive[]>([]);
  const [batches, setBatches] = useState<HoneyBatch[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [s, h, b, a] = await Promise.all([
        analyticsService.getBeekeeperStats('bk1'),
        hiveService.getHivesByBeekeeper('bk1'),
        batchService.getBatchesByBeekeeper('bk1'),
        hiveService.getAlerts(),
      ]);
      setStats(s);
      setHives(h);
      setBatches(b);
      setAlerts(a.filter(al => al.status === 'active'));
    } finally {
      setLoading(false);
    }
  }

  const healthSummary = hiveService.getHealthSummary(hives);
  const STAT_ICONS = [Hexagon, Activity, Package, TrendingUp];

  return (
    <>
      <PageHeader title="Beekeeper Dashboard" subtitle="Welcome back, Rajesh · Sharma Apiaries"
        actions={<Button icon={<Plus className="w-4 h-4" />} onClick={() => navigate('/dashboard/batches')}>New Batch</Button>} />

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <MetricCard key={stat.label} label={stat.label}
                  value={stat.value.toLocaleString()}
                  suffix={stat.label.includes('Production') ? 'kg' : undefined}
                  change={stat.change} trend={stat.trend}
                  icon={<Icon className="w-5 h-5" />} />
              );
            })}
          </div>

          {/* Secondary metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card hover>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10"><Thermometer className="w-4 h-4 text-amber-400" /></div>
                <div>
                  <p className="text-xs text-charcoal-500">Avg Temperature</p>
                  <p className="text-lg font-bold text-white">{healthSummary.avgTemperature}°C</p>
                </div>
              </div>
            </Card>
            <Card hover>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10"><Droplets className="w-4 h-4 text-sky-400" /></div>
                <div>
                  <p className="text-xs text-charcoal-500">Avg Humidity</p>
                  <p className="text-lg font-bold text-white">{healthSummary.avgHumidity}%</p>
                </div>
              </div>
            </Card>
            <Card hover>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/10"><Weight className="w-4 h-4 text-violet-400" /></div>
                <div>
                  <p className="text-xs text-charcoal-500">Avg Hive Weight</p>
                  <p className="text-lg font-bold text-white">{healthSummary.avgWeight} kg</p>
                </div>
              </div>
            </Card>
            <Card hover>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10"><Activity className="w-4 h-4 text-emerald-400" /></div>
                <div>
                  <p className="text-xs text-charcoal-500">Avg Bee Activity</p>
                  <p className="text-lg font-bold text-white">{healthSummary.avgActivity}%</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Alerts */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Active Alerts
                {alerts.length > 0 && <Badge variant="red" size="sm">{alerts.length}</Badge>}
              </h3>
              <div className="space-y-3">
                {alerts.slice(0, 3).map(alert => (
                  <Card key={alert.id} hover className="cursor-pointer" onClick={() => navigate('/dashboard/alerts')}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0
                        ${alert.severity === 'critical' ? 'bg-red-400' : alert.severity === 'warning' ? 'bg-amber-400' : 'bg-sky-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-white truncate">{alert.hiveName}</p>
                          <StatusBadge status={alert.severity as any} size="sm" />
                        </div>
                        <p className="text-[11px] text-charcoal-400 mt-0.5 line-clamp-2">{alert.message}</p>
                        <p className="text-[10px] text-charcoal-600 mt-1">{new Date(alert.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  </Card>
                ))}
                {alerts.length === 0 && (
                  <Card><p className="text-sm text-charcoal-500 text-center py-4">No active alerts</p></Card>
                )}
              </div>
            </div>

            {/* Recent Hives */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Hexagon className="w-4 h-4 text-honey-400" /> Hive Status
                </h3>
                <button onClick={() => navigate('/dashboard/hives')} className="text-xs text-honey-400 hover:text-honey-300 cursor-pointer">View All →</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {hives.slice(0, 4).map(hive => (
                  <Card key={hive.id} hover className="cursor-pointer" onClick={() => navigate(`/dashboard/hives/${hive.id}`)}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{hive.name}</p>
                        <p className="text-[11px] text-charcoal-500">{hive.location}</p>
                      </div>
                      <StatusBadge status={hive.healthStatus} size="sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="text-center py-1.5 rounded-lg bg-charcoal-800/40">
                        <p className="text-[10px] text-charcoal-500">Temp</p>
                        <p className="text-xs font-semibold text-white">{hive.temperature}°C</p>
                      </div>
                      <div className="text-center py-1.5 rounded-lg bg-charcoal-800/40">
                        <p className="text-[10px] text-charcoal-500">Humidity</p>
                        <p className="text-xs font-semibold text-white">{hive.humidity}%</p>
                      </div>
                      <div className="text-center py-1.5 rounded-lg bg-charcoal-800/40">
                        <p className="text-[10px] text-charcoal-500">Weight</p>
                        <p className="text-xs font-semibold text-white">{hive.weight} kg</p>
                      </div>
                      <div className="text-center py-1.5 rounded-lg bg-charcoal-800/40">
                        <p className="text-[10px] text-charcoal-500">Activity</p>
                        <p className="text-xs font-semibold text-white">{hive.activity}%</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Batches */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-honey-400" /> Recent Honey Batches
              </h3>
              <button onClick={() => navigate('/dashboard/batches')} className="text-xs text-honey-400 hover:text-honey-300 cursor-pointer">View All →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-charcoal-700/30">
                    <th className="text-left py-3 px-4 text-xs text-charcoal-500 uppercase tracking-wider font-medium">Batch ID</th>
                    <th className="text-left py-3 px-4 text-xs text-charcoal-500 uppercase tracking-wider font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-xs text-charcoal-500 uppercase tracking-wider font-medium hidden sm:table-cell">Quantity</th>
                    <th className="text-left py-3 px-4 text-xs text-charcoal-500 uppercase tracking-wider font-medium">Stage</th>
                    <th className="text-left py-3 px-4 text-xs text-charcoal-500 uppercase tracking-wider font-medium hidden md:table-cell">Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map(batch => (
                    <tr key={batch.id} className="border-b border-charcoal-800/30 hover:bg-charcoal-800/20 cursor-pointer transition-colors"
                      onClick={() => navigate(`/batch/${batch.batchId}`)}>
                      <td className="py-3 px-4 font-mono text-xs text-honey-400">{batch.batchId}</td>
                      <td className="py-3 px-4 text-charcoal-200">{batch.honeyType}</td>
                      <td className="py-3 px-4 text-charcoal-300 hidden sm:table-cell">{batch.quantity} kg</td>
                      <td className="py-3 px-4"><Badge variant="honey" size="sm">{batch.currentStage.replace(/_/g, ' ')}</Badge></td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <StatusBadge status={batch.qualityStatus === 'passed' ? 'verified' : 'pending'} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
