import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Предупреждение: SUPABASE_URL или SUPABASE_ANON_KEY не настроены в файле .env');
}

// Инициализируем клиент Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);