
import React from 'react';
import { Clock, User } from 'lucide-react';

interface QueueTokenProps {
  tokenNumber: string;
  status: 'active' | 'waiting' | 'upcoming';
  estimatedTime?: string;
  patientName?: string;
}

const QueueToken: React.FC<QueueTokenProps> = ({ 
  tokenNumber, 
  status, 
  estimatedTime, 
  patientName 
}) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'active':
        // Remove pulse, add focus-glow class for sleek highlight
        return 'token-active focus-glow';
      case 'upcoming':
        return 'token-upcoming';
      default:
        return 'token-waiting';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Now Serving';
      case 'upcoming':
        return 'Coming Soon';
      default:
        return 'In Queue';
    }
  };

  return (
    <div className={`${getStatusClasses()} rounded-2xl p-4 transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl font-bold">#{tokenNumber}</span>
        <span className="text-xs font-medium opacity-80">{getStatusText()}</span>
      </div>
      
      {patientName && (
        <div className="flex items-center gap-2 mb-2">
          <User size={14} />
          <span className="text-sm truncate">{patientName}</span>
        </div>
      )}
      
      {estimatedTime && (
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span className="text-sm">{estimatedTime}</span>
        </div>
      )}
    </div>
  );
};

export default QueueToken;
