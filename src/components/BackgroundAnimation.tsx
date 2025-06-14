
import React from 'react';

/**
 * Enhanced vibrant background with dynamic medical-tech elements
 * Features pulsing DNA helixes, floating medical icons, and dynamic gradients
 */
const BackgroundAnimation = () => {
  // Enhanced gradient blobs with more vibrant colors and medical themes
  const medicalBlobs = [
    // Primary medical blue-cyan gradient
    "absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-sky-400/90 via-cyan-300/70 to-teal-300/60 rounded-full blur-3xl opacity-80 animate-float-slow",
    // Heart rate red-pink gradient
    "absolute top-0 right-0 w-80 h-80 bg-gradient-to-tr from-red-400/60 via-pink-400/50 to-rose-400/40 rounded-full blur-[90px] opacity-70 animate-float-delayed",
    // Healing green gradient
    "absolute bottom-10 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/80 via-green-200/50 to-cyan-400/40 rounded-full blur-[120px] opacity-60 animate-float",
    // Neural network purple gradient
    "absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-tr from-purple-400/70 via-violet-300/40 to-indigo-300/50 rounded-full blur-[80px] opacity-65 animate-float-delayed",
    // DNA helix yellow-orange
    "absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-tr from-yellow-300/60 via-orange-300/40 to-amber-300/50 rounded-full blur-[70px] opacity-50 animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2",
  ];

  // Floating medical-themed particles
  const medicalParticles = [
    // DNA strands
    ...Array(8).fill(0).map((_, i) => ({
      type: 'dna',
      size: Math.random() * 4 + 2,
      color: 'bg-cyan-300',
      left: Math.random() * 100,
      animationDelay: Math.random() * 20,
      animationDuration: Math.random() * 15 + 20
    })),
    // Heartbeat particles
    ...Array(6).fill(0).map((_, i) => ({
      type: 'heart',
      size: Math.random() * 3 + 1,
      color: 'bg-red-300',
      left: Math.random() * 100,
      animationDelay: Math.random() * 15,
      animationDuration: Math.random() * 12 + 18
    })),
    // Neural connections
    ...Array(10).fill(0).map((_, i) => ({
      type: 'neural',
      size: Math.random() * 5 + 1,
      color: 'bg-purple-300',
      left: Math.random() * 100,
      animationDelay: Math.random() * 25,
      animationDuration: Math.random() * 10 + 15
    })),
    // Medical cross particles
    ...Array(5).fill(0).map((_, i) => ({
      type: 'cross',
      size: Math.random() * 6 + 3,
      color: 'bg-emerald-300',
      left: Math.random() * 100,
      animationDelay: Math.random() * 18,
      animationDuration: Math.random() * 14 + 16
    }))
  ];

  // Tech rings with medical vibes
  const techRings = [
    "absolute left-1/3 top-1/5 w-80 h-80 border-4 border-sky-400/20 rounded-full animate-spin-slow",
    "absolute right-1/3 bottom-1/4 w-56 h-56 border-2 border-cyan-300/25 rounded-full animate-spin-reverse",
    "absolute left-1/6 bottom-1/3 w-40 h-40 border-3 border-emerald-400/30 rounded-full animate-pulse-ring",
    "absolute right-1/6 top-1/3 w-32 h-32 border-2 border-purple-400/20 rounded-full animate-float",
  ];

  return (
    <div className="bg-particles pointer-events-none overflow-hidden">
      {/* Enhanced Medical Gradient Blobs */}
      {medicalBlobs.map((className, i) => (
        <div key={`blob-${i}`} className={className} />
      ))}

      {/* Tech Rings */}
      {techRings.map((className, i) => (
        <div key={`ring-${i}`} className={className} />
      ))}

      {/* Medical Floating Particles */}
      {medicalParticles.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className={`particle ${particle.color} opacity-40`}
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`
          }}
        />
      ))}

      {/* DNA Helix SVG Animation */}
      <svg className="absolute top-1/4 right-1/4 w-32 h-32 opacity-20 animate-spin-slow" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d="M20,10 Q50,30 80,10 Q50,50 20,70 Q50,90 80,70" 
              stroke="url(#dnaGradient)" 
              strokeWidth="2" 
              fill="none" 
              className="animate-pulse"/>
        <path d="M80,10 Q50,30 20,10 Q50,50 80,70 Q50,90 20,70" 
              stroke="url(#dnaGradient)" 
              strokeWidth="2" 
              fill="none" 
              className="animate-pulse"
              style={{animationDelay: '1s'}}/>
      </svg>

      {/* Heartbeat Line SVG */}
      <svg className="absolute bottom-1/4 left-1/3 w-48 h-12 opacity-30" viewBox="0 0 200 50">
        <path d="M10,25 L40,25 L50,10 L60,40 L70,25 L90,25 L100,15 L110,35 L120,25 L190,25" 
              stroke="#ef4444" 
              strokeWidth="2" 
              fill="none" 
              className="animate-pulse"/>
      </svg>

      {/* Medical Circuit Pattern */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="medicalCircuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.3"/>
            <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.4"/>
            <circle cx="100" cy="20" r="2.5" fill="currentColor" opacity="0.3"/>
            <path d="M20,20 L60,60 L100,20" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            <path d="M60,60 L60,100" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="60" cy="100" r="1.5" fill="currentColor" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#medicalCircuit)" className="text-sky-400"/>
      </svg>

      {/* Floating Medical Icons */}
      <div className="absolute top-1/6 left-1/6 animate-float opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L12 22M2 12L22 12" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="absolute top-2/3 right-1/5 animate-float-delayed opacity-25">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                fill="#ef4444" opacity="0.6"/>
        </svg>
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sky-50/10 to-cyan-50/20 animate-pulse-slow"></div>
    </div>
  );
};

export default BackgroundAnimation;
