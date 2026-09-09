import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout, DashboardLayout } from './layouts/index';
import DemoRoleBar from './components/common/DemoRoleBar';

// Public Pages
import Landing from './pages/public/Landing';
import Trace from './pages/public/Trace';
import Verify from './pages/public/Verify';
import Blockchain from './pages/public/Blockchain';
import About from './pages/public/About';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import Profile from './pages/public/Profile';
import NotFound from './pages/public/NotFound';

// Beekeeper Pages
import BeekeeperOverview from './pages/beekeeper/Overview';
import Hives from './pages/beekeeper/Hives';
import HiveDetail from './pages/beekeeper/HiveDetail';
import HiveMonitoring from './pages/beekeeper/Monitoring';
import Harvesting from './pages/beekeeper/Harvesting';
import BeekeeperBatches from './pages/beekeeper/Batches';
import Alerts from './pages/beekeeper/Alerts';
import BeekeeperAnalytics from './pages/beekeeper/Analytics';

// Processor Pages
import ProcessorOverview from './pages/processor/Overview';
import ProcessorIncoming from './pages/processor/Incoming';
import Processing from './pages/processor/Processing';
import QualityTesting from './pages/processor/Quality';
import Completed from './pages/processor/Completed';

// Distributor Pages
import DistributorOverview from './pages/distributor/Overview';
import Shipments from './pages/distributor/Shipments';
import Tracking from './pages/distributor/Tracking';
import Distribution from './pages/distributor/Distribution';
import DistributorHistory from './pages/distributor/History';

// Consumer Pages
import ConsumerOverview from './pages/consumer/Overview';
import ConsumerScans from './pages/consumer/Scans';
import ConsumerHistory from './pages/consumer/History';

// Admin Pages
import AdminOverview from './pages/admin/Overview';
import AdminUsers from './pages/admin/Users';
import AdminBeekeepers from './pages/admin/Beekeepers';
import AdminBatches from './pages/admin/Batches';
import AdminBlockchain from './pages/admin/Blockchain';
import AdminVerifications from './pages/admin/Verifications';
import AdminAnalytics from './pages/admin/Analytics';
import AdminAlerts from './pages/admin/Alerts';
import AdminAudit from './pages/admin/Audit';
import AdminSettings from './pages/admin/Settings';

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes with Full Layout (Navbar + Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/trace" element={<Trace />} />
          <Route path="/trace/:batchId" element={<Trace />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/verify/:batchId" element={<Verify />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard Routes with Sidebar & Topbar */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Beekeeper Portal */}
          <Route path="beekeeper" element={<BeekeeperOverview />} />
          <Route path="hives" element={<Hives />} />
          <Route path="hives/:hiveId" element={<HiveDetail />} />
          <Route path="monitoring" element={<HiveMonitoring />} />
          <Route path="harvesting" element={<Harvesting />} />
          <Route path="batches" element={<BeekeeperBatches />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="analytics" element={<BeekeeperAnalytics />} />

          {/* Processor Portal */}
          <Route path="processor" element={<ProcessorOverview />} />
          <Route path="processor/incoming" element={<ProcessorIncoming />} />
          <Route path="processor/processing" element={<Processing />} />
          <Route path="processor/quality" element={<QualityTesting />} />
          <Route path="processor/completed" element={<Completed />} />

          {/* Distributor Portal */}
          <Route path="distributor" element={<DistributorOverview />} />
          <Route path="distributor/shipments" element={<Shipments />} />
          <Route path="distributor/tracking" element={<Tracking />} />
          <Route path="distributor/distribution" element={<Distribution />} />
          <Route path="distributor/history" element={<DistributorHistory />} />

          {/* Consumer Portal */}
          <Route path="consumer" element={<ConsumerOverview />} />
          <Route path="consumer/scans" element={<ConsumerScans />} />
          <Route path="consumer/history" element={<ConsumerHistory />} />

          {/* Admin Portal */}
          <Route path="admin" element={<AdminOverview />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/beekeepers" element={<AdminBeekeepers />} />
          <Route path="admin/batches" element={<AdminBatches />} />
          <Route path="admin/blockchain" element={<AdminBlockchain />} />
          <Route path="admin/verifications" element={<AdminVerifications />} />
          <Route path="admin/analytics" element={<AdminAnalytics />} />
          <Route path="admin/alerts" element={<AdminAlerts />} />
          <Route path="admin/audit" element={<AdminAudit />} />
          <Route path="admin/settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      {/* Floating Demo Role Switcher for seamless presentation & evaluation */}
      <DemoRoleBar />
    </>
  );
}
