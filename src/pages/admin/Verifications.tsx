import { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle, Search, MapPin, QrCode } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';

export default function AdminVerifications() {
  const verifications = [
    { id: 'VRF-9901', batchId: 'HC-2026-001', location: 'Connaught Place, New Delhi', status: 'Authentic', time: '12 mins ago', ip: '103.21.24.12' },
    { id: 'VRF-9902', batchId: 'HC-2026-002', location: 'Bandra, Mumbai', status: 'Authentic', time: '28 mins ago', ip: '115.112.98.5' },
    { id: 'VRF-9903', batchId: 'HC-FAKE-881', location: 'Chandni Chowk, Delhi', status: 'Counterfeit Attempt', time: '1 hour ago', ip: '49.36.120.88' },
    { id: 'VRF-9904', batchId: 'HC-2026-003', location: 'Indiranagar, Bengaluru', status: 'Authentic', time: '2 hours ago', ip: '122.179.45.10' },
    { id: 'VRF-9905', batchId: 'HC-2026-001', location: 'Salt Lake, Kolkata', status: 'Authentic', time: '3 hours ago', ip: '182.73.11.90' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Consumer Scan Verification & Anti-Counterfeit Radar"
        subtitle="Live telemetry of retail QR scans, geographical heatmaps & counterfeit interception alerts"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Scans (30d)" value="3,480 Scans" icon={<QrCode className="w-5 h-5 text-honey-400" />} subtitle="Active consumer checks" />
        <MetricCard label="Authentic Verdicts" value="99.7%" icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} subtitle="Valid cryptographic proofs" />
        <MetricCard label="Counterfeit Flags" value="3 Flagged" icon={<ShieldAlert className="w-5 h-5 text-red-400" />} subtitle="Unauthorized batch codes" />
        <MetricCard label="Scan Response Time" value="210 ms" icon={<Shield className="w-5 h-5 text-purple-400" />} subtitle="Edge CDN verification" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400">
                <th className="py-3 px-3">Verification ID</th>
                <th className="py-3 px-3">Batch Scanned</th>
                <th className="py-3 px-3">Scan Geo-Location</th>
                <th className="py-3 px-3">Client Hash/IP</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {verifications.map(v => (
                <tr key={v.id} className="hover:bg-charcoal-800/30">
                  <td className="py-3.5 px-3 font-mono text-xs text-charcoal-400">{v.id}</td>
                  <td className="py-3.5 px-3 font-mono text-xs text-honey-400 font-bold">{v.batchId}</td>
                  <td className="py-3.5 px-3 text-white text-xs">{v.location}</td>
                  <td className="py-3.5 px-3 font-mono text-xs text-charcoal-500">{v.ip}</td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-400">{v.time}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      v.status === 'Authentic'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/40 animate-pulse'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
