import { useState } from 'react';
import { Truck, MapPin, Calendar, Clock, Plus, CheckCircle, Thermometer } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, Tabs, Modal } from '../../components/ui/index';
import { useToast } from '../../contexts/NotificationContext';

export default function Shipments() {
  const { addToast } = useToast();
  const [tab, setTab] = useState('active');
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fleet Shipments & Cold-Chain Manifests"
        subtitle="Manage temperature-controlled consignments from processing plants to retail distribution hubs"
        actions={
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setIsNewShipmentOpen(true)}>
            Create Consignment Manifest
          </Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'active', label: 'Active Shipments', count: 3 },
          { id: 'scheduled', label: 'Scheduled Pickups', count: 2 },
          { id: 'delivered', label: 'Completed Deliveries', count: 18 },
        ]}
        activeTab={tab}
        onChange={setTab}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { id: 'TRK-2026-901', driver: 'Gurpreet Singh', route: 'Kashmir → New Delhi', temp: '20.4°C', cargo: '800 Jars Acacia', status: 'In Transit' },
          { id: 'TRK-2026-902', driver: 'Manoj Kumar', route: 'Solan → Mumbai', temp: '21.2°C', cargo: '1,200 Jars Wildflower', status: 'In Transit' },
          { id: 'TRK-2026-903', driver: 'Arindam Ghosh', route: 'Sundarbans → Kolkata', temp: '22.0°C', cargo: '500 Jars Mangrove', status: 'Near Destination' },
        ].map(item => (
          <Card key={item.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-honey-400 font-bold">{item.id}</span>
              <Badge variant="emerald" size="sm">{item.status}</Badge>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">{item.cargo}</h4>
              <p className="text-xs text-charcoal-400 mt-0.5">{item.route}</p>
            </div>
            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-charcoal-500">Authorized Driver:</span>
                <span className="text-charcoal-200">{item.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-500">Live Temperature:</span>
                <span className="text-emerald-400 font-medium">{item.temp} (Compliant)</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              icon={<Truck className="w-3.5 h-3.5" />}
              onClick={() => addToast('info', 'Ping Sent', `Telemetry pinged for ${item.id}`)}
            >
              Ping Vehicle IoT Hub
            </Button>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isNewShipmentOpen}
        onClose={() => setIsNewShipmentOpen(false)}
        title="Schedule New Logistics Consignment"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsNewShipmentOpen(false);
          addToast('success', 'Manifest Created', 'Shipment scheduled with IoT logger active.');
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-300 mb-1">Origin Facility</label>
            <input className="w-full px-3 py-2 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white" defaultValue="Kashmir Valley Processing Facility" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal-300 mb-1">Destination Retail Depot</label>
            <input className="w-full px-3 py-2 bg-charcoal-800 border border-charcoal-700 rounded-xl text-sm text-white" defaultValue="Organic Store Hub, Delhi NCR" />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" onClick={() => setIsNewShipmentOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Dispatch Carrier</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
