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
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="glass-strong mx-4 mt-4 rounded-2xl p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <Plus className="text-white rotate-45" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">MediQueue</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-sky-600 transition-colors">How it Works</a>
              <a href="#hospitals" className="text-gray-600 hover:text-sky-600 transition-colors">Browse Hospitals</a>
              <a href="#network" className="text-gray-600 hover:text-sky-600 transition-colors">City Network</a>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-secondary"
              >
                Login
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary"
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
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-col gap-3">
                <a href="#features" className="text-gray-600 hover:text-sky-600 transition-colors py-2">How it Works</a>
                <a href="#hospitals" className="text-gray-600 hover:text-sky-600 transition-colors py-2">Browse Hospitals</a>
                <a href="#network" className="text-gray-600 hover:text-sky-600 transition-colors py-2">City Network</a>
                <div className="flex flex-col gap-2 mt-2">
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="btn-secondary w-full"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setShowAuthModal(true)}
                    className="btn-primary w-full"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-7xl font-bold text-gradient mb-6 leading-tight">
                Book. Track. Heal<br />
                <span className="text-sky-600">Citywide Healthcare Access</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Real-time, seamless access to OPD appointments across hospitals and clinics in your city. 
                Skip the wait, track your queue, arrive when ready.
              </p>
            </div>

            {/* Mobile-First Button Layout */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-primary text-lg px-6 md:px-8 py-4 ripple"
              >
                <Calendar className="mr-2" size={20} />
                Book Appointment
              </button>
              <button className="btn-secondary text-lg px-6 md:px-8 py-4">
                <MapPin className="mr-2" size={20} />
                Browse Hospitals
              </button>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-secondary text-lg px-6 md:px-8 py-4"
              >
                <Activity className="mr-2" size={20} />
                Login to Dashboard
              </button>
            </div>

            {/* Live Stats - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="medical-card text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">47</div>
                <div className="text-gray-600">Appointments Today</div>
                <div className="text-sm text-emerald-500 mt-1">↗ Live Updates</div>
              </div>
              <div className="medical-card text-center">
                <div className="text-2xl md:text-3xl font-bold text-sky-600 mb-2">8 min</div>
                <div className="text-gray-600">Average Wait Time</div>
                <div className="text-sm text-sky-500 mt-1">City-wide Average</div>
              </div>
              <div className="medical-card text-center sm:col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">156</div>
                <div className="text-gray-600">Healthcare Facilities</div>
                <div className="text-sm text-purple-500 mt-1">Connected Network</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <ArrowDown className="text-sky-400 animate-bounce mx-auto" size={24} />
        </div>
      </div>

      {/* How It Works Section */}
      <section id="features" className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Your Health Journey, Simplified</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform how you access healthcare in your city
            </p>
          </div>

          {/* Mobile-First Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Book Your Visit",
                description: "Choose your specialty, preferred hospital, and available time slot. Get instant confirmation with your unique token.",
                icon: Calendar,
                detail: "Next Available: Dr. Priya Sharma · ENT · 11:20 AM"
              },
              {
                step: "02", 
                title: "Track Your Queue",
                description: "Monitor your position in real-time. Get notified when it's almost your turn to see the doctor.",
                icon: Clock,
                detail: "You're 5 tokens away. Get ready!"
              },
              {
                step: "03",
                title: "Arrive When Ready",
                description: "No more waiting room crowding. Walk in confident, knowing exactly when you'll be seen.",
                icon: Users,
                detail: "Token #A234 - Please proceed to Room 4"
              }
            ].map((item, index) => (
              <div key={index} className="medical-card text-center relative overflow-hidden">
                <div className="text-4xl md:text-6xl font-bold text-sky-100 absolute top-4 right-4">{item.step}</div>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{item.description}</p>
                <div className="glass p-3 rounded-xl">
                  <p className="text-xs md:text-sm text-sky-600 font-medium">{item.detail}</p>
                </div>
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
