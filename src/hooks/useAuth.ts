import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, isEmailAuthorized } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecking, setAuthChecking] = useState(false);

  const checkAuthorization = async (userEmail: string | undefined) => {
    if (!userEmail) {
      setIsAuthorized(false);
      return;
    }

    setAuthChecking(true);
    try {
      const authorized = await isEmailAuthorized(userEmail);
      setIsAuthorized(authorized);
    } catch (error) {
      console.error('Error checking authorization:', error);
      setIsAuthorized(false);
    } finally {
      setAuthChecking(false);
    }
  };

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      if (currentUser?.email) {
        await checkAuthorization(currentUser.email);
      } else {
        setIsAuthorized(false);
      }
      
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      
      // Use setTimeout to avoid potential deadlocks in auth state change callback
      setTimeout(async () => {
        if (currentUser?.email) {
          await checkAuthorization(currentUser.email);
        } else {
          setIsAuthorized(false);
        }
        setLoading(false);
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    loading: loading || authChecking,
    isAuthorized,
    signIn,
    signUp,
    signOut,
  };
};
