'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ALL_MEDIA } from '@/lib/constants';
import { Play } from 'lucide-react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

export default function PhotoSphere() {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(280);
  const rotationX = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const invX = useTransform(rotationX, v => -v);
  const invY = useTransform(rotationY, v => -v);

  const velocityX = useRef(0.2);
  const velocityY = useRef(0.1);
  const isDragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const sphereItems = ALL_MEDIA.slice(0, 18);
  const phi = Math.PI * (3 - Math.sqrt(5));

  useEffect(() => {
    setMounted(true);
    const resize = () =>
      setRadius(window.innerWidth < 640 ? 160 : window.innerWidth < 1024 ? 220 : 280);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useAnimationFrame(() => {
    if (!mounted || isDragging.current) return;
    rotationY.set(rotationY.get() + velocityX.current);
    rotationX.set(rotationX.get() + velocityY.current);
    velocityX.current *= 0.98;
    velocityY.current *= 0.98;
  });

  if (!mounted) return <div className="h-[500px]" />;

  return (
    <div
      className="scene"
      onMouseDown={e => {
        isDragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <motion.div className="sphere" style={{ rotateX: rotationX, rotateY: rotationY }}>
        {sphereItems.map((item, i) => {
          const y = 1 - (i / (sphereItems.length - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const theta = phi * i;

          return (
            <div
              key={item.src}
              className="sphere-item"
              style={{
                transform: `translate3d(${Math.cos(theta) * r * radius}px, ${
                  y * radius
                }px, ${Math.sin(theta) * r * radius}px)`
              }}
            >
              <motion.div
                className="sphere-card"
                style={{ rotateX: invX, rotateY: invY }}
              >
                {item.type === 'photo' ? (
                  <img src={item.src} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={e => e.currentTarget.play()}
                      onMouseLeave={e => e.currentTarget.pause()}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="text-white w-5 h-5" />
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
