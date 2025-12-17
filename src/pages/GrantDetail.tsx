// Grant detail page with eligibility checklist (Frame F)
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { MotionSection, MotionItem } from '@/components/Motion/MotionSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockGrants, ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { shouldReduceMotion } from '@/lib/motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  DollarSign, 
  Globe,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Target,
  Calendar,
  Building,
  Sparkles,
  BookmarkPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GrantDetail() {
  const { id } = useParams();
  const grant = mockGrants.find(g => g.id === id);
  const reduceMotion = shouldReduceMotion();

  if (!grant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Grant not found</h1>
            <Link to="/grants">
              <Button variant="outline" className="min-h-[44px]">Back to Grants</Button>
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
      case 'open': return 'bg-emerald/20 text-emerald border-emerald/30';
      case 'upcoming': return 'bg-warning/20 text-warning border-warning/30';
      case 'closed': return 'bg-muted text-muted-foreground border-muted';
    }
  };

  // Mock eligibility check with clearer status
  const eligibilityChecks = [
    { rule: 'Build on target ecosystem', status: 'pass' as const, detail: 'Your profile includes this ecosystem' },
    { rule: 'Open to global applicants', status: 'pass' as const, detail: 'No geographic restrictions' },
    { rule: 'Project stage requirement', status: 'warning' as const, detail: 'MVP preferred - you have an idea stage project' },
    { rule: 'Open-source preference', status: 'pass' as const, detail: 'Matches your GitHub activity' },
  ];

  const passCount = eligibilityChecks.filter(c => c.status === 'pass').length;
  const eligibilityScore = Math.round((passCount / eligibilityChecks.length) * 100);

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

  // Recommended angle based on profile
  const recommendedAngle = `Given your ${nicheLabels[grant.focusAreas[0]]} focus and ${grant.ecosystem} experience, 
  emphasize your technical capabilities and how your solution addresses a specific pain point in the ecosystem. 
  Highlight any open-source contributions or community involvement.`;

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
              <MotionSection>
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
              </MotionSection>

              {/* Plain-language Summary */}
              <MotionSection>
                <Card className="gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle>About This Grant</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {grant.description}
                    </p>
                    <div className="p-4 rounded-lg bg-emerald/5 border border-emerald/20">
                      <h4 className="font-medium text-emerald mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Who it's for
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Builders working on {grant.focusAreas.map(f => nicheLabels[f]).join(', ')} projects 
                        within the {ecosystemLabels[grant.ecosystem]} ecosystem. Ideal for teams at 
                        MVP or early-stage seeking {formatCurrency(grant.fundingMin)} - {formatCurrency(grant.fundingMax)} in funding.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </MotionSection>

              {/* Eligibility Checklist with Visual Score */}
              <MotionSection>
                <Card className="gradient-card border-border/50 overflow-hidden">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald" />
                        Eligibility Check
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-emerald">{eligibilityScore}%</span>
                        <span className="text-sm text-muted-foreground">match</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-4">
                      {eligibilityChecks.map((check, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start gap-3"
                          initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                            check.status === 'pass' 
                              ? 'bg-emerald/20' 
                              : check.status === 'warning'
                              ? 'bg-amber-500/20'
                              : 'bg-destructive/20'
                          )}>
                            {check.status === 'pass' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald" />
                            ) : check.status === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium">{check.rule}</span>
                            <p className={cn(
                              'text-sm mt-0.5',
                              check.status === 'pass' ? 'text-muted-foreground' : 'text-amber-500'
                            )}>
                              {check.detail}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </MotionSection>

              {/* Recommended Angle */}
              <MotionSection>
                <Card className="gradient-card border-emerald/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-emerald" />
                      Recommended Angle for Your Niche
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {recommendedAngle}
                    </p>
                  </CardContent>
                </Card>
              </MotionSection>

              {/* Application Guidance */}
              <MotionSection>
                <Card className="gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald" />
                      Application Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald" />
                        Tips for Success
                      </h4>
                      <ul className="space-y-2">
                        {applicationTips.map((tip, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                            initial={reduceMotion ? {} : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <span className="text-emerald mt-1">•</span>
                            {tip}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-border/50 pt-6">
                      <h4 className="font-medium mb-3 flex items-center gap-2 text-amber-500">
                        <AlertTriangle className="w-4 h-4" />
                        Common Mistakes to Avoid
                      </h4>
                      <ul className="space-y-2">
                        {commonMistakes.map((mistake, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-amber-500 mt-1">•</span>
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </MotionSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply CTA */}
              <MotionSection>
                <Card className="gradient-card border-emerald/30 shadow-glow">
                  <CardContent className="pt-6 space-y-4">
                    <a 
                      href={grant.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button variant="hero" size="full" className="gap-2 min-h-[48px]">
                        Apply on Ecosystem Portal
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                    <Button variant="outline" size="full" className="gap-2 min-h-[48px]">
                      <BookmarkPlus className="w-4 h-4" />
                      Save Grant
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Grantees prepares you to win. Applications are submitted directly to the grant provider.
                    </p>
                  </CardContent>
                </Card>
              </MotionSection>

              {/* Key Details */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Key Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                      <DollarSign className="w-5 h-5 text-emerald" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Funding Range</p>
                      <p className="font-semibold">
                        {formatCurrency(grant.fundingMin)} – {formatCurrency(grant.fundingMax)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-emerald" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      {grant.deadline ? (
                        <>
                          <p className="font-semibold">{formatDate(grant.deadline)}</p>
                          {daysUntilDeadline !== null && daysUntilDeadline > 0 && (
                            <p className={cn(
                              'text-sm',
                              daysUntilDeadline <= 14 ? 'text-amber-500' : 'text-muted-foreground'
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
                    <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-emerald" />
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

              {/* Focus Areas */}
              <Card className="gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-base">Focus Areas</CardTitle>
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

              {/* AI Assistant CTA */}
              <Card className="gradient-card border-border/50">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-emerald-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Need Help With Your Proposal?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI assistant can help you draft a compelling proposal tailored to this grant.
                  </p>
                  <Button variant="secondary" size="full" className="gap-2 min-h-[44px]">
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
