'use client';

import React, { useEffect, useState } from 'react';
import { TARGET_DATE } from '@/lib/constants';
import { Gift } from 'lucide-react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  } | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        isPast: false
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return <div className="h-24" />;

  if (timeLeft.isPast) {
    return (
      <div className="flex items-center gap-3 text-rose-400 border-t border-white/10 pt-8">
        <Gift className="w-5 h-5" />
        <span className="text-lg font-medium">It's today! Happy Birthday!</span>
      </div>
    );
  }

  const units = [
    { val: timeLeft.days, label: 'DAYS' },
    { val: timeLeft.hours, label: 'HOURS' },
    { val: timeLeft.minutes, label: 'MINUTES' },
    { val: timeLeft.seconds, label: 'SECONDS' }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 sm:gap-10 border-t border-white/10 pt-8 w-fit">
      {units.map((unit, index) => (
        <div key={unit.label} className="flex flex-col relative group cursor-default">
          <span className="text-3xl sm:text-4xl font-semibold text-white tracking-tight tabular-nums group-hover:text-rose-400 transition-colors duration-300 drop-shadow-lg">
            {String(unit.val).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-rose-300/60 font-medium tracking-widest mt-2 uppercase">
            {unit.label}
          </span>
          {index !== 3 && (
            <div className="absolute -right-3 sm:-right-6 top-2 text-white/20 text-2xl font-light">:</div>
          )}
        </div>
      ))}
    </div>
  );
}
