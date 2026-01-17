import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const createSupabaseClient = (configService: ConfigService) => {
  const supabaseUrl = configService.get<string>('SUPABASE_URL');
  const supabaseServiceKey = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL or Service Role Key is missing in environment variables');
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
