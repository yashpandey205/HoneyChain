// ============================================================
// HoneyChain — Comprehensive Mock Data
// Realistic Indian locations, names, and honey industry data
// ============================================================
import type {
  User, Beekeeper, Hive, HoneyBatch, TraceabilityEvent,
  QualityTest, Alert, Shipment, AuditLogEntry, Notification,
  HiveReading, ChartDataPoint
} from '../types';

// ---- USERS ----
export const mockUsers: User[] = [
  { id: 'u1', name: 'Rajesh Kumar Sharma', email: 'rajesh@honeychain.in', role: 'beekeeper', phone: '+91 98765 43210', location: 'Dehradun, Uttarakhand', verificationStatus: 'verified', createdAt: '2025-03-15T10:30:00Z' },
  { id: 'u2', name: 'Priya Patel', email: 'priya@honeychain.in', role: 'beekeeper', phone: '+91 87654 32109', location: 'Shimla, Himachal Pradesh', verificationStatus: 'verified', createdAt: '2025-04-22T08:15:00Z' },
  { id: 'u3', name: 'Amit Singh Rawat', email: 'amit@honeychain.in', role: 'beekeeper', phone: '+91 76543 21098', location: 'Nainital, Uttarakhand', verificationStatus: 'verified', createdAt: '2025-05-10T14:45:00Z' },
  { id: 'u4', name: 'Sunita Devi', email: 'sunita@honeychain.in', role: 'beekeeper', phone: '+91 65432 10987', location: 'Kullu, Himachal Pradesh', verificationStatus: 'pending', createdAt: '2025-06-18T09:20:00Z' },
  { id: 'u5', name: 'Vikram Joshi', email: 'vikram@processing.in', role: 'processor', phone: '+91 54321 09876', location: 'Haridwar, Uttarakhand', verificationStatus: 'verified', createdAt: '2025-02-10T11:00:00Z' },
  { id: 'u6', name: 'Meera Krishnan', email: 'meera@distribution.in', role: 'distributor', phone: '+91 43210 98765', location: 'Delhi NCR', verificationStatus: 'verified', createdAt: '2025-01-20T16:30:00Z' },
  { id: 'u7', name: 'Ananya Gupta', email: 'ananya@honeychain.in', role: 'admin', phone: '+91 32109 87654', location: 'Bengaluru, Karnataka', verificationStatus: 'verified', createdAt: '2024-12-01T08:00:00Z' },
  { id: 'u8', name: 'Karan Mehta', email: 'karan@consumer.in', role: 'consumer', phone: '+91 21098 76543', location: 'Mumbai, Maharashtra', verificationStatus: 'verified', createdAt: '2026-01-15T12:00:00Z' },
  { id: 'u9', name: 'Deepak Thapa', email: 'deepak@honeychain.in', role: 'beekeeper', phone: '+91 90876 54321', location: 'Kangra, Himachal Pradesh', verificationStatus: 'verified', createdAt: '2025-07-12T07:30:00Z' },
  { id: 'u10', name: 'Lakshmi Narayanan', email: 'lakshmi@honeychain.in', role: 'beekeeper', phone: '+91 80987 65432', location: 'Coorg, Karnataka', verificationStatus: 'verified', createdAt: '2025-08-05T13:15:00Z' },
  { id: 'u11', name: 'Ravi Shankar', email: 'ravi@processing.in', role: 'processor', phone: '+91 71234 56789', location: 'Chandigarh, Punjab', verificationStatus: 'verified', createdAt: '2025-03-25T10:00:00Z' },
  { id: 'u12', name: 'Neha Verma', email: 'neha@distribution.in', role: 'distributor', phone: '+91 62345 67890', location: 'Jaipur, Rajasthan', verificationStatus: 'verified', createdAt: '2025-05-30T15:45:00Z' },
];

// ---- BEEKEEPERS ----
export const mockBeekeepers: Beekeeper[] = [
  { id: 'bk1', userId: 'u1', farmName: 'Sharma Apiaries', location: 'Dehradun, Uttarakhand', state: 'Uttarakhand', numberOfColonies: 85, verificationStatus: 'verified', registeredAt: '2025-03-15T10:30:00Z' },
  { id: 'bk2', userId: 'u2', farmName: 'Himalayan Bee Farm', location: 'Shimla, Himachal Pradesh', state: 'Himachal Pradesh', numberOfColonies: 120, verificationStatus: 'verified', registeredAt: '2025-04-22T08:15:00Z' },
  { id: 'bk3', userId: 'u3', farmName: 'Kumaon Honey Works', location: 'Nainital, Uttarakhand', state: 'Uttarakhand', numberOfColonies: 65, verificationStatus: 'verified', registeredAt: '2025-05-10T14:45:00Z' },
  { id: 'bk4', userId: 'u4', farmName: 'Kullu Valley Apiaries', location: 'Kullu, Himachal Pradesh', state: 'Himachal Pradesh', numberOfColonies: 40, verificationStatus: 'pending', registeredAt: '2025-06-18T09:20:00Z' },
  { id: 'bk5', userId: 'u9', farmName: 'Kangra Bee Collective', location: 'Kangra, Himachal Pradesh', state: 'Himachal Pradesh', numberOfColonies: 95, verificationStatus: 'verified', registeredAt: '2025-07-12T07:30:00Z' },
  { id: 'bk6', userId: 'u10', farmName: 'Western Ghats Honey', location: 'Coorg, Karnataka', state: 'Karnataka', numberOfColonies: 110, verificationStatus: 'verified', registeredAt: '2025-08-05T13:15:00Z' },
];

// ---- HIVES ----
export const mockHives: Hive[] = [
  { id: 'h1', beekeeperId: 'bk1', name: 'Hive Alpha-01', location: 'Mussoorie Foothills', latitude: 30.4598, longitude: 78.0644, temperature: 34.2, humidity: 62, weight: 28.5, activity: 82, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:30:00Z', installedAt: '2025-04-01T08:00:00Z' },
  { id: 'h2', beekeeperId: 'bk1', name: 'Hive Alpha-02', location: 'Mussoorie Foothills', latitude: 30.4602, longitude: 78.0648, temperature: 35.8, humidity: 58, weight: 32.1, activity: 91, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:30:00Z', installedAt: '2025-04-01T08:00:00Z' },
  { id: 'h3', beekeeperId: 'bk1', name: 'Hive Alpha-03', location: 'Rajpur Valley', latitude: 30.3860, longitude: 78.0520, temperature: 37.5, humidity: 70, weight: 22.3, activity: 45, healthStatus: 'warning', lastUpdated: '2026-09-05T14:28:00Z', installedAt: '2025-05-15T08:00:00Z' },
  { id: 'h4', beekeeperId: 'bk1', name: 'Hive Alpha-04', location: 'Rajpur Valley', latitude: 30.3865, longitude: 78.0525, temperature: 39.1, humidity: 75, weight: 18.7, activity: 22, healthStatus: 'critical', lastUpdated: '2026-09-05T14:25:00Z', installedAt: '2025-05-15T08:00:00Z' },
  { id: 'h5', beekeeperId: 'bk2', name: 'Hive Beta-01', location: 'Shimla Ridge', latitude: 31.1048, longitude: 77.1734, temperature: 33.5, humidity: 65, weight: 30.2, activity: 88, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:30:00Z', installedAt: '2025-04-20T08:00:00Z' },
  { id: 'h6', beekeeperId: 'bk2', name: 'Hive Beta-02', location: 'Kufri Meadows', latitude: 31.0980, longitude: 77.2620, temperature: 32.8, humidity: 68, weight: 26.8, activity: 76, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:29:00Z', installedAt: '2025-04-20T08:00:00Z' },
  { id: 'h7', beekeeperId: 'bk3', name: 'Hive Gamma-01', location: 'Bhimtal Lake Area', latitude: 29.3471, longitude: 79.5630, temperature: 34.0, humidity: 60, weight: 29.5, activity: 85, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:30:00Z', installedAt: '2025-06-01T08:00:00Z' },
  { id: 'h8', beekeeperId: 'bk5', name: 'Hive Delta-01', location: 'Kangra Valley', latitude: 32.0998, longitude: 76.2691, temperature: 33.2, humidity: 63, weight: 31.0, activity: 90, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:30:00Z', installedAt: '2025-08-01T08:00:00Z' },
  { id: 'h9', beekeeperId: 'bk6', name: 'Hive Epsilon-01', location: 'Coorg Estates', latitude: 12.3375, longitude: 75.8069, temperature: 31.5, humidity: 72, weight: 27.3, activity: 79, healthStatus: 'healthy', lastUpdated: '2026-09-05T14:30:00Z', installedAt: '2025-09-01T08:00:00Z' },
  { id: 'h10', beekeeperId: 'bk6', name: 'Hive Epsilon-02', location: 'Coorg Estates', latitude: 12.3380, longitude: 75.8075, temperature: 36.2, humidity: 78, weight: 20.1, activity: 38, healthStatus: 'warning', lastUpdated: '2026-09-05T14:28:00Z', installedAt: '2025-09-01T08:00:00Z' },
];

// ---- HONEY BATCHES ----
export const mockHoneyBatches: HoneyBatch[] = [
  { id: 'b1', batchId: 'HC-2026-IND-000128', honeyType: 'Multifloral', floralSource: 'Wildflower, Litchi, Mustard', harvestDate: '2026-07-15', origin: 'Dehradun, Uttarakhand', state: 'Uttarakhand', beekeeperId: 'bk1', beekeeperName: 'Rajesh Kumar Sharma', processingFacility: 'HoneyPure Processing, Haridwar', packagingDate: '2026-08-02', quantity: 250, currentStage: 'distribution', qualityStatus: 'passed', blockchainStatus: 'recorded', qualityScore: 94, createdAt: '2026-07-15T10:00:00Z' },
  { id: 'b2', batchId: 'HC-2026-IND-000129', honeyType: 'Litchi', floralSource: 'Litchi', harvestDate: '2026-07-20', origin: 'Shimla, Himachal Pradesh', state: 'Himachal Pradesh', beekeeperId: 'bk2', beekeeperName: 'Priya Patel', processingFacility: 'HoneyPure Processing, Haridwar', packagingDate: '2026-08-05', quantity: 180, currentStage: 'packaging', qualityStatus: 'passed', blockchainStatus: 'recorded', qualityScore: 97, createdAt: '2026-07-20T09:00:00Z' },
  { id: 'b3', batchId: 'HC-2026-IND-000130', honeyType: 'Mustard', floralSource: 'Mustard', harvestDate: '2026-06-10', origin: 'Nainital, Uttarakhand', state: 'Uttarakhand', beekeeperId: 'bk3', beekeeperName: 'Amit Singh Rawat', processingFacility: 'Kumaon Processing Unit', packagingDate: '2026-06-28', quantity: 150, currentStage: 'delivered', qualityStatus: 'passed', blockchainStatus: 'recorded', qualityScore: 91, createdAt: '2026-06-10T11:00:00Z' },
  { id: 'b4', batchId: 'HC-2026-IND-000131', honeyType: 'Acacia', floralSource: 'Acacia, Wild herbs', harvestDate: '2026-08-01', origin: 'Kangra, Himachal Pradesh', state: 'Himachal Pradesh', beekeeperId: 'bk5', beekeeperName: 'Deepak Thapa', processingFacility: 'Mountain Honey Processing, Chandigarh', packagingDate: '2026-08-18', quantity: 320, currentStage: 'processing', qualityStatus: 'pending', blockchainStatus: 'recorded', qualityScore: 0, createdAt: '2026-08-01T07:30:00Z' },
  { id: 'b5', batchId: 'HC-2026-IND-000132', honeyType: 'Coffee Blossom', floralSource: 'Coffee', harvestDate: '2026-08-10', origin: 'Coorg, Karnataka', state: 'Karnataka', beekeeperId: 'bk6', beekeeperName: 'Lakshmi Narayanan', processingFacility: 'Western Ghats Processing', packagingDate: '2026-08-28', quantity: 200, currentStage: 'quality_testing', qualityStatus: 'pending', blockchainStatus: 'pending', qualityScore: 0, createdAt: '2026-08-10T13:00:00Z' },
  { id: 'b6', batchId: 'HC-2026-IND-000133', honeyType: 'Eucalyptus', floralSource: 'Eucalyptus', harvestDate: '2026-05-25', origin: 'Dehradun, Uttarakhand', state: 'Uttarakhand', beekeeperId: 'bk1', beekeeperName: 'Rajesh Kumar Sharma', processingFacility: 'HoneyPure Processing, Haridwar', packagingDate: '2026-06-12', quantity: 175, currentStage: 'delivered', qualityStatus: 'passed', blockchainStatus: 'recorded', qualityScore: 89, createdAt: '2026-05-25T08:00:00Z' },
  { id: 'b7', batchId: 'HC-2026-IND-000134', honeyType: 'Wildflower', floralSource: 'Mixed Wildflower', harvestDate: '2026-08-20', origin: 'Shimla, Himachal Pradesh', state: 'Himachal Pradesh', beekeeperId: 'bk2', beekeeperName: 'Priya Patel', processingFacility: 'HoneyPure Processing, Haridwar', packagingDate: '', quantity: 280, currentStage: 'harvested', qualityStatus: 'pending', blockchainStatus: 'pending', qualityScore: 0, createdAt: '2026-08-20T06:45:00Z' },
  { id: 'b8', batchId: 'HC-2026-IND-000135', honeyType: 'Sidr', floralSource: 'Sidr (Jujube)', harvestDate: '2026-04-15', origin: 'Jammu, J&K', state: 'Jammu & Kashmir', beekeeperId: 'bk5', beekeeperName: 'Deepak Thapa', processingFacility: 'Mountain Honey Processing, Chandigarh', packagingDate: '2026-05-01', quantity: 100, currentStage: 'delivered', qualityStatus: 'passed', blockchainStatus: 'recorded', qualityScore: 98, createdAt: '2026-04-15T09:00:00Z' },
];

// ---- TRACEABILITY EVENTS (for batch HC-2026-IND-000128) ----
export const mockTraceabilityEvents: TraceabilityEvent[] = [
  { id: 'te1', batchId: 'HC-2026-IND-000128', stage: 'hive_registered', title: 'Hive Registration', description: 'Hive Alpha-01 registered at Mussoorie Foothills. Colony health verified and monitoring sensors activated.', timestamp: '2025-04-01T08:00:00Z', location: 'Mussoorie Foothills, Dehradun', stakeholder: 'Rajesh Kumar Sharma', stakeholderRole: 'beekeeper', transactionId: '0x7a3f...e8b2', blockNumber: 1, previousHash: '0x0000...0000', currentHash: '0x1a2b...3c4d', verified: true },
  { id: 'te2', batchId: 'HC-2026-IND-000128', stage: 'harvested', title: 'Honey Harvested', description: '250 kg multifloral honey harvested from Hive Alpha-01 and Alpha-02. Optimal moisture levels confirmed at extraction.', timestamp: '2026-07-15T06:30:00Z', location: 'Mussoorie Foothills, Dehradun', stakeholder: 'Rajesh Kumar Sharma', stakeholderRole: 'beekeeper', transactionId: '0x8b4e...f9c3', blockNumber: 2, previousHash: '0x1a2b...3c4d', currentHash: '0x2d4f...5e6g', verified: true },
  { id: 'te3', batchId: 'HC-2026-IND-000128', stage: 'quality_testing', title: 'Quality Testing', description: 'Batch tested at FSSAI-certified laboratory. Moisture 17.2%, HMF 12.5 mg/kg, purity verified. No adulteration detected.', timestamp: '2026-07-22T10:15:00Z', location: 'National Honey Testing Lab, Dehradun', stakeholder: 'Dr. Sanjay Mishra', stakeholderRole: 'processor', transactionId: '0x9c5f...0ad4', blockNumber: 3, previousHash: '0x2d4f...5e6g', currentHash: '0x3e6h...7i8j', verified: true },
  { id: 'te4', batchId: 'HC-2026-IND-000128', stage: 'processing', title: 'Processing Completed', description: 'Honey filtered, pasteurized at controlled temperature, and prepared for packaging. Batch integrity maintained.', timestamp: '2026-07-28T14:00:00Z', location: 'HoneyPure Processing, Haridwar', stakeholder: 'Vikram Joshi', stakeholderRole: 'processor', transactionId: '0xad6g...1be5', blockNumber: 4, previousHash: '0x3e6h...7i8j', currentHash: '0x4f7i...8k9l', verified: true },
  { id: 'te5', batchId: 'HC-2026-IND-000128', stage: 'packaging', title: 'Packaging & QR Generation', description: '250 kg packaged into 500g and 1kg jars. Unique QR code generated and applied to each jar. Batch ID: HC-2026-IND-000128.', timestamp: '2026-08-02T09:30:00Z', location: 'HoneyPure Processing, Haridwar', stakeholder: 'Vikram Joshi', stakeholderRole: 'processor', transactionId: '0xbe7h...2cf6', blockNumber: 5, previousHash: '0x4f7i...8k9l', currentHash: '0x5g8j...9m0n', verified: true },
  { id: 'te6', batchId: 'HC-2026-IND-000128', stage: 'distribution', title: 'Dispatched for Distribution', description: 'Batch dispatched from Haridwar facility to Delhi NCR distribution center. Temperature-controlled transport.', timestamp: '2026-08-10T07:00:00Z', location: 'Delhi NCR Distribution Hub', stakeholder: 'Meera Krishnan', stakeholderRole: 'distributor', transactionId: '0xcf8i...3dg7', blockNumber: 6, previousHash: '0x5g8j...9m0n', currentHash: '0x6h9k...0o1p', verified: true },
];

// ---- QUALITY TESTS ----
export const mockQualityTests: Record<string, QualityTest> = {
  'HC-2026-IND-000128': { id: 'qt1', batchId: 'HC-2026-IND-000128', moisture: 17.2, hmf: 12.5, purity: 'verified', adulterationTest: 'passed', pollenAnalysis: 'verified', overallResult: 'passed', testedAt: '2026-07-22T10:15:00Z', laboratory: 'National Honey Testing Lab, Dehradun', certificationId: 'FSSAI-HQ-2026-0451' },
  'HC-2026-IND-000129': { id: 'qt2', batchId: 'HC-2026-IND-000129', moisture: 16.8, hmf: 10.2, purity: 'verified', adulterationTest: 'passed', pollenAnalysis: 'verified', overallResult: 'passed', testedAt: '2026-07-28T11:00:00Z', laboratory: 'Himalayan Food Safety Lab, Shimla', certificationId: 'FSSAI-HQ-2026-0467' },
  'HC-2026-IND-000130': { id: 'qt3', batchId: 'HC-2026-IND-000130', moisture: 18.1, hmf: 15.3, purity: 'verified', adulterationTest: 'passed', pollenAnalysis: 'verified', overallResult: 'passed', testedAt: '2026-06-18T09:30:00Z', laboratory: 'Kumaon Testing Facility, Nainital', certificationId: 'FSSAI-HQ-2026-0398' },
  'HC-2026-IND-000135': { id: 'qt4', batchId: 'HC-2026-IND-000135', moisture: 15.5, hmf: 8.1, purity: 'verified', adulterationTest: 'passed', pollenAnalysis: 'verified', overallResult: 'passed', testedAt: '2026-04-22T14:00:00Z', laboratory: 'Kashmir Honey Testing Lab, Jammu', certificationId: 'FSSAI-HQ-2026-0312' },
};

// ---- ALERTS ----
export const mockAlerts: Alert[] = [
  { id: 'a1', hiveId: 'h4', hiveName: 'Hive Alpha-04', type: 'temperature', severity: 'critical', message: 'Temperature is significantly above the configured normal range (39.1°C). Immediate inspection recommended.', recommendation: 'Check for direct sunlight exposure. Ensure ventilation is adequate. Consider adding shade structure. Inspect for possible disease.', createdAt: '2026-09-05T14:25:00Z', status: 'active' },
  { id: 'a2', hiveId: 'h4', hiveName: 'Hive Alpha-04', type: 'activity', severity: 'critical', message: 'Reduced bee activity detected (22%) compared with recent readings. Colony may be under stress.', recommendation: 'Inspect hive for queen presence. Check for pests (Varroa mites). Evaluate food supply. Consider supplemental feeding.', createdAt: '2026-09-05T14:25:00Z', status: 'active' },
  { id: 'a3', hiveId: 'h3', hiveName: 'Hive Alpha-03', type: 'weight', severity: 'warning', message: 'Hive weight has decreased by 15% over the past 7 days. Possible honey consumption or robbing.', recommendation: 'Monitor for signs of robbing from other colonies. Check food reserves. Consider supplemental feeding if nectar flow is low.', createdAt: '2026-09-05T12:00:00Z', status: 'active' },
  { id: 'a4', hiveId: 'h10', hiveName: 'Hive Epsilon-02', type: 'humidity', severity: 'warning', message: 'Humidity levels are elevated (78%). This may affect honey quality and promote mold growth.', recommendation: 'Improve hive ventilation. Check for water leaks. Ensure entrance is not blocked.', createdAt: '2026-09-05T10:30:00Z', status: 'active' },
  { id: 'a5', hiveId: 'h2', hiveName: 'Hive Alpha-02', type: 'harvest', severity: 'info', message: 'Hive weight suggests possible harvesting readiness. Current weight: 32.1 kg.', recommendation: 'Inspect honey frames for capping percentage. If >80% capped, harvest is recommended.', createdAt: '2026-09-04T16:00:00Z', status: 'acknowledged' },
  { id: 'a6', hiveId: 'h8', hiveName: 'Hive Delta-01', type: 'pattern', severity: 'info', message: 'Unusual flight pattern detected during evening hours. This may indicate orientation flights from new foragers.', recommendation: 'No immediate action required. Monitor for repeat occurrences.', createdAt: '2026-09-03T18:45:00Z', status: 'resolved' },
];

// ---- SHIPMENTS ----
export const mockShipments: Shipment[] = [
  { id: 's1', batchId: 'b1', batchDisplayId: 'HC-2026-IND-000128', origin: 'HoneyPure Processing, Haridwar', destination: 'Delhi NCR Distribution Hub', dispatchedAt: '2026-08-10T07:00:00Z', estimatedArrival: '2026-08-11T18:00:00Z', currentLocation: 'Delhi NCR Distribution Hub', status: 'at_distribution_center', distributorId: 'u6', distributorName: 'Meera Krishnan' },
  { id: 's2', batchId: 'b2', batchDisplayId: 'HC-2026-IND-000129', origin: 'HoneyPure Processing, Haridwar', destination: 'Mumbai Central Warehouse', dispatchedAt: '2026-08-12T06:00:00Z', estimatedArrival: '2026-08-14T20:00:00Z', currentLocation: 'En route — Jaipur Highway', status: 'in_transit', distributorId: 'u12', distributorName: 'Neha Verma' },
  { id: 's3', batchId: 'b3', batchDisplayId: 'HC-2026-IND-000130', origin: 'Kumaon Processing Unit', destination: 'Bengaluru Organic Store', dispatchedAt: '2026-07-05T08:00:00Z', estimatedArrival: '2026-07-08T17:00:00Z', currentLocation: 'Bengaluru Organic Store', status: 'delivered', distributorId: 'u6', distributorName: 'Meera Krishnan' },
  { id: 's4', batchId: 'b6', batchDisplayId: 'HC-2026-IND-000133', origin: 'HoneyPure Processing, Haridwar', destination: 'Pune Retail Network', dispatchedAt: '2026-06-20T07:30:00Z', estimatedArrival: '2026-06-23T16:00:00Z', currentLocation: 'Pune Retail Network', status: 'delivered', distributorId: 'u12', distributorName: 'Neha Verma' },
  { id: 's5', batchId: 'b8', batchDisplayId: 'HC-2026-IND-000135', origin: 'Mountain Honey Processing, Chandigarh', destination: 'Delhi Premium Stores', dispatchedAt: '2026-05-10T06:00:00Z', estimatedArrival: '2026-05-11T14:00:00Z', currentLocation: 'Delhi Premium Stores', status: 'delivered', distributorId: 'u6', distributorName: 'Meera Krishnan' },
];

// ---- AUDIT LOG ----
export const mockAuditLog: AuditLogEntry[] = [
  { id: 'al1', userId: 'u1', userName: 'Rajesh Kumar Sharma', userRole: 'beekeeper', action: 'CREATE', entity: 'HoneyBatch', entityId: 'b1', details: 'Created honey batch HC-2026-IND-000128 — 250 kg Multifloral honey', timestamp: '2026-07-15T10:00:00Z', transactionId: '0x8b4e...f9c3', ipAddress: '103.42.xx.xx' },
  { id: 'al2', userId: 'u5', userName: 'Vikram Joshi', userRole: 'processor', action: 'UPDATE', entity: 'HoneyBatch', entityId: 'b1', details: 'Quality testing completed for batch HC-2026-IND-000128. Result: Passed', timestamp: '2026-07-22T10:15:00Z', transactionId: '0x9c5f...0ad4', ipAddress: '103.42.xx.xx' },
  { id: 'al3', userId: 'u5', userName: 'Vikram Joshi', userRole: 'processor', action: 'UPDATE', entity: 'HoneyBatch', entityId: 'b1', details: 'Processing completed for batch HC-2026-IND-000128', timestamp: '2026-07-28T14:00:00Z', transactionId: '0xad6g...1be5', ipAddress: '103.42.xx.xx' },
  { id: 'al4', userId: 'u5', userName: 'Vikram Joshi', userRole: 'processor', action: 'UPDATE', entity: 'HoneyBatch', entityId: 'b1', details: 'Packaging completed. QR codes generated for batch HC-2026-IND-000128', timestamp: '2026-08-02T09:30:00Z', transactionId: '0xbe7h...2cf6', ipAddress: '103.42.xx.xx' },
  { id: 'al5', userId: 'u6', userName: 'Meera Krishnan', userRole: 'distributor', action: 'CREATE', entity: 'Shipment', entityId: 's1', details: 'Shipment created for batch HC-2026-IND-000128 — Haridwar → Delhi NCR', timestamp: '2026-08-10T07:00:00Z', transactionId: '0xcf8i...3dg7', ipAddress: '103.42.xx.xx' },
  { id: 'al6', userId: 'u7', userName: 'Ananya Gupta', userRole: 'admin', action: 'VERIFY', entity: 'Beekeeper', entityId: 'bk1', details: 'Beekeeper Rajesh Kumar Sharma verified. Farm: Sharma Apiaries', timestamp: '2025-03-20T10:00:00Z', ipAddress: '103.42.xx.xx' },
  { id: 'al7', userId: 'u2', userName: 'Priya Patel', userRole: 'beekeeper', action: 'CREATE', entity: 'HoneyBatch', entityId: 'b2', details: 'Created honey batch HC-2026-IND-000129 — 180 kg Litchi honey', timestamp: '2026-07-20T09:00:00Z', transactionId: '0xdf9j...4eh8', ipAddress: '103.42.xx.xx' },
  { id: 'al8', userId: 'u7', userName: 'Ananya Gupta', userRole: 'admin', action: 'VERIFY', entity: 'HoneyBatch', entityId: 'b3', details: 'Batch HC-2026-IND-000130 blockchain record verified', timestamp: '2026-06-30T15:00:00Z', ipAddress: '103.42.xx.xx' },
];

// ---- NOTIFICATIONS ----
export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'alert', title: 'Critical Alert: Hive Alpha-04', message: 'Temperature exceeds normal range. Immediate inspection recommended.', timestamp: '2026-09-05T14:25:00Z', read: false, link: '/dashboard/hives/h4' },
  { id: 'n2', type: 'alert', title: 'Warning: Hive Alpha-03', message: 'Hive weight decreased by 15% in the past 7 days.', timestamp: '2026-09-05T12:00:00Z', read: false, link: '/dashboard/hives/h3' },
  { id: 'n3', type: 'verification', title: 'Batch Verified', message: 'Batch HC-2026-IND-000128 blockchain verification complete.', timestamp: '2026-08-10T08:00:00Z', read: true, link: '/batch/HC-2026-IND-000128' },
  { id: 'n4', type: 'quality', title: 'Quality Test Passed', message: 'Batch HC-2026-IND-000129 passed all quality parameters.', timestamp: '2026-07-28T11:30:00Z', read: true, link: '/batch/HC-2026-IND-000129' },
  { id: 'n5', type: 'shipment', title: 'Shipment Dispatched', message: 'Batch HC-2026-IND-000128 dispatched to Delhi NCR.', timestamp: '2026-08-10T07:15:00Z', read: true, link: '/batch/HC-2026-IND-000128' },
  { id: 'n6', type: 'blockchain', title: 'Blockchain Record Created', message: 'New block #006 created for batch HC-2026-IND-000128.', timestamp: '2026-08-10T07:05:00Z', read: true },
];

// ---- HIVE READINGS (for charts) ----
export function generateHiveReadings(hours: number = 24): HiveReading[] {
  const readings: HiveReading[] = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const baseTemp = 34 + Math.sin(i / 4) * 2;
    const baseHumidity = 62 + Math.cos(i / 3) * 5;
    const baseWeight = 28.5 + Math.sin(i / 12) * 0.5;
    const baseActivity = 70 + Math.sin(i / 6) * 20;
    readings.push({
      timestamp: timestamp.toISOString(),
      temperature: Math.round((baseTemp + (Math.random() - 0.5) * 1.5) * 10) / 10,
      humidity: Math.round(baseHumidity + (Math.random() - 0.5) * 3),
      weight: Math.round((baseWeight + (Math.random() - 0.5) * 0.3) * 10) / 10,
      activity: Math.max(0, Math.min(100, Math.round(baseActivity + (Math.random() - 0.5) * 10))),
    });
  }
  return readings;
}

// ---- CHART DATA ----
export const monthlyProductionData: ChartDataPoint[] = [
  { name: 'Jan', value: 420 }, { name: 'Feb', value: 380 },
  { name: 'Mar', value: 510 }, { name: 'Apr', value: 620 },
  { name: 'May', value: 780 }, { name: 'Jun', value: 890 },
  { name: 'Jul', value: 950 }, { name: 'Aug', value: 870 },
  { name: 'Sep', value: 720 }, { name: 'Oct', value: 580 },
  { name: 'Nov', value: 450 }, { name: 'Dec', value: 390 },
];

export const batchVerificationData: ChartDataPoint[] = [
  { name: 'Jan', value: 45, value2: 42 }, { name: 'Feb', value: 52, value2: 48 },
  { name: 'Mar', value: 61, value2: 58 }, { name: 'Apr', value: 74, value2: 70 },
  { name: 'May', value: 85, value2: 82 }, { name: 'Jun', value: 92, value2: 88 },
  { name: 'Jul', value: 108, value2: 103 }, { name: 'Aug', value: 96, value2: 91 },
];

export const regionalProductionData: ChartDataPoint[] = [
  { name: 'Uttarakhand', value: 3200 },
  { name: 'Himachal Pradesh', value: 2800 },
  { name: 'Karnataka', value: 1500 },
  { name: 'Jammu & Kashmir', value: 1200 },
  { name: 'Punjab', value: 980 },
  { name: 'Maharashtra', value: 750 },
  { name: 'Rajasthan', value: 620 },
];

export const DEMO_STATS = {
  verifiedBatches: 12840,
  registeredBeekeepers: 2450,
  activeColonies: 18720,
  traceabilityRecords: 94500,
};
