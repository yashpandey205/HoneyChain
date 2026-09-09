import { useState } from 'react';
import { Settings as SettingsIcon, Save, RefreshCw, Shield, Server, Bell, Cpu } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { useToast } from '../../contexts/NotificationContext';

export default function AdminSettings() {
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false);

  // Settings State
  const [rpcNode, setRpcNode] = useState('https://rpc-testnet.honeychain.network/v1');
  const [chainId, setChainId] = useState('84532');
  const [maxMoisture, setMaxMoisture] = useState('20.0');
  const [maxHmf, setMaxHmf] = useState('40.0');
  const [maxBroodTemp, setMaxBroodTemp] = useState('36.5');
  const [demoMode, setDemoMode] = useState(true);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    addToast('success', 'Settings Saved', 'System configurations updated & re-synced.');
  };

  const handleResetDemo = () => {
    localStorage.removeItem('honeychain_user');
    addToast('info', 'Demo State Cleaned', 'Session reset to default seed data.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="System Parameters & Node Configuration"
        subtitle="Configure smart contract thresholds, IoT telemetry tolerances & blockchain testnet RPC"
      />

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blockchain Node Config */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Server className="w-5 h-5 text-honey-400" />
              <span>Blockchain Network Configuration</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-charcoal-300 font-medium mb-1">Testnet RPC Endpoint</label>
                <input
                  value={rpcNode}
                  onChange={e => setRpcNode(e.target.value)}
                  className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-xl text-white font-mono text-xs focus:border-honey-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-charcoal-300 font-medium mb-1">Network Chain ID</label>
                <input
                  value={chainId}
                  onChange={e => setChainId(e.target.value)}
                  className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-xl text-white font-mono text-xs focus:border-honey-500 outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-[11px] text-charcoal-400">
                Network: <strong>HoneyChain PoA Consensus Testnet</strong> · Validator Quorum: 5 Nodes · Gas Price: 0.001 Gwei (Subsidized for Hackathon/Demo)
              </div>
            </div>
          </Card>

          {/* Quality & Laboratory Standards */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>FSSAI Quality & Testing Thresholds</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-charcoal-300 font-medium mb-1">Max Permissible Moisture (%)</label>
                <input
                  value={maxMoisture}
                  onChange={e => setMaxMoisture(e.target.value)}
                  className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-xl text-white text-xs focus:border-honey-500 outline-none"
                />
                <span className="text-[10px] text-charcoal-500">Batches &gt; 20% fail automated certification</span>
              </div>

              <div>
                <label className="block text-charcoal-300 font-medium mb-1">Max HMF (Hydroxymethylfurfural mg/kg)</label>
                <input
                  value={maxHmf}
                  onChange={e => setMaxHmf(e.target.value)}
                  className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-xl text-white text-xs focus:border-honey-500 outline-none"
                />
                <span className="text-[10px] text-charcoal-500">Standard for tropical unpasteurized raw honey</span>
              </div>
            </div>
          </Card>

          {/* IoT Telemetry Bounds */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Cpu className="w-5 h-5 text-sky-400" />
              <span>IoT Hive Hardware Tolerances</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-charcoal-300 font-medium mb-1">Max Brood Temperature Alarm (°C)</label>
                <input
                  value={maxBroodTemp}
                  onChange={e => setMaxBroodTemp(e.target.value)}
                  className="w-full px-3 py-2 bg-charcoal-900 border border-charcoal-700 rounded-xl text-white text-xs focus:border-honey-500 outline-none"
                />
                <span className="text-[10px] text-charcoal-500">Triggers overheating alert to beekeeper</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-charcoal-950 border border-charcoal-800">
                <div>
                  <p className="text-white font-medium text-xs">Acoustic Swarm Early-Warning</p>
                  <p className="text-[10px] text-charcoal-500">FFT audio spectrum analysis</p>
                </div>
                <span className="text-emerald-400 font-semibold text-xs">Active</span>
              </div>
            </div>
          </Card>

          {/* Demonstration Mode Controls */}
          <Card className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <RefreshCw className="w-5 h-5 text-purple-400" />
              <span>Demo Mode & Reset Utilities</span>
            </div>

            <p className="text-xs text-charcoal-400">
              HoneyChain includes pre-seeded Indian honey batches, authentic apiary locations, and testnet blockchain hashes for seamless presentations.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={handleResetDemo}
              >
                Reset Demo Authentication State
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-800">
          <Button type="submit" variant="primary" loading={saving} icon={<Save className="w-4 h-4" />}>
            Save All Configurations
          </Button>
        </div>
      </form>
    </div>
  );
}
