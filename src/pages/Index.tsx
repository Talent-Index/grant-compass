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
  CheckCircle2,
  ChevronDown,
  UserCircle,
  Compass,
  Rocket,
  Quote
} from 'lucide-react';
import { HeroFrame, Frame } from '@/components/layout/Frame';
import { MotionSection, MotionItem, MotionCard } from '@/components/Motion/MotionSection';
import { TrustMarquee } from '@/components/TrustMarquee';
import { HeroVisual } from '@/components/HeroVisual';
import { Footer } from '@/components/Footer';
import { shouldReduceMotion } from '@/lib/motion';

// Community photos
import communityPhoto1 from '@/assets/community/builders-1.jpeg';
import communityPhoto2 from '@/assets/community/builders-2.jpeg';
import communityPhoto3 from '@/assets/community/builders-3.jpeg';
import communityPhoto4 from '@/assets/community/builders-4.jpeg';
import communityPhoto5 from '@/assets/community/builders-5.jpeg';

const Index = () => {
  const reduceMotion = shouldReduceMotion();
  const today = new Date().toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });

  const benefits = [
    {
      number: "01",
      icon: UserCircle,
      title: "Identify your niche fast",
      description: "Complete a quick wizard to discover your builder profile and target ecosystems."
    },
    {
      number: "02",
      icon: Target,
      title: "Eligibility clarity & fit scoring",
      description: "Understand exactly why each grant matches—or doesn't match—your project."
    },
    {
      number: "03",
      icon: FileText,
      title: "Proposal copilot & checklists",
      description: "AI-assisted writing with structured guidance to craft winning applications."
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Tracking & learning loop",
      description: "Get feedback on rejections and improve your success rate over time."
    },
  ];

  const quickActions = [
    {
      icon: UserCircle,
      title: "Complete your Builder Profile",
      description: "Define your niche, skills, and target ecosystems.",
      href: "/onboarding",
      cta: "Start Wizard"
    },
    {
      icon: Compass,
      title: "Discover grants by ecosystem",
      description: "Browse grants filtered by blockchain or funding type.",
      href: "/grants",
      cta: "Explore Grants"
    },
    {
      icon: Rocket,
      title: "Get your top matches",
      description: "See AI-recommended grants tailored to your profile.",
      href: "/dashboard",
      cta: "View Matches"
    },
  ];

  const stats = [
    { value: 500, suffix: "+", label: "Active Grants" },
    { value: 15, suffix: "+", label: "Ecosystems" },
    { value: 70, suffix: "%", label: "Time Saved" },
    { value: 2.5, suffix: "M+", label: "Matched Funding", prefix: "$" },
  ];

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

  const communityPhotos = [
    communityPhoto1,
    communityPhoto2,
    communityPhoto3,
    communityPhoto4,
    communityPhoto5,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Frame A - Hero */}
      <HeroFrame>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Message */}
          <MotionSection className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <Badge variant="outline" className="px-3 py-1 border-emerald/30 bg-emerald/10">
                <Sparkles className="w-3 h-3 mr-1.5 text-emerald" />
                <span className="text-emerald text-xs">AI-Powered</span>
              </Badge>
              <span className="text-xs text-muted-foreground">Updated: {today}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              Hit Your Target
              <span className="block text-emerald mt-2">Win More Grants</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Grantees uses AI to match you with the right funding, 
              helps you write winning proposals, and guides you every step.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/onboarding">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2 min-h-[56px]">
                  Get matched to grants
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/grants">
                <Button variant="outline" size="xl" className="w-full sm:w-auto gap-2 min-h-[56px]">
                  Browse opportunities
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald" /> Membership verified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald" /> Free to start
              </span>
            </div>
          </MotionSection>

          {/* Right: Visual */}
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground"
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </HeroFrame>

      {/* Trust Marquee - Frame D */}
      <Frame background="subtle" noPadding className="py-8 md:py-12">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">Tracking grants from leading ecosystems</p>
        </div>
        <TrustMarquee />
      </Frame>

      {/* Frame B - Why Grantees */}
      <Frame 
        background="default"
        eyebrow="Why Grantees"
        title="Your unfair advantage in grant discovery"
        description="Built for builders who want to focus on building, not bureaucracy."
      >
        <MotionSection stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <MotionItem key={benefit.number}>
              <div className="group relative p-6 rounded-xl bg-card border border-border/50 hover:border-emerald/30 transition-all duration-300 h-full">
                <span className="absolute -top-3 -left-1 text-6xl font-bold text-emerald/10 select-none">
                  {benefit.number}
                </span>
                <div className="relative">
                  <benefit.icon className="w-8 h-8 text-emerald mb-4" />
                  <h3 className="font-semibold mb-2 group-hover:text-emerald transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Frame C - Quick Action Cards */}
      <Frame 
        background="gradient"
        eyebrow="Get Started"
        title="Jump right in"
        description="Three ways to begin your grant journey today."
      >
        <MotionSection stagger className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quickActions.map((action) => (
            <MotionItem key={action.title}>
              <Link to={action.href} className="block h-full">
                <MotionCard 
                  className="p-6 bg-card border border-border/50 hover:border-emerald/30 transition-all h-full flex flex-col"
                  hoverEffect
                >
                  <action.icon className="w-10 h-10 text-emerald mb-4" />
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {action.description}
                  </p>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-emerald hover:text-emerald hover:bg-transparent">
                    {action.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </MotionCard>
              </Link>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Stats Section */}
      <Frame background="dark" noPadding className="py-12 md:py-16">
        <MotionSection stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <MotionItem key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-1">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* Community & Social Proof Section */}
      <Frame 
        background="subtle"
        eyebrow="Our Community"
        title="Builders win faster with clarity"
        description="Join thousands of builders who've discovered their perfect funding match."
      >
        {/* Photo Grid */}
        <MotionSection className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {communityPhotos.map((photo, idx) => (
              <MotionItem key={idx}>
                <div className={`overflow-hidden rounded-xl ${idx === 1 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                  <img 
                    src={photo} 
                    alt={`Grantees community builders ${idx + 1}`}
                    className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </MotionItem>
            ))}
          </div>
        </MotionSection>

        {/* Testimonials */}
        <MotionSection stagger className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <MotionItem key={idx}>
              <div className="p-6 bg-card rounded-xl border border-border/50 h-full flex flex-col">
                <Quote className="w-8 h-8 text-emerald/30 mb-4" />
                <p className="text-muted-foreground mb-4 flex-grow italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Frame>

      {/* CTA Section */}
      <Frame background="accent">
        <MotionSection className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to hit your target?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join builders who've discovered funding opportunities 
            they never knew existed.
          </p>
          <Link to="/onboarding">
            <Button variant="hero" size="xl" className="gap-2 min-h-[56px]">
              Get Started — It's Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </MotionSection>
      </Frame>

      {/* Frame J - Footer */}
      <Footer />
    </div>
  );
};

export default Index;
