import { useState } from 'react';
import { History as HistoryIcon, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { useNavigate } from 'react-router-dom';

export default function ConsumerHistory() {
  const navigate = useNavigate();

  const scanHistory = [
    { id: 'SCN-8812', batchId: 'HC-2026-001', floral: 'Kashmir Acacia Honey', date: '2026-09-04 14:22 IST', store: 'Organic India Flagship, Delhi', result: 'Authentic — 0 Adulteration' },
    { id: 'SCN-8745', batchId: 'HC-2026-002', floral: 'Himachal Wild Multifloral', date: '2026-08-30 18:10 IST', store: 'Nature Basket Gourmet, Mumbai', result: 'Authentic — 0 Adulteration' },
    { id: 'SCN-8690', batchId: 'HC-2026-003', floral: 'Sundarbans Mangrove Honey', date: '2026-08-18 11:45 IST', store: 'BioStore Hub, Bengaluru', result: 'Authentic — 0 Adulteration' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verification Scan Log & Activity"
        subtitle="Historical timestamps of your retail camera scans with authenticity verification results"
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400">
                <th className="py-3 px-3">Scan Ref</th>
                <th className="py-3 px-3">Batch ID</th>
                <th className="py-3 px-3">Floral Type</th>
                <th className="py-3 px-3">Retail Location</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Verdict</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {scanHistory.map(item => (
                <tr key={item.id} className="hover:bg-charcoal-800/30">
                  <td className="py-3.5 px-3 font-mono text-xs text-charcoal-400">{item.id}</td>
                  <td className="py-3.5 px-3 font-mono text-xs text-honey-400 font-semibold">{item.batchId}</td>
                  <td className="py-3.5 px-3 text-white font-medium">{item.floral}</td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-300">{item.store}</td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-400">{item.date}</td>
                  <td className="py-3.5 px-3 text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {item.result}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => navigate(`/trace/${item.batchId}`)}
                      className="text-xs text-honey-400 hover:text-honey-300 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      View <ExternalLink className="w-3 h-3" />
                    </button>
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
