'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ALL_MEDIA, MEDIA_BASE_URL } from '@/lib/constants';
import { Play } from 'lucide-react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

export default function PhotoSphere() {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(280);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use MotionValues for high-performance animations (avoids React re-renders)
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  
  // Create inverted transforms for the cards to face the camera
  const invRotationX = useTransform(rotationX, (v) => -v);
  const invRotationY = useTransform(rotationY, (v) => -v);
  
  const velocityX = useRef(0.2);
  const velocityY = useRef(0.1);
  
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const sphereItems = ALL_MEDIA.slice(0, 18); 
  const phi = Math.PI * (3 - Math.sqrt(5));

  useEffect(() => {
    console.log(`[PhotoSphere] useEffect setMounted. mounted: true`);
    setMounted(true);
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 220 : 280);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  useAnimationFrame(() => {
    if (!mounted || isDragging.current) return;
    
    rotationY.set(rotationY.get() + velocityX.current);
    rotationX.set(rotationX.get() + velocityY.current);
    
    velocityX.current *= 0.98;
    velocityY.current *= 0.98;

    if (Math.abs(velocityX.current) < 0.1) velocityX.current = 0.1;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - lastMouse.current.x;
      const deltaY = e.clientY - lastMouse.current.y;

      rotationY.set(rotationY.get() + deltaX * 0.5);
      rotationX.set(rotationX.get() - deltaY * 0.5);

      velocityX.current = deltaX * 0.1;
      velocityY.current = -deltaY * 0.1;

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rotationX, rotationY]);

  if (!mounted) {
    console.log(`[PhotoSphere] SSR fallback rendered. mounted: ${mounted}`);
    return <div className="h-[400px] sm:h-[500px] lg:h-[600px]" />;
  }

  return (
    <div 
      className="scene" 
      onMouseDown={(e) => {
        console.log(`[PhotoSphere] MouseDown. isDragging: ${isDragging.current} lastMouse: ${JSON.stringify(lastMouse.current)}`);
        isDragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <motion.div 
        className="sphere"
        style={{
          rotateY: rotationY,
          rotateX: rotationX
        }}
      >
        {sphereItems.map((item, i) => {
          const y = 1 - (i / (sphereItems.length - 1)) * 2;
          const radiusAtY = Math.sqrt(1 - y * y);
          const theta = phi * i;

          const xPos = Math.cos(theta) * radiusAtY * radius;
          const yPos = y * radius;
          const zPos = Math.sin(theta) * radiusAtY * radius;

          return (
            <div 
              key={i}
              className="sphere-item"
              style={{
                transform: `translate3d(${xPos}px, ${yPos}px, ${zPos}px)`
              }}
            >
              <motion.div 
                style={{ 
                  rotateX: invRotationX,
                  rotateY: invRotationY
                }}
                className="sphere-card group relative bg-neutral-900/80 backdrop-blur-sm"
              >
                {item.type === 'photo' ? (
                  <img 
                    src={`${MEDIA_BASE_URL}${item.id}`} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    alt=""
                  />
                ) : (
                  <>
                    <video 
                      src={`${MEDIA_BASE_URL}${item.id}`} 
                      className="w-full h-full object-cover" 
                      muted 
                      loop 
                      playsInline 
                      preload="none"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                      <Play className="text-white/80 w-5 h-5" />
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
