type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Classes for the <picture> wrapper (defaults to a block that fills its box). */
  wrapperClassName?: string;
  loading?: 'lazy' | 'eager';
  // Only set 'high' for a page's actual LCP candidate — combine with
  // loading="eager", since a lazy image can't be prioritized.
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
};

/**
 * Renders a WebP <source> (same basename, .webp) alongside the original
 * <img> as fallback. Only pass `src` for images that actually have a
 * matching optimized .webp twin in public/images (see scripts/optimize-images.mjs).
 */
export function Picture({
  src,
  alt,
  width,
  height,
  className,
  wrapperClassName = 'block h-full bg-green-tint',
  loading = 'lazy',
  fetchPriority,
  sizes,
}: Props) {
  // `src` is an absolute path like "/images/foo.jpg"; resolve it against
  // Vite's base so it also works under a GitHub Pages project sub-path.
  const resolvedSrc = src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;
  const webpSrc = resolvedSrc.replace(/\.(jpe?g|png)$/i, '.webp');
  return (
    <picture className={wrapperClassName}>
      <source srcSet={webpSrc} type="image/webp" sizes={sizes} />
      <img
        src={resolvedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
