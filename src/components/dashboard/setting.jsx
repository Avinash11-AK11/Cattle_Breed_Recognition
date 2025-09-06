import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, Database, Download, Upload, Trash2,
  Eye, EyeOff, Key, Mail, Clock, Phone, Globe,
  Sun, Moon, Smartphone, Wifi, WifiOff, Save
} from 'lucide-react';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('data');
  const [appearance, setAppearance] = useState('light');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const tabs = [
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Moon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-inter">
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
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 px-2">Settings Categories</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all ${
                        activeTab === tab.id 
                          ? 'bg-green-50 text-green-700 font-semibold shadow-sm' 
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
                <div className="flex items-center px-3 py-3 bg-blue-50 rounded-lg mb-4">
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
              <div className="bg-white rounded-2xl shadow-md p-7 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Database className="h-6 w-6 mr-2 text-green-600" />
                  Data Management
                </h2>
                <p className="text-gray-500 text-sm mb-6">Manage your app data and storage settings</p>
                
                <div className="space-y-6">
                  <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Download className="h-5 w-5 mr-2 text-green-600" />
                      Export Data
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Download a copy of your data including breed identifications, reports, and account information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <button className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm">
                        <span>JSON Format</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm">
                        <span>CSV Format</span>
                      </button>
                    </div>
                    <button 
                      onClick={handleExportData}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <Download className="h-4 w-4" />
                      <span>Export All Data</span>
                    </button>
                  </div>

                  <div className="p-5 border border-gray-200 rounded-xl bg-gray-50">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Database className="h-5 w-5 mr-2 text-blue-600" />
                      Data Storage
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Manage how much data is stored on your device and in the cloud.
                    </p>
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Storage Usage</span>
                        <span className="text-sm text-gray-600">1.2 GB of 5 GB used</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center space-x-2 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors text-sm">
                      <Trash2 className="h-4 w-4 text-gray-600" />
                      <span>Clear Cache</span>
                    </button>
                  </div>

                  <div className="p-5 border border-red-200 rounded-xl bg-red-50">
                    <h3 className="font-medium text-red-800 mb-3 flex items-center">
                      <Trash2 className="h-5 w-5 mr-2 text-red-600" />
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
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
              <div className="bg-white rounded-2xl shadow-md p-7 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Moon className="h-6 w-6 mr-2 text-green-600" />
                  Appearance
                </h2>
                <p className="text-gray-500 text-sm mb-6">Customize the look and feel of the application</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          appearance === 'light' 
                            ? 'border-green-500 bg-green-50 shadow-sm' 
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                        onClick={() => setAppearance('light')}
                      >
                        <div className="flex items-center mb-3">
                          <Sun className={`h-5 w-5 mr-2 ${appearance === 'light' ? 'text-green-600' : 'text-gray-600'}`} />
                          <span className={`font-medium ${appearance === 'light' ? 'text-green-700' : 'text-gray-700'}`}>Light</span>
                        </div>
                        <div className="h-20 bg-gradient-to-br from-white to-gray-100 rounded-lg border border-gray-200 shadow-inner"></div>
                      </div>

                      <div 
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          appearance === 'dark' 
                            ? 'border-green-500 bg-green-50 shadow-sm' 
                            : 'border-gray-300 hover:border-gray-400 bg-white'
                        }`}
                        onClick={() => setAppearance('dark')}
                      >
                        <div className="flex items-center mb-3">
                          <Moon className={`h-5 w-5 mr-2 ${appearance === 'dark' ? 'text-green-600' : 'text-gray-600'}`} />
                          <span className={`font-medium ${appearance === 'dark' ? 'text-green-700' : 'text-gray-700'}`}>Dark</span>
                        </div>
                        <div className="h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-inner"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Font Size</h3>
                    <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm text-gray-600">Small</span>
                      <div className="flex-1">
                        <input 
                          type="range" 
                          min="1" 
                          max="3" 
                          defaultValue="2"
                          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Large</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-4">Language</h3>
                    <div className="bg-gray-50 p-1 rounded-lg">
                      <select className="w-full px-4 py-3 border-0 bg-transparent focus:ring-2 focus:ring-green-500 rounded-lg">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Gujarati</option>
                        <option>Marathi</option>
                        <option>Punjabi</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <button className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      <Save className="h-4 w-4" />
                      <span>Save Preferences</span>
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