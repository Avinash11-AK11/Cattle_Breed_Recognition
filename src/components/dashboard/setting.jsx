import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, Database, Download, Trash2,
  Moon, Smartphone, Save, User, Bell, Shield
} from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('data');
  const [fontSize, setFontSize] = useState(2);
  const [language, setLanguage] = useState('English');

  const handleExportData = () => {
    alert('Data export initiated. You will receive an email shortly.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion request received. Our team will contact you shortly.');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleSavePreferences = () => {
    alert('Preferences saved successfully!');
  };

  const tabs = [
    { id: 'data', label: 'Data', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Moon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-inter">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors p-2 rounded-lg bg-white shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Settings</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
              <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user?.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-700 mb-4 px-1">Settings</h2>
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id 
                          ? 'bg-green-50 text-green-700 font-semibold' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-5 border-t border-gray-200">
                <div className="flex items-center px-3 py-3 bg-blue-50 rounded-lg mb-2">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-800">App Version</p>
                    <p className="text-xs text-blue-600">v2.4.1</p>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Data Management Settings */}
            {activeTab === 'data' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-600" />
                  Data Management
                </h2>
                <p className="text-gray-500 text-sm mb-6">Manage your app data and storage</p>
                
                <div className="space-y-5">
                  <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Download className="h-5 w-5 mr-2 text-green-600" />
                      Export Data
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of your data including breed identifications and reports.
                    </p>
                    <button 
                      onClick={handleExportData}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export All Data</span>
                    </button>
                  </div>


                  <div className="p-5 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-800 mb-3 flex items-center">
                      <Trash2 className="h-5 w-5 mr-2 text-red-600" />
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-600 mb-4">
                      Permanently delete your account and all associated data.
                    </p>
                    <button 
                      onClick={handleDeleteAccount}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete My Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
                  <Moon className="h-5 w-5 mr-2 text-green-600" />
                  Appearance
                </h2>
                <p className="text-gray-500 text-sm mb-6">Customize how the app looks</p>
                
                <div className="space-y-6">
                  

                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Language</h3>
                    <div className="bg-gray-50 p-1 rounded-lg">
                      <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 border-0 bg-transparent focus:ring-2 focus:ring-green-500 rounded-lg"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Gujarati</option>
                        <option>Marathi</option>
                        <option>Punjabi</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={handleSavePreferences}
                      className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-green-600" />
                  Notifications
                </h2>
                <p className="text-gray-500 text-sm mb-6">Manage your notification preferences</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Push Notifications</h3>
                      <p className="text-sm text-gray-600">Receive alerts on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800">Breed Match Alerts</h3>
                      <p className="text-sm text-gray-600">Get notified about new matches</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-1 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  Privacy & Security
                </h2>
                <p className="text-gray-500 text-sm mb-6">Manage your privacy and security settings</p>
                
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Data Collection</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      We collect minimal data to improve your experience. You can control what data we collect.
                    </p>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Manage Data Preferences
                    </button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Privacy Policy</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Review how we protect your data and privacy.
                    </p>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      View Privacy Policy
                    </button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Add an extra layer of security to your account.
                    </p>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Enable 2FA
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