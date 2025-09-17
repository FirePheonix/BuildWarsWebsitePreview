import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to check if email is authorized via Supabase
export const isEmailAuthorized = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('authorized_users')
      .select('email')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error checking authorized email:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Error in isEmailAuthorized:', error);
    return false;
  }
};

// Function to get all authorized emails (for admin purposes)
export const getAuthorizedEmails = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('authorized_users')
      .select('email')
      .order('email');

    if (error) {
      console.error('Error fetching authorized emails:', error);
      return [];
    }

    return data.map(item => item.email);
  } catch (error) {
    console.error('Error in getAuthorizedEmails:', error);
    return [];
  }
};
