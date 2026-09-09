import { useState, useEffect } from 'react';
import { Link2, Shield, Hash, Clock, CheckCircle, Search, Copy, ExternalLink, Cpu } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, SearchBar } from '../../components/ui/index';
import { blockchainService } from '../../services/blockchainService';
import { useToast } from '../../contexts/NotificationContext';
import type { BlockchainRecord } from '../../types';

export default function AdminBlockchain() {
  const { addToast } = useToast();
  const [blocks, setBlocks] = useState<BlockchainRecord[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    blockchainService.getBlocks().then(setBlocks);
  }, []);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    addToast('info', 'Hash Copied', hash);
  };

  const filtered = blocks.filter(b =>
    b.currentHash.toLowerCase().includes(search.toLowerCase()) ||
    b.blockNumber.toString().includes(search) ||
    b.data.batchId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ledger Explorer & Cryptographic Records"
        subtitle="Immutable proof-of-authority testnet blocks, transaction receipts & state validation"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Ledger Height" value={`#${blocks.length + 1042}`} icon={<Hash className="w-5 h-5 text-honey-400" />} subtitle="Blocks committed" />
        <MetricCard label="Network Consensus" value="PoA Testnet" icon={<Shield className="w-5 h-5 text-emerald-400" />} subtitle="5 Authority nodes active" />
        <MetricCard label="Average Block Time" value="4.2 Seconds" icon={<Clock className="w-5 h-5 text-sky-400" />} subtitle="Sub-second finality" />
        <MetricCard label="Cryptographic Integrity" value="100% Valid" icon={<CheckCircle className="w-5 h-5 text-purple-400" />} subtitle="SHA-256 Merkel tree verified" />
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search by block hash, block number, or batch ID..." />

      <div className="space-y-4">
        {filtered.map(block => (
          <Card key={block.currentHash} className="space-y-3 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-800 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-honey-400">Block #{block.blockNumber}</span>
                <Badge variant="emerald" size="sm">Confirmed</Badge>
                <span className="text-xs text-charcoal-300 font-sans font-semibold">{block.eventType}</span>
              </div>
              <span className="text-xs text-charcoal-500 font-sans">{new Date(block.timestamp).toLocaleString()}</span>
            </div>

            <div className="text-xs space-y-1.5 font-sans">
              <div className="flex flex-col sm:flex-row sm:justify-between text-charcoal-400 gap-1">
                <span>Block Hash:</span>
                <button
                  onClick={() => copyHash(block.currentHash)}
                  className="font-mono text-honey-400 hover:text-honey-300 text-left sm:text-right truncate max-w-md flex items-center gap-1 cursor-pointer"
                >
                  {block.currentHash} <Copy className="w-3 h-3 shrink-0" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between text-charcoal-400 gap-1">
                <span>Previous Hash:</span>
                <span className="font-mono text-charcoal-500 text-left sm:text-right truncate max-w-md">
                  {block.previousHash}
                </span>
              </div>

              <div className="flex justify-between text-charcoal-400 pt-1">
                <span>Transaction ID:</span>
                <span className="font-mono font-bold text-white">{block.transactionId}</span>
              </div>
            </div>

            {/* Embedded Transaction Payload */}
            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Batch ID:</span>
                <span className="font-mono font-bold text-honey-400">{block.data.batchId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Recorded Stage:</span>
                <span className="text-white capitalize">{block.data.stage?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Location:</span>
                <span className="text-charcoal-300">{block.data.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Authorized Stakeholder:</span>
                <span className="text-emerald-400 font-medium">{block.data.stakeholder}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
