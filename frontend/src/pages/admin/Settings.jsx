import { useState } from 'react';
import { FaUser, FaLock, FaBell, FaCog, FaGlobe, FaEnvelope, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';

function SettingsSection({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function SettingItem({ icon, title, description, children }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b last:border-0">
      <div className="text-gray-400 mt-1">{icon}</div>
      <div className="flex-grow">
        <h3 className="font-medium text-content-primary">{title}</h3>
        <p className="text-sm text-content-secondary mb-2">{description}</p>
        {children}
      </div>
    </div>
  );
}

export default function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  return (
    <AdminLayout activePage="settings">
      <AdminHeader 
        title="Settings" 
        subtitle="Manage your account settings and preferences"
      />

      {/* Profile Settings */}
      <SettingsSection title="Profile Settings">
        <SettingItem
          icon={<FaUser />}
          title="Personal Information"
          description="Update your personal details and contact information"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary"
              defaultValue="Admin User"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary"
              defaultValue="admin@travel.lk"
            />
          </div>
        </SettingItem>

        <SettingItem
          icon={<FaGlobe />}
          title="Language & Region"
          description="Set your preferred language and regional settings"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary">
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
            <select className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary">
              <option value="LK">Sri Lanka (LKR)</option>
              <option value="US">United States (USD)</option>
            </select>
          </div>
        </SettingItem>
      </SettingsSection>

      {/* Security Settings */}
      <SettingsSection title="Security Settings">
        <SettingItem
          icon={<FaLock />}
          title="Change Password"
          description="Update your password regularly to keep your account secure"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary"
            />
          </div>
        </SettingItem>

        <SettingItem
          icon={<FaLock />}
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-secondary">
              {twoFactorAuth ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
              className="text-2xl text-brand-primary"
            >
              {twoFactorAuth ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </SettingItem>
      </SettingsSection>

      {/* Notification Settings */}
      <SettingsSection title="Notification Preferences">
        <SettingItem
          icon={<FaEnvelope />}
          title="Email Notifications"
          description="Receive updates and alerts via email"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-secondary">
              {emailNotifications ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className="text-2xl text-brand-primary"
            >
              {emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </SettingItem>

        <SettingItem
          icon={<FaBell />}
          title="System Notifications"
          description="Get real-time notifications within the platform"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-secondary">
              {systemNotifications ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={() => setSystemNotifications(!systemNotifications)}
              className="text-2xl text-brand-primary"
            >
              {systemNotifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </SettingItem>
      </SettingsSection>

      {/* System Settings */}
      <SettingsSection title="System Preferences">
        <SettingItem
          icon={<FaCog />}
          title="Data Management"
          description="Configure how the system handles and displays data"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-brand-primary">
              <option value="10">Show 10 items per page</option>
              <option value="25">Show 25 items per page</option>
              <option value="50">Show 50 items per page</option>
              <option value="100">Show 100 items per page</option>
            </select>
          </div>
        </SettingItem>
      </SettingsSection>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <button className="px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark">
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
}
