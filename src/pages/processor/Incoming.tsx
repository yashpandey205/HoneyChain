import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownToLine, CheckCircle, Clock, Search,
  AlertTriangle, FlaskConical, Scale, ShieldCheck, QrCode
} from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { SearchBar, PageHeader, Tabs } from '../../components/ui/index';
import { batchService } from '../../services/batchService';
import { useToast } from '../../contexts/NotificationContext';
import type { HoneyBatch } from '../../types';

export default function ProcessorIncoming() {
  const { addToast } = useToast();
  const [batches, setBatches] = useState<HoneyBatch[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    batchService.getAllBatches().then(data => {
      setBatches(data);
      setLoading(false);
    });
  }, []);

  const incomingBatches = batches.filter(b => b.currentStage === 'harvested' || b.currentStage === 'processing');

  const filtered = incomingBatches.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.beekeeperName.toLowerCase().includes(search.toLowerCase()) ||
    b.floralSource.toLowerCase().includes(search.toLowerCase())
  );

  const handleIntakeAccept = (batchId: string) => {
    addToast('success', 'Intake Approved', `Batch ${batchId} verified and transferred to micro-filtration unit.`);
    setBatches(prev => prev.map(b => b.id === batchId ? { ...b, currentStage: 'processing' } : b));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incoming Raw Consignments"
        subtitle="Intake verification, weight reconciliation, and raw honey acceptance from registered beekeepers"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Pending Intake"
          value={incomingBatches.filter(b => b.currentStage === 'harvested').length}
          icon={<ArrowDownToLine className="w-5 h-5 text-honey-400" />}
          subtitle="Waiting for dock inspection"
        />
        <MetricCard
          label="In Active Filtration"
          value={incomingBatches.filter(b => b.currentStage === 'processing').length}
          icon={<FlaskConical className="w-5 h-5 text-sky-400" />}
          subtitle="Cold extraction line"
        />
        <MetricCard
          label="Avg. Refractometer Intake"
          value="18.3%"
          icon={<Scale className="w-5 h-5 text-emerald-400" />}
          subtitle="Moisture verification check"
        />
        <MetricCard
          label="Apiary Chain Authenticity"
          value="100%"
          icon={<ShieldCheck className="w-5 h-5 text-purple-400" />}
          subtitle="All cryptographically sealed"
        />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Filter by batch ID, beekeeper, or floral type..."
      />

      <div className="space-y-4">
        {filtered.map(batch => (
          <Card key={batch.id} className="hover:border-honey-500/40 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold font-mono text-honey-400">{batch.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-honey-500/10 text-honey-400 border border-honey-500/30 capitalize">
                    {batch.currentStage === 'harvested' ? 'Awaiting Intake Inspection' : 'In Processing'}
                  </span>
                  <span className="text-xs text-charcoal-400">Harvest: {batch.harvestDate}</span>
                </div>
                <h4 className="text-base font-semibold text-white">
                  {batch.floralSource} · {batch.quantityKg ?? batch.quantity ?? 250} kg
                </h4>
                <p className="text-xs text-charcoal-400">
                  Consigned by: <strong className="text-charcoal-200">{batch.beekeeperName}</strong> · Apiary: {batch.apiaryLocation ?? batch.origin ?? 'Solan, HP'}
                </p>
                <div className="flex items-center gap-4 text-xs pt-1">
                  <span className="text-charcoal-400">
                    Moisture Test: <strong className="text-emerald-400">{batch.moistureContent ?? 18.2}%</strong>
                  </span>
                  <span className="text-charcoal-400">
                    Calculated Purity: <strong className="text-honey-400">{batch.purityScore ?? batch.qualityScore ?? 98}%</strong>
                  </span>
                  <span className="font-mono text-[10px] text-charcoal-500">
                    Hash: {(batch.blockchainHash || '0x8f3c4d19e0b219').slice(0, 12)}...
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {batch.currentStage === 'harvested' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<CheckCircle className="w-4 h-4" />}
                    onClick={() => handleIntakeAccept(batch.id)}
                  >
                    Accept & Begin Processing
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<FlaskConical className="w-4 h-4" />}
                  >
                    Send to Lab Test
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
