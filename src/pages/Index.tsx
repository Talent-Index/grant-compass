import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  FileText, 
  TrendingUp,
  CheckCircle2,
  Zap,
  Globe,
  Shield
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI-powered grant recommendations based on your niche, skills, and project maturity.',
    },
    {
      icon: FileText,
      title: 'Proposal Assistant',
      description: 'Generate compelling proposal drafts with AI guidance tailored to each grant.',
    },
    {
      icon: TrendingUp,
      title: 'Success Analytics',
      description: 'Learn from rejections with AI feedback and improve your grant success rate.',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access grants from Web3 ecosystems and traditional funding sources worldwide.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Grants' },
    { value: '15+', label: 'Ecosystems' },
    { value: '70%', label: 'Time Saved' },
    { value: '$2.5M+', label: 'Matched Funding' },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/10">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
              <span className="text-primary">Powered by AI Intelligence</span>
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find & Win Grants
              <span className="block text-primary mt-2">Without the Guesswork</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Grant Spotter uses AI to match you with the right funding opportunities, 
              helps you write winning proposals, and guides you through every step 
              of the grant journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/onboarding">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  Start Finding Grants
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/grants">
                <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                  Explore Grants
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Membership Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-card/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your End-to-End Grant Pipeline
            </h2>
            <p className="text-muted-foreground text-lg">
              From discovery to application to success tracking — 
              Grant Spotter handles the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-card/30 border-y border-border/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How Grant Spotter Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Three simple steps to transform your grant journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Define Your Niche',
                description: 'Complete a quick wizard to identify your builder profile, focus areas, and target ecosystems.',
              },
              {
                step: '02',
                title: 'Get Matched',
                description: 'Our AI analyzes your profile against hundreds of grants to surface the best opportunities.',
              },
              {
                step: '03',
                title: 'Apply & Win',
                description: 'Use our proposal assistant to craft compelling applications that stand out to reviewers.',
              },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="text-7xl font-bold text-primary/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-4 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Next Grant?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of builders who've discovered funding opportunities 
              they never knew existed.
            </p>
            <Link to="/onboarding">
              <Button variant="hero" size="xl" className="gap-2">
                Get Started — It's Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">G</span>
              </div>
              <span>© 2025 Grant Spotter by Talent Index</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
