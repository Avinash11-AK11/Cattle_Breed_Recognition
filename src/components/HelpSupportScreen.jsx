import React, { useState } from 'react';
import { 
  ArrowLeft, HelpCircle, Phone, Mail, MessageCircle, 
  FileText, Video, BookOpen, Users, Clock, ChevronDown,
  ChevronRight, Search, Star, Download, Calendar, Shield,
  Wifi, WifiOff, Smartphone, Monitor, Globe, AlertCircle,
  CheckCircle, XCircle, Send, Database
} from 'lucide-react';

const HelpSupportScreen = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: HelpCircle,
      questions: [
        {
          id: 1,
          question: 'How do I register a new animal in the system?',
          answer: 'To register a new animal, go to the Dashboard and click on the "Register New Animal" button. Fill in the required details including animal type, breed, age, and owner information. You can also use the camera feature to capture the animal\'s image for breed identification.'
        },
        {
          id: 2,
          question: 'What is Pashu Aadhaar and how does it work?',
          answer: 'Pashu Aadhaar is a unique identification system for livestock animals. Each animal receives a unique ID that tracks its health records, vaccination history, breeding information, and ownership details. This helps in maintaining comprehensive health and productivity records.'
        },
        {
          id: 3,
          question: 'How accurate is the breed recognition feature?',
          answer: 'Our AI-powered breed recognition feature has an accuracy rate of over 94% for common Indian cattle and buffalo breeds. Accuracy may vary slightly based on image quality, lighting conditions, and animal pose. You can always manually verify or correct the breed suggestion.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Smartphone,
      questions: [
        {
          id: 4,
          question: 'The app is running slow. What should I do?',
          answer: 'If the app is running slow, try these steps: 1) Clear the app cache from Settings > Storage > Clear Cache, 2) Ensure you have a stable internet connection, 3) Close and restart the app, 4) Make sure your device has at least 500MB of free storage space.'
        },
        {
          id: 5,
          question: 'How do I update the app to the latest version?',
          answer: 'App updates are automatically delivered through the Google Play Store for Android devices. To manually check for updates, open the Play Store, search for "Bharat Pashudhan App", and if an update is available, you will see an "Update" button. For iOS, updates are available through the App Store.'
        },
        {
          id: 6,
          question: 'What should I do if the camera is not working?',
          answer: 'If the camera is not working: 1) Check if camera permissions are enabled for the app in your device settings, 2) Restart your device, 3) Ensure no other app is using the camera, 4) If the issue persists, try uninstalling and reinstalling the app (your data will be preserved as it\'s stored in the cloud).'
        }
      ]
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      questions: [
        {
          id: 7,
          question: 'How is my data stored and protected?',
          answer: 'All data is encrypted and stored securely on government-approved servers. We follow strict data protection protocols in compliance with Indian digital security standards. Field data is synced automatically when internet connection is available, and you can also work offline with data syncing once connection is restored.'
        },
        {
          id: 8,
          question: 'How can I export my reports and data?',
          answer: 'To export data, go to the Reports section, select the type of report you need, choose the date range, and click the "Export" button. You can export data in PDF or CSV format. Exported files will be saved to your device\'s download folder and can also be emailed directly from the app.'
        },
        {
          id: 9,
          question: 'What happens to my data if I change devices?',
          answer: 'Your data is linked to your account, not your device. Simply install the app on your new device, log in with your credentials, and all your data will be synced automatically. We recommend ensuring you have a stable internet connection during the initial sync on the new device.'
        }
      ]
    },
    {
      id: 'fieldwork',
      title: 'Field Work Guidance',
      icon: Users,
      questions: [
        {
          id: 10,
          question: 'How do I handle uncooperative animals during identification?',
          answer: 'For uncooperative animals: 1) Approach calmly and slowly, 2) Work with the animal owner when possible, 3) Take photos from a safe distance and zoom if needed, 4) Schedule a return visit if necessary, 5) Never compromise your safety - some breeds may require special handling techniques.'
        },
        {
          id: 11,
          question: 'What information should I collect during field visits?',
          answer: 'During field visits, collect: 1) Animal identification details, 2) Breed information, 3) Health and vaccination records, 4) Owner contact information, 5) Location data, 6) Recent productivity information (milk yield, etc.), 7) Any observed health issues or concerns.'
        },
        {
          id: 12,
          question: 'How often should I update animal records?',
          answer: 'Animal records should be updated: 1) During each vaccination cycle, 2) When there are changes in ownership, 3) After each breeding activity, 4) When health issues are identified, 5) At least once every 3 months for routine check-ups, 6) Whenever there are significant changes in productivity.'
        }
      ]
    }
  ];

  // Tutorial resources
  const tutorials = [
    {
      id: 1,
      title: 'Breed Identification Tutorial',
      duration: '15 min',
      type: 'video',
      icon: Video,
      description: 'Learn how to effectively use the camera feature for accurate breed identification.'
    },
    {
      id: 2,
      title: 'Data Entry Best Practices',
      duration: '10 min',
      type: 'article',
      icon: FileText,
      description: 'Guidelines for efficient and accurate data collection in field conditions.'
    },
    {
      id: 3,
      title: 'Offline Mode Usage',
      duration: '8 min',
      type: 'video',
      icon: WifiOff,
      description: 'How to work without internet connection and sync data when connected.'
    },
    {
      id: 4,
      title: 'Troubleshooting Common Issues',
      duration: '12 min',
      type: 'article',
      icon: AlertCircle,
      description: 'Solutions for frequently encountered technical problems.'
    }
  ];

  // Support channels
  const supportChannels = [
    {
      id: 1,
      title: 'Call Support',
      description: 'Speak directly with our support team',
      availability: 'Mon-Sat, 9 AM to 6 PM',
      icon: Phone,
      contact: '+91-1800-123-4567',
      action: 'call'
    },
    {
      id: 2,
      title: 'Email Support',
      description: 'Send us your questions and concerns',
      availability: '24/7 response within 12 hours',
      icon: Mail,
      contact: 'support@bpa.gov.in',
      action: 'email'
    },
    {
      id: 3,
      title: 'Live Chat',
      description: 'Instant messaging with support agents',
      availability: 'Mon-Sat, 10 AM to 8 PM',
      icon: MessageCircle,
      contact: 'Start chat',
      action: 'chat'
    },
    {
      id: 4,
      title: 'Field Support',
      description: 'Request on-site assistance',
      availability: 'By appointment',
      icon: Users,
      contact: 'Schedule visit',
      action: 'schedule'
    }
  ];

  const handleFaqToggle = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Your support request has been submitted. We will contact you shortly.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const handleInputChange = (field, value) => {
    setContactForm({
      ...contactForm,
      [field]: value
    });
  };

  // Filter FAQs based on search query
  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Help & Support Center</h1>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How can we help you?</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {faqCategories.reduce((total, category) => total + category.questions.length, 0)} questions
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex overflow-x-auto pb-2 mb-6">
                {faqCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg mr-2 whitespace-nowrap ${
                        activeCategory === category.id
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs
                  .find(cat => cat.id === activeCategory)
                  ?.questions.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg"
                        onClick={() => handleFaqToggle(faq.id)}
                      >
                        <span className="font-medium text-gray-800">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="p-4 pt-0 border-t border-gray-200">
                          <p className="text-gray-600">{faq.answer}</p>
                          <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
                            <button className="flex items-center text-sm text-green-600 hover:text-green-800 mr-4">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Helpful
                            </button>
                            <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Not helpful
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {filteredFaqs.find(cat => cat.id === activeCategory)?.questions.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No questions found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or browse different categories</p>
                </div>
              )}
            </div>

            

            {/* Contact Form Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Support Team</h2>
              
              <form onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </button>
                  <p className="ml-4 text-sm text-gray-600">We typically respond within 12 hours</p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Channels */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Get Help Now</h2>
              
              <div className="space-y-4">
                {supportChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <Icon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{channel.title}</h3>
                          <p className="text-sm text-gray-600">{channel.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        {channel.availability}
                      </div>
                      <button className="w-full flex items-center justify-center text-green-600 hover:text-green-800 font-medium py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                        {channel.contact}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">System Status</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">Application</span>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">API Services</span>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">Database</span>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-700">Sync Services</span>
                  <div className="flex items-center text-amber-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>Partial Outage</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Last updated: Today, 10:45 AM</p>
                <button className="text-sm text-green-600 hover:text-green-800 font-medium mt-2">
                  View Status History
                </button>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="bg-red-50 rounded-xl shadow-sm p-6 border border-red-200">
              <h2 className="text-xl font-semibold text-red-800 mb-4">Emergency Support</h2>
              
              <p className="text-red-700 mb-4">
                For critical issues affecting field work or data integrity that require immediate attention.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-red-800 font-medium">Emergency Hotline</span>
                  <span className="text-red-800">+91-1800-765-4321</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-red-800 font-medium">Available</span>
                  <span className="text-red-800">24/7</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Call Emergency Line
              </button>
            </div>

            {/* Download Resources */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Download Resources</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>User Manual PDF</span>
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Field Guide Handbook</span>
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Data Collection Forms</span>
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span>Breed Identification Guide</span>
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

// Add the missing ThumbsUp and ThumbsDown components
const ThumbsUp = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const ThumbsDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m0 0v11a2 2 0 01-2 2h-2.5M17 13h-2" />
  </svg>
);

export default HelpSupportScreen;