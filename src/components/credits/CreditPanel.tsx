import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Gift, TrendingUp, Copy, Check } from 'lucide-react';
import { useCredits } from '@/contexts/CreditContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CreditPanel() {
  const { credits, referralCode, referralCount, transactions } = useCredits();
  const [copied, setCopied] = React.useState(false);

  const referralLink = referralCode 
    ? `${window.location.origin}/auth?ref=${referralCode}` 
    : null;

  const copyReferralLink = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate credit score based on activity
  const creditScore = Math.min(100, Math.round(
    (credits * 0.3) + (referralCount * 10) + (transactions.length * 2)
  ));

  return (
    <div className="space-y-4">
      {/* Credit Balance */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Coins className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credit Balance</p>
              <p className="text-2xl font-bold text-foreground">{credits}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/unlock">Buy Credits</a>
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          1 credit = 1 AI insight or premium action
        </div>
      </motion.div>

      {/* Referral Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Gift className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Referrals</p>
            <p className="text-2xl font-bold text-foreground">{referralCount}</p>
          </div>
        </div>
        
        {referralLink && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Share your link to earn 10 credits per signup</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-secondary/50 rounded px-2 py-1.5 text-xs text-foreground truncate">
                {referralCode}
              </code>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyReferralLink}
                className="shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Credit Score */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Credit Score</p>
            <p className="text-2xl font-bold text-foreground">{creditScore}</p>
          </div>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${creditScore}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Based on credits earned, spent, and referrals
        </p>
      </motion.div>
    </div>
  );
}
