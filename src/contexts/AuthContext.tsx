import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { analytics } from '@/lib/analytics';

interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  wallet_address: string | null;
  signup_method: 'email' | 'wallet';
  is_premium: boolean;
  premium_unlocked_at: string | null;
  stake_tx_hash: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isPremium: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updatePremiumStatus: (isPremium: boolean, txHash?: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data as Profile | null;
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Update analytics user ID
        analytics.setUserId(session?.user?.id ?? null);
        
        // Defer profile fetch with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id).then(setProfile);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      analytics.setUserId(session?.user?.id ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id).then((p) => {
          setProfile(p);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (!error) {
      analytics.track('signup_success', { method: 'email' });
      
      // Trigger confirmation email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { email },
        });
      } catch (err) {
        console.error('Failed to send welcome email:', err);
      }
    }

    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      analytics.track('login_success', { method: 'email' });
    }

    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const updatePremiumStatus = async (isPremium: boolean, txHash?: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        is_premium: isPremium,
        premium_unlocked_at: isPremium ? new Date().toISOString() : null,
        stake_tx_hash: txHash || null,
      })
      .eq('user_id', user.id);

    if (!error) {
      await refreshProfile();
      if (isPremium) {
        analytics.premiumUnlockSuccess(txHash);
      }
    }
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    isPremium: profile?.is_premium ?? false,
    signUp,
    signIn,
    signOut,
    updatePremiumStatus,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
