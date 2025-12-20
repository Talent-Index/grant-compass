// Central Analytics Utility
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

export type AnalyticsEvent = 
  | 'page_view'
  | 'signup_success'
  | 'signup_wallet'
  | 'login_success'
  | 'grant_search'
  | 'grant_filter_used'
  | 'grant_apply_click'
  | 'opportunity_view'
  | 'premium_unlock_attempt'
  | 'premium_unlock_success'
  | 'niche_finder_start'
  | 'onboarding_complete';

class Analytics {
  private userId: string | null = null;

  setUserId(id: string | null) {
    this.userId = id;
  }

  async track(event: AnalyticsEvent, data?: Record<string, unknown>) {
    try {
      const insertData: {
        user_id: string | null;
        event_name: string;
        page_name: string | null;
        event_data: Json | null;
      } = {
        user_id: this.userId,
        event_name: event,
        page_name: typeof window !== 'undefined' ? window.location.pathname : null,
        event_data: data ? (data as Json) : null,
      };

      const { error } = await supabase
        .from('analytics_events')
        .insert(insertData);

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    } catch (err) {
      console.error('Failed to track event:', err);
    }
  }

  // Convenience methods
  pageView(pageName: string) {
    return this.track('page_view', { page: pageName });
  }

  grantSearch(query: string, filters?: Record<string, unknown>) {
    return this.track('grant_search', { query, filters });
  }

  grantFilterUsed(filterType: string, filterValue: string) {
    return this.track('grant_filter_used', { filterType, filterValue });
  }

  grantApplyClick(grantId: string, grantName: string) {
    return this.track('grant_apply_click', { grantId, grantName });
  }

  premiumUnlockAttempt(method: 'stake' | 'payment') {
    return this.track('premium_unlock_attempt', { method });
  }

  premiumUnlockSuccess(txHash?: string) {
    return this.track('premium_unlock_success', { txHash });
  }
}

export const analytics = new Analytics();
