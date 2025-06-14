
import React, { useState } from 'react';
import { Calendar, Clock, Users, Search, ArrowDown, Plus } from 'lucide-react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import PatientDashboard from '../components/PatientDashboard';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return (
      <>
        <BackgroundAnimation />
        <PatientDashboard />
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
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-sky-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-sky-600 transition-colors">How it Works</a>
              <a href="#hospitals" className="text-gray-600 hover:text-sky-600 transition-colors">Hospitals</a>
              <button className="btn-secondary">Sign In</button>
              <button 
                onClick={() => setShowDashboard(true)}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 leading-tight">
                Your City's<br />
                <span className="text-sky-600">Health Companion</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Skip the wait, book smart appointments, and track your queue in real-time. 
                MediQueue connects you to every healthcare facility in your city.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => setShowDashboard(true)}
                className="btn-primary text-lg px-8 py-4 ripple"
              >
                <Calendar className="mr-2" size={20} />
                Book Appointment Now
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                <Search className="mr-2" size={20} />
                Find Doctors
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="medical-card text-center">
                <div className="text-3xl font-bold text-sky-600 mb-2">500+</div>
                <div className="text-gray-600">Healthcare Facilities</div>
              </div>
              <div className="medical-card text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">50k+</div>
                <div className="text-gray-600">Happy Patients</div>
              </div>
              <div className="medical-card text-center">
                <div className="text-3xl font-bold text-amber-600 mb-2">75%</div>
                <div className="text-gray-600">Time Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center pb-8">
          <ArrowDown className="text-sky-400 animate-bounce mx-auto" size={24} />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">Smart Healthcare at Your Fingertips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of healthcare access with our intelligent queue management system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="medical-card text-center float">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="text-sky-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Real-Time Queues</h3>
              <p className="text-gray-600">
                Track your position in line and get accurate wait time estimates. Never wait in uncertainty again.
              </p>
            </div>

            <div className="medical-card text-center float-delayed">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Smart Booking</h3>
              <p className="text-gray-600">
                AI-powered appointment scheduling that finds the best slots based on your preferences and location.
              </p>
            </div>

            <div className="medical-card text-center float">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">City-Wide Network</h3>
              <p className="text-gray-600">
                Access to all healthcare facilities in your city - from government hospitals to private clinics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-r from-sky-50/50 to-cyan-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">How MediQueue Works</h2>
            <p className="text-xl text-gray-600">Simple steps to better healthcare access</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Search & Book",
                description: "Find doctors by specialty, location, or hospital. Book appointments instantly with real-time availability.",
                icon: Search
              },
              {
                step: "02", 
                title: "Get Your Token",
                description: "Receive a unique digital token and join the smart queue. Track your position in real-time.",
                icon: Clock
              },
              {
                step: "03",
                title: "Arrive When Ready",
                description: "Get notified when it's almost your turn. No more waiting room crowding or uncertainty.",
                icon: Users
              }
            ].map((item, index) => (
              <div key={index} className="medical-card text-center relative">
                <div className="text-6xl font-bold text-sky-100 absolute top-4 right-4">{item.step}</div>
                <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10">
                  <item.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-gradient mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of patients who have already made the switch to smarter healthcare access.
            </p>
            <button 
              onClick={() => setShowDashboard(true)}
              className="btn-primary text-lg px-8 py-4 mr-4"
            >
              Start Your Journey
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
