import { useState } from 'react';
import { ClipboardList, Shield, Lock, FileText, Download } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { useToast } from '../../contexts/NotificationContext';

export default function AdminAudit() {
  const { addToast } = useToast();

  const auditEvents = [
    { id: 'LOG-8841', action: 'BATCH_GENESIS_SEAL', actor: 'Rajesh Sharma (Beekeeper)', target: 'Batch HC-2026-001', hash: '0x8f3c...b219', timestamp: '2026-09-05 14:10:22 IST' },
    { id: 'LOG-8842', action: 'LAB_NMR_CERTIFY', actor: 'Dr. Neha Verma (NABL Lab)', target: 'Batch HC-2026-001', hash: '0x3a99...1e04', timestamp: '2026-09-05 15:45:11 IST' },
    { id: 'LOG-8843', action: 'COLD_CHAIN_DISPATCH', actor: 'Vikas Mehra (Distributor)', target: 'Shipment SHP-DEL-084', hash: '0x71dd...8f55', timestamp: '2026-09-05 16:20:00 IST' },
    { id: 'LOG-8844', action: 'RETAIL_HANDOVER_CONFIRM', actor: 'Store Mgr (Organic India)', target: 'Batch HC-2026-001', hash: '0x99bb...41a2', timestamp: '2026-09-05 18:05:44 IST' },
    { id: 'LOG-8845', action: 'CONSUMER_SCAN_RECEIPT', actor: 'Consumer Device App', target: 'Jar #8841-A', hash: '0x12c4...77e9', timestamp: '2026-09-05 18:32:19 IST' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Immutable Supply Chain Audit Trail"
        subtitle="Cryptographically verified action log of every blockchain state change & stakeholder transition"
        actions={
          <Button
            variant="outline"
            icon={<Download className="w-4 h-4" />}
            onClick={() => addToast('success', 'Audit Report Exported', 'CSV & Signed cryptographic manifest generated.')}
          >
            Export Compliance Manifest
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Audit Events" value="1,842 Events" icon={<ClipboardList className="w-5 h-5 text-honey-400" />} subtitle="Zero tampering" />
        <MetricCard label="Smart Contracts" value="4 Verified" icon={<Shield className="w-5 h-5 text-emerald-400" />} subtitle="ERC-721 DPP / Batch" />
        <MetricCard label="Consensus Signers" value="5 Quorum" icon={<Lock className="w-5 h-5 text-sky-400" />} subtitle="Federated governance" />
        <MetricCard label="Audit Period" value="365 Days" icon={<FileText className="w-5 h-5 text-purple-400" />} subtitle="Permanent on-chain store" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400 font-sans">
                <th className="py-3 px-3">Event Ref</th>
                <th className="py-3 px-3">Action Signature</th>
                <th className="py-3 px-3">Stakeholder Actor</th>
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Block Hash</th>
                <th className="py-3 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60 text-xs">
              {auditEvents.map(ev => (
                <tr key={ev.id} className="hover:bg-charcoal-800/30">
                  <td className="py-3.5 px-3 text-charcoal-400">{ev.id}</td>
                  <td className="py-3.5 px-3 text-honey-400 font-bold">{ev.action}</td>
                  <td className="py-3.5 px-3 text-white font-sans font-medium">{ev.actor}</td>
                  <td className="py-3.5 px-3 text-charcoal-300 font-sans">{ev.target}</td>
                  <td className="py-3.5 px-3 text-emerald-400">{ev.hash}</td>
                  <td className="py-3.5 px-3 text-charcoal-400 font-sans">{ev.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
