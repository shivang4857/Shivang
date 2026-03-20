'use client';

import { ReactNode, RefObject } from 'react';

interface StickySceneProps {
  id?: string;
  enabled: boolean;
  sceneHeight?: string;
  children: ReactNode;
  sceneRef?: RefObject<HTMLElement | null>;
  contentRef?: RefObject<HTMLDivElement | null>;
}

export default function StickyScene({
  id,
  enabled,
  sceneHeight = '180vh',
  children,
  sceneRef,
  contentRef,
}: StickySceneProps) {
  return (
    <section
      id={id}
      ref={sceneRef}
      style={{
        position: 'relative',
        minHeight: enabled ? sceneHeight : 'auto',
      }}
    >
      <div
        ref={contentRef}
        style={{
          position: enabled ? 'sticky' : 'relative',
          top: 0,
          minHeight: enabled ? '100vh' : 'auto',
          display: 'flex',
          alignItems: enabled ? 'center' : 'stretch',
        }}
      >
        {children}
      </div>
    </section>
  );
}
