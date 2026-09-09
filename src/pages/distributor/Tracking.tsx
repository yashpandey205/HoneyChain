import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Truck, Thermometer, ShieldCheck, Clock,
  Navigation, Radio, AlertTriangle
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import Card, { MetricCard } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';

export default function Tracking() {
  const [activeVehicle, setActiveVehicle] = useState('DL-01-AA-4921');

  const temperatureLog = [
    { time: '06:00', temp: 19.8 },
    { time: '08:00', temp: 20.4 },
    { time: '10:00', temp: 21.0 },
    { time: '12:00', temp: 21.6 },
    { time: '14:00', temp: 21.8 },
    { time: '16:00', temp: 21.2 },
    { time: '18:00', temp: 20.6 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Cold-Chain GPS & IoT Telemetry"
        subtitle="Real-time geo-fencing, temperature compliance logger & tamper seal monitoring"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Current Speed"
          value="64 km/h"
          icon={<Navigation className="w-5 h-5 text-honey-400" />}
          subtitle="NH-44 Highway Corridors"
        />
        <MetricCard
          label="Container Temp"
          value="20.8°C"
          icon={<Thermometer className="w-5 h-5 text-emerald-400" />}
          subtitle="Compliant (Limit 25°C)"
        />
        <MetricCard
          label="Tamper Seal"
          value="LOCKED"
          icon={<ShieldCheck className="w-5 h-5 text-sky-400" />}
          subtitle="E-seal hash active"
        />
        <MetricCard
          label="GPS Satellite Fix"
          value="9 Satellites"
          icon={<Radio className="w-5 h-5 text-purple-400" />}
          subtitle="Sub-meter precision"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulated Route Card */}
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Transit Route: Kashmir → New Delhi</h3>
              <p className="text-xs text-charcoal-400">Carrier: Reefer Van {activeVehicle} · 800 Jars Kashmir Acacia</p>
            </div>
            <Badge variant="emerald" size="sm">On Schedule</Badge>
          </div>

          {/* Interactive Route Stepper Visual */}
          <div className="p-6 rounded-2xl bg-charcoal-950 border border-charcoal-800 space-y-6">
            <div className="relative flex items-center justify-between">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-charcoal-800 z-0">
                <div className="h-full bg-gradient-to-r from-honey-500 to-emerald-400 w-3/4" />
              </div>

              {[
                { title: 'Srinagar Hub', sub: 'Departed 06:00', done: true },
                { title: 'Jammu Toll', sub: 'Passed 10:30', done: true },
                { title: 'Ambala Bypass', sub: 'Current Location', active: true },
                { title: 'Delhi Retail Flagship', sub: 'ETA 18:30 IST', pending: true },
              ].map((stop, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold ${
                    stop.done
                      ? 'bg-emerald-500 border-emerald-400 text-charcoal-950'
                      : stop.active
                      ? 'bg-honey-500 border-honey-400 text-charcoal-950 animate-pulse'
                      : 'bg-charcoal-900 border-charcoal-700 text-charcoal-500'
                  }`}>
                    {stop.done ? '✓' : i + 1}
                  </div>
                  <span className="text-xs font-semibold text-white mt-2">{stop.title}</span>
                  <span className="text-[10px] text-charcoal-400">{stop.sub}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-800 flex items-center justify-between text-xs">
              <span className="text-charcoal-400">Next Waypoint: <strong>Karnal Logistics Depot (38 km)</strong></span>
              <span className="text-honey-400 font-mono">Lat 30.378° N, Long 76.776° E</span>
            </div>
          </div>

          {/* Temperature Log Chart */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-white mb-2">Transit Temperature Compliance History (24h)</h4>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureLog}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c2c32" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#85858F' }} />
                  <YAxis domain={[15, 25]} tick={{ fontSize: 10, fill: '#85858F' }} unit="°C" />
                  <Tooltip contentStyle={{ backgroundColor: '#1c1c20', border: '1px solid #333', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="temp" stroke="#34D399" strokeWidth={2} dot={{ fill: '#34D399' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Cargo Telemetry Spec */}
        <Card className="space-y-4">
          <h3 className="text-base font-semibold text-white">Cargo Security Status</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-1">
              <span className="text-charcoal-500 uppercase text-[10px] font-semibold">Active Consignment</span>
              <p className="font-bold text-white text-sm">Batch HC-2026-001</p>
              <p className="text-honey-400">800 glass jars · 500g Acacia Raw</p>
            </div>

            <div className="p-3 rounded-xl bg-charcoal-950 border border-charcoal-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-charcoal-400">Electronic Seal ID:</span>
                <span className="font-mono text-white">ES-9921-X</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Door Status:</span>
                <span className="text-emerald-400 font-bold">Unopened (0 events)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Vibration G-Force:</span>
                <span className="text-emerald-400">0.2g (Gentle)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Geo-Fence:</span>
                <span className="text-emerald-400">Inside Designated Corridor</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-honey-500/10 border border-honey-500/20 text-honey-300 text-[11px]">
              If door seal is broken or ambient temp exceeds 28°C, HoneyChain automatically triggers smart contract pause on retail verification.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
