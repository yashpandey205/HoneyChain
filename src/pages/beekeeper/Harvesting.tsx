import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Scissors, Plus, CheckCircle, Package, Hexagon,
  Calendar, Droplet, Award, ShieldAlert, ArrowRight, Sparkles
} from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, Modal } from '../../components/ui/index';
import { hiveService } from '../../services/hiveService';
import { batchService } from '../../services/batchService';
import { useToast } from '../../contexts/NotificationContext';
import type { Hive, HoneyBatch } from '../../types';

export default function Harvesting() {
  const { addToast } = useToast();
  const [hives, setHives] = useState<Hive[]>([]);
  const [batches, setBatches] = useState<HoneyBatch[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [selectedHiveId, setSelectedHiveId] = useState('');
  const [floralSource, setFloralSource] = useState('Kashmir Acacia');
  const [quantityKg, setQuantityKg] = useState<number>(45);
  const [moistureContent, setMoistureContent] = useState<number>(18.2);
  const [notes, setNotes] = useState('Clean comb uncapping, fully sealed honey frames, zero smoke odor.');

  useEffect(() => {
    Promise.all([
      hiveService.getAllHives(),
      batchService.getAllBatches(),
    ]).then(([h, b]) => {
      setHives(h);
      setBatches(b);
      if (h.length > 0) setSelectedHiveId(h[0].id);
    });
  }, []);

  const totalHarvestedKg = batches.reduce((acc, b) => acc + (b.quantityKg ?? b.quantity ?? 0), 0);

  const handleRegisterHarvest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const selectedHive = hives.find(h => h.id === selectedHiveId);
      const newBatchId = `HC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      await new Promise(r => setTimeout(r, 900));

      const newBatch: HoneyBatch = {
        id: newBatchId,
        batchId: newBatchId,
        honeyType: 'Raw ' + floralSource,
        origin: selectedHive ? selectedHive.location : 'Solan, Himachal Pradesh',
        state: 'Himachal Pradesh',
        beekeeperId: 'bk1',
        beekeeperName: 'Rajesh Sharma',
        processingFacility: 'Pending Handover',
        packagingDate: '',
        quantity: quantityKg,
        quantityKg,
        qualityStatus: 'pending',
        blockchainStatus: 'recorded',
        qualityScore: moistureContent <= 19 ? 99 : 95,
        apiaryLocation: selectedHive ? selectedHive.location : 'Solan, Himachal Pradesh',
        hiveIds: [selectedHiveId],
        floralSource,
        harvestDate: new Date().toISOString().split('T')[0],
        moistureContent,
        purityScore: moistureContent <= 19 ? 99.2 : 95.0,
        currentStage: 'harvested',
        blockchainHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        blockchainTxId: `tx_harv_${Date.now()}`,
        qrCodeUrl: `https://honeychain.app/trace/${newBatchId}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setBatches(prev => [newBatch, ...prev]);
      setIsModalOpen(false);
      addToast('success', 'Harvest Logged on Blockchain', `Batch ${newBatchId} registered with proof hash.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Harvest Logging & Yield Registry"
        subtitle="Record raw comb extractions, lab refractometer moisture, and anchor batch genesis to the ledger"
        actions={
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Log New Harvest
          </Button>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Yield Registered"
          value={`${totalHarvestedKg.toLocaleString()} kg`}
          change={18.4}
          trend="up"
          icon={<Scissors className="w-5 h-5 text-honey-400" />}
          subtitle="Cumulative verified harvest"
        />
        <MetricCard
          label="Avg. Refractometer Moisture"
          value="18.1%"
          change={-0.6}
          trend="down"
          icon={<Droplet className="w-5 h-5 text-sky-400" />}
          subtitle="FSSAI standard: ≤ 20.0%"
        />
        <MetricCard
          label="Registered Batches"
          value={batches.length}
          change={12.0}
          trend="up"
          icon={<Package className="w-5 h-5 text-emerald-400" />}
          subtitle="All sealed on testnet ledger"
        />
        <MetricCard
          label="Grade A Yield Ratio"
          value="98.5%"
          change={2.1}
          trend="up"
          icon={<Award className="w-5 h-5 text-purple-400" />}
          subtitle="Export & premium standard"
        />
      </div>

      {/* Harvest Log Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Harvest Records & Genesis Hashes</h3>
            <p className="text-xs text-charcoal-400">Batches ready for dispatch to regional processing facilities</p>
          </div>
          <Badge variant="honey" size="sm">FSSAI Certified Apiary</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400">
                <th className="py-3 px-3">Batch ID</th>
                <th className="py-3 px-3">Floral Source</th>
                <th className="py-3 px-3">Harvest Date</th>
                <th className="py-3 px-3">Quantity</th>
                <th className="py-3 px-3">Moisture</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Genesis Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-charcoal-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-xs text-honey-400 font-semibold">
                    {batch.id}
                  </td>
                  <td className="py-3.5 px-3 text-white font-medium">
                    {batch.floralSource}
                  </td>
                  <td className="py-3.5 px-3 text-charcoal-400 text-xs">
                    {batch.harvestDate}
                  </td>
                  <td className="py-3.5 px-3 text-white font-semibold">
                    {batch.quantityKg ?? batch.quantity ?? 0} kg
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      (batch.moistureContent ?? 18) <= 18.5 ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {batch.moistureContent ?? 18.2}%
                      {(batch.moistureContent ?? 18) <= 18.5 && <CheckCircle className="w-3 h-3" />}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-honey-500/15 text-honey-400 border border-honey-500/30 capitalize">
                      {batch.currentStage.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono text-[11px] text-charcoal-500 hover:text-honey-400 transition-colors cursor-pointer" title={batch.blockchainHash || '0x'}>
                      {(batch.blockchainHash || '0x8f3c4d19e0b219').slice(0, 10)}...{(batch.blockchainHash || '0x8f3c4d19e0b219').slice(-6)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal to Log Harvest */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register New Honey Extraction"
        size="md"
      >
        <form onSubmit={handleRegisterHarvest} className="space-y-4">
          <div className="p-3 rounded-xl bg-honey-500/10 border border-honey-500/20 text-xs text-honey-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-honey-400 shrink-0 mt-0.5" />
            <p>
              Submitting creates a genesis block transaction on HoneyChain, generating a cryptographic hash signed with your Beekeeper credential.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-300 mb-1.5">Source Hive</label>
            <select
              value={selectedHiveId}
              onChange={e => setSelectedHiveId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white focus:border-honey-500 outline-none"
              required
            >
              {hives.map(hive => (
                <option key={hive.id} value={hive.id}>
                  {hive.name} — {hive.location}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-300 mb-1.5">Floral Nectar Origin</label>
              <select
                value={floralSource}
                onChange={e => setFloralSource(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white focus:border-honey-500 outline-none"
              >
                <option value="Kashmir Acacia">Kashmir Acacia</option>
                <option value="Himachal Wild Multifloral">Himachal Wild Multifloral</option>
                <option value="Sundarbans Mangrove">Sundarbans Mangrove</option>
                <option value="Mustard Blossom">Mustard Blossom</option>
                <option value="Eucalyptus Monofloral">Eucalyptus Monofloral</option>
                <option value="Jamun Berry Nectar">Jamun Berry Nectar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-300 mb-1.5">Extracted Yield (kg)</label>
              <input
                type="number"
                step="0.5"
                min="5"
                max="500"
                value={quantityKg}
                onChange={e => setQuantityKg(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white focus:border-honey-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-300 mb-1.5">Refractometer Moisture (%)</label>
              <input
                type="number"
                step="0.1"
                min="14"
                max="25"
                value={moistureContent}
                onChange={e => setMoistureContent(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white focus:border-honey-500 outline-none"
                required
              />
              <p className="text-[10px] text-charcoal-400 mt-1">Target: &lt; 19% for raw stability</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-300 mb-1.5">Harvest Date</label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white focus:border-honey-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-300 mb-1.5">Extraction Protocol Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-charcoal-800 border border-charcoal-700 rounded-xl text-xs text-white focus:border-honey-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-charcoal-800">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={submitting}>
              Seal on Blockchain
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
