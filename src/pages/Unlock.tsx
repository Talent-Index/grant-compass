import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coins, Zap, Shield, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useActiveAccount } from 'thirdweb/react';
import { Button } from '@/components/ui/button';
import { ConnectWalletButton } from '@/components/wallet/ConnectWalletButton';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditContext';
import { supabase } from '@/integrations/supabase/client';
import { CREDIT_PRICING } from '@/lib/thirdweb';
import { toast } from 'sonner';
import { Frame } from '@/components/layout/Frame';

export default function Unlock() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const { credits, refreshCredits } = useCredits();
  const account = useActiveAccount();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const walletAddress = account?.address;
  const isConnected = !!walletAddress;

  // If user already has credits, redirect to dashboard
  React.useEffect(() => {
    if (credits > 0 && !isPurchasing) {
      navigate('/dashboard');
    }
  }, [credits, isPurchasing, navigate]);

  const handlePurchaseCredits = async () => {
    if (!user || !walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsPurchasing(true);
    try {
      // Update profile with wallet address if not set
      if (!profile?.wallet_address) {
        await supabase
          .from('profiles')
          .update({ wallet_address: walletAddress })
          .eq('user_id', user.id);
      }

      // Call edge function to process purchase
      // For now, we'll simulate the purchase and add credits directly
      // In production, this would integrate with thirdweb x402
      const { data, error } = await supabase.functions.invoke('credits-purchase', {
        body: {
          wallet_address: walletAddress,
          package: 'starter', // 100 credits
        }
      });

      if (error) throw error;

      if (data?.success) {
        setPurchaseSuccess(true);
        await refreshCredits();
        await refreshProfile();
        toast.success('Credits purchased successfully!');
        
        // Redirect after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        throw new Error(data?.error || 'Purchase failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to purchase credits. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (purchaseSuccess) {
    return (
      <Frame>
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Access Unlocked!</h1>
            <p className="text-muted-foreground">
              You now have {CREDIT_PRICING.baseCredits} credits to explore Grantees
            </p>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/dashboard')}
            >
              Enter Grantees <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </Frame>
    );
  }

  return (
    <Frame>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Coins className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Unlock Grantees
            </h1>
            <p className="text-muted-foreground">
              Purchase credits to access AI-powered grant matching and premium insights
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-foreground">
                {CREDIT_PRICING.baseCredits} Credits
              </div>
              <div className="text-lg text-muted-foreground">
                ~{CREDIT_PRICING.avaxPrice} AVAX
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>1 credit = 1 AI insight or action</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Access to all premium features</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Coins className="w-4 h-4 text-primary" />
                <span>Earn credits via referrals</span>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              {!isConnected ? (
                <div className="flex justify-center">
                  <ConnectWalletButton />
                </div>
              ) : (
                <Button
                  variant="hero"
                  size="full"
                  onClick={handlePurchaseCredits}
                  disabled={isPurchasing}
                >
                  {isPurchasing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Unlock Access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}

              {isConnected && (
                <p className="text-xs text-center text-muted-foreground">
                  Connected: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </p>
              )}
            </div>
          </div>

          {/* Back to login */}
          {!user && (
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => navigate('/auth')}>
                Sign in
              </Button>
            </p>
          )}
        </motion.div>
      </div>
    </Frame>
  );
}
