import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, 
  Award, BarChart3, Edit3, Camera, Save, ArrowLeft,
  Download, Clock, UserCheck, CheckCircle, XCircle
} from 'lucide-react';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@bpa.gov.in',
    phone: '+91 9876543210',
    region: 'Gujarat',
    district: 'Ahmedabad',
    taluka: 'Daskroi',
    village: 'Vastral',
    role: 'Field Level Worker',
    employeeId: 'FLW-24680',
    joiningDate: '2023-05-15',
    pashuAadhaarLinked: 247,
    identifications: 1247,
    accuracyRate: '94.3%',
    trainingsCompleted: 8,
    lastTraining: 'Advanced Breed Identification - Aug 2023'
  });

  const [performanceStats] = useState([
    { label: 'This Week', value: 86, change: '+12%' },
    { label: 'This Month', value: 324, change: '+8%' },
    { label: 'Last Month', value: 298, change: '+5%' }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    alert('Profile updated successfully!');
  };

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handleBackToDashboard = () => {
    // This will be handled by the parent Dashboard component
    // For now, we'll just close the profile view
    window.history.back();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
                <button 
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Edit3 className="h-5 w-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-green-600" />
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-800">{profileData.name}</p>
                    <p className="text-sm text-green-600">{profileData.role}</p>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-2.5 bg-gray-50 rounded-lg">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <div className="flex items-center px-4 py-2.5 bg-gray-50 rounded-lg">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                    {isEditing ? (
                      <select
                        value={profileData.region}
                        onChange={(e) => handleInputChange('region', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option>Gujarat</option>
                        <option>Maharashtra</option>
                        <option>Rajasthan</option>
                        <option>Punjab</option>
                      </select>
                    ) : (
                      <div className="flex items-center px-4 py-2.5 bg-gray-50 rounded-lg">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                        <span>{profileData.region}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.district}
                        onChange={(e) => handleInputChange('district', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{profileData.district}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Taluka</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.taluka}
                        onChange={(e) => handleInputChange('taluka', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    ) : (
                      <p className="px-4 py-2.5 bg-gray-50 rounded-lg">{profileData.taluka}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium">{profileData.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joining Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="font-medium">{profileData.joiningDate}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center text-green-600">
                    <UserCheck className="h-4 w-4 mr-2" />
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance Statistics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {performanceStats.map((stat, index) => (
                  <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-sm text-green-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-green-800">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <span className="bg-green-100 px-2 py-1 rounded-full">{stat.change}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Identification Accuracy</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">{profileData.accuracyRate}</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: profileData.accuracyRate }}
                    ></div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <div className="flex items-center mb-2">
                    <Award className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-800">Trainings Completed</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">{profileData.trainingsCompleted}</p>
                  <p className="text-sm text-purple-600 mt-1">Last: {profileData.lastTraining}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Achievements Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-yellow-800">Top Performer</p>
                    <p className="text-sm text-yellow-600">August 2023</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-green-50 border border-green-100 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">1000+ Identifications</p>
                    <p className="text-sm text-green-600">Milestone Achieved</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Quality Champion</p>
                    <p className="text-sm text-blue-600">95%+ Accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Download Activity Report</span>
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>View Training Certificates</span>
                  <Award className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Update Security Settings</span>
                  <Shield className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* System Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Information</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">App Version</span>
                  <span className="font-medium">2.4.1</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">Sep 5, 2023</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Data Sync</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="font-medium">1.2 GB of 5 GB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ProfileScreen;