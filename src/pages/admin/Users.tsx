import { useState, useEffect } from 'react';
import { Users as UsersIcon, UserCheck, Shield, Search, Plus, CheckCircle, Ban } from 'lucide-react';
import Card, { MetricCard } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { PageHeader, SearchBar, Tabs } from '../../components/ui/index';
import { userService } from '../../services/userService';
import { useToast } from '../../contexts/NotificationContext';
import type { User, UserRole } from '../../types';

export default function AdminUsers() {
  const { addToast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleTab, setRoleTab] = useState('all');

  useEffect(() => {
    userService.getAllUsers().then(setUsers);
  }, []);

  const filtered = users
    .filter(u => roleTab === 'all' || u.role === roleTab)
    .filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleVerifyUser = (userId: string, userName: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, verificationStatus: 'verified' } : u));
    addToast('success', 'User Verified', `${userName} has been officially verified on HoneyChain.`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ecosystem User Management"
        subtitle="Manage stakeholder credentials, verify identity documents & administer role authorizations"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Users" value={users.length} icon={<UsersIcon className="w-5 h-5 text-honey-400" />} subtitle="Active participants" />
        <MetricCard label="Verified Stakeholders" value={users.filter(u => u.verificationStatus === 'verified').length} icon={<UserCheck className="w-5 h-5 text-emerald-400" />} subtitle="KYC approved" />
        <MetricCard label="Pending Verifications" value={users.filter(u => u.verificationStatus === 'pending').length} icon={<Shield className="w-5 h-5 text-amber-400" />} subtitle="Needs admin review" />
        <MetricCard label="Enterprise Roles" value="5 Roles" icon={<CheckCircle className="w-5 h-5 text-purple-400" />} subtitle="Role-based access" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search users by name, email..." className="flex-1" />
        <Tabs
          tabs={[
            { id: 'all', label: 'All Users', count: users.length },
            { id: 'beekeeper', label: 'Beekeepers', count: users.filter(u => u.role === 'beekeeper').length },
            { id: 'processor', label: 'Processors', count: users.filter(u => u.role === 'processor').length },
            { id: 'distributor', label: 'Distributors', count: users.filter(u => u.role === 'distributor').length },
            { id: 'consumer', label: 'Consumers', count: users.filter(u => u.role === 'consumer').length },
            { id: 'admin', label: 'Admins', count: users.filter(u => u.role === 'admin').length },
          ]}
          activeTab={roleTab}
          onChange={setRoleTab}
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal-800 text-xs text-charcoal-400">
                <th className="py-3 px-3">User</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Verification</th>
                <th className="py-3 px-3">Registered</th>
                <th className="py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-800/60">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-charcoal-800/30">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-charcoal-800 flex items-center justify-center font-bold text-xs text-honey-400">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{u.name}</p>
                        <p className="text-xs text-charcoal-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-charcoal-800 text-honey-400 capitalize border border-charcoal-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-300">{u.location || 'India'}</td>
                  <td className="py-3.5 px-3">
                    <Badge variant={u.verificationStatus === 'verified' ? 'emerald' : 'amber'} size="sm">
                      {u.verificationStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-charcoal-400">{u.createdAt?.split('T')[0]}</td>
                  <td className="py-3.5 px-3">
                    {u.verificationStatus !== 'verified' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyUser(u.id, u.name)}
                      >
                        Approve KYC
                      </Button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-medium">Verified Active</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
