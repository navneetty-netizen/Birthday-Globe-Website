'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log(`[SmoothScroll] useEffect setMounted. mounted: true`);
    setMounted(true);
  }, []);

  if (!mounted) {
    console.log(`[SmoothScroll] SSR fallback rendered. mounted: ${mounted}`);
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.2,
      smoothWheel: true,
    }}>
      {children}
    </ReactLenis>
  );
}
