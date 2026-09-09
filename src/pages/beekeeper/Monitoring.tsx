import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Thermometer, Droplets, Weight, Radio,
  Volume2, ShieldCheck, RefreshCw, Eye, Sparkles
} from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader } from '../../components/ui/index';
import { hiveService } from '../../services/hiveService';
import type { Hive } from '../../types';

export default function HiveMonitoring() {
  const [hives, setHives] = useState<Hive[]>([]);
  const [selectedHiveId, setSelectedHiveId] = useState<string>('');
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [telemetryTick, setTelemetryTick] = useState(0);

  useEffect(() => {
    hiveService.getAllHives().then(data => {
      setHives(data);
      if (data.length > 0) setSelectedHiveId(data[0].id);
    });
  }, []);

  // Simulate real-time IoT micro-variations
  useEffect(() => {
    if (!isLiveStreaming) return;
    const interval = setInterval(() => {
      setTelemetryTick(t => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  const currentHive = hives.find(h => h.id === selectedHiveId) || hives[0];

  const jitter = (val: number, range: number) => {
    const delta = (Math.sin(telemetryTick + val) * range);
    return Number((val + delta).toFixed(1));
  };

  const currentTemp = currentHive ? jitter(currentHive.temperature, 0.4) : 34.8;
  const currentHumidity = currentHive ? jitter(currentHive.humidity, 0.8) : 58.2;
  const currentWeight = currentHive ? jitter(currentHive.weight, 0.15) : 32.4;
  const currentActivity = currentHive ? Math.min(100, Math.max(20, Math.round(jitter(currentHive.activity, 3)))) : 88;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Smart Hive IoT Monitoring"
        subtitle="Real-time multi-sensor telemetry, brood nest climate & acoustic hive health"
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isLiveStreaming
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-charcoal-800 border-charcoal-700 text-charcoal-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-charcoal-500'}`} />
              {isLiveStreaming ? 'IoT Stream Active' : 'Stream Paused'}
            </button>
            <Button
              variant="outline"
              size="sm"
              icon={<RefreshCw className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-spin' : ''}`} />}
              onClick={() => setTelemetryTick(t => t + 1)}
            >
              Sync Hub
            </Button>
          </div>
        }
      />

      {/* Hive Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {hives.map(hive => (
          <button
            key={hive.id}
            onClick={() => setSelectedHiveId(hive.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border cursor-pointer ${
              selectedHiveId === hive.id
                ? 'bg-honey-500/15 border-honey-500/40 text-honey-400 shadow-sm'
                : 'bg-charcoal-900/60 border-charcoal-800 text-charcoal-400 hover:text-white hover:bg-charcoal-800'
            }`}
          >
            {hive.name}
            <span className="ml-2 text-xs opacity-60">({hive.location.split(',')[0]})</span>
          </button>
        ))}
      </div>

      {/* Real-time telemetry grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Internal Temperature"
          value={`${currentTemp}°C`}
          change={currentTemp > 36 ? 1.2 : -0.4}
          trend={currentTemp > 36 ? 'up' : 'down'}
          icon={<Thermometer className="w-5 h-5 text-amber-400" />}
          subtitle="Optimum brood: 34.5°C - 35.5°C"
        />
        <MetricCard
          label="Relative Humidity"
          value={`${currentHumidity}%`}
          change={-0.8}
          trend="down"
          icon={<Droplets className="w-5 h-5 text-sky-400" />}
          subtitle="Safe honey curing: 55% - 65%"
        />
        <MetricCard
          label="Gross Hive Weight"
          value={`${currentWeight} kg`}
          change={2.3}
          trend="up"
          icon={<Weight className="w-5 h-5 text-purple-400" />}
          subtitle="Honey accumulation trending +0.6kg/day"
        />
        <MetricCard
          label="Colony Flight Activity"
          value={`${currentActivity}%`}
          change={4.5}
          trend="up"
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
          subtitle="Frequency peak at midday foraging"
        />
      </div>

      {/* Acoustic & Environmental Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-honey-400" />
                Acoustic Frequency Spectrum (Swarm Prediction AI)
              </h3>
              <p className="text-xs text-charcoal-400">Audio FFT spectrogram from internal piezoelectric sensor</p>
            </div>
            <Badge variant="emerald" size="sm">Colony Queen Active</Badge>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-950/60 border border-charcoal-800 space-y-4">
            <div className="flex items-end gap-1.5 h-32 pt-4">
              {[45, 52, 68, 85, 92, 110, 140, 190, 240, 280, 220, 170, 130, 95, 75, 60, 48, 40].map((h, i) => {
                const liveH = Math.max(15, Math.min(100, Math.round(h + Math.sin(telemetryTick + i) * 15)));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div
                      style={{ height: `${liveH}%` }}
                      className={`w-full rounded-t-sm transition-all duration-500 ${
                        liveH > 70
                          ? 'bg-gradient-to-t from-honey-600 to-honey-400'
                          : 'bg-charcoal-700 group-hover:bg-honey-500/50'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-charcoal-500">
              <span>100 Hz (Rest)</span>
              <span>250 Hz (Normal Forage)</span>
              <span>450 Hz (Piping)</span>
              <span>600 Hz (Swarm Risk)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-charcoal-900/60 border border-charcoal-800">
              <span className="text-[11px] text-charcoal-400">Dominant Frequency</span>
              <p className="text-sm font-bold text-white mt-0.5">248 Hz</p>
              <span className="text-[10px] text-emerald-400 font-medium">Standard buzz</span>
            </div>
            <div className="p-3 rounded-lg bg-charcoal-900/60 border border-charcoal-800">
              <span className="text-[11px] text-charcoal-400">Swarming Probability</span>
              <p className="text-sm font-bold text-white mt-0.5">6.4%</p>
              <span className="text-[10px] text-emerald-400 font-medium">Low risk (Next 7d)</span>
            </div>
            <div className="p-3 rounded-lg bg-charcoal-900/60 border border-charcoal-800">
              <span className="text-[11px] text-charcoal-400">Queen Piping Event</span>
              <p className="text-sm font-bold text-white mt-0.5">None</p>
              <span className="text-[10px] text-charcoal-400">Normal queen presence</span>
            </div>
          </div>
        </Card>

        {/* Live IoT Node Hardware Status */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-honey-400" />
              Sensor Node Spec
            </h3>
            <span className="text-xs text-honey-400 font-mono">Node #{selectedHiveId.toUpperCase()}</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-charcoal-800 text-xs">
              <span className="text-charcoal-400">Hardware Gateway</span>
              <span className="text-white font-mono">ESP32 LoRaWAN v2</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-charcoal-800 text-xs">
              <span className="text-charcoal-400">Battery & Solar</span>
              <span className="text-emerald-400 font-medium">96% · 4.12V (Solar Charging)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-charcoal-800 text-xs">
              <span className="text-charcoal-400">Signal RSSI</span>
              <span className="text-white font-mono">-74 dBm (Strong)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-charcoal-800 text-xs">
              <span className="text-charcoal-400">Brood Temp Sensor</span>
              <span className="text-white font-mono">Dallas DS18B20 High-Prec</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-charcoal-800 text-xs">
              <span className="text-charcoal-400">Load Cell Sensor</span>
              <span className="text-white font-mono">HX711 4-Point Bridge</span>
            </div>
            <div className="flex justify-between items-center py-2 text-xs">
              <span className="text-charcoal-400">Last Telemetry Uplink</span>
              <span className="text-honey-400 font-mono">14 seconds ago</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-honey-500/10 border border-honey-500/20 text-xs text-honey-300">
            <p className="flex items-center gap-1.5 font-semibold text-honey-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Edge Cryptography
            </p>
            Telemetry readings are hashed at the gateway and anchored every 6 hours onto HoneyChain test ledger for verifiable environmental compliance.
          </div>
        </Card>
      </div>
    </div>
  );
}
