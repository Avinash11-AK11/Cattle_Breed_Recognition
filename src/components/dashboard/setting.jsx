import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Save, ArrowLeft, User, Shield, Bell, Database, 
  Download, Upload, Wifi, WifiOff, Globe, Moon,
  Sun, Smartphone, HelpCircle, LogOut, Trash2,
  Eye, EyeOff, Key, Mail, UserCheck, Clock, Phone
} from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { signOut, user, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    breedIdentifications: true,
    newFeatures: false,
    vaccinationReminders: true,
    systemUpdates: true,
    weeklyReports: false
  });
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: true,
    locationTracking: false,
    analytics: true,
    personalizedAds: false
  });
  const [appearance, setAppearance] = useState('light');
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.full_name || 'Rajesh Kumar',
    email: user?.email || 'rajesh.kumar@bpa.gov.in',
    phone: user?.phone || '+91 9876543210',
    region: 'Gujarat',
    role: 'Field Level Worker',
    employeeId: 'FLW-24680',
    joinedDate: '2023-05-15'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleNotificationToggle = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePrivacyToggle = (key) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key]
    });
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    alert('Profile updated successfully!');
  };

  const handleChangePassword = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    try {
      await updatePassword(passwordData.newPassword);
      alert('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      alert('Failed to change password. Please try again.');
      console.error('Password change error:', error);
    }
  };

  const handleExportData = () => {
    // Export data logic here
    alert('Data export initiated. You will receive an email shortly.');
  };

  const handleDeleteAccount = () => {
    // Delete account logic here
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request received. Our team will contact you shortly.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-green-600 hover:text-green-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id 
                          ? 'bg-green-100 text-green-700 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    <select
                      value={profileData.region}
                      onChange={(e) => setProfileData({...profileData, region: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Rajasthan</option>
                      <option>Punjab</option>
                      <option>Haryana</option>
                      <option>Uttar Pradesh</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Account Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Role</p>
                      <p className="font-medium">{profileData.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Employee ID</p>
                      <p className="font-medium">{profileData.employeeId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Joined Date</p>
                      <p className="font-medium">{profileData.joinedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium text-green-600">Active</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={handleSaveProfile}
                    className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Breed Identifications</h3>
                      <p className="text-sm text-gray-600">Get notified when breed identification is completed</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.breedIdentifications}
                        onChange={() => handleNotificationToggle('breedIdentifications')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">New Features</h3>
                      <p className="text-sm text-gray-600">Get notified about new app features and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.newFeatures}
                        onChange={() => handleNotificationToggle('newFeatures')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Vaccination Reminders</h3>
                      <p className="text-sm text-gray-600">Get reminders for animal vaccination schedules</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.vaccinationReminders}
                        onChange={() => handleNotificationToggle('vaccinationReminders')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">System Updates</h3>
                      <p className="text-sm text-gray-600">Get notified about important system updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.systemUpdates}
                        onChange={() => handleNotificationToggle('systemUpdates')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Weekly Reports</h3>
                      <p className="text-sm text-gray-600">Receive weekly reports of your activities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={notifications.weeklyReports}
                        onChange={() => handleNotificationToggle('weeklyReports')}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={() => alert('Notification preferences saved!')}
                    className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy & Security</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <button 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-9 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleChangePassword}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Key className="h-4 w-4" />
                      <span>Change Password</span>
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">Data Sharing for Research</h3>
                          <p className="text-sm text-gray-600">Allow anonymous data to be used for agricultural research</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={privacySettings.dataSharing}
                            onChange={() => handlePrivacyToggle('dataSharing')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">Location Tracking</h3>
                          <p className="text-sm text-gray-600">Allow app to access your location for field work</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={privacySettings.locationTracking}
                            onChange={() => handlePrivacyToggle('locationTracking')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-800">Usage Analytics</h3>
                          <p className="text-sm text-gray-600">Help us improve by sharing usage analytics</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={privacySettings.analytics}
                            onChange={() => handlePrivacyToggle('analytics')}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-blue-800">Enhanced Security</h3>
                        <p className="text-sm text-blue-600">Protect your account with an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Management Settings */}
            {activeTab === 'data' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Data Management</h2>
                
                <div className="space-y-6">
                  <div className="p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Download className="h-5 w-5 mr-2 text-green-600" />
                      Export Data
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of your data including breed identifications, reports, and account information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <button className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <span>JSON Format</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <span>CSV Format</span>
                      </button>
                    </div>
                    <button 
                      onClick={handleExportData}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="h-5 w-5" />
                      <span>Export All Data</span>
                    </button>
                  </div>

                  <div className="p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-600" />
                      Data Storage
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage how much data is stored on your device and in the cloud.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Storage Usage</span>
                        <span className="text-sm text-gray-600">1.2 GB of 5 GB used</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Trash2 className="h-5 w-5 text-gray-600" />
                      <span>Clear Cache</span>
                    </button>
                  </div>

                  <div className="p-5 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-800 mb-3 flex items-center">
                      <Trash2 className="h-5 w-5 mr-2 text-red-600" />
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button 
                      onClick={handleDeleteAccount}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Delete My Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          appearance === 'light' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setAppearance('light')}
                      >
                        <div className="flex items-center mb-3">
                          <Sun className={`h-5 w-5 mr-2 ${appearance === 'light' ? 'text-green-600' : 'text-gray-600'}`} />
                          <span className={`font-medium ${appearance === 'light' ? 'text-green-700' : 'text-gray-700'}`}>Light</span>
                        </div>
                        <div className="h-20 bg-gradient-to-br from-white to-gray-100 rounded border border-gray-200"></div>
                      </div>

                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          appearance === 'dark' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setAppearance('dark')}
                      >
                        <div className="flex items-center mb-3">
                          <Moon className={`h-5 w-5 mr-2 ${appearance === 'dark' ? 'text-green-600' : 'text-gray-600'}`} />
                          <span className={`font-medium ${appearance === 'dark' ? 'text-green-700' : 'text-gray-700'}`}>Dark</span>
                        </div>
                        <div className="h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded border border-gray-700"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Font Size</h3>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Small</span>
                      <div className="flex-1">
                        <input 
                          type="range" 
                          min="1" 
                          max="3" 
                          defaultValue="2"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Large</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Language</h3>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Gujarati</option>
                      <option>Marathi</option>
                      <option>Punjabi</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Help & Support Settings */}
            {activeTab === 'help' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Help & Support</h2>
                
                <div className="space-y-6">
                  <div className="p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">FAQs & Documentation</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Find answers to common questions and learn how to use the Bharat Pashudhan App effectively.
                    </p>
                    <button className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <HelpCircle className="h-5 w-5 text-gray-600" />
                      <span>View Help Center</span>
                    </button>
                  </div>

                  <div className="p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">Contact Support</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get in touch with our support team for assistance with any issues you're experiencing.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Mail className="h-5 w-5 text-gray-600" />
                        <span>Email Support</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Phone className="h-5 w-5 text-gray-600" />
                        <span>Call Support</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">App Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Version</span>
                        <span className="font-medium">2.4.1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-medium">September 5, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Developer</span>
                        <span className="font-medium">Bharat Pashudhan Team</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">App Feedback</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We'd love to hear your thoughts and suggestions to improve the app.
                    </p>
                    <button className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <span>Submit Feedback</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;