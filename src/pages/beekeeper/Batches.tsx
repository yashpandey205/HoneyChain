import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, QrCode, Search, ExternalLink, Send,
  CheckCircle, ArrowRight, ShieldCheck, Download, Copy
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { SearchBar, PageHeader, Tabs, Modal } from '../../components/ui/index';
import { batchService } from '../../services/batchService';
import { useToast } from '../../contexts/NotificationContext';
import type { HoneyBatch } from '../../types';

export default function BeekeeperBatches() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [batches, setBatches] = useState<HoneyBatch[]>([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [selectedQRBatch, setSelectedQRBatch] = useState<HoneyBatch | null>(null);

  useEffect(() => {
    batchService.getAllBatches().then(setBatches);
  }, []);

  const filtered = batches
    .filter(b => tab === 'all' || b.currentStage === tab)
    .filter(b => b.id.toLowerCase().includes(search.toLowerCase()) || b.floralSource.toLowerCase().includes(search.toLowerCase()));

  const handleDispatch = (batchId: string) => {
    addToast('success', 'Batch Dispatched', `Batch ${batchId} consigned to Kashmir Valley Processing Facility.`);
    setBatches(prev => prev.map(b => b.id === batchId ? { ...b, currentStage: 'processing' } : b));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('info', 'Copied to clipboard', text);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Honey Batch Management"
        subtitle="Manage origin-sealed honey batches, generate batch QR passports, and dispatch to processors"
        actions={
          <Button
            variant="outline"
            icon={<QrCode className="w-4 h-4" />}
            onClick={() => batches.length > 0 && setSelectedQRBatch(batches[0])}
          >
            Sample QR Passport
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by batch ID, floral type..."
          className="flex-1"
        />
        <Tabs
          tabs={[
            { id: 'all', label: 'All Batches', count: batches.length },
            { id: 'harvested', label: 'Harvested', count: batches.filter(b => b.currentStage === 'harvested').length },
            { id: 'processing', label: 'In Processing', count: batches.filter(b => b.currentStage === 'processing').length },
            { id: 'quality_testing', label: 'Testing', count: batches.filter(b => b.currentStage === 'quality_testing').length },
            { id: 'packaging', label: 'Packaging', count: batches.filter(b => b.currentStage === 'packaging').length },
          ]}
          activeTab={tab}
          onChange={setTab}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(batch => (
          <Card key={batch.id} className="flex flex-col justify-between hover:border-honey-500/40 transition-all group">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-400">BATCH IDENTIFIER</span>
                  <p className="text-base font-bold font-mono text-honey-400">{batch.id}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-honey-500/10 text-honey-400 border border-honey-500/30 capitalize">
                  {batch.currentStage.replace('_', ' ')}
                </span>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white group-hover:text-honey-400 transition-colors">
                  {batch.floralSource}
                </h4>
                <p className="text-xs text-charcoal-400">{batch.apiaryLocation}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-charcoal-950/60 border border-charcoal-800 text-center">
                <div>
                  <span className="text-[10px] text-charcoal-500">Yield</span>
                  <p className="text-xs font-bold text-white mt-0.5">{batch.quantityKg} kg</p>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-500">Moisture</span>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5">{batch.moistureContent}%</p>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-500">Purity</span>
                  <p className="text-xs font-bold text-honey-400 mt-0.5">{batch.purityScore}%</p>
                </div>
              </div>

              <div className="text-[11px] text-charcoal-500 space-y-1">
                <div className="flex justify-between">
                  <span>Harvest Date:</span>
                  <span className="text-charcoal-300">{batch.harvestDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ledger Hash:</span>
                  <button
                    onClick={() => copyToClipboard(batch.blockchainHash || '0x8f3c4d19e0b219')}
                    className="font-mono text-[10px] text-charcoal-400 hover:text-honey-400 flex items-center gap-1"
                  >
                    {(batch.blockchainHash || '0x8f3c4d19e0b219').slice(0, 8)}... <Copy className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-charcoal-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedQRBatch(batch)}
                className="p-2 rounded-xl bg-charcoal-800 hover:bg-honey-500/20 text-charcoal-300 hover:text-honey-400 border border-charcoal-700 transition-all cursor-pointer"
                title="View QR Passport"
              >
                <QrCode className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate(`/trace/${batch.id}`)}
                className="flex-1 py-2 px-3 rounded-xl bg-charcoal-800/80 hover:bg-charcoal-700 text-xs font-medium text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Live Trace</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {batch.currentStage === 'harvested' && (
                <button
                  onClick={() => handleDispatch(batch.id)}
                  className="py-2 px-3 rounded-xl bg-honey-500 hover:bg-honey-400 text-charcoal-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Dispatch to Processing Unit"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch</span>
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* QR Code Passport Modal */}
      <Modal
        isOpen={!!selectedQRBatch}
        onClose={() => setSelectedQRBatch(null)}
        title="Batch Digital Product Passport (DPP)"
        size="sm"
      >
        {selectedQRBatch && (
          <div className="flex flex-col items-center text-center space-y-4 py-2">
            <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-honey-500/20">
              <QRCodeSVG
                value={`https://honeychain.app/trace/${selectedQRBatch.id}`}
                size={180}
                level="H"
                includeMargin
              />
            </div>

            <div>
              <span className="text-xs font-mono text-honey-400 uppercase font-semibold">
                {selectedQRBatch.id}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                {selectedQRBatch.floralSource} Honey
              </h4>
              <p className="text-xs text-charcoal-400">
                {selectedQRBatch.apiaryLocation}
              </p>
            </div>

            <div className="p-3 w-full rounded-xl bg-charcoal-950 border border-charcoal-800 text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Blockchain Hash:</span>
                <span className="font-mono text-honey-400 text-[10px]">
                  {(selectedQRBatch.blockchainHash || '0x8f3c4d19e0b219').slice(0, 14)}...
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Purity Verification:</span>
                <span className="text-emerald-400 font-medium">Authentic Raw Honey</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Target Consumer URL:</span>
                <span className="font-mono text-charcoal-400 text-[10px]">
                  /trace/{selectedQRBatch.id}
                </span>
              </div>
            </div>

            <div className="flex w-full gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                icon={<Copy className="w-3.5 h-3.5" />}
                onClick={() => copyToClipboard(`https://honeychain.app/trace/${selectedQRBatch.id}`)}
              >
                Copy Link
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => navigate(`/trace/${selectedQRBatch.id}`)}
              >
                Open Trace
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
