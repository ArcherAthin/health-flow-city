
import React, { useState } from 'react';
import { Calendar, Clock, User, Bell, Search, Plus } from 'lucide-react';
import LiveQueue from './LiveQueue';
import DoctorCard from './DoctorCard';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: 'Today, 2:30 PM',
      hospital: 'City General Hospital',
      token: 'A005',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: 'Tomorrow, 10:00 AM',
      hospital: 'Metro Medical Center',
      token: 'B012',
      status: 'pending'
    }
  ];

  const availableDoctors = [
    {
      name: 'Sarah Johnson',
      specialty: 'Cardiology',
      hospital: 'City General Hospital',
      availableSlots: 3,
      nextAvailable: 'Today 3:00 PM',
      rating: 4.8
    },
    {
      name: 'Michael Chen',
      specialty: 'Dermatology',
      hospital: 'Metro Medical Center',
      availableSlots: 5,
      nextAvailable: 'Tomorrow 9:00 AM',
      rating: 4.9
    },
    {
      name: 'Emily Rodriguez',
      specialty: 'Pediatrics',
      hospital: 'Children\'s Health Center',
      availableSlots: 2,
      nextAvailable: 'Today 4:30 PM',
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-strong rounded-3xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient">Welcome back, Alex</h1>
              <p className="text-gray-600 mt-1">Your health journey continues here</p>
            </div>
            <div className="flex gap-3">
              <button className="glass p-3 rounded-xl hover:scale-105 transition-transform">
                <Bell className="text-sky-600" size={20} />
              </button>
              <button className="btn-primary">
                <Plus size={20} className="mr-2" />
                New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="glass rounded-2xl p-2 mb-8 flex gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: User },
            { id: 'appointments', label: 'My Appointments', icon: Calendar },
            { id: 'doctors', label: 'Find Doctors', icon: Search },
            { id: 'queue', label: 'Live Queue', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' 
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="medical-card">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Schedule</h2>
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 glass rounded-xl mb-3 last:mb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-xl flex items-center justify-center">
                          <User className="text-sky-700" size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{appointment.doctor}</h3>
                          <p className="text-sm text-sky-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500">{appointment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">#{appointment.token}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {appointment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="medical-card">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="glass p-4 rounded-xl hover:scale-105 transition-all duration-200 text-center">
                      <Calendar className="text-sky-500 mx-auto mb-2" size={24} />
                      <div className="font-medium text-gray-700">Book Appointment</div>
                    </button>
                    <button className="glass p-4 rounded-xl hover:scale-105 transition-all duration-200 text-center">
                      <Clock className="text-emerald-500 mx-auto mb-2" size={24} />
                      <div className="font-medium text-gray-700">Check Queue</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="space-y-4">
                <div className="medical-card">
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Search doctors, specialties, hospitals..."
                        className="w-full p-3 glass rounded-xl border-0 focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <button className="btn-primary">
                      <Search size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {availableDoctors.map((doctor, index) => (
                    <DoctorCard
                      key={index}
                      {...doctor}
                      onBook={() => console.log(`Booking with Dr. ${doctor.name}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'queue' && (
              <LiveQueue />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="medical-card">
              <h3 className="font-semibold mb-4 text-gray-800">Your Active Token</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">#A005</div>
                <div className="text-sm text-gray-600 mb-4">Dr. Sarah Johnson - Cardiology</div>
                <div className="glass p-3 rounded-xl">
                  <div className="text-sm text-gray-500">Estimated wait time</div>
                  <div className="text-xl font-semibold text-emerald-600">12 minutes</div>
                </div>
              </div>
            </div>

            <div className="medical-card">
              <h3 className="font-semibold mb-4 text-gray-800">Health Tips</h3>
              <div className="space-y-3">
                <div className="glass p-3 rounded-xl">
                  <div className="text-sm font-medium text-gray-700">Stay Hydrated</div>
                  <div className="text-xs text-gray-500 mt-1">Drink at least 8 glasses of water daily</div>
                </div>
                <div className="glass p-3 rounded-xl">
                  <div className="text-sm font-medium text-gray-700">Regular Exercise</div>
                  <div className="text-xs text-gray-500 mt-1">30 minutes of activity can improve your mood</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
