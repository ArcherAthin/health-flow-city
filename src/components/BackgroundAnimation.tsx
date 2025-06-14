
import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="bg-particles">
      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 10 + 15}s`
          }}
        />
      ))}
      
      {/* Larger Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-xl float" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-sky-200/15 to-cyan-300/15 rounded-full blur-2xl float-delayed" />
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-br from-blue-200/25 to-cyan-200/25 rounded-full blur-lg float" />
      
      {/* Circuit-like patterns */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 10h20v20h20v20h-20v20h-20v-20h-20v-20h20z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" className="text-cyan-400"/>
      </svg>
    </div>
  );
};

export default BackgroundAnimation;
