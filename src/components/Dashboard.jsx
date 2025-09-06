import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileScreen from './ProfileScreen';
import { 
  Camera, Upload, CheckCircle, XCircle, ArrowRight, 
  Home, BarChart3, BookOpen, ClipboardList, Settings,
  User, LogOut, Menu, X, Bell, Search, Database, MapPin,
  Clock, Filter, Image, ChevronDown, ChevronRight, AlertCircle,
  Shield, Heart, Activity, Calendar, Download, Plus, HelpCircle,
  Star, TrendingUp, FileText, Phone, MessageCircle, Users,
  Zap, Cpu, Target, BarChart2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [breedDatabase, setBreedDatabase] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBreedInfo, setShowBreedInfo] = useState(false);
  const [recentIdentifications, setRecentIdentifications] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeLivestockTab, setActiveLivestockTab] = useState('cattle');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sample breed database with detailed information
  const cattleBreeds = [
    {
      id: 1,
      name: 'Gir Cattle',
      type: 'Cattle',
      origin: 'Gujarat',
      characteristics: 'Distinct convex forehead, drooping ears, and folded skin',
      milkProduction: '1500-2000 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'Hot and humid climates',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Gujarat', 'Rajasthan', 'Maharashtra'],
      popularity: 'High'
    },
    {
      id: 2,
      name: 'Sahiwal',
      type: 'Cattle',
      origin: 'Punjab region',
      characteristics: 'Reddish dun color, loose skin, and long whip-like tail',
      milkProduction: '2000-3000 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'Tropical climates',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
      popularity: 'High'
    },
    {
      id: 3,
      name: 'Red Sindhi',
      type: 'Cattle',
      origin: 'Sindh region',
      characteristics: 'Deep red color, compact body, and short horns',
      milkProduction: '1800-2500 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'Tropical and subtropical',
      image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Sindh', 'Punjab', 'Rajasthan'],
      popularity: 'High'
    },
    {
      id: 4,
      name: 'Tharparkar',
      type: 'Cattle',
      origin: 'Thar Desert',
      characteristics: 'White or light gray color, medium size, and lyre-shaped horns',
      milkProduction: '1200-1800 kg per lactation',
      usage: 'Dual purpose',
      climateAdaptability: 'Arid and semi-arid',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Rajasthan', 'Gujarat', 'Haryana'],
      popularity: 'Medium'
    },
    {
      id: 5,
      name: 'Murrah Buffalo',
      type: 'Buffalo',
      origin: 'Haryana',
      characteristics: 'Jet black body, short and tightly curved horns',
      milkProduction: '1500-2500 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'All climates',
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Haryana', 'Punjab', 'Delhi'],
      popularity: 'Very High'
    },
    {
      id: 6,
      name: 'Jaffrabadi Buffalo',
      type: 'Buffalo',
      origin: 'Gujarat',
      characteristics: 'Heavy and massive body, broad forehead, curved horns',
      milkProduction: '2000-3000 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'Hot climates',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Gujarat', 'Rajasthan'],
      popularity: 'Medium'
    },
    {
      id: 7,
      name: 'Nili Ravi Buffalo',
      type: 'Buffalo',
      origin: 'Punjab',
      characteristics: 'Black body with white markings, medium size, and curved horns',
      milkProduction: '1800-2200 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'Temperate climates',
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Punjab', 'Haryana'],
      popularity: 'High'
    },
    {
      id: 8,
      name: 'Surti Buffalo',
      type: 'Buffalo',
      origin: 'Gujarat',
      characteristics: 'Medium size, copper-colored skin, and sickle-shaped horns',
      milkProduction: '1200-1800 kg per lactation',
      usage: 'Dairy',
      climateAdaptability: 'Hot and humid',
      image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      commonRegions: ['Gujarat', 'Maharashtra'],
      popularity: 'Medium'
    }
  ];

  // Sample notifications
  const sampleNotifications = [
    { id: 1, message: 'New vaccination schedule available', time: '2 hours ago', read: false },
    { id: 2, message: 'Your breed identification was confirmed', time: '1 day ago', read: true },
    { id: 3, message: 'Training session on Friday', time: '2 days ago', read: true }
  ];

  useEffect(() => {
    // Simulate loading breed database
    setBreedDatabase(cattleBreeds);
    setNotifications(sampleNotifications);
    
    // Load recent identifications from localStorage
    const savedIdentifications = localStorage.getItem('recentIdentifications');
    if (savedIdentifications) {
      setRecentIdentifications(JSON.parse(savedIdentifications));
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        
        // Simulate AI breed recognition with progressive confidence
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setConfidence(progress);
          if (progress >= 95) {
            clearInterval(interval);
            const randomBreed = cattleBreeds[Math.floor(Math.random() * cattleBreeds.length)];
            setRecognitionResult(randomBreed);
            
            // Add to recent identifications
            const newIdentification = {
              id: Date.now(),
              breed: randomBreed.name,
              type: randomBreed.type,
              timestamp: new Date().toISOString(),
              image: e.target.result,
              confidence: 95
            };
            
            const updatedIdentifications = [newIdentification, ...recentIdentifications].slice(0, 5);
            setRecentIdentifications(updatedIdentifications);
            localStorage.setItem('recentIdentifications', JSON.stringify(updatedIdentifications));
            
            setIsProcessing(false);
          }
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // This would typically access the device camera
    alert("Camera access would be implemented here for real-time breed identification");
  };

  const handleConfirmBreed = () => {
    alert(`Breed confirmed! Data for ${recognitionResult.name} has been sent to Bharat Pashudhan App.`);
    // Here we would integrate with the actual BPA API
  };

  const handleCorrectBreed = () => {
    setShowBreedInfo(true);
  };

  const handleBreedSelection = (breed) => {
    setRecognitionResult(breed);
    setShowBreedInfo(false);
  };

  const filteredBreeds = breedDatabase.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeLivestockTab === 'cattle' ? breed.type === 'Cattle' : breed.type === 'Buffalo';
    
    return matchesSearch && matchesTab;
  });

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'breedDB', label: 'Breed Database', icon: Database },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => navigate('/settings') },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-900 to-green-800 text-white transform transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-green-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <img src="https://www.logodesign.net/logo/abstract-cow-with-udder-6249ld.png" alt="Logo" className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Pashu Mitra</h1>
                  <p className="text-xs text-green-200">Bharat Pashudhan App</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-green-200 hover:text-white p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          setActiveNav(item.id);
                        }
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        activeNav === item.id 
                          ? 'bg-green-700 text-white shadow-md' 
                          : 'text-green-100 hover:bg-green-700 hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {activeNav === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            
            <div className="mt-8 pt-6 border-t border-green-700">
              <h3 className="px-4 text-xs uppercase text-green-300 font-semibold mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-green-100 hover:bg-green-700 hover:text-white transition-colors">
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-green-100 hover:bg-green-700 hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                    <span>Contact Us</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="p-4 border-t border-green-700 flex-shrink-0">
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-green-100 hover:bg-green-700 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-gray-600 hover:text-gray-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {activeNav === 'dashboard' && 'BPA-Integrated Breed Recognition Dashboard'}
                {activeNav === 'breedDB' && 'Breed Database'}
                {activeNav === 'profile' && 'My Profile'}
                {activeNav === 'settings' && 'Settings'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`p-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3 bg-green-50 rounded-full pl-3 pr-4 py-1 border border-green-200">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-green-800">Field Worker</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard View */}
            {activeNav === 'dashboard' && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Database className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Identifications</h3>
                        <p className="text-2xl font-bold text-gray-800">1,247</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <TrendingUp className="h-3 w-3 mr-1" /> +12% this week
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Accuracy Rate</h3>
                        <p className="text-2xl font-bold text-gray-800">94.3%</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <Target className="h-3 w-3 mr-1" /> High precision
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-amber-100 rounded-lg">
                        <Activity className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">This Week</h3>
                        <p className="text-2xl font-bold text-gray-800">86</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <Zap className="h-3 w-3 mr-1" /> Active
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Pashu Aadhaar</h3>
                        <p className="text-2xl font-bold text-gray-800">892</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <BarChart2 className="h-3 w-3 mr-1" /> 71% coverage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Image Upload and Stats */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Image-Based Breed Recognition Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Image-Based Breed Recognition</h2>
                        <div className="flex items-center text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          <Cpu className="h-4 w-4 mr-1" />
                          AI Powered
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Upload an image or use your camera to identify the breed of cattle or buffalo. 
                        Our AI model will provide a confidence score and allow for seamless data integration 
                        with the Bharat Pashudhan App.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <label className="flex-1 cursor-pointer group">
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl group-hover:border-green-500 group-hover:bg-green-50 transition-all duration-200 p-4">
                            <Upload className="h-10 w-10 text-gray-400 group-hover:text-green-600 mb-2 transition-colors" />
                            <span className="text-gray-600 group-hover:text-green-800 text-center transition-colors">
                              Upload Image
                            </span>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG or HEIC</p>
                          </div>
                        </label>
                        
                        <button 
                          onClick={handleCameraCapture}
                          className="flex-1 flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 p-4 group"
                        >
                          <Camera className="h-10 w-10 text-gray-400 group-hover:text-green-600 mb-2 transition-colors" />
                          <span className="text-gray-600 group-hover:text-green-800 text-center transition-colors">
                            Use Camera
                          </span>
                          <p className="text-xs text-gray-500 mt-1">Real-time capture</p>
                        </button>
                      </div>

                      {selectedImage && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Uploaded Image</h3>
                          <div className="flex justify-center">
                            <img 
                              src={selectedImage} 
                              alt="Uploaded cattle" 
                              className="max-h-64 rounded-lg object-cover shadow-md"
                            />
                          </div>
                        </div>
                      )}

                      {isProcessing && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-800 mb-3">Processing Image</h3>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-300"
                              style={{ width: `${confidence}%` }}
                            ></div>
                          </div>
                          <p className="text-center text-gray-600 mt-2">Analyzing breed characteristics... {confidence}%</p>
                        </div>
                      )}

                      {/* Knowledge Centre, Services and Reports in a row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        {/* Knowledge Centre Section */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 hover:shadow-md transition-shadow">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                            Knowledge Centre
                          </h2>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            Access articles, best practices, and breed-specific information to enhance your fieldwork.
                          </p>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-sm p-2 hover:bg-white rounded-lg cursor-pointer transition-colors group">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-green-100 transition-colors">
                                <Heart className="h-4 w-4 text-green-600" />
                              </div>
                              <span>Animal Health & Nutrition</span>
                            </div>
                            <div className="flex items-center text-sm p-2 hover:bg-white rounded-lg cursor-pointer transition-colors group">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-green-100 transition-colors">
                                <Activity className="h-4 w-4 text-green-600" />
                              </div>
                              <span>Breeding Best Practices</span>
                            </div>
                            <div className="flex items-center text-sm p-2 hover:bg-white rounded-lg cursor-pointer transition-colors group">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-green-100 transition-colors">
                                <Shield className="h-4 w-4 text-green-600" />
                              </div>
                              <span>Disease Prevention</span>
                            </div>
                          </div>
                          <button className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            Explore More <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Services Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 hover:shadow-md transition-shadow">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2 text-blue-600" />
                            Services
                          </h2>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            Find information on vaccination schedules, breeding services, and more.
                          </p>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-white rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors shadow-sm group">
                              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-blue-800">Vaccination</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors shadow-sm group">
                              <Activity className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-blue-800">Breeding</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors shadow-sm group">
                              <Heart className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-blue-800">Health</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 text-center cursor-pointer hover:bg-blue-100 transition-colors shadow-sm group">
                              <Database className="h-6 w-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                              <span className="text-xs font-medium text-blue-800">Records</span>
                            </div>
                          </div>
                          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Explore More <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Reports Section */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200 hover:shadow-md transition-shadow">
                          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                            Reports
                          </h2>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            Generate and view reports on livestock health and productivity.
                          </p>
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-sm p-2 hover:bg-white rounded-lg cursor-pointer transition-colors group">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-purple-100 transition-colors">
                                <FileText className="h-4 w-4 text-purple-600" />
                              </div>
                              <span>Monthly Identification Report</span>
                            </div>
                            <div className="flex items-center text-sm p-2 hover:bg-white rounded-lg cursor-pointer transition-colors group">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-purple-100 transition-colors">
                                <TrendingUp className="h-4 w-4 text-purple-600" />
                              </div>
                              <span>Breed Popularity Analysis</span>
                            </div>
                            <div className="flex items-center text-sm p-2 hover:bg-white rounded-lg cursor-pointer transition-colors group">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-purple-100 transition-colors">
                                <Users className="h-4 w-4 text-purple-600" />
                              </div>
                              <span>Field Worker Performance</span>
                            </div>
                          </div>
                          <button className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                            Explore More <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <hr className="my-6 border-gray-200" />

                      {/* Recent Identifications */}
                      {recentIdentifications.length > 0 && (
                        <div className="mt-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-800">Recent Identifications</h3>
                            <button className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                              View All <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentIdentifications.map((item) => (
                              <div key={item.id} className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3 border border-gray-200 hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                  <img src={item.image} alt={item.breed} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-800 truncate">{item.breed}</p>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                  {item.confidence}%
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Recognition Result and Modules */}
                  <div className="lg:col-span-1 space-y-6">
                    {recognitionResult && !showBreedInfo && (
                      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recognition Result</h2>
                        
                        <div className="flex items-start mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <img src={recognitionResult.image} alt={recognitionResult.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-green-700">{recognitionResult.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>Origin: {recognitionResult.origin}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm">{recognitionResult.characteristics}</p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                            <p className="text-xs text-green-600 font-medium">Milk Production</p>
                            <p className="text-sm font-semibold text-green-800">{recognitionResult.milkProduction}</p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <p className="text-xs text-blue-600 font-medium">Primary Usage</p>
                            <p className="text-sm font-semibold text-blue-800">{recognitionResult.usage}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-700">Confidence Score</h4>
                            <span className="text-sm font-bold text-gray-800">{confidence}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full"
                              style={{ width: `${confidence}%` }}
                            ></div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                          Is this correct? As an FLW, you can confirm or correct the breed entry before sending it to the Bharat Pashudhan App.
                        </p>

                        <div className="flex gap-3 mb-6">
                          <button 
                            onClick={handleConfirmBreed}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors shadow-md hover:shadow-lg font-medium"
                          >
                            <CheckCircle className="h-5 w-5" />
                            Confirm & Send
                          </button>
                          <button 
                            onClick={handleCorrectBreed}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                          >
                            <XCircle className="h-5 w-5" />
                            Correct Breed
                          </button>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                            <Shield className="h-5 w-5 mr-2" />
                            Bharat Pashudhan Mission
                          </h4>
                          <p className="text-sm text-green-700 leading-relaxed">
                            To assign a unique Pashu Aadhaar to each animal for end-to-end traceability, enhancing disease control and productivity.
                          </p>
                        </div>
                      </div>
                    )}

                    {showBreedInfo && (
                      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold text-gray-800">Select Correct Breed</h2>
                          <button 
                            onClick={() => setShowBreedInfo(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="relative mb-4">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <input
                            type="text"
                            placeholder="Search breeds..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>

                        <div className="flex border-b border-gray-200 mb-4">
                          <button 
                            className={`px-4 py-2 font-medium text-sm ${activeLivestockTab === 'cattle' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                            onClick={() => setActiveLivestockTab('cattle')}
                          >
                            Cattle Breeds
                          </button>
                          <button 
                            className={`px-4 py-2 font-medium text-sm ${activeLivestockTab === 'buffalo' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                            onClick={() => setActiveLivestockTab('buffalo')}
                          >
                            Buffalo Breeds
                          </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          {filteredBreeds.map(breed => (
                            <div 
                              key={breed.id} 
                              className="p-3 border-b border-gray-200 hover:bg-green-50 cursor-pointer transition-colors flex items-start group"
                              onClick={() => handleBreedSelection(breed)}
                            >
                              <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                <img src={breed.image} alt={breed.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h3 className="font-medium text-gray-800">{breed.name}</h3>
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                    {breed.type}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">{breed.origin}</p>
                                <p className="text-xs text-gray-500 mt-1">{breed.characteristics.substring(0, 60)}...</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Breed Database View */}
            {activeNav === 'breedDB' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Breed Database</h2>
                    <div className="flex items-center text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full">
                      <Database className="h-4 w-4 mr-1" />
                      {breedDatabase.length} Breeds Available
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search breeds by name, origin, or type..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Livestock Type Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button 
                      className={`px-4 py-2 font-medium text-sm ${activeLivestockTab === 'cattle' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                      onClick={() => setActiveLivestockTab('cattle')}
                    >
                      Cattle Breeds
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium text-sm ${activeLivestockTab === 'buffalo' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                      onClick={() => setActiveLivestockTab('buffalo')}
                    >
                      Buffalo Breeds
                    </button>
                  </div>

                  {/* Breeds Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBreeds.map(breed => (
                      <div 
                        key={breed.id} 
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                        onClick={() => handleBreedSelection(breed)}
                      >
                        <div className="h-48 bg-gray-200 overflow-hidden">
                          <img 
                            src={breed.image} 
                            alt={breed.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{breed.name}</h3>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {breed.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{breed.origin}</p>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{breed.characteristics}</p>
                          
                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Milk Production:</span>
                              <span className="font-medium">{breed.milkProduction}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Usage:</span>
                              <span className="font-medium">{breed.usage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Climate:</span>
                              <span className="font-medium">{breed.climateAdaptability}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Popularity:</span>
                              <span className={`font-medium ${
                                breed.popularity === 'Very High' ? 'text-green-600' :
                                breed.popularity === 'High' ? 'text-blue-600' :
                                'text-gray-600'
                              }`}>
                                {breed.popularity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredBreeds.length === 0 && (
                    <div className="text-center py-12">
                      <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No breeds found</h3>
                      <p className="text-gray-600">Try adjusting your search terms or filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile View */}
            {activeNav === 'profile' && (
              <div className="space-y-6">
                <ProfileScreen />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;