import React from 'react';
import { useCredits } from '@/contexts/CreditContext';
import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreditBadgeProps {
  className?: string;
  showLabel?: boolean;
}

export function CreditBadge({ className, showLabel = true }: CreditBadgeProps) {
  const { credits } = useCredits();

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20",
      className
    )}>
      <Coins className="w-4 h-4 text-primary" />
      <span className="text-sm font-semibold text-primary">{credits}</span>
      {showLabel && (
        <span className="text-xs text-muted-foreground hidden sm:inline">credits</span>
      )}
    </div>
  );
}
