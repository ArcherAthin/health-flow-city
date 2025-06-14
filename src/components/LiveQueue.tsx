
import React, { useState, useEffect } from 'react';
import { Clock, Users, AlertCircle, Activity, MapPin } from 'lucide-react';
import QueueToken from './QueueToken';

const LiveQueue = () => {
  const [currentToken, setCurrentToken] = useState('A001');
  const [queueData] = useState([
    { token: 'A001', patient: 'John Smith', status: 'active' as const, time: 'Now Serving' },
    { token: 'A002', patient: 'Sarah Johnson', status: 'upcoming' as const, time: 'Up Next' },
    { token: 'A003', patient: 'Mike Chen', status: 'waiting' as const, time: '~8 mins' },
    { token: 'A004', patient: 'Emily Davis', status: 'waiting' as const, time: '~15 mins' },
    { token: 'A005', patient: 'David Wilson', status: 'waiting' as const, time: '~22 mins' },
    { token: 'A006', patient: 'Lisa Park', status: 'waiting' as const, time: '~28 mins' },
  ]);

  // Simulate queue progression
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Queue status updated:', new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Live Queue Status</h2>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="text-sky-600" size={16} />
              <p className="text-sky-600">Dr. Sarah Johnson - Cardiology</p>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse ml-2"></div>
              <span className="text-xs text-emerald-600">Live</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-500">{currentToken}</div>
            <div className="text-sm text-gray-500">Now Serving</div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Current Queue Order</h3>
          <div className="grid gap-3">
            {queueData.map((item) => (
              <QueueToken
                key={item.token}
                tokenNumber={item.token}
                status={item.status}
                estimatedTime={item.time}
                patientName={item.patient}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="glass rounded-xl p-3">
            <Users className="text-sky-500 mx-auto mb-1" size={20} />
            <div className="font-semibold text-gray-700">6</div>
            <div className="text-xs text-gray-500">In Queue</div>
          </div>
          <div className="glass rounded-xl p-3">
            <Clock className="text-emerald-500 mx-auto mb-1" size={20} />
            <div className="font-semibold text-gray-700">7 min</div>
            <div className="text-xs text-gray-500">Avg Consultation</div>
          </div>
          <div className="glass rounded-xl p-3">
            <Activity className="text-purple-500 mx-auto mb-1" size={20} />
            <div className="font-semibold text-gray-700">On Time</div>
            <div className="text-xs text-gray-500">Schedule Status</div>
          </div>
        </div>
      </div>

      {/* Patient Guidance Card */}
      <div className="medical-card">
        <h3 className="font-semibold mb-4 text-gray-800">📍 Your Visit Guide</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sky-600 text-xs font-bold">1</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Arrive 10 minutes early</div>
              <div className="text-xs text-gray-500">Complete check-in at reception desk</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-600 text-xs font-bold">2</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Wait for your token call</div>
              <div className="text-xs text-gray-500">You'll be notified when it's almost your turn</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-purple-600 text-xs font-bold">3</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">Proceed to consultation room</div>
              <div className="text-xs text-gray-500">Follow the display directions or ask staff</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveQueue;
