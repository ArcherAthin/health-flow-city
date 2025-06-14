
import React from 'react';
import { Clock, User, Calendar } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface DoctorCardProps {
  name: string;
  specialty: string;
  hospital: string;
  availableSlots: number;
  nextAvailable: string;
  rating: number;
  image?: string;
  onBook: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  hospital,
  availableSlots,
  nextAvailable,
  rating,
  image,
  onBook
}) => {
  const handleBook = () => {
    toast({
      title: "Appointment Initiated",
      description: `Booking started with Dr. ${name}.`,
    });
    onBook();
  };

  return (
    <div className="medical-card group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-200 to-cyan-200 flex items-center justify-center flex-shrink-0">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <User className="text-sky-700" size={24} />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-sky-700 transition-colors">
            Dr. {name}
          </h3>
          <p className="text-sky-600 font-medium text-sm">{specialty}</p>
          <p className="text-gray-500 text-sm truncate">{hospital}</p>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-emerald-500" />
              <span className="text-sm text-gray-600">{availableSlots} slots</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-amber-500" />
              <span className="text-sm text-gray-600">{nextAvailable}</span>
            </div>
            <div className="text-sm">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-600 ml-1">{rating}</span>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleBook}
          className="btn-primary text-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
