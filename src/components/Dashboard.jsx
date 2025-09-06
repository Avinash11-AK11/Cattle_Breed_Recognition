import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ProfileScreen from "./ProfileScreen";
import HelpSupportScreen from "./HelpSupportScreen";
import {
  Camera,
  Upload,
  CheckCircle,
  XCircle,
  ArrowRight,
  Home,
  BarChart3,
  BookOpen,
  ClipboardList,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Database,
  MapPin,
  Clock,
  Filter,
  Image,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Shield,
  Heart,
  Activity,
  Calendar,
  Download,
  Plus,
  HelpCircle,
  Star,
  TrendingUp,
  FileText,
  Phone,
  MessageCircle,
  Users,
  Zap,
  Cpu,
  Target,
  BarChart2,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [breedDatabase, setBreedDatabase] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBreedInfo, setShowBreedInfo] = useState(false);
  const [recentIdentifications, setRecentIdentifications] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeLivestockTab, setActiveLivestockTab] = useState("cattle");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  const [showReviewSection, setShowReviewSection] = useState(false);

  // Sample breed database with detailed information
  const cattleBreeds = [
    {
      id: 1,
      name: "Gir Cattle",
      type: "Cattle",
      origin: "Gujarat",
      characteristics:
        "Distinct convex forehead, drooping ears, and folded skin",
      milkProduction: "1500-2000 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "Hot and humid climates",
      image:
        "https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Gujarat", "Rajasthan", "Maharashtra"],
      popularity: "High",
    },
    {
      id: 2,
      name: "Sahiwal",
      type: "Cattle",
      origin: "Punjab region",
      characteristics: "Reddish dun color, loose skin, and long whip-like tail",
      milkProduction: "2000-3000 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "Tropical climates",
      image:
        "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Punjab", "Haryana", "Uttar Pradesh"],
      popularity: "High",
    },
    {
      id: 3,
      name: "Red Sindhi",
      type: "Cattle",
      origin: "Sindh region",
      characteristics: "Deep red color, compact body, and short horns",
      milkProduction: "1800-2500 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "Tropical and subtropical",
      image:
        "https://images.unsplash.com/photo-1546445317-29f4545e9d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Sindh", "Punjab", "Rajasthan"],
      popularity: "High",
    },
    {
      id: 4,
      name: "Tharparkar",
      type: "Cattle",
      origin: "Thar Desert",
      characteristics:
        "White or light gray color, medium size, and lyre-shaped horns",
      milkProduction: "1200-1800 kg per lactation",
      usage: "Dual purpose",
      climateAdaptability: "Arid and semi-arid",
      image:
        "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Rajasthan", "Gujarat", "Haryana"],
      popularity: "Medium",
    },
    {
      id: 5,
      name: "Murrah Buffalo",
      type: "Buffalo",
      origin: "Haryana",
      characteristics: "Jet black body, short and tightly curved horns",
      milkProduction: "1500-2500 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "All climates",
      image:
        "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Haryana", "Punjab", "Delhi"],
      popularity: "Very High",
    },
    {
      id: 6,
      name: "Jaffrabadi Buffalo",
      type: "Buffalo",
      origin: "Gujarat",
      characteristics: "Heavy and massive body, broad forehead, curved horns",
      milkProduction: "2000-3000 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "Hot climates",
      image:
        "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Gujarat", "Rajasthan"],
      popularity: "Medium",
    },
    {
      id: 7,
      name: "Nili Ravi Buffalo",
      type: "Buffalo",
      origin: "Punjab",
      characteristics:
        "Black body with white markings, medium size, and curved horns",
      milkProduction: "1800-2200 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "Temperate climates",
      image:
        "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Punjab", "Haryana"],
      popularity: "High",
    },
    {
      id: 8,
      name: "Surti Buffalo",
      type: "Buffalo",
      origin: "Gujarat",
      characteristics:
        "Medium size, copper-colored skin, and sickle-shaped horns",
      milkProduction: "1200-1800 kg per lactation",
      usage: "Dairy",
      climateAdaptability: "Hot and humid",
      image:
        "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      commonRegions: ["Gujarat", "Maharashtra"],
      popularity: "Medium",
    },
  ];

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      message: "New vaccination schedule available",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      message: "Your breed identification was confirmed",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      message: "Training session on Friday",
      time: "2 days ago",
      read: true,
    },
  ];

  useEffect(() => {
    // Simulate loading breed database
    setBreedDatabase(cattleBreeds);
    setNotifications(sampleNotifications);

    // Load recent identifications from localStorage
    const savedIdentifications = localStorage.getItem("recentIdentifications");
    if (savedIdentifications) {
      setRecentIdentifications(JSON.parse(savedIdentifications));
    }
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
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
    alert(
      "Camera access would be implemented here for real-time breed identification"
    );
  };

  const handleConfirmBreed = () => {
    setShowReviewSection(true);
  };

  const handleSubmitReview = () => {
    alert(
      `Review submitted! Breed: ${recognitionResult.name}, Description: ${reviewDescription}`
    );
    setShowReviewSection(false);
    setReviewDescription("");
    // Here we would integrate with the actual BPA API
  };

  const handleCancelReview = () => {
    setShowReviewSection(false);
    setReviewDescription("");
  };

  const handleCorrectBreed = () => {
    setShowBreedInfo(true);
  };

  const handleBreedSelection = (breed) => {
    setRecognitionResult(breed);
    setShowBreedInfo(false);
  };

  const filteredBreeds = breedDatabase.filter((breed) => {
    const matchesSearch =
      breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeLivestockTab === "cattle"
        ? breed.type === "Cattle"
        : breed.type === "Buffalo";

    return matchesSearch && matchesTab;
  });

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "breedDB", label: "Breed Database", icon: Database },
    { id: "profile", label: "My Profile", icon: User },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      action: () => navigate("/settings"),
    },
  ];

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-inter">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-900 to-green-800 text-white transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="p-5 border-b border-green-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <img
                    src="https://www.logodesign.net/logo/abstract-cow-with-udder-6249ld.png"
                    alt="Logo"
                    className="h-8 w-8"
                  />
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

          {/* Main Navigation */}
          <div className="p-4 flex-1">
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
                          ? "bg-green-700 text-white shadow-md"
                          : "text-green-100 hover:bg-green-700 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                      {activeNav === item.id && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Support Section */}
            <div className="pt-6 border-t border-green-700 mt-6">
              <h3 className="px-4 text-xs uppercase text-green-300 font-semibold mb-3">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveNav("help")}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-green-100 hover:bg-green-700 hover:text-white transition-colors"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Sign Out */}
          <div className="p-4 border-t border-green-700">
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
                {activeNav === "dashboard" &&
                  "BPA-Integrated Breed Recognition Dashboard"}
                {activeNav === "breedDB" && "Breed Database"}
                {activeNav === "profile" && "My Profile"}
                {activeNav === "help" && "Help & Support Center"}
                {activeNav === "settings" && "Settings"}
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
                      <h3 className="font-semibold text-gray-800">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                        >
                          <p className="text-sm text-gray-800">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.time}
                          </p>
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
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard View */}
            {activeNav === "dashboard" && (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Database className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">
                          Total Identifications
                        </h3>
                        <p className="text-2xl font-bold text-gray-800">
                          1,247
                        </p>
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
                        <h3 className="text-sm font-medium text-gray-500">
                          Accuracy Rate
                        </h3>
                        <p className="text-2xl font-bold text-gray-800">
                          94.3%
                        </p>
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
                        <h3 className="text-sm font-medium text-gray-500">
                          This Week
                        </h3>
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
                        <h3 className="text-sm font-medium text-gray-500">
                          Pashu Aadhaar
                        </h3>
                        <p className="text-2xl font-bold text-gray-800">892</p>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <BarChart2 className="h-3 w-3 mr-1" /> 71% coverage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image-Based Breed Recognition Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Image-Based Breed Recognition
                    </h2>
                    <div className="flex items-center text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-md">
                      <Cpu className="h-4 w-4 mr-2" />
                      AI Powered
                    </div>
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    Upload an image or use your camera to identify the breed of
                    cattle or buffalo. Our AI model will provide a confidence
                    score and allow for seamless data integration with the
                    Bharat Pashudhan App.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    <label className="flex-1 cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-2xl group-hover:border-green-500 group-hover:bg-gradient-to-br group-hover:from-green-50 group-hover:to-green-100 transition-all duration-300 p-6 shadow-sm hover:shadow-md">
                        <Upload className="h-12 w-12 text-gray-400 group-hover:text-green-600 mb-3 transition-colors" />
                        <span className="text-gray-600 group-hover:text-green-800 text-center transition-colors font-medium text-lg">
                          Upload Image
                        </span>
                        <p className="text-sm text-gray-500 mt-2">
                          JPG, PNG or HEIC
                        </p>
                      </div>
                    </label>

                    <button
                      onClick={handleCameraCapture}
                      className="flex-1 flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-500 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 transition-all duration-300 p-6 group shadow-sm hover:shadow-md"
                    >
                      <Camera className="h-12 w-12 text-gray-400 group-hover:text-green-600 mb-3 transition-colors" />
                      <span className="text-gray-600 group-hover:text-green-800 text-center transition-colors font-medium text-lg">
                        Use Camera
                      </span>
                      <p className="text-sm text-gray-500 mt-2">
                        Real-time capture
                      </p>
                    </button>
                  </div>

                  {selectedImage && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Uploaded Image
                      </h3>
                      <div className="flex justify-center">
                        <img
                          src={selectedImage}
                          alt="Uploaded cattle"
                          className="max-h-80 rounded-2xl object-cover shadow-lg"
                        />
                      </div>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Processing Image
                      </h3>
                      <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full transition-all duration-300 shadow-sm"
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                      <p className="text-center text-gray-600 mt-3 text-lg">
                        Analyzing breed characteristics... {confidence}%
                      </p>
                    </div>
                  )}

                  {/* Recognition Result Section */}
                  {recognitionResult && !showBreedInfo && (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200 shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
                        Recognition Result
                      </h2>

                      <div className="flex items-start mb-6">
                        <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden mr-6 flex-shrink-0 shadow-md">
                          <img
                            src={recognitionResult.image}
                            alt={recognitionResult.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-green-700 mb-2">
                            {recognitionResult.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span className="text-lg">
                              Origin: {recognitionResult.origin}
                            </span>
                          </div>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {recognitionResult.characteristics}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                          <p className="text-sm text-green-600 font-semibold mb-1">
                            Milk Production
                          </p>
                          <p className="text-lg font-bold text-green-800">
                            {recognitionResult.milkProduction}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                          <p className="text-sm text-blue-600 font-semibold mb-1">
                            Usage
                          </p>
                          <p className="text-lg font-bold text-blue-800">
                            {recognitionResult.usage}
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-sm">
                          <p className="text-sm text-purple-600 font-semibold mb-1">
                            Seasonal Diseases
                          </p>
                          <p className="text-lg font-bold text-purple-800">
                            Low Risk
                          </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm">
                          <p className="text-sm text-orange-600 font-semibold mb-1">
                            Nutrition
                          </p>
                          <p className="text-lg font-bold text-orange-800">
                            High Quality
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-semibold text-gray-700">
                            Confidence Score
                          </h4>
                          <span className="text-xl font-bold text-gray-800">
                            {confidence}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full shadow-sm"
                            style={{ width: `${confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        Is this correct? As an FLW, you can confirm or correct
                        the breed entry before sending it to the Bharat
                        Pashudhan App.
                      </p>

                      <div className="flex gap-4 mb-6">
                        <button
                          onClick={handleConfirmBreed}
                          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg"
                        >
                          <CheckCircle className="h-6 w-6" />
                          Confirm & Send
                        </button>
                        <button
                          onClick={handleCorrectBreed}
                          className="flex-1 flex items-center justify-center gap-3 bg-gray-200 text-gray-800 py-4 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold text-lg"
                        >
                          <XCircle className="h-6 w-6" />
                          Correct Breed
                        </button>
                      </div>

                      <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 border border-green-300">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center text-lg">
                          <Shield className="h-6 w-6 mr-3" />
                          Bharat Pashudhan Mission
                        </h4>
                        <p className="text-green-700 leading-relaxed text-lg">
                          To assign a unique Pashu Aadhaar to each animal for
                          end-to-end traceability, enhancing disease control and
                          productivity.
                        </p>
                      </div>

                      {/* FWS Review Section */}
                      {showReviewSection && (
                        <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-300 shadow-lg">
                          <h4 className="font-bold text-blue-800 mb-4 flex items-center text-lg">
                            <Star className="h-6 w-6 mr-3" />
                            Field Worker Review
                          </h4>
                          <p className="text-blue-700 mb-4 text-lg">
                            Please provide your review and additional
                            observations about this breed identification.
                          </p>
                          <div className="mb-4">
                            <label className="block text-lg font-semibold text-gray-700 mb-3">
                              Description & Observations
                            </label>
                            <textarea
                              value={reviewDescription}
                              onChange={(e) =>
                                setReviewDescription(e.target.value)
                              }
                              placeholder="Enter your observations about the animal's health, condition, or any additional notes..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-lg"
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-4">
                            <button
                              onClick={handleSubmitReview}
                              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                            >
                              <CheckCircle className="h-5 w-5" />
                              Submit Review
                            </button>
                            <button
                              onClick={handleCancelReview}
                              className="flex-1 flex items-center justify-center gap-3 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold text-lg"
                            >
                              <XCircle className="h-5 w-5" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Breed Selection Modal */}
                  {showBreedInfo && (
                    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                          Select Correct Breed
                        </h2>
                        <button
                          onClick={() => setShowBreedInfo(false)}
                          className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>

                      <div className="relative mb-6">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          placeholder="Search breeds..."
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <div className="flex border-b border-gray-200 mb-6">
                        <button
                          className={`px-6 py-3 font-semibold text-lg ${
                            activeLivestockTab === "cattle"
                              ? "text-green-600 border-b-2 border-green-600"
                              : "text-gray-500"
                          }`}
                          onClick={() => setActiveLivestockTab("cattle")}
                        >
                          Cattle Breeds
                        </button>
                        <button
                          className={`px-6 py-3 font-semibold text-lg ${
                            activeLivestockTab === "buffalo"
                              ? "text-green-600 border-b-2 border-green-600"
                              : "text-gray-500"
                          }`}
                          onClick={() => setActiveLivestockTab("buffalo")}
                        >
                          Buffalo Breeds
                        </button>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {filteredBreeds.map((breed) => (
                          <div
                            key={breed.id}
                            className="p-4 border-b border-gray-200 hover:bg-green-50 cursor-pointer transition-colors flex items-start group rounded-lg mb-2"
                            onClick={() => handleBreedSelection(breed)}
                          >
                            <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden mr-4 flex-shrink-0 shadow-sm">
                              <img
                                src={breed.image}
                                alt={breed.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-gray-800 text-lg">
                                  {breed.name}
                                </h3>
                                <span className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                                  {breed.type}
                                </span>
                              </div>
                              <p className="text-gray-600 text-lg">
                                {breed.origin}
                              </p>
                              <p className="text-gray-500 mt-1">
                                {breed.characteristics.substring(0, 80)}...
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  {/* Knowledge Centre Section */}
                  <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-2xl p-8 border border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Knowledge Centre
                      </h2>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      Access articles, best practices, and breed-specific
                      information to enhance your fieldwork.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:bg-green-100 transition-colors">
                          <Heart className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          Animal Health & Nutrition
                        </span>
                      </div>
                      <div className="flex items-center p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:bg-green-100 transition-colors">
                          <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          Breeding Best Practices
                        </span>
                      </div>
                      <div className="flex items-center p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:bg-green-100 transition-colors">
                          <Shield className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          Disease Prevention
                        </span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                      Explore More <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Services Section */}
                  <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-2xl p-8 border border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <ClipboardList className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Services
                      </h2>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      Find information on vaccination schedules, breeding
                      services, and more.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-xl p-4 text-center cursor-pointer hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-lg group">
                        <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-blue-800 text-lg">
                          Vaccination
                        </span>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center cursor-pointer hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-lg group">
                        <Activity className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-blue-800 text-lg">
                          Breeding
                        </span>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center cursor-pointer hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-lg group">
                        <Heart className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-blue-800 text-lg">
                          Health
                        </span>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center cursor-pointer hover:bg-blue-100 transition-all duration-200 shadow-md hover:shadow-lg group">
                        <Database className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-blue-800 text-lg">
                          Records
                        </span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                      Explore More <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Reports Section */}
                  <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 rounded-2xl p-8 border border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Reports
                      </h2>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      Generate and view reports on livestock health and
                      productivity.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:bg-purple-100 transition-colors">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          Monthly Identification Report
                        </span>
                      </div>
                      <div className="flex items-center p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:bg-purple-100 transition-colors">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          Breed Popularity Analysis
                        </span>
                      </div>
                      <div className="flex items-center p-4 hover:bg-white rounded-xl cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:bg-purple-100 transition-colors">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">
                          Field Worker Performance
                        </span>
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                      Explore More <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Recent Identifications Section */}
                {recentIdentifications.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <Clock className="h-6 w-6 mr-3 text-green-600" />
                        Recent Identifications
                      </h3>
                      <button className="text-lg text-green-600 hover:text-green-800 font-semibold flex items-center bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl transition-colors">
                        View All <ChevronRight className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {recentIdentifications.map((item) => (
                        <div
                          key={item.id}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
                        >
                          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                            <img
                              src={item.image}
                              alt={item.breed}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 text-lg truncate">
                              {item.breed}
                            </p>
                            <div className="flex items-center text-gray-600 mt-1">
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-3 py-2 rounded-full shadow-md">
                            {item.confidence}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Breed Database View */}
            {activeNav === "breedDB" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      Breed Database
                    </h2>
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
                      className={`px-4 py-2 font-medium text-sm ${
                        activeLivestockTab === "cattle"
                          ? "text-green-600 border-b-2 border-green-600"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveLivestockTab("cattle")}
                    >
                      Cattle Breeds
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeLivestockTab === "buffalo"
                          ? "text-green-600 border-b-2 border-green-600"
                          : "text-gray-500"
                      }`}
                      onClick={() => setActiveLivestockTab("buffalo")}
                    >
                      Buffalo Breeds
                    </button>
                  </div>

                  {/* Breeds Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBreeds.map((breed) => (
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
                            <h3 className="text-lg font-semibold text-gray-800">
                              {breed.name}
                            </h3>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {breed.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {breed.origin}
                          </p>
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                            {breed.characteristics}
                          </p>

                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Milk Production:</span>
                              <span className="font-medium">
                                {breed.milkProduction}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Usage:</span>
                              <span className="font-medium">{breed.usage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Climate:</span>
                              <span className="font-medium">
                                {breed.climateAdaptability}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Popularity:</span>
                              <span
                                className={`font-medium ${
                                  breed.popularity === "Very High"
                                    ? "text-green-600"
                                    : breed.popularity === "High"
                                    ? "text-blue-600"
                                    : "text-gray-600"
                                }`}
                              >
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
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        No breeds found
                      </h3>
                      <p className="text-gray-600">
                        Try adjusting your search terms or filters
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile View */}
            {activeNav === "profile" && (
              <div className="space-y-6">
                <ProfileScreen />
              </div>
            )}

            {/* Help & Support View */}
            {activeNav === "help" && (
              <div className="space-y-6">
                <HelpSupportScreen />
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
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
        body {
          font-family: "Inter", sans-serif;
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
