import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Truck, MapPin, Clock, Package, CheckCircle,
  Thermometer, AlertCircle, TrendingUp, ArrowRight
} from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { shipmentService } from '../../services/shipmentService';
import { batchService } from '../../services/batchService';
import { useNavigate } from 'react-router-dom';

export default function DistributorOverview() {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      shipmentService.getAllShipments(),
      batchService.getAllBatches(),
    ]).then(([s, b]) => {
      setShipments(s);
      setBatches(b);
    });
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Distributor Logistics & Cold-Chain Hub"
        subtitle="Live transit fleet tracking, temperature compliance & retail inventory distribution"
        actions={
          <Button
            variant="primary"
            icon={<Truck className="w-4 h-4" />}
            onClick={() => navigate('/dashboard/distributor/shipments')}
          >
            Manage Fleet
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Shipments"
          value="3 Vehicles"
          icon={<Truck className="w-5 h-5 text-honey-400" />}
          subtitle="All on target schedule"
        />
        <MetricCard
          label="Transit Temperature"
          value="21.4°C"
          icon={<Thermometer className="w-5 h-5 text-emerald-400" />}
          subtitle="Safe limits: 15°C - 25°C"
        />
        <MetricCard
          label="Delivered This Month"
          value="1,850 Jars"
          change={14.2}
          trend="up"
          icon={<CheckCircle className="w-5 h-5 text-sky-400" />}
          subtitle="To organic retail outlets"
        />
        <MetricCard
          label="Cold-Chain SLA"
          value="99.9%"
          icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
          subtitle="Zero heat excursions"
        />
      </div>

      {/* Active Consignments */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Active Transit Dispatches</h3>
            <p className="text-xs text-charcoal-400">Real-time GPS coordinates and IoT data-logger status</p>
          </div>
          <Badge variant="emerald" size="sm">Fleet IoT Connected</Badge>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'SHP-DEL-084',
              origin: 'Kashmir Valley Processing Facility',
              destination: 'Organic Mart Flagship, Connaught Place, New Delhi',
              cargo: '800 x 500g Kashmir Acacia Honey',
              vehicle: 'Reefer Van DL-01-AA-4921',
              status: 'In Transit — Ambala Highway (GT Road)',
              temp: '20.8°C',
              eta: 'Today, 18:30 IST',
            },
            {
              id: 'SHP-MUM-019',
              origin: 'Solan Bottling Center, HP',
              destination: 'Nature Basket Superstore, Bandra West, Mumbai',
              cargo: '1,200 x 250g Himachal Wild Honey',
              vehicle: 'Cold Fleet HR-26-CZ-8812',
              status: 'In Transit — Jaipur Bypass',
              temp: '21.5°C',
              eta: 'Tomorrow, 09:00 IST',
            },
            {
              id: 'SHP-BLR-007',
              origin: 'Sundarbans Cooperative Depository',
              destination: 'BioRetail Hub, Indiranagar, Bengaluru',
              cargo: '500 x 500g Sundarbans Mangrove Honey',
              vehicle: 'Express Van WB-02-EE-1049',
              status: 'Out for Final Delivery',
              temp: '22.1°C',
              eta: 'Today, 15:45 IST',
            },
          ].map(shipment => (
            <div
              key={shipment.id}
              className="p-4 rounded-xl bg-charcoal-950/80 border border-charcoal-800 hover:border-charcoal-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-honey-400">{shipment.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    {shipment.status}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Thermometer className="w-3 h-3" /> {shipment.temp}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">{shipment.cargo}</h4>
                <div className="flex flex-wrap items-center gap-x-4 text-xs text-charcoal-400">
                  <span>From: <strong className="text-charcoal-200">{shipment.origin}</strong></span>
                  <span>To: <strong className="text-charcoal-200">{shipment.destination}</strong></span>
                  <span>Vehicle: <strong className="text-charcoal-200 font-mono">{shipment.vehicle}</strong></span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-charcoal-500">Estimated Arrival</span>
                <p className="text-sm font-bold text-white">{shipment.eta}</p>
                <button
                  onClick={() => navigate('/dashboard/distributor/tracking')}
                  className="mt-1 text-xs text-honey-400 hover:text-honey-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  Live GPS Tracker <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
