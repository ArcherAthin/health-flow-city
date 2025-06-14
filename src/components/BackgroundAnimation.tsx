
import React from 'react';

/**
 * More vibrant, layered gradients and multiple floating colored elements.
 * Added larger gradient blobs, accent rings, and more diverse particles for a lively, smart-city vibe.
 */
const BackgroundAnimation = () => {
  // Predefined array of vibrant gradient blobs with lively colors
  const gradientBlobs = [
    // blue-cyan blob
    "absolute top-10 left-1/3 w-72 h-72 bg-gradient-to-br from-sky-400/80 via-cyan-300/60 to-teal-300/60 rounded-full blur-2xl opacity-70 animate-float",
    // pink-purple blob
    "absolute top-0 left-0 w-80 h-80 bg-gradient-to-tr from-fuchsia-400/60 via-pink-400/50 to-purple-400/40 rounded-full blur-3xl opacity-60 animate-float-delayed",
    // green-emerald blob
    "absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-br from-emerald-300/70 via-teal-200/40 to-cyan-400/30 rounded-full blur-[90px] opacity-60 animate-float",
    // yellow-orange blob
    "absolute bottom-20 left-10 w-56 h-56 bg-gradient-to-tr from-yellow-200/70 via-orange-300/30 to-amber-200/60 rounded-full blur-[60px] opacity-50 animate-float-delayed",
  ];

  // Additional animated rings for "techy" effect
  const accentRings = [
    // cyan ring
    "absolute left-1/2 top-1/4 w-64 h-64 border-4 border-sky-400/30 rounded-full animate-float",
    // neon blue ring
    "absolute right-1/4 bottom-32 w-40 h-40 border-2 border-cyan-300/30 rounded-full animate-float-delayed",
    // purple ring
    "absolute left-10 bottom-10 w-28 h-28 border-2 border-fuchsia-400/25 rounded-full animate-float",
  ];

  return (
    <div className="bg-particles pointer-events-none">
      {/* Vibrant Gradient Blobs */}
      {gradientBlobs.map((className, i) => (
        <div key={i} className={className} />
      ))}

      {/* Animated Accent Rings */}
      {accentRings.map((className, i) => (
        <div key={`ring-${i}`} className={className} />
      ))}

      {/* Updated Floating Particles - denser, more colorful */}
      {[...Array(22)].map((_, i) => {
        // Assign some random pastel vibrant colors per particle
        const colors = [
          'bg-sky-300', 'bg-cyan-300', 'bg-emerald-200', 'bg-fuchsia-200', 'bg-purple-200', 'bg-pink-200', 'bg-yellow-200'
        ];
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            className={`particle ${c}`}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 7 + 2}px`,
              height: `${Math.random() * 7 + 2}px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 9 + 12}s`
            }}
          />
        );
      })}

      {/* Circuit-like patterns */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
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
