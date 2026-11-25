'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Renders `children` once they come near the screen, and only in the browser. The
 * calendar shows "today" in the visitor's time zone, which a static page cannot know,
 * and a page of examples loads faster when the ones far below wait.
 */
export function LazyMount({
  minHeight,
  children,
}: {
  minHeight: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (visible || !element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : <div className="ex-loading">Loading example…</div>}
    </div>
  );
}
