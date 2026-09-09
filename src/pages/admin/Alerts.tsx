import { useState, useEffect } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle, ShieldAlert } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, Tabs } from '../../components/ui/index';
import { mockAlerts } from '../../data/mockData';
import { useToast } from '../../contexts/NotificationContext';

export default function AdminAlerts() {
  const { addToast } = useToast();
  const [alerts, setAlerts] = useState(mockAlerts);
  const [tab, setTab] = useState('all');

  const filtered = alerts.filter(a => tab === 'all' || a.status === tab);

  const handleResolve = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
    addToast('success', 'Alert Resolved', `Ecosystem incident ${id} marked resolved.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ecosystem Incident & Fraud Alert Center"
        subtitle="Network-wide anomalies, cold-chain threshold triggers & unauthorized scan flags"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Active Incidents" value={alerts.filter(a => a.status === 'active').length} icon={<AlertCircle className="w-5 h-5 text-red-400" />} subtitle="Requiring attention" />
        <MetricCard label="Resolved This Week" value="14 Events" icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} subtitle="SLA 1.2 hrs" />
        <MetricCard label="Sensor Anomaly Rate" value="0.4%" icon={<AlertTriangle className="w-5 h-5 text-amber-400" />} subtitle="Hardware variance" />
        <MetricCard label="Fraud Intercepts" value="3 Total" icon={<ShieldAlert className="w-5 h-5 text-purple-400" />} subtitle="Pre-retail flagged" />
      </div>

      <Tabs
        tabs={[
          { id: 'all', label: 'All Incidents', count: alerts.length },
          { id: 'active', label: 'Active', count: alerts.filter(a => a.status === 'active').length },
          { id: 'resolved', label: 'Resolved', count: alerts.filter(a => a.status === 'resolved').length },
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      <div className="space-y-4">
        {filtered.map(alert => (
          <Card key={alert.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  alert.severity === 'critical' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                  alert.severity === 'warning' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                  'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                }`}>
                  {alert.severity}
                </span>
                <span className="font-mono text-xs text-charcoal-400">{alert.id}</span>
                <span className="text-xs text-charcoal-500">{alert.createdAt?.split('T')[0] || 'Today'}</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{alert.hiveName} — {alert.type}</h4>
              <p className="text-xs text-charcoal-400">{alert.message}</p>
            </div>

            <div className="shrink-0">
              {alert.status === 'active' ? (
                <Button variant="primary" size="sm" onClick={() => handleResolve(alert.id)}>
                  Resolve Incident
                </Button>
              ) : (
                <span className="text-xs text-emerald-400 font-medium">✓ Resolved</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
