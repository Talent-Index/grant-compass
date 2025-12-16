import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { GrantCard } from '@/components/grants/GrantCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockGrants } from '@/data/mockGrants';
import { GrantMatch } from '@/types/grant';
import { 
  Sparkles, 
  Target, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Bookmark,
  FileText,
  Settings
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

export default function Dashboard() {
  const [view, setView] = useState<'matches' | 'saved' | 'applications'>('matches');

  const stats = [
    { label: 'Match Score', value: '85%', icon: Target, trend: '+5%' },
    { label: 'Active Matches', value: '12', icon: Sparkles },
    { label: 'Deadlines Soon', value: '3', icon: Clock },
    { label: 'Applications', value: '2', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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
                <Button variant="outline" className="gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
              <Link to="/grants">
                <Button variant="hero" className="gap-2">
                  Explore All Grants
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      {stat.trend && (
                        <p className="text-xs text-primary mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {stat.trend} this week
                        </p>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant={view === 'matches' ? 'default' : 'ghost'}
              onClick={() => setView('matches')}
              className="gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              Your Matches
              <Badge variant="secondary" className="ml-1">
                {mockMatches.length}
              </Badge>
            </Button>
            <Button
              variant={view === 'saved' ? 'default' : 'ghost'}
              onClick={() => setView('saved')}
              className="gap-2 shrink-0"
            >
              <Bookmark className="w-4 h-4" />
              Saved
            </Button>
            <Button
              variant={view === 'applications' ? 'default' : 'ghost'}
              onClick={() => setView('applications')}
              className="gap-2 shrink-0"
            >
              <FileText className="w-4 h-4" />
              Applications
            </Button>
          </div>

          {/* Content */}
          {view === 'matches' && (
            <div className="space-y-6">
              {/* High Confidence Matches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold">High-Confidence Matches</h2>
                  <Badge variant="success">80%+ Match</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockMatches.filter(m => m.matchScore >= 80).map((match) => (
                    <GrantCard 
                      key={match.grant.id} 
                      grant={match.grant} 
                      matchData={match}
                    />
                  ))}
                </div>
              </div>

              {/* Other Matches */}
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
            </div>
          )}

          {view === 'saved' && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No saved grants yet</h3>
              <p className="text-muted-foreground mb-4">
                Save grants you're interested in to track them here.
              </p>
              <Link to="/grants">
                <Button variant="outline">Explore Grants</Button>
              </Link>
            </div>
          )}

          {view === 'applications' && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
              <p className="text-muted-foreground mb-4">
                Start an application to track your progress here.
              </p>
              <Link to="/grants">
                <Button variant="hero">Find Grants to Apply</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
