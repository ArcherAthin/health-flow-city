
import React, { useState, useEffect } from 'react';
import { Clock, Users, AlertCircle } from 'lucide-react';
import QueueToken from './QueueToken';

const LiveQueue = () => {
  const [currentToken, setCurrentToken] = useState('A001');
  const [queueData] = useState([
    { token: 'A001', patient: 'John Smith', status: 'active' as const, time: 'Now' },
    { token: 'A002', patient: 'Sarah Johnson', status: 'upcoming' as const, time: '5 mins' },
    { token: 'A003', patient: 'Mike Chen', status: 'waiting' as const, time: '12 mins' },
    { token: 'A004', patient: 'Emily Davis', status: 'waiting' as const, time: '18 mins' },
    { token: 'A005', patient: 'David Wilson', status: 'waiting' as const, time: '25 mins' },
  ]);

  // Simulate queue progression
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be connected to real-time updates in production
      console.log('Queue updated at:', new Date().toLocaleTimeString());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-strong rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Live Queue</h2>
          <p className="text-sky-600">Dr. Sarah Johnson - Cardiology</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-emerald-500">{currentToken}</div>
          <div className="text-sm text-gray-500">Currently Serving</div>
        </div>
      </div>

      <div className="grid gap-3 mb-6">
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

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="glass rounded-xl p-3">
          <Users className="text-sky-500 mx-auto mb-1" size={20} />
          <div className="font-semibold text-gray-700">12</div>
          <div className="text-xs text-gray-500">In Queue</div>
        </div>
        <div className="glass rounded-xl p-3">
          <Clock className="text-emerald-500 mx-auto mb-1" size={20} />
          <div className="font-semibold text-gray-700">8 min</div>
          <div className="text-xs text-gray-500">Avg Wait</div>
        </div>
        <div className="glass rounded-xl p-3">
          <AlertCircle className="text-amber-500 mx-auto mb-1" size={20} />
          <div className="font-semibold text-gray-700">2</div>
          <div className="text-xs text-gray-500">Delayed</div>
        </div>
      </div>
    </div>
  );
};

export default LiveQueue;
