'use client';

import React, { useState } from 'react';
import { ALL_MEDIA, MEDIA_BASE_URL } from '@/lib/constants';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Gallery() {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<{ id: string, type: 'photo' | 'video' } | null>(null);

  const filteredMedia = ALL_MEDIA.filter(item => 
    filter === 'all' ? true : item.type === filter
  );

  return (
    <section id="gallery" className="mt-32 relative">
      {/* Filter Tabs */}
      <div className="sticky top-20 z-40 py-4 mb-8 flex items-center justify-between">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-transparent -z-10 h-full pointer-events-none" />
        
        <h3 className="text-sm font-medium text-white tracking-tight hidden sm:block">Gallery</h3>

        <div className="flex gap-1 p-1 bg-neutral-900/40 rounded-full border border-white/5 backdrop-blur-md mx-auto sm:mx-0 shadow-lg">
          {(['all', 'photo', 'video'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                "px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 capitalize",
                filter === type 
                  ? "text-rose-100 bg-rose-500/10 shadow-[0_0_10px_rgba(225,29,72,0.1)] ring-1 ring-rose-500/20"
                  : "text-neutral-400 hover:text-rose-300"
              )}
            >
              {type === 'all' ? 'All Memories' : type + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-like Grid */}
      <motion.div 
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence mode='popLayout'>
          {filteredMedia.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid"
            >
              <div 
                onClick={() => setSelectedMedia(item)}
                className="relative group overflow-hidden rounded-2xl bg-neutral-900/50 border border-white/10 transition-all duration-500 hover:border-rose-500/30 hover:shadow-[0_0_30px_-10px_rgba(225,29,72,0.15)] cursor-pointer backdrop-blur-sm"
              >
                {item.type === 'photo' ? (
                  <img 
                    src={`${MEDIA_BASE_URL}${item.id}`}
                    alt=""
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative">
                    <video 
                      src={`${MEDIA_BASE_URL}${item.id}`}
                      className="w-full h-auto object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5 flex items-center gap-1.5">
                      <Play className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                      <span className="text-[10px] font-medium text-white/90 uppercase">Play</span>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 text-neutral-400 hover:text-rose-400 transition-colors bg-white/5 p-2 rounded-full border border-white/5 z-50"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-5 h-5" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full max-w-6xl flex items-center justify-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'photo' ? (
                <img 
                  src={`${MEDIA_BASE_URL}${selectedMedia.id}`}
                  alt=""
                  className="max-h-full max-w-full rounded-md shadow-2xl object-contain"
                />
              ) : (
                <video 
                  src={`${MEDIA_BASE_URL}${selectedMedia.id}`}
                  controls
                  autoPlay
                  className="max-h-full max-w-full rounded-md shadow-2xl outline-none"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
