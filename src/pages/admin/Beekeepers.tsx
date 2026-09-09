import { useState, useEffect } from 'react';
import { Hexagon, MapPin, Award, CheckCircle, ShieldCheck, Search } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, SearchBar } from '../../components/ui/index';
import { mockBeekeepers } from '../../data/mockData';

export default function AdminBeekeepers() {
  const [beekeepers] = useState(mockBeekeepers);
  const [search, setSearch] = useState('');

  const filtered = beekeepers.filter(b =>
    b.farmName.toLowerCase().includes(search.toLowerCase()) ||
    b.state.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Beekeeper & Apiary Network"
        subtitle="Registered apiculturists, geographic apiary clusters & tribal beekeeping cooperatives"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Registered Beekeepers" value={beekeepers.length} icon={<Hexagon className="w-5 h-5 text-honey-400" />} subtitle="Active apiarists" />
        <MetricCard label="Managed Hive Boxes" value="860 Hives" icon={<Hexagon className="w-5 h-5 text-emerald-400" />} subtitle="IoT enabled colonies" />
        <MetricCard label="Apiary States" value="6 Regions" icon={<MapPin className="w-5 h-5 text-sky-400" />} subtitle="HP, J&K, WB, Punjab..." />
        <MetricCard label="FSSAI Apiary Certified" value="100%" icon={<Award className="w-5 h-5 text-purple-400" />} subtitle="Organic certified standards" />
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Filter beekeepers by name, state, location..." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(b => (
          <Card key={b.id} className="space-y-4 hover:border-honey-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono text-honey-400 font-bold">{b.id}</span>
                <h4 className="text-base font-semibold text-white mt-1">{b.farmName}</h4>
                <p className="text-xs text-charcoal-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-honey-500" /> {b.location}, {b.state}
                </p>
              </div>
              <Badge variant="emerald" size="sm">Active Member</Badge>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Colonies Managed:</span>
                <span className="text-white font-semibold">{b.numberOfColonies} Modern Boxes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">KYC Status:</span>
                <span className="text-emerald-400 font-medium capitalize">{b.verificationStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Region:</span>
                <span className="text-honey-400 font-medium">{b.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Joined Platform:</span>
                <span className="text-charcoal-400">{b.registeredAt.split('T')[0]}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-charcoal-500">
              <span>Verified Apiarist</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Fair-Pay
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
