import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanLine, ExternalLink, ShieldCheck, Calendar, Search } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, SearchBar } from '../../components/ui/index';
import { batchService } from '../../services/batchService';
import type { HoneyBatch } from '../../types';

export default function ConsumerScans() {
  const navigate = useNavigate();
  const [batches, setBatches] = useState<HoneyBatch[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    batchService.getAllBatches().then(setBatches);
  }, []);

  const filtered = batches.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.floralSource.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Verified Honey Scans"
        subtitle="All honey jars verified through your camera scanner with immutable blockchain genesis receipts"
        actions={
          <Button
            variant="primary"
            icon={<ScanLine className="w-4 h-4" />}
            onClick={() => navigate('/verify')}
          >
            Scan Another Jar
          </Button>
        }
      />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Filter your scanned honeys..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(batch => (
          <Card key={batch.id} className="space-y-4 hover:border-honey-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-honey-400 font-bold">{batch.id}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Verified Pure
              </span>
            </div>

            <div>
              <h4 className="text-base font-semibold text-white">{batch.floralSource}</h4>
              <p className="text-xs text-charcoal-400">Harvest: {batch.harvestDate} · {batch.apiaryLocation}</p>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Master Beekeeper:</span>
                <span className="text-charcoal-200">{batch.beekeeperName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Purity Score:</span>
                <span className="text-honey-400 font-bold">{batch.purityScore}% (Grade A)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Ledger Genesis:</span>
                <span className="font-mono text-charcoal-400 text-[10px]">{(batch.blockchainHash || '0x8f3c4d19e0b219').slice(0, 12)}...</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              onClick={() => navigate(`/trace/${batch.id}`)}
            >
              Explore Honey Trace Journey
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
