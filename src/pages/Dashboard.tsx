// Dashboard with live grant feed and carousel
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { GrantCard } from '@/components/grants/GrantCard';
import { Frame } from '@/components/layout/Frame';
import { MotionSection, MotionItem } from '@/components/Motion/MotionSection';
import { CreditPanel } from '@/components/credits/CreditPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockGrants } from '@/data/mockGrants';
import { GrantMatch } from '@/types/grant';
import { shouldReduceMotion } from '@/lib/motion';
import { 
  Sparkles, 
  Target, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Bookmark,
  FileText,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock matched grants with match data
const mockMatches: GrantMatch[] = [
  {
    grant: mockGrants[0],
    matchScore: 92,
    matchReasons: [
      'Matches your DeFi focus area',
      'Avalanche is in your target ecosystems',
      'Open to global applicants',
    ],
    eligibilityStatus: 'eligible',
    eligibilityNotes: [],
  },
  {
    grant: mockGrants[2],
    matchScore: 88,
    matchReasons: [
      'Fintech aligns with your niche',
      'Priority for African teams matches your region',
      'Accepts MVP-stage projects',
    ],
    eligibilityStatus: 'eligible',
    eligibilityNotes: [],
  },
  {
    grant: mockGrants[3],
    matchScore: 75,
    matchReasons: [
      'Public goods focus matches your interests',
      'Open-source project requirement fits your profile',
    ],
    eligibilityStatus: 'partial',
    eligibilityNotes: ['May require more community traction'],
  },
  {
    grant: mockGrants[5],
    matchScore: 70,
    matchReasons: [
      'Emerging market focus',
      'Polygon ecosystem match',
      'Early-stage project friendly',
    ],
    eligibilityStatus: 'eligible',
    eligibilityNotes: [],
  },
];

// Mock live feed data
const liveFeed = [
  { id: 1, type: 'new', grant: 'Avalanche Blizzard Fund', ecosystem: 'Avalanche', time: '2h ago' },
  { id: 2, type: 'deadline', grant: 'Ethereum Protocol Guild', ecosystem: 'Ethereum', time: '5 days left' },
  { id: 3, type: 'new', grant: 'Base Builder Grants', ecosystem: 'Base', time: '4h ago' },
  { id: 4, type: 'update', grant: 'Polygon Village', ecosystem: 'Polygon', time: 'Just updated' },
];

export default function Dashboard() {
  const [view, setView] = useState<'matches' | 'saved' | 'applications'>('matches');
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduceMotion = shouldReduceMotion();

  const stats = [
    { label: 'Open Grants Tracked', value: '524', icon: Target },
    { label: 'New This Week', value: '18', icon: Zap, highlight: true },
    { label: 'Your Top Matches', value: '12', icon: Sparkles },
    { label: 'Deadlines Soon', value: '3', icon: Clock },
  ];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const highConfidenceMatches = mockMatches.filter(m => m.matchScore >= 80);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header Section */}
        <div className="container mb-8">
          <MotionSection className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, Builder! 👋
              </h1>
              <p className="text-muted-foreground">
                Your personalized grant matches are ready.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/profile">
                <Button variant="outline" className="gap-2 min-h-[44px]">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
              <Link to="/grants">
                <Button variant="hero" className="gap-2 min-h-[44px]">
                  Explore All Grants
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </MotionSection>
        </div>

        {/* Frame G - Live Stats Grid */}
        <Frame background="subtle" noPadding className="py-8 mb-8">
          <MotionSection stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <MotionItem key={stat.label}>
                <Card className={`gradient-card border-border/50 ${stat.highlight ? 'border-emerald/30 shadow-glow' : ''}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <motion.p 
                          className="text-3xl font-bold"
                          initial={reduceMotion ? {} : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                        >
                          {stat.value}
                        </motion.p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.highlight ? 'bg-emerald/20' : 'bg-primary/10'}`}>
                        <stat.icon className={`w-5 h-5 ${stat.highlight ? 'text-emerald' : 'text-primary'}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionItem>
            ))}
          </MotionSection>
        </Frame>

        {/* Frame G - Live Feed Panel */}
        <div className="container mb-8">
          <MotionSection>
            <Card className="gradient-card border-border/50 overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
                    </span>
                    Live Grant Feed
                  </CardTitle>
                  <Badge variant="secondary">Auto-updating</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {liveFeed.map((item, i) => (
                    <motion.div
                      key={item.id}
                      className="px-6 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                      initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={item.type === 'new' ? 'default' : item.type === 'deadline' ? 'warning' : 'secondary'}
                          className="text-xs"
                        >
                          {item.type === 'new' ? 'NEW' : item.type === 'deadline' ? 'DEADLINE' : 'UPDATE'}
                        </Badge>
                        <div>
                          <p className="font-medium text-sm">{item.grant}</p>
                          <p className="text-xs text-muted-foreground">{item.ecosystem}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </MotionSection>
        </div>

        {/* Frame H - Recommended Carousel */}
        <div className="container mb-8">
          <MotionSection>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald" />
                  Recommended for You
                </h2>
                <p className="text-sm text-muted-foreground">Top matches based on your profile</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollCarousel('left')}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollCarousel('right')}
                  className="h-10 w-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {highConfidenceMatches.map((match, i) => (
                <motion.div
                  key={match.grant.id}
                  className="min-w-[350px] md:min-w-[400px] snap-start"
                  initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GrantCard grant={match.grant} matchData={match} />
                </motion.div>
              ))}
            </div>
          </MotionSection>
        </div>
        <div className="container grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
          {/* View Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={view === 'matches' ? 'default' : 'ghost'}
              onClick={() => setView('matches')}
              className="gap-2 shrink-0 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4" />
              All Matches
              <Badge variant="secondary" className="ml-1">
                {mockMatches.length}
              </Badge>
            </Button>
            <Button
              variant={view === 'saved' ? 'default' : 'ghost'}
              onClick={() => setView('saved')}
              className="gap-2 shrink-0 min-h-[44px]"
            >
              <Bookmark className="w-4 h-4" />
              Saved
            </Button>
            <Button
              variant={view === 'applications' ? 'default' : 'ghost'}
              onClick={() => setView('applications')}
              className="gap-2 shrink-0 min-h-[44px]"
            >
              <FileText className="w-4 h-4" />
              Applications
            </Button>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {view === 'matches' && (
              <motion.div
                key="matches"
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Worth Exploring */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-semibold">Worth Exploring</h2>
                    <Badge variant="outline">60-79% Match</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {mockMatches.filter(m => m.matchScore < 80).map((match) => (
                      <GrantCard 
                        key={match.grant.id} 
                        grant={match.grant} 
                        matchData={match}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'saved' && (
              <motion.div
                key="saved"
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No saved grants yet</h3>
                <p className="text-muted-foreground mb-4">
                  Save grants you're interested in to track them here.
                </p>
                <Link to="/grants">
                  <Button variant="outline" className="min-h-[44px]">Explore Grants</Button>
                </Link>
              </motion.div>
            )}

            {view === 'applications' && (
              <motion.div
                key="applications"
                initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start an application to track your progress here.
                </p>
                <Link to="/grants">
                  <Button variant="hero" className="min-h-[44px]">Find Grants to Apply</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
          
          {/* Credit Panel Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CreditPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
