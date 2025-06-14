
import React, { useState } from 'react';
import { Calendar, Bell, User, LogOut, Clock, MapPin, Phone, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AppointmentBooking from './AppointmentBooking';
import LiveQueue from './LiveQueue';

interface PatientDashboardProps {
  user: any;
  onLogout: () => void;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thank you for using MediQueue!",
    });
    onLogout();
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="glass-strong rounded-3xl p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
                <p className="text-gray-600 text-sm md:text-base">Your health journey continues here</p>
                {user.healthProfile && (
                  <div className="flex items-center gap-2 mt-1">
                    <Heart className="text-red-500" size={16} />
                    <span className="text-xs text-gray-500">Health Profile Complete</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex-1 md:flex-none">
                <select 
                  value={activeView}
                  onChange={(e) => setActiveView(e.target.value)}
                  className="glass rounded-xl px-4 py-2 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="dashboard">Dashboard</option>
                  <option value="book">Book Appointment</option>
                  <option value="queue">Live Queue</option>
                </select>
              </div>
              <button 
                onClick={handleLogout}
                className="btn-secondary p-2 md:px-4 md:py-2"
              >
                <LogOut size={16} />
                <span className="hidden md:inline ml-2">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="medical-card text-center">
                  <Calendar className="text-sky-500 mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-700">3</div>
                  <div className="text-xs md:text-sm text-gray-500">Upcoming</div>
                </div>
                <div className="medical-card text-center">
                  <Clock className="text-emerald-500 mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-700">12 min</div>
                  <div className="text-xs md:text-sm text-gray-500">Next Visit</div>
                </div>
                <div className="medical-card text-center">
                  <MapPin className="text-purple-500 mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-700">2.1 km</div>
                  <div className="text-xs md:text-sm text-gray-500">Nearest</div>
                </div>
                <div className="medical-card text-center">
                  <Bell className="text-amber-500 mx-auto mb-2" size={24} />
                  <div className="font-semibold text-gray-700">1</div>
                  <div className="text-xs md:text-sm text-gray-500">Alert</div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="medical-card">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Upcoming Appointments</h3>
                <div className="space-y-3">
                  <div className="glass rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-sky-600" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-800">Dr. Sarah Johnson</div>
                        <div className="text-sm text-gray-600">Cardiology • City General Hospital</div>
                        <div className="text-xs text-gray-500">Tomorrow, 10:30 AM</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button className="btn-secondary text-sm px-3 py-1 flex-1 md:flex-none">Reschedule</button>
                      <button 
                        onClick={() => setActiveView('queue')}
                        className="btn-primary text-sm px-3 py-1 flex-1 md:flex-none"
                      >
                        View Queue
                      </button>
                    </div>
                  </div>

                  <div className="glass rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="text-emerald-600" size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-800">Dr. Michael Chen</div>
                        <div className="text-sm text-gray-600">Dermatology • Wellness Clinic</div>
                        <div className="text-xs text-gray-500">Dec 20, 2:00 PM</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button className="btn-secondary text-sm px-3 py-1 flex-1 md:flex-none">Reschedule</button>
                      <button className="btn-primary text-sm px-3 py-1 flex-1 md:flex-none">Details</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="medical-card">
                <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveView('book')}
                    className="glass rounded-xl p-4 text-left hover:shadow-lg transition-all duration-300 group"
                  >
                    <Calendar className="text-sky-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                    <div className="font-medium text-gray-800">Book New Appointment</div>
                    <div className="text-sm text-gray-600">Find doctors and available slots</div>
                  </button>
                  
                  <button className="glass rounded-xl p-4 text-left hover:shadow-lg transition-all duration-300 group">
                    <Phone className="text-emerald-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                    <div className="font-medium text-gray-800">Emergency Contact</div>
                    <div className="text-sm text-gray-600">Quick access to emergency services</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Health Profile Sidebar */}
            <div className="space-y-6">
              {user.healthProfile && (
                <div className="medical-card">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <Heart className="text-red-500" size={20} />
                    Health Profile
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium text-gray-800">{user.healthProfile.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Blood Group:</span>
                      <span className="font-medium text-gray-800">{user.healthProfile.bloodGroup}</span>
                    </div>
                    {user.healthProfile.allergies && (
                      <div>
                        <span className="text-gray-600">Allergies:</span>
                        <p className="text-gray-800 text-xs mt-1">{user.healthProfile.allergies}</p>
                      </div>
                    )}
                    {user.healthProfile.chronicConditions && (
                      <div>
                        <span className="text-gray-600">Conditions:</span>
                        <p className="text-gray-800 text-xs mt-1">{user.healthProfile.chronicConditions}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div className="medical-card">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <div>
                      <div className="text-gray-800">Appointment completed</div>
                      <div className="text-gray-500 text-xs">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                    <div>
                      <div className="text-gray-800">Queue position updated</div>
                      <div className="text-gray-500 text-xs">5 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    <div>
                      <div className="text-gray-800">Appointment rescheduled</div>
                      <div className="text-gray-500 text-xs">1 week ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'book' && <AppointmentBooking onBack={handleBackToDashboard} />}
        {activeView === 'queue' && <LiveQueue />}
      </div>
    </div>
  );
};

export default PatientDashboard;
