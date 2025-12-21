import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface CreditTransaction {
  id: string;
  type: 'purchase' | 'spend' | 'referral' | 'bonus';
  credits: number;
  tx_hash?: string;
  description?: string;
  created_at: string;
}

interface CreditContextType {
  credits: number;
  isLoading: boolean;
  transactions: CreditTransaction[];
  referralCode: string | null;
  referralCount: number;
  refreshCredits: () => Promise<void>;
  spendCredits: (amount: number, description: string) => Promise<boolean>;
  hasCredits: (amount?: number) => boolean;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export function CreditProvider({ children }: { children: React.ReactNode }) {
  const { profile, user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralCount, setReferralCount] = useState(0);

  const refreshCredits = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      // Fetch profile for credits balance and referral code
      const { data: profileData } = await supabase
        .from('profiles')
        .select('credits_balance, referral_code')
        .eq('user_id', user.id)
        .single();

      if (profileData) {
        setCredits(profileData.credits_balance || 0);
        setReferralCode(profileData.referral_code || null);
      }

      // Fetch transactions
      const { data: txData } = await supabase
        .from('credit_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (txData) {
        setTransactions(txData as CreditTransaction[]);
      }

      // Fetch referral count
      const { count } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user.id);

      setReferralCount(count || 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    refreshCredits();
  }, [refreshCredits, profile]);

  const spendCredits = async (amount: number, description: string): Promise<boolean> => {
    if (!user?.id || credits < amount) return false;

    try {
      // Call edge function to spend credits atomically
      const { data, error } = await supabase.functions.invoke('credits-consume', {
        body: { amount, description }
      });

      if (error) throw error;
      if (data?.success) {
        await refreshCredits();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error spending credits:', error);
      return false;
    }
  };

  const hasCredits = (amount: number = 1) => credits >= amount;

  return (
    <CreditContext.Provider value={{
      credits,
      isLoading,
      transactions,
      referralCode,
      referralCount,
      refreshCredits,
      spendCredits,
      hasCredits,
    }}>
      {children}
    </CreditContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
}
