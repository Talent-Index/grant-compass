import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditContext';
import { Loader2 } from 'lucide-react';

interface CreditGuardProps {
  children: React.ReactNode;
}

export function CreditGuard({ children }: CreditGuardProps) {
  const { user, isLoading: authLoading } = useAuth();
  const { credits, isLoading: creditsLoading } = useCredits();
  const location = useLocation();

  // Show loading state while checking auth and credits
  if (authLoading || creditsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirect to unlock page if no credits
  if (credits <= 0) {
    return <Navigate to="/unlock" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
