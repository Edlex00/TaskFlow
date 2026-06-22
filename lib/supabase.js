import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://inesnkwwatfqssjwnfvz.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_pBANb5A5jw9GKieLG15HDQ__GuFklO5';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
