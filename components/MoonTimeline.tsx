'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MOON_DATA } from '@/lib/constants';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MoonTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] -mx-6 sm:mx-0 mb-32 hidden md:block">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-transparent">
        
        <div className="relative w-full h-full flex items-center justify-center moon-container-3d">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(30,30,40,0.15)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
          
          {MOON_DATA.map((moon, i) => (
            <MoonItem key={i} moon={moon} progress={scrollYProgress} index={i} total={MOON_DATA.length} />
          ))}
        </div>

        <div className="absolute bottom-12 opacity-50 text-white text-[10px] tracking-widest uppercase animate-bounce mix-blend-overlay">
          Scroll to Travel
        </div>
      </div>
    </div>
  );
}

function MoonItem({ moon, progress, index, total }: { moon: any, progress: any, index: number, total: number }) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Year animations: Appears first in the sequence
  const yearOpacity = useTransform(progress,
    [start, start + 0.1 / total, start + 0.4 / total, start + 0.5 / total],
    [0, 1, 1, 0]
  );
  
  const yearY = useTransform(progress,
    [start, start + 0.1 / total],
    ["20px", "0px"]
  );

  // Moon animations: Appears after the year starts showing
  const moonOpacity = useTransform(progress,
    [start + 0.2 / total, start + 0.4 / total, end - 0.1 / total, end],
    [0, 1, 1, 0]
  );

  const translateY = useTransform(progress, 
    [start + 0.2 / total, start + 0.5 / total, end], 
    ["30%", "0%", "-40%"]
  );
  
  const scale = useTransform(progress,
    [start + 0.2 / total, start + 0.5 / total, end],
    [0.8, 1, 1.1]
  );

  const blur = useTransform(progress,
    [start + 0.2 / total, start + 0.5 / total, end],
    ["12px", "0px", "15px"]
  );

  return (
    <motion.div 
      style={{ 
        opacity: useTransform(progress, [start, start + 0.01 / total, end - 0.01 / total, end], [0, 1, 1, 0]),
        willChange: "transform, opacity" 
      }}
      className="moon-wrapper flex-col"
    >
      {/* Year Display */}
      <motion.div 
        style={{ opacity: yearOpacity, y: yearY, willChange: "transform, opacity" }}
        className="absolute top-[15%] z-30 text-center pointer-events-none"
      >
        <h2 className="text-[10px] font-semibold tracking-[0.3em] text-rose-400/80 uppercase mb-3">Timeline</h2>
        <p className="text-5xl sm:text-6xl font-light tracking-tight text-white">
          {moon.year}
        </p>
      </motion.div>

      {/* Moon Image */}
      <motion.div
        style={{ translateY, scale, opacity: moonOpacity, filter: `blur(${blur})`, willChange: "transform, opacity, filter" }}
        className="relative flex items-center justify-center"
      >
        <img 
          src={moon.src} 
          className="moon-img" 
          alt={`Moon ${moon.year}`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLImageElement).src = "https://github.com/navneetty-netizen/moon/blob/main/moon-2025.jpg?raw=true";
          }}
        />
      </motion.div>
    </motion.div>
  );
}
