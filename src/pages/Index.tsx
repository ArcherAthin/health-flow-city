import React, { useState } from 'react';
import { Calendar, Clock, Users, Search, ArrowDown, Plus, MapPin, Activity, Menu } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import PatientDashboard from '../components/PatientDashboard';
import AuthModal from '../components/AuthModal';
import ChatBot from '../components/ChatBot';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
  };

  if (showDashboard && user) {
    return (
      <>
        <BackgroundAnimation />
        <PatientDashboard user={user} onLogout={handleLogout} />
        <ChatBot userHealthProfile={user.healthProfile} />
      </>
    );
  }

  return (
    <>
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col relative">
        {/* Navigation - Updated spacing */}
        <nav className="glass-strong mx-4 mt-6 rounded-2xl p-6 relative z-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="text-white rotate-45" size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gradient">MediQueue</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-sky-600 transition-colors font-medium">How it Works</a>
              <a href="#hospitals" className="text-gray-600 hover:text-sky-600 transition-colors font-medium">Browse Hospitals</a>
              <a href="#network" className="text-gray-600 hover:text-sky-600 transition-colors font-medium">City Network</a>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-secondary px-6 py-3"
              >
                Login
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary px-6 py-3"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-600 hover:text-sky-600 transition-colors py-2 font-medium">How it Works</a>
                <a href="#hospitals" className="text-gray-600 hover:text-sky-600 transition-colors py-2 font-medium">Browse Hospitals</a>
                <a href="#network" className="text-gray-600 hover:text-sky-600 transition-colors py-2 font-medium">City Network</a>
                <div className="flex flex-col gap-3 mt-4">
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="btn-secondary w-full py-3"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="btn-primary w-full py-3"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Content - Improved spacing and typography */}
        <div className="flex-1 flex items-center justify-center px-4 pt-12 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-8">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="text-gradient block">AI-Driven</span>
                    <span className="text-gray-900 block">Healthcare</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                    Elevate your health to new heights with our cutting-edge healthcare platform. 
                    We specialize in delivering tailored solutions that optimize your wellness journey.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="btn-primary text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    Get Started
                  </button>
                  <button className="btn-secondary text-lg px-8 py-4 rounded-2xl">
                    <Activity className="mr-2" size={20} />
                    Watch Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <span className="font-semibold">4.9</span>
                    <span>/5.0</span>
                  </div>
                  <span>Trusted healthcare platform</span>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Main Visual Container */}
                  <div className="relative w-80 h-80 md:w-96 md:h-96">
                    {/* Floating Medical Icons */}
                    <div className="absolute top-8 left-8 glass-strong rounded-2xl p-4 animate-float">
                      <Calendar className="text-sky-500" size={32} />
                    </div>
                    <div className="absolute top-4 right-12 glass-strong rounded-2xl p-4 animate-float-delayed">
                      <Clock className="text-emerald-500" size={28} />
                    </div>
                    <div className="absolute bottom-12 left-4 glass-strong rounded-2xl p-4 animate-float-slow">
                      <Users className="text-purple-500" size={30} />
                    </div>
                    <div className="absolute bottom-8 right-8 glass-strong rounded-2xl p-4 animate-float">
                      <Activity className="text-cyan-500" size={32} />
                    </div>
                    
                    {/* Central Medical Dashboard */}
                    <div className="absolute inset-8 glass-strong rounded-3xl p-6 flex flex-col justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto">
                          <Plus className="text-white" size={32} />
                        </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-gray-800">47</div>
                          <div className="text-sm text-gray-600">Active Appointments</div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full w-3/4"></div>
                          </div>
                          <div className="text-xs text-gray-500">Queue Status: Normal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <ArrowDown className="text-sky-400 animate-bounce mx-auto" size={24} />
        </div>
      </div>

      {/* Trusted Partners Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">Trusted by Leading Healthcare Providers</h3>
          </div>
          <div className="glass-strong rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
              <div className="text-lg font-bold text-gray-700">AIIMS</div>
              <div className="text-lg font-bold text-gray-700">Fortis</div>
              <div className="text-lg font-bold text-gray-700">Apollo</div>
              <div className="text-lg font-bold text-gray-700">Max</div>
              <div className="text-lg font-bold text-gray-700 col-span-2 md:col-span-1">Medanta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Our Comprehensive 
              <span className="text-gradient block">Suite of Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to empower your healthcare with a comprehensive suite of features that streamline your 
              wellness efforts and supercharge your health journey.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Appointment Booking",
                description: "Book appointments seamlessly across multiple healthcare facilities with real-time availability.",
                icon: Calendar,
                gradient: "from-sky-400 to-cyan-400"
              },
              {
                title: "Live Queue Tracking",
                description: "Monitor your position in real-time and get notified when it's almost your turn.",
                icon: Clock,
                gradient: "from-emerald-400 to-teal-400"
              },
              {
                title: "Health Profile Management",
                description: "Maintain comprehensive health records accessible to healthcare providers instantly.",
                icon: Users,
                gradient: "from-purple-400 to-pink-400"
              }
            ].map((feature, index) => (
              <div key={index} className="medical-card group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Network Status */}
      <section id="network" className="py-16 md:py-20 px-4 bg-gradient-to-r from-sky-50/50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Live Hospital Network</h2>
            <p className="text-lg md:text-xl text-gray-600">Real-time availability across your city's healthcare facilities</p>
          </div>

          {/* Mobile-Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "City General Hospital", load: "low", available: 23, specialty: "Multi-specialty" },
              { name: "Metro Heart Center", load: "moderate", available: 8, specialty: "Cardiology" },
              { name: "Children's Medical", load: "low", available: 15, specialty: "Pediatrics" },
              { name: "Wellness Clinic", load: "high", available: 2, specialty: "General Practice" }
            ].map((hospital, index) => (
              <div key={index} className="medical-card">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-3 h-3 rounded-full ${
                    hospital.load === 'low' ? 'bg-emerald-400' : 
                    hospital.load === 'moderate' ? 'bg-amber-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-xs text-gray-500">{hospital.specialty}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{hospital.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Available slots</span>
                  <span className="font-bold text-sky-600">{hospital.available}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Ready to Experience Smarter Healthcare?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join thousands who've already made healthcare access effortless in your city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary text-lg px-6 md:px-8 py-4"
              >
                Start Your Journey
              </button>
              <button className="btn-secondary text-lg px-6 md:px-8 py-4">
                Watch How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* ChatBot */}
      <ChatBot
        userHealthProfile={user?.healthProfile}
      />
    </>
  );
};

export default Index;
