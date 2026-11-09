import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// react-simple-maps + d3-geo + the map data are only needed once the visitor
// scrolls toward the map, so they live in their own chunk.
const InteractiveMap = lazy(() =>
  import('@/components/sections/InteractiveMap').then((m) => ({ default: m.InteractiveMap })),
);

/** Same footprint as the loaded map (header + 4:3 map capped at 420px +
 * legend), so swapping it in causes no layout shift. */
function MapPlaceholder() {
  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface" aria-hidden="true">
      <div className="h-[99px] border-b border-line" />
      <div className="w-full bg-bg" style={{ aspectRatio: '4 / 3', maxHeight: 420 }} />
      <div className="h-[41px] border-t border-line" />
    </div>
  );
}

export function DeferredMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {show ? (
        <Suspense fallback={<MapPlaceholder />}>
          <InteractiveMap />
        </Suspense>
      ) : (
        <MapPlaceholder />
      )}
    </div>
  );
}
