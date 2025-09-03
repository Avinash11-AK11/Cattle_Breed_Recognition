import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Camera, BarChart3, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-emerald-600">
                  Cattle Breed Recognition
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button className="flex items-center text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="ml-3 text-gray-700 font-medium">
                    {user?.user_metadata?.full_name || user?.email}
                  </span>
                </button>
              </div>
              
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <Camera className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Welcome to Cattle Breed Recognition Platform
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload images to identify cattle and buffalo breeds using AI
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Camera className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Upload Image</h4>
                    <p className="text-sm text-gray-500">Identify breed from photo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Analytics</h4>
                    <p className="text-sm text-gray-500">View identification history</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Settings className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Settings</h4>
                    <p className="text-sm text-gray-500">Manage your account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-6 bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Account Information
              </h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user?.user_metadata?.full_name || 'Not provided'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {user?.phone || 'Not provided'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user?.email_confirmed_at 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user?.email_confirmed_at ? 'Verified' : 'Pending'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;