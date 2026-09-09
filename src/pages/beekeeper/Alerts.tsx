import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Hexagon, Clock, Lightbulb } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge, { StatusBadge } from '../../components/ui/Badge';
import { PageHeader, Tabs, CardSkeleton } from '../../components/ui/index';
import { hiveService } from '../../services/hiveService';
import { useToast } from '../../contexts/NotificationContext';
import type { Alert } from '../../types';

const SEVERITY_ICON = { critical: AlertCircle, warning: AlertTriangle, info: Info };
const SEVERITY_COLOR = { critical: 'text-red-400', warning: 'text-amber-400', info: 'text-sky-400' };
const SEVERITY_BG = { critical: 'bg-red-500/10', warning: 'bg-amber-500/10', info: 'bg-sky-500/10' };

export default function Alerts() {
  const { addToast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    hiveService.getAlerts().then(a => { setAlerts(a); setLoading(false); });
  }, []);

  const active = alerts.filter(a => a.status === 'active');
  const resolved = alerts.filter(a => a.status === 'resolved');

  const tabs = [
    { id: 'all', label: 'All Alerts', count: alerts.length },
    { id: 'active', label: 'Active', count: active.length },
    { id: 'resolved', label: 'Resolved', count: resolved.length },
  ];

  const filtered = tab === 'all' ? alerts : tab === 'active' ? active : resolved;

  const handleAcknowledge = async (id: string) => {
    await hiveService.acknowledgeAlert(id);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'acknowledged' } : a));
    addToast('info', 'Alert Acknowledged');
  };

  const handleResolve = async (id: string) => {
    await hiveService.resolveAlert(id);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    addToast('success', 'Alert Resolved');
  };

  return (
    <>
      <PageHeader
        title="Smart Hive Insights"
        subtitle="AI-powered monitoring alerts and recommendations"
        actions={<Badge variant="amber" size="sm">AI Prototype / Demo Prediction</Badge>}
      />

      {/* Disclaimer */}
      <div className="card p-4 mb-6 border-amber-500/20">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-400">AI Prototype — Demo Predictions</p>
            <p className="text-xs text-charcoal-400 mt-0.5">
              These insights are generated from demo sensor data for demonstration purposes. They do NOT represent actual disease diagnosis or veterinary advice.
            </p>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      <div className="mt-6 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          filtered.map((alert, i) => {
            const SeverityIcon = SEVERITY_ICON[alert.severity];
            return (
              <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`border-l-4 ${alert.severity === 'critical' ? 'border-l-red-500' : alert.severity === 'warning' ? 'border-l-amber-500' : 'border-l-sky-500'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={`p-3 rounded-xl ${SEVERITY_BG[alert.severity]} shrink-0`}>
                      <SeverityIcon className={`w-6 h-6 ${SEVERITY_COLOR[alert.severity]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <StatusBadge status={alert.severity as any} size="sm" />
                        <StatusBadge status={alert.status as any} size="sm" />
                        <Badge variant="default" size="sm">{alert.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hexagon className="w-3.5 h-3.5 text-honey-400" />
                        <span className="text-sm font-semibold text-white">{alert.hiveName}</span>
                        <span className="text-[10px] text-charcoal-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(alert.createdAt).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal-300">{alert.message}</p>
                      <div className="mt-3 p-3 rounded-lg bg-charcoal-800/40">
                        <p className="text-[10px] text-charcoal-500 uppercase tracking-wider font-medium mb-1">Recommendation</p>
                        <p className="text-xs text-charcoal-300">{alert.recommendation}</p>
                      </div>
                      {alert.status === 'active' && (
                        <div className="flex gap-2 mt-3">
                          <Button variant="secondary" size="sm" onClick={() => handleAcknowledge(alert.id)}>Acknowledge</Button>
                          <Button variant="ghost" size="sm" onClick={() => handleResolve(alert.id)}>Resolve</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <p className="text-charcoal-400">No alerts in this category.</p>
          </div>
        )}
      </div>
    </>
  );
}
