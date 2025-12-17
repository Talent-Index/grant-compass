// Grant detail page with eligibility checklist
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockGrants, ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  DollarSign, 
  Globe,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  Calendar,
  Building,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GrantDetail() {
  const { id } = useParams();
  const grant = mockGrants.find(g => g.id === id);

  if (!grant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Grant not found</h1>
            <Link to="/grants">
              <Button variant="outline">Back to Grants</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const daysUntilDeadline = grant.deadline 
    ? Math.ceil((new Date(grant.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  const getStatusColor = (status: typeof grant.status) => {
    switch (status) {
      case 'open': return 'bg-primary/20 text-primary border-primary/30';
      case 'upcoming': return 'bg-warning/20 text-warning border-warning/30';
      case 'closed': return 'bg-muted text-muted-foreground border-muted';
    }
  };

  // Mock eligibility check
  const eligibilityChecks = [
    { rule: 'Build on target ecosystem', status: 'pass' as const },
    { rule: 'Open to global applicants', status: 'pass' as const },
    { rule: 'Project stage requirement', status: 'warning' as const, note: 'MVP preferred' },
    { rule: 'Open-source preference', status: 'pass' as const },
  ];

  // Mock guidance
  const applicationTips = [
    'Clearly articulate how your project benefits the ecosystem',
    'Include technical specifications and architecture diagrams',
    'Show traction metrics if available (users, TVL, transactions)',
    'Explain your team\'s relevant experience',
    'Provide a realistic timeline with measurable milestones',
  ];

  const commonMistakes = [
    'Vague problem statements without specific data',
    'Unrealistic funding requests or timelines',
    'Missing technical details on implementation',
    'Not addressing how funds will be used',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Back Link */}
          <Link 
            to="/grants" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Grants
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="outline" className={getStatusColor(grant.status)}>
                    {grant.status.charAt(0).toUpperCase() + grant.status.slice(1)}
                  </Badge>
                  <Badge variant="secondary">{ecosystemLabels[grant.ecosystem]}</Badge>
                  <Badge variant="outline">
                    {grant.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{grant.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <span>{grant.organization}</span>
                </div>
              </div>

              {/* Description */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>About This Grant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {grant.description}
                  </p>
                </CardContent>
              </Card>

              {/* Focus Areas */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {grant.focusAreas.map((niche) => (
                      <Badge key={niche} variant="secondary" className="text-sm py-1.5">
                        {nicheLabels[niche]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Checklist */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Eligibility Check
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {grant.eligibilityRules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                          eligibilityChecks[i]?.status === 'pass' 
                            ? 'bg-primary/20' 
                            : 'bg-warning/20'
                        )}>
                          {eligibilityChecks[i]?.status === 'pass' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                          )}
                        </div>
                        <div>
                          <span className="text-foreground">{rule}</span>
                          {eligibilityChecks[i]?.note && (
                            <p className="text-sm text-warning mt-0.5">
                              {eligibilityChecks[i].note}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Application Guidance */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    Application Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Tips for Success</h4>
                    <ul className="space-y-2">
                      {applicationTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-warning">Common Mistakes to Avoid</h4>
                    <ul className="space-y-2">
                      {commonMistakes.map((mistake, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                          {mistake}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply CTA */}
              <Card className="gradient-card border-primary/30 shadow-glow">
                <CardContent className="pt-6 space-y-4">
                  <a 
                    href={grant.applicationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="hero" size="full" className="gap-2">
                      Apply on Ecosystem Portal
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground">
                    Grant Spotter prepares you to win. Applications are submitted directly to the grant provider.
                  </p>
                </CardContent>
              </Card>

              {/* Key Details */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Key Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Range</p>
                      <p className="font-semibold">
                        {formatCurrency(grant.fundingMin)} – {formatCurrency(grant.fundingMax)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      {grant.deadline ? (
                        <>
                          <p className="font-semibold">{formatDate(grant.deadline)}</p>
                          {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                            <p className={cn(
                              'text-sm',
                              daysUntilDeadline <= 14 ? 'text-warning' : 'text-muted-foreground'
                            )}>
                              {daysUntilDeadline} days remaining
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="font-semibold">Rolling Applications</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-semibold capitalize">
                        {grant.region?.join(', ') || 'Global'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Assistant CTA */}
              <Card className="gradient-card border-border/50">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Need Help With Your Proposal?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI assistant can help you draft a compelling proposal tailored to this grant.
                  </p>
                  <Button variant="secondary" size="full" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Start Proposal Assistant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
