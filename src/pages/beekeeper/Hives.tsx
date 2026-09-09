import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hexagon, Search, Filter, Thermometer, Droplets, Weight, Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import { SearchBar, PageHeader, Tabs, CardSkeleton } from '../../components/ui/index';
import { hiveService } from '../../services/hiveService';
import type { Hive } from '../../types';

export default function Hives() {
  const navigate = useNavigate();
  const [hives, setHives] = useState<Hive[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    hiveService.getAllHives().then(h => { setHives(h); setLoading(false); });
  }, []);

  const filtered = hives
    .filter(h => statusFilter === 'all' || h.healthStatus === statusFilter)
    .filter(h => h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()));

  const tabs = [
    { id: 'all', label: 'All', count: hives.length },
    { id: 'healthy', label: 'Healthy', count: hives.filter(h => h.healthStatus === 'healthy').length },
    { id: 'warning', label: 'Warning', count: hives.filter(h => h.healthStatus === 'warning').length },
    { id: 'critical', label: 'Critical', count: hives.filter(h => h.healthStatus === 'critical').length },
  ];

  return (
    <>
      <PageHeader title="My Hives" subtitle="Monitor and manage all your bee hives" />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search hives..." className="flex-1" />
        <Tabs tabs={tabs} activeTab={statusFilter} onChange={setStatusFilter} />
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((hive, i) => (
            <motion.div key={hive.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card hover className="cursor-pointer" onClick={() => navigate(`/dashboard/hives/${hive.id}`)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-honey-500/10">
                      <Hexagon className="w-4 h-4 text-honey-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{hive.name}</p>
                      <p className="text-[11px] text-charcoal-500">{hive.location}</p>
                    </div>
                  </div>
                  <StatusBadge status={hive.healthStatus} size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: Thermometer, label: 'Temp', value: `${hive.temperature}°C`, color: hive.temperature > 37 ? 'text-amber-400' : 'text-charcoal-300' },
                    { icon: Droplets, label: 'Humidity', value: `${hive.humidity}%`, color: hive.humidity > 75 ? 'text-amber-400' : 'text-charcoal-300' },
                    { icon: Weight, label: 'Weight', value: `${hive.weight} kg`, color: 'text-charcoal-300' },
                    { icon: Activity, label: 'Activity', value: `${hive.activity}%`, color: hive.activity < 30 ? 'text-red-400' : 'text-charcoal-300' },
                  ].map(metric => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="flex items-center gap-2 py-2 px-2.5 rounded-lg bg-charcoal-800/40">
                        <Icon className="w-3.5 h-3.5 text-charcoal-500" />
                        <div>
                          <p className="text-[9px] text-charcoal-500">{metric.label}</p>
                          <p className={`text-xs font-semibold ${metric.color}`}>{metric.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] text-charcoal-600 mt-3">
                  Updated {new Date(hive.lastUpdated).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-charcoal-500">No hives match your filters.</p>
        </div>
      )}
    </>
  );
}
