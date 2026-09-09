import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, SearchBar, Tabs } from '../../components/ui/index';
import { batchService } from '../../services/batchService';
import type { HoneyBatch } from '../../types';

export default function AdminBatches() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState<HoneyBatch[]>([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');

  useEffect(() => {
    batchService.getAllBatches().then(setBatches);
  }, []);

  const filtered = batches
    .filter(b => tab === 'all' || b.currentStage === tab)
    .filter(b =>
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.beekeeperName.toLowerCase().includes(search.toLowerCase()) ||
      b.floralSource.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Master Honey Batch Registry"
        subtitle="End-to-end oversight of every honey batch across all 6 supply chain stages"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Batches" value={batches.length} icon={<Package className="w-5 h-5 text-honey-400" />} subtitle="Tracked on ledger" />
        <MetricCard label="Total Production" value="5,800 kg" icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} subtitle="Cumulative volume" />
        <MetricCard label="Grade A Ratio" value="99.2%" icon={<CheckCircle className="w-5 h-5 text-sky-400" />} subtitle="Laboratory verified" />
        <MetricCard label="Active In Transit" value={batches.filter(b => b.currentStage === 'distribution').length} icon={<Package className="w-5 h-5 text-purple-400" />} subtitle="Dispatched consignments" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by batch ID, floral type, beekeeper..." className="flex-1" />
        <Tabs
          tabs={[
            { id: 'all', label: 'All', count: batches.length },
            { id: 'harvested', label: 'Harvested', count: batches.filter(b => b.currentStage === 'harvested').length },
            { id: 'processing', label: 'Processing', count: batches.filter(b => b.currentStage === 'processing').length },
            { id: 'quality_testing', label: 'Testing', count: batches.filter(b => b.currentStage === 'quality_testing').length },
            { id: 'packaging', label: 'Packaging', count: batches.filter(b => b.currentStage === 'packaging').length },
            { id: 'distribution', label: 'Distribution', count: batches.filter(b => b.currentStage === 'distribution').length },
            { id: 'delivered', label: 'Delivered', count: batches.filter(b => b.currentStage === 'delivered').length },
          ]}
          activeTab={tab}
          onChange={setTab}
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400">
                <th className="py-3 px-3">Batch ID</th>
                <th className="py-3 px-3">Floral Origin</th>
                <th className="py-3 px-3">Beekeeper / Apiary</th>
                <th className="py-3 px-3">Yield</th>
                <th className="py-3 px-3">Moisture</th>
                <th className="py-3 px-3">Purity</th>
                <th className="py-3 px-3">Current Stage</th>
                <th className="py-3 px-3">Ledger Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {filtered.map(batch => (
                <tr key={batch.id} className="hover:bg-charcoal-800/30">
                  <td className="py-3.5 px-3 font-mono text-xs text-honey-400 font-bold">{batch.id}</td>
                  <td className="py-3.5 px-3 text-white font-medium">{batch.floralSource}</td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-300">
                    {batch.beekeeperName}
                    <span className="block text-[11px] text-charcoal-500">{batch.apiaryLocation}</span>
                  </td>
                  <td className="py-3.5 px-3 text-white font-semibold">{batch.quantityKg} kg</td>
                  <td className="py-3.5 px-3 text-emerald-400 font-medium">{batch.moistureContent}%</td>
                  <td className="py-3.5 px-3 text-honey-400 font-medium">{batch.purityScore}%</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-honey-500/10 text-honey-400 border border-honey-500/30 capitalize">
                      {batch.currentStage.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => navigate(`/trace/${batch.id}`)}
                      className="text-xs text-honey-400 hover:text-honey-300 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      Trace <ExternalLink className="w-3 h-3" />
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
