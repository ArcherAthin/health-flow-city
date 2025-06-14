
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ArrowRight, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AppointmentBookingProps {
  onBack: () => void;
}

const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const specialties = [
    'General Medicine', 'Cardiology', 'Dermatology', 'ENT', 
    'Orthopedics', 'Pediatrics', 'Gynecology', 'Ophthalmology'
  ];

  const hospitals = [
    { name: 'City General Hospital', distance: '2.3 km', load: 'low', rating: 4.8 },
    { name: 'Metro Heart Center', distance: '3.1 km', load: 'moderate', rating: 4.9 },
    { name: 'Wellness Medical Hub', distance: '1.8 km', load: 'high', rating: 4.6 }
  ];

  const doctors = [
    { name: 'Dr. Priya Sharma', experience: '12 years', rating: 4.8, nextSlot: '11:20 AM' },
    { name: 'Dr. Rajesh Kumar', experience: '8 years', rating: 4.7, nextSlot: '2:30 PM' },
    { name: 'Dr. Anjali Mehta', experience: '15 years', rating: 4.9, nextSlot: 'Tomorrow 9:00 AM' }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleBookAppointment = () => {
    const tokenNumber = `A${Math.floor(Math.random() * 900) + 100}`;
    toast({
      title: "Appointment Confirmed! 🎉",
      description: `Token #${tokenNumber} confirmed. Please arrive 10 minutes before your slot.`,
    });
    setStep(5);
  };

  const getLoadColor = (load: string) => {
    switch (load) {
      case 'low': return 'bg-emerald-400';
      case 'moderate': return 'bg-amber-400';
      case 'high': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-strong rounded-3xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <button 
                onClick={onBack}
                className="text-sky-600 hover:text-sky-700 mb-2"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gradient">Book Your Appointment</h1>
              <p className="text-gray-600 mt-1">Find the perfect time and place for your healthcare needs</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Step {step} of 4</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Choose Specialty */}
        {step === 1 && (
          <div className="medical-card">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Choose Your Specialty</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => {
                    setSelectedSpecialty(specialty);
                    setStep(2);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    selectedSpecialty === specialty 
                      ? 'border-sky-500 bg-sky-50' 
                      : 'border-gray-200 hover:border-sky-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-medium text-gray-800">{specialty}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Hospital */}
        {step === 2 && (
          <div className="medical-card">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pick a Preferred Location</h2>
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <button
                  key={hospital.name}
                  onClick={() => {
                    setSelectedHospital(hospital.name);
                    setStep(3);
                  }}
                  className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-sky-300 transition-all duration-200 hover:scale-[1.02] text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${getLoadColor(hospital.load)}`}></div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{hospital.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin size={14} />
                            {hospital.distance}
                          </span>
                          <span className="text-sm text-gray-500">★ {hospital.rating}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            hospital.load === 'low' ? 'bg-emerald-100 text-emerald-700' :
                            hospital.load === 'moderate' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {hospital.load === 'low' ? 'Available' : 
                             hospital.load === 'moderate' ? 'Moderate' : 'Busy'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Choose Doctor */}
        {step === 3 && (
          <div className="medical-card">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Select Your Doctor</h2>
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <button
                  key={doctor.name}
                  onClick={() => {
                    setSelectedDoctor(doctor.name);
                    setStep(4);
                  }}
                  className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-sky-300 transition-all duration-200 hover:scale-[1.02] text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-200 to-cyan-200 rounded-xl flex items-center justify-center">
                        <User className="text-sky-700" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{doctor.experience} experience</span>
                          <span className="text-sm text-gray-500">★ {doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-emerald-600 font-medium">Next Available</div>
                      <div className="text-lg font-semibold text-gray-800">{doctor.nextSlot}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Choose Time */}
        {step === 4 && (
          <div className="medical-card">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Pick a Preferred Time</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <input 
                type="date" 
                className="glass p-3 rounded-xl border-0 focus:ring-2 focus:ring-sky-500 outline-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Available Time Slots</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedTime === time 
                        ? 'border-sky-500 bg-sky-50 text-sky-700' 
                        : 'border-gray-200 hover:border-sky-300'
                    }`}
                  >
                    <Clock size={16} className="mx-auto mb-1" />
                    <div className="text-sm font-medium">{time}</div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleBookAppointment}
              disabled={!selectedDate || !selectedTime}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Appointment
            </button>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="medical-card text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gradient mb-4">Appointment Confirmed!</h2>
            <div className="glass p-6 rounded-2xl mb-6 max-w-md mx-auto">
              <div className="text-4xl font-bold text-gray-800 mb-2">#{Math.floor(Math.random() * 900) + 100}</div>
              <div className="text-gray-600">Your Token Number</div>
              <div className="mt-4 space-y-2 text-sm">
                <div><strong>Doctor:</strong> {selectedDoctor}</div>
                <div><strong>Hospital:</strong> {selectedHospital}</div>
                <div><strong>Date & Time:</strong> {selectedDate} at {selectedTime}</div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Please arrive 10 minutes before your scheduled time. You'll receive updates about your queue position.</p>
            <button 
              onClick={onBack}
              className="btn-primary"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
