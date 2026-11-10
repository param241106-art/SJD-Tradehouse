/** Absolute site origin + base path, no trailing slash. Set at build time
 * from the SITE_URL environment variable (see vite.config.ts). */
export const SITE_URL: string = (
  import.meta.env.VITE_SITE_URL ?? 'https://sjdtradehouse.com'
).replace(/\/$/, '');

export const CONTACT = {
  salesEmail: 'contact@sjdtradehouse.com',
  supportEmail: 'info@sjdtradehouse.com',
  phoneUae: { display: '+971 58 592 7251', tel: '+971585927251' },
  phoneIndia: { display: '+91 99960 64220', tel: '+919996064220' },
  whatsapp: 'https://wa.me/971585927251',
  city: 'Rohtak, India 124001',
} as const;

/** Resolve a public/ asset path ("/images/x.jpg") against the deploy base. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
