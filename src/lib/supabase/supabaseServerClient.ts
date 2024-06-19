import { createClient, type PostgrestError } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';

export type SupabaseResponse<T> =
	| { type: 'success'; data: T; error: null }
	| { type: 'error'; data: null; error: PostgrestError };

export const supabaseServerClient = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);
