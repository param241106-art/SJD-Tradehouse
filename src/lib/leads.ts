import { getSupabase } from '@/lib/supabase';
import { CONTACT } from '@/lib/site';

export type LeadResult = { ok: true; via: 'database' | 'email' } | { ok: false };

function openEmailDraft(subject: string, fields: Record<string, string | undefined>) {
  const body = Object.entries(fields)
    .filter(([, v]) => v && v.trim() !== '')
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  const href = `mailto:${CONTACT.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
}

/**
 * Saves a form submission. With a configured backend the row goes to the
 * Supabase table; without one (or if the insert fails) the visitor's email
 * app opens with the enquiry pre-filled, so a lead is never silently lost.
 */
export async function submitLead(
  table: string,
  row: Record<string, unknown>,
  email: { subject: string; fields: Record<string, string | undefined> },
): Promise<LeadResult> {
  const supabase = await getSupabase();
  if (supabase) {
    const { error } = await supabase.from(table).insert(row);
    if (!error) return { ok: true, via: 'database' };
    return { ok: false };
  }
  openEmailDraft(email.subject, email.fields);
  return { ok: true, via: 'email' };
}

export { openEmailDraft };
