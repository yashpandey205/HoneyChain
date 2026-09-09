import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ScanLine, Award, Heart, ShieldCheck, Search,
  ExternalLink, Sparkles, Hexagon, ArrowRight
} from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { batchService } from '../../services/batchService';
import type { HoneyBatch } from '../../types';

export default function ConsumerOverview() {
  const navigate = useNavigate();
  const [favoriteBatches, setFavoriteBatches] = useState<HoneyBatch[]>([]);

  useEffect(() => {
    batchService.getAllBatches().then(data => {
      setFavoriteBatches(data.slice(0, 3));
    });
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Consumer Provenance & Authenticity Hub"
        subtitle="Track your verified honey collection, connect with Indian beekeepers & discover botanical tasting profiles"
        actions={
          <Button
            variant="primary"
            icon={<ScanLine className="w-4 h-4" />}
            onClick={() => navigate('/verify')}
          >
            Scan Honey Jar QR
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Verified Pure Jars"
          value="6 Jars"
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
          subtitle="100% Raw Certified"
        />
        <MetricCard
          label="Beekeepers Supported"
          value="4 Apiaries"
          icon={<Heart className="w-5 h-5 text-honey-400" />}
          subtitle="Himachal & Kashmir"
        />
        <MetricCard
          label="Fair-Trade Premium"
          value="₹420"
          icon={<Award className="w-5 h-5 text-sky-400" />}
          subtitle="Direct beekeeper bonus paid"
        />
        <MetricCard
          label="Pollinator Contribution"
          value="~1.8M Bees"
          icon={<Hexagon className="w-5 h-5 text-purple-400" />}
          subtitle="Hives safeguarded"
        />
      </div>

      {/* Quick QR Verification Card */}
      <Card className="bg-gradient-to-br from-charcoal-900 to-honey-950/30 border-honey-500/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-honey-500/10 border border-honey-500/30 text-honey-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Instant Anti-Counterfeit Verification
          </span>
          <h3 className="text-xl font-bold text-white">Have a jar of HoneyChain honey?</h3>
          <p className="text-sm text-charcoal-300 max-w-xl">
            Point your camera at the holographic QR seal on the lid to verify harvest date, lab test results, moisture percentage, and trace the direct Himalayan bee colony.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button size="lg" variant="primary" icon={<ScanLine className="w-5 h-5" />} onClick={() => navigate('/verify')}>
            Scan QR Code
          </Button>
          <Button size="lg" variant="outline" icon={<Search className="w-5 h-5" />} onClick={() => navigate('/trace')}>
            Search Batch ID
          </Button>
        </div>
      </Card>

      {/* My Verified Jars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">My Scanned & Verified Jars</h3>
          <button
            onClick={() => navigate('/dashboard/consumer/scans')}
            className="text-xs text-honey-400 hover:text-honey-300 font-medium flex items-center gap-1 cursor-pointer"
          >
            View All My Scans <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {favoriteBatches.map(batch => (
            <Card key={batch.id} className="space-y-3 hover:border-honey-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-honey-400 font-bold">{batch.id}</span>
                <Badge variant="emerald" size="sm">✓ 100% Authentic</Badge>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">{batch.floralSource} Honey</h4>
                <p className="text-xs text-charcoal-400">Harvested: {batch.harvestDate} · {batch.apiaryLocation}</p>
              </div>

              <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Beekeeper:</span>
                  <span className="text-white font-medium">{batch.beekeeperName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-500">Moisture Content:</span>
                  <span className="text-emerald-400 font-semibold">{batch.moistureContent}% (Raw Unpasteurized)</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => navigate(`/trace/${batch.id}`)}
              >
                View Full Trace Story
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
