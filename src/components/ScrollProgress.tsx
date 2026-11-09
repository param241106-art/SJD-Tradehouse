import { useScrollProgress } from '@/lib/hooks';

export function ScrollProgress() {
  const progress = useScrollProgress();

  // transform (not width) so each scroll tick is a compositor-only update
  // with no layout work.
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-gold to-gold-light will-change-transform"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
