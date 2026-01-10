'use client';

import React, { useState } from 'react';
import { ALL_MEDIA } from '@/lib/constants';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<
    { src: string; type: 'photo' | 'video' } | null
  >(null);

  const filteredMedia = ALL_MEDIA.filter(item =>
    filter === 'all' ? true : item.type === filter
  );

  return (
    <section id="gallery" className="mt-32 relative">
      {/* Filter Tabs */}
      <div className="sticky top-20 z-40 py-4 mb-8 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent -z-10" />
        <h3 className="text-sm font-medium text-white hidden sm:block">Gallery</h3>

        <div className="flex gap-1 p-1 bg-neutral-900/40 rounded-full border border-white/5 backdrop-blur-md mx-auto sm:mx-0">
          {(['all', 'photo', 'video'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                'px-5 py-1.5 text-xs rounded-full capitalize transition',
                filter === type
                  ? 'text-rose-100 bg-rose-500/10 ring-1 ring-rose-500/20'
                  : 'text-neutral-400 hover:text-rose-300'
              )}
            >
              {type === 'all' ? 'All Memories' : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence>
          {filteredMedia.map(item => (
            <motion.div
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="break-inside-avoid"
            >
              <div
                onClick={() => setSelectedMedia(item)}
                className="relative cursor-pointer overflow-hidden rounded-2xl bg-neutral-900/50 border border-white/10 hover:border-rose-500/30"
              >
                {item.type === 'photo' ? (
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="relative">
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={e => e.currentTarget.play()}
                      onMouseLeave={e => e.currentTarget.pause()}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 px-2 py-1 rounded-full flex items-center gap-1">
                      <Play className="w-3 h-3 fill-rose-400 text-rose-400" />
                      <span className="text-[10px] text-white">Play</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <button className="absolute top-6 right-6 text-white">
              <X />
            </button>

            {selectedMedia.type === 'photo' ? (
              <img src={selectedMedia.src} className="max-h-full max-w-full" />
            ) : (
              <video
                src={selectedMedia.src}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
