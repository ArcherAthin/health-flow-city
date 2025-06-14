
import React, { useState } from 'react';
import { Calendar, Clock, User, Bell, Search, Plus, Activity } from 'lucide-react';
import LiveQueue from './LiveQueue';
import DoctorCard from './DoctorCard';
import AppointmentBooking from './AppointmentBooking';
import { toast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showBooking, setShowBooking] = useState(false);

  if (showBooking) {
    return <AppointmentBooking onBack={() => setShowBooking(false)} />;
  }

  const handleNewAppointment = () => {
    setShowBooking(true);
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: 'Today, 2:30 PM',
      hospital: 'City General Hospital',
      token: 'A005',
      status: 'confirmed',
      waitTime: '12 mins'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      date: 'Tomorrow, 10:00 AM',
      hospital: 'Metro Medical Center',
      token: 'B012',
      status: 'pending',
      waitTime: 'Next day'
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
              <p className="text-gray-600 mt-1">Your health journey continues here — stay on track, stay healthy</p>
            </div>
            <div className="flex gap-3">
              <button className="glass p-3 rounded-xl hover:scale-105 transition-transform">
                <Bell className="text-sky-600" size={20} />
              </button>
              <button className="btn-primary" onClick={handleNewAppointment}>
                <Plus size={20} className="mr-2" />
                Book New Visit
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="glass rounded-2xl p-2 mb-8 flex gap-2 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'My Health Hub', icon: User },
            { id: 'appointments', label: 'My Appointments', icon: Calendar },
            { id: 'doctors', label: 'Find Specialists', icon: Search },
            { id: 'queue', label: 'Live Queue Status', icon: Clock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap ${
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
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Health Schedule</h2>
                  <p className="text-gray-600 mb-6">Your upcoming appointments and health activities</p>
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
                        <div className="text-xs text-gray-500">~{appointment.waitTime}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                          appointment.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Ready to Go' : 'Waiting Confirmation'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="medical-card">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Health Actions</h2>
                  <p className="text-gray-600 mb-6">What would you like to do today?</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleNewAppointment}
                      className="glass p-4 rounded-xl hover:scale-105 transition-all duration-200 text-center"
                    >
                      <Calendar className="text-sky-500 mx-auto mb-2" size={24} />
                      <div className="font-medium text-gray-700">Book New Visit</div>
                      <div className="text-xs text-gray-500 mt-1">Find & schedule</div>
                    </button>
                    <button 
                      onClick={() => setActiveTab('queue')}
                      className="glass p-4 rounded-xl hover:scale-105 transition-all duration-200 text-center"
                    >
                      <Activity className="text-emerald-500 mx-auto mb-2" size={24} />
                      <div className="font-medium text-gray-700">Check Queue Status</div>
                      <div className="text-xs text-gray-500 mt-1">Live updates</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="medical-card">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Appointments</h2>
                <p className="text-gray-600 mb-6">Manage your healthcare visits and track your medical journey</p>
                
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="glass p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{appointment.doctor}</h3>
                          <p className="text-sky-600">{appointment.specialty}</p>
                          <p className="text-gray-500">{appointment.hospital}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">#{appointment.token}</div>
                          <div className="text-sm text-gray-500">Token Number</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <strong>When:</strong> {appointment.date}
                        </div>
                        <div className="flex gap-2">
                          <button className="btn-secondary text-sm">Reschedule</button>
                          <button className="btn-primary text-sm">View Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div className="space-y-4">
                <div className="medical-card">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Find Healthcare Specialists</h2>
                  <p className="text-gray-600 mb-6">Discover the right doctor for your needs across the city</p>
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Search by specialty, doctor name, or hospital..."
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
                      onBook={() => {
                        toast({
                          title: "Booking Started",
                          description: `Initiating appointment with Dr. ${doctor.name}`,
                        });
                        setShowBooking(true);
                      }}
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
                  <div className="text-sm text-gray-500">You're 5 tokens away</div>
                  <div className="text-xl font-semibold text-emerald-600">Get ready!</div>
                  <div className="text-xs text-gray-500 mt-1">Estimated: ~12 minutes</div>
                </div>
              </div>
            </div>

            <div className="medical-card">
              <h3 className="font-semibold mb-4 text-gray-800">Health Tips for You</h3>
              <div className="space-y-3">
                <div className="glass p-3 rounded-xl">
                  <div className="text-sm font-medium text-gray-700">💧 Stay Hydrated</div>
                  <div className="text-xs text-gray-500 mt-1">Aim for 8 glasses of water daily for optimal health</div>
                </div>
                <div className="glass p-3 rounded-xl">
                  <div className="text-sm font-medium text-gray-700">🚶 Daily Movement</div>
                  <div className="text-xs text-gray-500 mt-1">30 minutes of activity boosts mood and energy</div>
                </div>
                <div className="glass p-3 rounded-xl">
                  <div className="text-sm font-medium text-gray-700">😴 Quality Sleep</div>
                  <div className="text-xs text-gray-500 mt-1">7-9 hours helps your body heal and recharge</div>
                </div>
              </div>
            </div>

            <div className="medical-card">
              <h3 className="font-semibold mb-4 text-gray-800">City Health Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Appointments</span>
                  <span className="font-bold text-sky-600">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Wait Time</span>
                  <span className="font-bold text-emerald-600">8 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Available Slots</span>
                  <span className="font-bold text-purple-600">156</span>
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
