import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ExternalLink, 
  MapPin, 
  Calendar,
  DollarSign,
  Clock,
  Check,
  AlertCircle,
  Bookmark,
  Bell,
  Sparkles,
  Plane,
  Building,
  Users
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Frame } from '@/components/layout/Frame';
import { Footer } from '@/components/Footer';
import { MotionSection, MotionItem } from '@/components/Motion/MotionSection';
import { mockOpportunities } from '@/data/mockOpportunities';
import { opportunityTypeLabels, ecosystemLabels } from '@/types/grant';

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const opportunity = mockOpportunities.find(opp => opp.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container pt-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Opportunity not found</h1>
          <Link to="/opportunities">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to opportunities
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock match reasons (would come from matching engine)
  const matchReasons = [
    "Your DeFi focus aligns with this opportunity",
    "Your project stage matches requirements",
    "Ecosystem alignment with your target chains"
  ];

  const logisticsChecklist = [
    { label: "Application deadline", value: opportunity.deadline || opportunity.eventStartDate || "Rolling", icon: Calendar },
    { label: "Location", value: opportunity.eventLocation || (opportunity.isRemote ? "Remote" : "TBD"), icon: MapPin },
    { label: "Duration", value: opportunity.residencyDuration || "N/A", icon: Clock },
    { label: "Travel coverage", value: opportunity.travelCoverage === 'full' ? 'Full' : opportunity.travelCoverage === 'partial' ? 'Partial' : 'None', icon: Plane },
    { label: "Visa support", value: opportunity.visaSupportProvided ? "Yes" : "No", icon: Building },
    { label: "Equity required", value: opportunity.equityRequired ? "Yes" : "No", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-24 pb-8 md:pt-28 border-b border-border/30">
        <div className="container">
          <Link 
            to="/opportunities" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to opportunities
          </Link>

          <MotionSection>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary">
                {opportunityTypeLabels[opportunity.opportunityType]}
              </Badge>
              <Badge variant="outline">
                {ecosystemLabels[opportunity.ecosystem]}
              </Badge>
              {opportunity.status === 'open' && (
                <Badge variant="success">Open</Badge>
              )}
              {opportunity.status === 'upcoming' && (
                <Badge variant="outline">Upcoming</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
              {opportunity.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              by {opportunity.organization}
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What this is */}
            <MotionSection>
              <h2 className="text-xl font-semibold mb-4 text-foreground">What this is</h2>
              <p className="text-muted-foreground leading-relaxed">
                {opportunity.description}
              </p>
              {opportunity.focusAreas && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {opportunity.focusAreas.map(area => (
                    <Badge key={area} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              )}
            </MotionSection>

            {/* Funding & Support */}
            {(opportunity.fundingMin || opportunity.fundingMax || opportunity.travelCoverage) && (
              <MotionSection>
                <h2 className="text-xl font-semibold mb-4 text-foreground">Funding & Support</h2>
                <div className="p-6 bg-muted/30 rounded-xl border border-border/30">
                  {(opportunity.fundingMin || opportunity.fundingMax) && (
                    <div className="flex items-center gap-3 mb-4">
                      <DollarSign className="w-5 h-5 text-emerald" />
                      <div>
                        <p className="font-medium text-foreground">
                          ${opportunity.fundingMin?.toLocaleString()} - ${opportunity.fundingMax?.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Funding range</p>
                      </div>
                    </div>
                  )}
                  {opportunity.travelCoverage && opportunity.travelCoverage !== 'none' && (
                    <div className="flex items-center gap-3">
                      <Plane className="w-5 h-5 text-emerald" />
                      <div>
                        <p className="font-medium text-foreground">
                          {opportunity.travelCoverage === 'full' ? 'Full travel coverage' : 'Partial travel coverage'}
                        </p>
                        <p className="text-sm text-muted-foreground">Travel support included</p>
                      </div>
                    </div>
                  )}
                </div>
              </MotionSection>
            )}

            {/* Why this fits you - AI generated */}
            <MotionSection>
              <div className="p-6 bg-emerald/5 rounded-xl border border-emerald/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald" />
                  <h2 className="text-lg font-semibold text-foreground">Why this fits you</h2>
                </div>
                <ul className="space-y-3">
                  {matchReasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{reason}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  * Complete your profile to get more accurate matches
                </p>
              </div>
            </MotionSection>

            {/* Eligibility */}
            {opportunity.eligibilityRules && opportunity.eligibilityRules.length > 0 && (
              <MotionSection>
                <h2 className="text-xl font-semibold mb-4 text-foreground">Eligibility</h2>
                <ul className="space-y-3">
                  {opportunity.eligibilityRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </MotionSection>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Primary CTA */}
            <div className="p-6 bg-card rounded-xl border border-border/50 sticky top-24">
              <a 
                href={opportunity.externalApplicationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="w-full mb-3 bg-emerald hover:bg-emerald/90 text-emerald-foreground min-h-[48px]">
                  Apply on Official Site
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
              
              {/* Secondary actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Bell className="w-4 h-4" />
                  Remind
                </Button>
              </div>
            </div>

            {/* Logistics Checklist */}
            <div className="p-6 bg-muted/30 rounded-xl border border-border/30">
              <h3 className="font-semibold mb-4 text-foreground">Logistics</h3>
              <ul className="space-y-4">
                {logisticsChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OpportunityDetail;