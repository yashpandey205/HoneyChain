import { useState } from 'react';
import { Package, CheckCircle, Store, ScanLine, ArrowRight, UserCheck } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { useToast } from '../../contexts/NotificationContext';

export default function Distribution() {
  const { addToast } = useToast();
  const [stores, setStores] = useState([
    { id: 'RET-DEL-01', name: 'Organic India Flagship', location: 'Connaught Place, New Delhi', pendingJars: 800, delivered: false },
    { id: 'RET-MUM-04', name: 'Nature Basket Gourmet', location: 'Bandra West, Mumbai', pendingJars: 1200, delivered: false },
    { id: 'RET-BLR-02', name: 'Healthy Planet BioStore', location: 'Indiranagar, Bengaluru', pendingJars: 500, delivered: true },
  ]);

  const handleConfirmDelivery = (storeId: string, storeName: string) => {
    setStores(prev => prev.map(s => s.id === storeId ? { ...s, delivered: true } : s));
    addToast('success', 'Retail Handover Complete', `Delivery confirmed & verified by store manager at ${storeName}.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Retail Store Handover & Shelving"
        subtitle="Final mile handover to certified retail partners, shelf stocking & QR scan activation"
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          label="Retail Partner Outlets"
          value="48 Stores"
          icon={<Store className="w-5 h-5 text-honey-400" />}
          subtitle="Tier-1 organic outlets"
        />
        <MetricCard
          label="Today's Handover Quota"
          value="2,500 Jars"
          icon={<Package className="w-5 h-5 text-sky-400" />}
          subtitle="Across 3 metro clusters"
        />
        <MetricCard
          label="Proof-of-Delivery SLA"
          value="100%"
          icon={<CheckCircle className="w-5 h-5 text-emerald-400" />}
          subtitle="Cryptographically verified receipts"
        />
      </div>

      <div className="space-y-4">
        {stores.map(store => (
          <Card key={store.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-honey-400 font-bold">{store.id}</span>
                <Badge variant={store.delivered ? 'emerald' : 'amber'} size="sm">
                  {store.delivered ? 'Delivery Confirmed' : 'Pending Dock Intake'}
                </Badge>
              </div>
              <h4 className="text-base font-semibold text-white">{store.name}</h4>
              <p className="text-xs text-charcoal-400">{store.location} · {store.pendingJars} Jars consigned</p>
            </div>

            <div className="shrink-0">
              {store.delivered ? (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" /> Proof-of-Delivery Sealed
                </span>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ScanLine className="w-4 h-4" />}
                  onClick={() => handleConfirmDelivery(store.id, store.name)}
                >
                  Scan Store Barcode & Handover
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
