import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    analytics.pageView(location.pathname);
  }, [location.pathname]);
}
