'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

/**
 * Emotion cache setup for Next.js App Router
 * This ensures styles are properly injected and prevents hydration issues
 */
export default function EmotionCacheProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [cache] = useState<EmotionCache>(() => {
    const cache = createCache({ 
      key: 'mui', 
      prepend: true 
    });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const names = Object.keys(cache.inserted);
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const name of names) {
      const style = (cache.inserted as any)[name];
      if (typeof style !== 'boolean') {
        styles += style;
      }
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

