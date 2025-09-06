import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit3,
  Camera,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  AtSign,
  Map,
  XCircle,
  CheckCircle,
} from "lucide-react";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@bpa.gov.in",
    phone: "+91 9876543210",
    region: "Gujarat",
    district: "Ahmedabad",
    taluka: "Daskroi",
    village: "Vastral",
    role: "Field Level Worker",
    employeeId: "FLW-24680",
    joiningDate: "2023-05-15",
    status: "Active",
    profileImage: null,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
  });

  const fileInputRef = useRef(null);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSecurityChange = (field, value) => {
    setSecurityData({
      ...securityData,
      [field]: value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          profileImage: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePasswordUpdate = () => {
    // Password update logic would go here
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    alert("Password updated successfully!");
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          </div>

          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <XCircle className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Edit3 className="h-5 w-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <User className="h-6 w-6 mr-2 text-green-600" />
              Personal Information
            </h2>

            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {profileData.profileImage ? (
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-14 w-14 text-green-600" />
                  )}
                </div>
                {isEditing && (
                  <>
                    <button
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors shadow-md"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800 text-lg">
                  {profileData.name}
                </p>
                <p className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full mt-2">
                  {profileData.role}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    {profileData.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <AtSign className="h-4 w-4 mr-2 text-gray-500" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Smartphone className="h-4 w-4 mr-2 text-gray-500" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Map className="h-4 w-4 mr-2 text-gray-500" />
                  Region
                </label>
                {isEditing ? (
                  <select
                    value={profileData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option>Gujarat</option>
                    <option>Maharashtra</option>
                    <option>Rajasthan</option>
                    <option>Punjab</option>
                    <option>Haryana</option>
                    <option>Uttar Pradesh</option>
                  </select>
                ) : (
                  <div className="flex items-center px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span>{profileData.region}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            </div>
          </div>

          {/* Security Settings Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-blue-600" />
              Security Settings
            </h2>

            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2">
                  Account Security
                </h3>
                <p className="text-sm text-blue-600">
                  For your security, please ensure your email and phone number
                  are up to date. These will be used for account recovery and
                  important notifications.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={securityData.showPassword ? "text" : "password"}
                    value={securityData.currentPassword}
                    onChange={(e) =>
                      handleSecurityChange("currentPassword", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    onClick={() =>
                      handleSecurityChange(
                        "showPassword",
                        !securityData.showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {securityData.showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type={securityData.showPassword ? "text" : "password"}
                    value={securityData.newPassword}
                    onChange={(e) =>
                      handleSecurityChange("newPassword", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type={securityData.showPassword ? "text" : "password"}
                    value={securityData.confirmPassword}
                    onChange={(e) =>
                      handleSecurityChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button
                onClick={handlePasswordUpdate}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Key className="h-5 w-5" />
                <span>Update Password</span>
              </button>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication.
                </p>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <Shield className="h-5 w-5" />
                  <span>Enable 2FA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
