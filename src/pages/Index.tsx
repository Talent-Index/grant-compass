import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  FileText, 
  TrendingUp,
  MapPin,
  Calendar,
  Quote,
  Compass,
  Briefcase,
  Users,
  Plane,
  Building,
  Rocket,
  GraduationCap,
  Zap
} from 'lucide-react';
import { Frame } from '@/components/layout/Frame';
import { MotionSection, MotionItem, MotionCard } from '@/components/Motion/MotionSection';
import { TrustMarquee } from '@/components/TrustMarquee';
import { Footer } from '@/components/Footer';
import { shouldReduceMotion } from '@/lib/motion';
import { mockOpportunities } from '@/data/mockOpportunities';
import { opportunityTypeLabels, ecosystemLabels } from '@/types/grant';

// Community photos
import communityPhoto1 from '@/assets/community/builders-1.jpeg';
import communityPhoto2 from '@/assets/community/builders-2.jpeg';
import communityPhoto3 from '@/assets/community/builders-3.jpeg';
import communityPhoto4 from '@/assets/community/builders-4.jpeg';
import communityPhoto5 from '@/assets/community/builders-5.jpeg';

const Index = () => {
  const reduceMotion = shouldReduceMotion();

  // Frame 3: Why Grantees
  const benefits = [
    {
      icon: Compass,
      title: "Find your niche",
      description: "Guided onboarding to discover your builder profile and target ecosystems."
    },
    {
      icon: Target,
      title: "Get matched",
      description: "Explainable recommendations showing exactly why each opportunity fits."
    },
    {
      icon: FileText,
      title: "Write faster",
      description: "AI proposal assistant with structured guidance to craft winning applications."
    },
    {
      icon: TrendingUp,
      title: "Track outcomes",
      description: "Deadline reminders and learning loops to improve your success rate."
    },
  ];

  // Frame 4: Opportunity Types
  const opportunityTypes = [
    { type: 'grant', icon: Briefcase, description: 'Project funding from ecosystems', href: '/opportunities?type=grant' },
    { type: 'travel_grant', icon: Plane, description: 'Travel support for events', href: '/opportunities?type=travel_grant' },
    { type: 'hackathon', icon: Zap, description: 'Build and win prizes', href: '/opportunities?type=hackathon' },
    { type: 'conference', icon: Users, description: 'Network and learn', href: '/opportunities?type=conference' },
    { type: 'pop_up_city', icon: MapPin, description: 'Live and build together', href: '/opportunities?type=pop_up_city' },
    { type: 'incubator', icon: Rocket, description: 'Early-stage support', href: '/opportunities?type=incubator' },
    { type: 'accelerator', icon: TrendingUp, description: 'Scale your project', href: '/opportunities?type=accelerator' },
    { type: 'fellowship', icon: GraduationCap, description: 'Research and build', href: '/opportunities?type=fellowship' },
  ];

  // Frame 5: How it works
  const steps = [
    { step: "01", title: "Create your builder profile", description: "Answer a few questions about what you're building and your goals." },
    { step: "02", title: "Get matches + why this fits", description: "Receive personalized recommendations with clear explanations." },
    { step: "03", title: "Apply on official portals + track outcomes", description: "We link you directly. Track your applications in one place." },
  ];

  // Frame 6: Featured opportunities (first 6)
  const featuredOpportunities = mockOpportunities.slice(0, 6);

  // Frame 7: Niche finder questions preview
  const nicheQuestions = [
    "What are you building?",
    "What stage is your project?",
    "What do you want funding for?",
    "Are you willing to travel?",
  ];

  // Frame 8: Testimonials
  const testimonials = [
    {
      quote: "Grantees helped me find the perfect grant for my DeFi project. The AI matching was spot on!",
      name: "Sarah M.",
      role: "DeFi Developer",
    },
    {
      quote: "I saved weeks of research time. The proposal assistant made my application so much stronger.",
      name: "James K.",
      role: "Protocol Engineer",
    },
    {
      quote: "Finally, a tool that understands builders. The eligibility clarity feature is a game-changer.",
      name: "Amara O.",
      role: "Full-Stack Developer",
    },
  ];

  const communityPhotos = [communityPhoto1, communityPhoto2, communityPhoto3, communityPhoto4, communityPhoto5];

  return (
    <div className="min-h-screen bg-background">
      {/* Frame 2: Hero - SheFi style: simple, human, confident */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-emerald/10 to-transparent opacity-50 blur-3xl" />
        
        <div className="container relative">
          <MotionSection className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-foreground">
              Build more. Paperwork less.{' '}
              <span className="text-emerald">Get funded.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Grantees matches builders to grants, travel support, and programs—then helps you write proposals that win.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/onboarding">
                <Button size="lg" className="w-full sm:w-auto min-h-[48px] px-8 bg-emerald hover:bg-emerald/90 text-emerald-foreground">
                  Get matched
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px] px-8">
                  Browse opportunities
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Built for builders in Web3 + Web2. No spam. No gatekeeping.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Trust Marquee */}
      <section className="py-8 border-y border-border/30 bg-muted/30">
        <div className="container mb-4">
          <p className="text-xs text-center text-muted-foreground uppercase tracking-wider">Tracking opportunities from</p>
        </div>
        <TrustMarquee />
      </section>

      {/* Frame 3: Why Grantees - 4 calm cards */}
      <Frame 
        background="default"
        eyebrow="Why Grantees"
        title="Your clarity advantage"
        description="Stop missing opportunities. Start applying with confidence."
        className="py-20 md:py-28"
      >
        <MotionSection stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, idx) => (
            <MotionItem key={idx}>
              <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-emerald/30 transition-all duration-300 h-full">
                <benefit.icon className="w-8 h-8 text-emerald mb-4" />
                <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Frame 4: Opportunity Types - 8 cards/pills */}
      <Frame 
        background="subtle"
        eyebrow="Explore"
        title="Every opportunity type, one place"
        description="From grants to hackathons, fellowships to pop-up cities."
        className="py-20 md:py-28"
      >
        <MotionSection stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {opportunityTypes.map((item, idx) => (
            <MotionItem key={idx}>
              <Link to={item.href}>
                <div className="p-5 rounded-xl bg-card border border-border/50 hover:border-emerald/30 hover:bg-emerald/5 transition-all duration-300 h-full group">
                  <item.icon className="w-6 h-6 text-emerald mb-3" />
                  <h3 className="font-medium text-sm mb-1 text-foreground group-hover:text-emerald transition-colors">
                    {opportunityTypeLabels[item.type as keyof typeof opportunityTypeLabels]}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Frame 5: How it works - 3 steps, editorial */}
      <Frame 
        background="default"
        eyebrow="How it works"
        title="Three steps to funding"
        id="how-it-works"
        className="py-20 md:py-28"
      >
        <MotionSection stagger className="max-w-3xl mx-auto">
          {steps.map((step, idx) => (
            <MotionItem key={idx}>
              <div className="flex gap-6 py-8 border-b border-border/50 last:border-0">
                <span className="text-4xl font-bold text-emerald/30">{step.step}</span>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Frame 6: Featured Opportunities */}
      <Frame 
        background="subtle"
        eyebrow="This week"
        title="Featured opportunities"
        description="A curated selection of what's open now."
        className="py-20 md:py-28"
      >
        <MotionSection stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => (
            <MotionItem key={opp.id}>
              <Link to={`/opportunities/${opp.id}`}>
                <MotionCard 
                  className="p-6 bg-card border border-border/50 hover:border-emerald/30 transition-all h-full flex flex-col"
                  hoverEffect
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {opportunityTypeLabels[opp.opportunityType]}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {ecosystemLabels[opp.ecosystem]}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{opp.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">{opp.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {opp.eventLocation && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {opp.eventLocation}
                      </span>
                    )}
                    {opp.isRemote && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Remote
                      </span>
                    )}
                    {(opp.deadline || opp.eventStartDate) && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {opp.deadline || opp.eventStartDate}
                      </span>
                    )}
                  </div>
                </MotionCard>
              </Link>
            </MotionItem>
          ))}
        </MotionSection>
        <div className="text-center mt-10">
          <Link to="/opportunities">
            <Button variant="outline" size="lg">
              View all opportunities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Frame>

      {/* Frame 7: Niche Finder CTA */}
      <Frame 
        background="default"
        className="py-20 md:py-28"
      >
        <MotionSection className="max-w-2xl mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Guidance
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Not sure what to apply for?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start here. A few quick questions to find your niche and match you with the right opportunities.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8 max-w-md mx-auto text-left">
            {nicheQuestions.map((q, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
                {q}
              </div>
            ))}
          </div>
          <Link to="/onboarding">
            <Button size="lg" className="min-h-[48px] px-8 bg-emerald hover:bg-emerald/90 text-emerald-foreground">
              Find my niche
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </MotionSection>
      </Frame>

      {/* Frame 8: Social Proof - Community photos + testimonials */}
      <Frame 
        background="subtle"
        eyebrow="Community"
        title="Builders win faster with clarity"
        id="community"
        className="py-20 md:py-28"
      >
        {/* Photo Grid */}
        <MotionSection className="mb-16">
          <div className="grid grid-cols-5 gap-2 md:gap-3 max-w-4xl mx-auto">
            {communityPhotos.map((photo, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg aspect-square">
                <img 
                  src={photo} 
                  alt={`Grantees community ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </MotionSection>

        {/* Testimonials */}
        <MotionSection stagger className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <MotionItem key={idx}>
              <div className="p-6 bg-card rounded-xl border border-border/50 h-full flex flex-col">
                <Quote className="w-6 h-6 text-emerald/30 mb-4" />
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Frame 9: Final CTA - calm, not salesy */}
      <Frame 
        background="default"
        className="py-20 md:py-28"
      >
        <MotionSection className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Ready to stop missing opportunities?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join builders who've discovered funding they never knew existed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="w-full sm:w-auto min-h-[48px] px-8 bg-emerald hover:bg-emerald/90 text-emerald-foreground">
                Get matched
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/opportunities">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-h-[48px] px-8">
                Browse opportunities
              </Button>
            </Link>
          </div>
        </MotionSection>
      </Frame>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;