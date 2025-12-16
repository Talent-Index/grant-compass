import { Grant, GrantMatch } from '@/types/grant';
import { ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ExternalLink, Clock, DollarSign, Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface GrantCardProps {
  grant: Grant;
  matchData?: GrantMatch;
  compact?: boolean;
}

export function GrantCard({ grant, matchData, compact = false }: GrantCardProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  const getStatusColor = (status: Grant['status']) => {
    switch (status) {
      case 'open': return 'bg-primary/20 text-primary border-primary/30';
      case 'upcoming': return 'bg-warning/20 text-warning border-warning/30';
      case 'closed': return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const daysUntilDeadline = grant.deadline 
    ? Math.ceil((new Date(grant.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className="group gradient-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className={getStatusColor(grant.status)}>
                {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
              </Badge>
              <Badge variant="secondary" className="bg-secondary/50">
                {ecosystemLabels[grant.ecosystem]}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors truncate">
              {grant.name}
            </h3>
            <p className="text-sm text-muted-foreground">{grant.organization}</p>
          </div>
          
          {matchData && (
            <div className="flex flex-col items-end shrink-0">
              <div className={cn('text-2xl font-bold', getMatchScoreColor(matchData.matchScore))}>
                {matchData.matchScore}%
              </div>
              <span className="text-xs text-muted-foreground">Match</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {grant.description}
          </p>
        )}

        {/* Key Info */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DollarSign className="w-4 h-4 text-primary" />
            <span>{formatCurrency(grant.fundingMin)} - {formatCurrency(grant.fundingMax)}</span>
          </div>
          {grant.deadline && daysUntilDeadline !== null && (
            <div className={cn(
              'flex items-center gap-1.5',
              daysUntilDeadline <= 14 ? 'text-warning' : 'text-muted-foreground'
            )}>
              <Clock className="w-4 h-4" />
              <span>
                {daysUntilDeadline > 0 
                  ? `${daysUntilDeadline} days left`
                  : 'Deadline passed'
                }
              </span>
            </div>
          )}
          {!grant.deadline && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Rolling deadline</span>
            </div>
          )}
        </div>

        {/* Focus Areas */}
        <div className="flex flex-wrap gap-1.5">
          {grant.focusAreas.slice(0, compact ? 3 : 5).map((niche) => (
            <Badge key={niche} variant="outline" className="text-xs bg-muted/30">
              {nicheLabels[niche]}
            </Badge>
          ))}
          {grant.focusAreas.length > (compact ? 3 : 5) && (
            <Badge variant="outline" className="text-xs bg-muted/30">
              +{grant.focusAreas.length - (compact ? 3 : 5)}
            </Badge>
          )}
        </div>

        {/* Match Reasons */}
        {matchData && matchData.matchReasons.length > 0 && !compact && (
          <div className="space-y-1.5 pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <Target className="w-3.5 h-3.5" />
              Why this matches you
            </div>
            <ul className="space-y-1">
              {matchData.matchReasons.slice(0, 3).map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Eligibility Warning */}
        {matchData && matchData.eligibilityStatus === 'partial' && !compact && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-warning/10 border border-warning/20">
            <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-warning">
              {matchData.eligibilityNotes[0]}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to={`/grants/${grant.id}`} className="flex-1">
            <Button variant="secondary" size="full" className="text-sm">
              View Details
            </Button>
          </Link>
          <a 
            href={grant.applicationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="hero" size="full" className="text-sm gap-2">
              Apply
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
