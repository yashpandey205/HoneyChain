import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCheck, Package, QrCode, Truck, ExternalLink,
  ShieldCheck, ArrowRight, Download, Barcode
} from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { batchService } from '../../services/batchService';
import { useToast } from '../../contexts/NotificationContext';
import type { HoneyBatch } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function Completed() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [batches, setBatches] = useState<HoneyBatch[]>([]);

  useEffect(() => {
    batchService.getAllBatches().then(data => {
      setBatches(data.filter(b => ['packaging', 'distribution', 'delivered'].includes(b.currentStage)));
    });
  }, []);

  const handleDispatchToDistributor = (batchId: string) => {
    addToast('success', 'Handed over to Cold-Chain Distributor', `Batch ${batchId} released for retail transit.`);
    setBatches(prev => prev.map(b => b.id === batchId ? { ...b, currentStage: 'distribution' } : b));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Packaged & Distribution-Ready Inventory"
        subtitle="Final tamper-evident bottled jars, serialized QR passports & distributor consignment handover"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Bottled Inventory"
          value="4,820 Jars"
          icon={<Package className="w-5 h-5 text-honey-400" />}
          subtitle="250g & 500g glass jars"
        />
        <MetricCard
          label="Tamper-Seal Status"
          value="100% Intact"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          subtitle="Serialized QR holographic labels"
        />
        <MetricCard
          label="Awaiting Distributor"
          value={batches.filter(b => b.currentStage === 'packaging').length}
          icon={<Truck className="w-5 h-5 text-sky-400" />}
          subtitle="Ready for pickup dock"
        />
        <MetricCard
          label="Dispatched Batches"
          value={batches.filter(b => b.currentStage === 'distribution' || b.currentStage === 'delivered').length}
          icon={<CheckCheck className="w-5 h-5 text-purple-400" />}
          subtitle="In retail supply chain"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {batches.map(batch => (
          <Card key={batch.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-honey-400 font-bold">{batch.id}</span>
                <h4 className="text-base font-semibold text-white mt-1">{batch.floralSource} Pure Honey</h4>
                <p className="text-xs text-charcoal-400">Total Yield: {batch.quantityKg ?? batch.quantity ?? 250} kg ({(batch.quantityKg ?? batch.quantity ?? 250) * 2} x 500g Jars)</p>
              </div>
              <Badge variant={batch.currentStage === 'distribution' ? 'sky' : 'emerald'} size="sm">
                {batch.currentStage === 'distribution' ? 'In Transit' : 'Ready for Dispatch'}
              </Badge>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Quality Certificate:</span>
                <span className="text-emerald-400 font-medium">Grade A Verified (99.8%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Packaging Format:</span>
                <span className="text-white">Food-grade UV protective amber glass</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Blockchain DPP QR:</span>
                <span className="text-honey-400 font-mono">Generated & Synced</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => navigate(`/trace/${batch.id}`)}
              >
                Inspect Trace
              </Button>

              {batch.currentStage === 'packaging' && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  icon={<Truck className="w-3.5 h-3.5" />}
                  onClick={() => handleDispatchToDistributor(batch.id)}
                >
                  Handover to Logistics
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
