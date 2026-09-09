import { useState } from 'react';
import { History as HistoryIcon, FileText, CheckCircle, Download, Calendar } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { useToast } from '../../contexts/NotificationContext';

export default function DistributorHistory() {
  const { addToast } = useToast();

  const historyRecords = [
    { id: 'BOL-2026-8801', date: '2026-08-28', route: 'Himachal Apiaries → Nature Basket Mumbai', cargo: '1,500 Jars Wildflower', status: 'Completed', compliance: '100% Temp Maintained' },
    { id: 'BOL-2026-8802', date: '2026-08-22', route: 'Kashmir Valley → Organic Delhi Connaught', cargo: '2,000 Jars Acacia', status: 'Completed', compliance: '100% Temp Maintained' },
    { id: 'BOL-2026-8803', date: '2026-08-15', route: 'Sundarbans Co-op → BioStore Bangalore', cargo: '800 Jars Mangrove', status: 'Completed', compliance: '99.8% Temp Maintained' },
    { id: 'BOL-2026-8804', date: '2026-08-08', route: 'Punjab Plains → Wellness Hub Chandigarh', cargo: '1,200 Jars Mustard Honey', status: 'Completed', compliance: '100% Temp Maintained' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Logistics Delivery Archive & Compliance Audit"
        subtitle="Immutable electronic proof-of-delivery (e-POD) and historical cold-chain audit trails"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Consignments" value="42 Trips" icon={<HistoryIcon className="w-5 h-5 text-honey-400" />} subtitle="Year-to-date" />
        <MetricCard label="Total Jars Dispatched" value="48,500" icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} subtitle="Zero transit loss" />
        <MetricCard label="Average Transit Time" value="18.4 Hours" icon={<Calendar className="w-5 h-5 text-sky-400" />} subtitle="Interstate cold reefer" />
        <MetricCard label="Audit Compliance" value="99.9%" icon={<FileText className="w-5 h-5 text-purple-400" />} subtitle="FSSAI transport rules" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400">
                <th className="py-3 px-3">e-POD Ref</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Transit Route</th>
                <th className="py-3 px-3">Cargo Volume</th>
                <th className="py-3 px-3">Cold Compliance</th>
                <th className="py-3 px-3">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {historyRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-charcoal-800/30">
                  <td className="py-3.5 px-3 font-mono text-xs text-honey-400 font-bold">{rec.id}</td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-400">{rec.date}</td>
                  <td className="py-3.5 px-3 text-white font-medium">{rec.route}</td>
                  <td className="py-3.5 px-3 text-charcoal-300">{rec.cargo}</td>
                  <td className="py-3.5 px-3 text-emerald-400 text-xs font-semibold">{rec.compliance}</td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => addToast('success', 'e-POD Downloaded', `Signed receipt for ${rec.id} downloaded.`)}
                      className="text-xs text-honey-400 hover:text-honey-300 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
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
