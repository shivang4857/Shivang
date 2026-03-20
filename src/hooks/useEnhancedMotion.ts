'use client';

import { useEffect, useState } from 'react';

export default function useEnhancedMotion(breakpoint = 1024) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');

    const update = () => {
      setEnabled(widthQuery.matches && motionQuery.matches);
    };

    update();
    widthQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);

    return () => {
      widthQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, [breakpoint]);

  return enabled;
}
