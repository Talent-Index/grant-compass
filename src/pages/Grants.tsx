import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { GrantCard } from '@/components/grants/GrantCard';
import { Frame } from '@/components/layout/Frame';
import { MotionSection, MotionItem } from '@/components/Motion/MotionSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockGrants, ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { Grant, Ecosystem, BuilderNiche, GrantStatus } from '@/types/grant';
import { 
  Search, 
  X, 
  SlidersHorizontal,
  Layers,
  Coins,
  Gamepad2,
  Wrench,
  Brain,
  Users,
  Building2,
  Heart,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { shouldReduceMotion } from '@/lib/motion';

// Category data for Frame E grid
const categories = [
  { 
    id: 'defi' as BuilderNiche, 
    icon: Coins, 
    name: 'DeFi', 
    description: 'Decentralized finance protocols and tools',
    color: '#10B981'
  },
  { 
    id: 'fintech' as BuilderNiche, 
    icon: Building2, 
    name: 'Fintech', 
    description: 'Financial technology innovations',
    color: '#3B82F6'
  },
  { 
    id: 'gaming' as BuilderNiche, 
    icon: Gamepad2, 
    name: 'Gaming', 
    description: 'Web3 gaming and GameFi projects',
    color: '#8B5CF6'
  },
  { 
    id: 'infrastructure' as BuilderNiche, 
    icon: Wrench, 
    name: 'Infra / Tooling', 
    description: 'Developer tools and infrastructure',
    color: '#F59E0B'
  },
  { 
    id: 'ai_crypto' as BuilderNiche, 
    icon: Brain, 
    name: 'AI + Crypto', 
    description: 'AI-powered blockchain solutions',
    color: '#EC4899'
  },
  { 
    id: 'social' as BuilderNiche, 
    icon: Users, 
    name: 'Social', 
    description: 'Decentralized social platforms',
    color: '#14B8A6'
  },
  { 
    id: 'rwa_enterprise' as BuilderNiche, 
    icon: Layers, 
    name: 'RWA / Enterprise', 
    description: 'Real world assets and B2B',
    color: '#6366F1'
  },
  { 
    id: 'public_goods' as BuilderNiche, 
    icon: Heart, 
    name: 'Public Goods', 
    description: 'Community and public benefit',
    color: '#EF4444'
  },
];

export default function Grants() {
  const [search, setSearch] = useState('');
  const [selectedEcosystems, setSelectedEcosystems] = useState<Ecosystem[]>([]);
  const [selectedNiches, setSelectedNiches] = useState<BuilderNiche[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<GrantStatus[]>(['open']);
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryGrid, setShowCategoryGrid] = useState(true);

  const reduceMotion = shouldReduceMotion();

  const toggleEcosystem = (eco: Ecosystem) => {
    setSelectedEcosystems(prev => 
      prev.includes(eco) ? prev.filter(e => e !== eco) : [...prev, eco]
    );
  };

  const toggleNiche = (niche: BuilderNiche) => {
    setSelectedNiches(prev => 
      prev.includes(niche) ? prev.filter(n => n !== niche) : [...prev, niche]
    );
    setShowCategoryGrid(false);
  };

  const selectCategory = (niche: BuilderNiche) => {
    setSelectedNiches([niche]);
    setShowCategoryGrid(false);
  };

  const toggleStatus = (status: GrantStatus) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedEcosystems([]);
    setSelectedNiches([]);
    setSelectedStatus(['open']);
    setSearch('');
    setShowCategoryGrid(true);
  };

  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          grant.name.toLowerCase().includes(searchLower) ||
          grant.organization.toLowerCase().includes(searchLower) ||
          grant.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      if (selectedEcosystems.length > 0 && !selectedEcosystems.includes(grant.ecosystem)) {
        return false;
      }
      if (selectedNiches.length > 0 && !grant.focusAreas.some(f => selectedNiches.includes(f))) {
        return false;
      }
      if (selectedStatus.length > 0 && !selectedStatus.includes(grant.status)) {
        return false;
      }
      return true;
    });
  }, [search, selectedEcosystems, selectedNiches, selectedStatus]);

  const activeFilterCount = selectedEcosystems.length + selectedNiches.length + 
    (selectedStatus.length !== 1 || selectedStatus[0] !== 'open' ? selectedStatus.length : 0);

  const ecosystems = Object.entries(ecosystemLabels) as [Ecosystem, string][];
  const niches = Object.entries(nicheLabels) as [BuilderNiche, string][];
  const statuses: { value: GrantStatus; label: string }[] = [
    { value: 'open', label: 'Open' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'closed', label: 'Closed' },
  ];

  // Count grants per category
  const getCategoryCount = (niche: BuilderNiche) => {
    return mockGrants.filter(g => 
      g.status === 'open' && g.focusAreas.includes(niche)
    ).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Frame E - Category Grid (shown when no filters applied) */}
        {showCategoryGrid && selectedNiches.length === 0 && selectedEcosystems.length === 0 && !search && (
          <Frame 
            background="gradient"
            eyebrow="Discover by Category"
            title="What are you building?"
            description="Jump into grants that match your focus area."
          >
            <MotionSection stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat) => {
                const count = getCategoryCount(cat.id);
                return (
                  <MotionItem key={cat.id}>
                    <motion.button
                      onClick={() => selectCategory(cat.id)}
                      className="w-full text-left p-5 md:p-6 rounded-xl bg-card border border-border/50 hover:border-emerald/30 transition-all group"
                      whileHover={reduceMotion ? {} : { scale: 1.02, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <cat.icon 
                        className="w-8 h-8 mb-3 transition-colors" 
                        style={{ color: cat.color }}
                      />
                      <h3 className="font-semibold mb-1 group-hover:text-emerald transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {cat.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {count} open
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald transition-colors" />
                      </div>
                    </motion.button>
                  </MotionItem>
                );
              })}
            </MotionSection>
          </Frame>
        )}

        <div className="container">
          {/* Header */}
          <MotionSection className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {selectedNiches.length > 0 
                ? `${nicheLabels[selectedNiches[0]]} Grants`
                : 'Explore Grants'
              }
            </h1>
            <p className="text-muted-foreground text-lg">
              {selectedNiches.length > 0 
                ? `Funding opportunities for ${nicheLabels[selectedNiches[0]].toLowerCase()} builders.`
                : 'Discover funding opportunities across Web3 ecosystems and beyond.'
              }
            </p>
          </MotionSection>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search grants by name, organization, or keyword..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value) setShowCategoryGrid(false);
                }}
                className="pl-10 h-12 bg-card border-border"
              />
            </div>
            <Button
              variant={showFilters ? 'secondary' : 'outline'}
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 shrink-0 min-h-[48px]"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="default" className="ml-1 px-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          <div className={cn(
            'overflow-hidden transition-all duration-300 mb-6',
            showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          )}>
            <div className="p-6 rounded-xl bg-card border border-border space-y-6">
              {/* Status Filter */}
              <div>
                <div className="text-sm font-medium mb-3 text-muted-foreground">Status</div>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(({ value, label }) => (
                    <Button
                      key={value}
                      variant={selectedStatus.includes(value) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleStatus(value)}
                      className="min-h-[44px]"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Ecosystem Filter */}
              <div>
                <div className="text-sm font-medium mb-3 text-muted-foreground">Ecosystem</div>
                <div className="flex flex-wrap gap-2">
                  {ecosystems.slice(0, 10).map(([value, label]) => (
                    <Button
                      key={value}
                      variant={selectedEcosystems.includes(value) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleEcosystem(value)}
                      className="min-h-[44px]"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Niche Filter */}
              <div>
                <div className="text-sm font-medium mb-3 text-muted-foreground">Focus Area</div>
                <div className="flex flex-wrap gap-2">
                  {niches.map(([value, label]) => (
                    <Button
                      key={value}
                      variant={selectedNiches.includes(value) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleNiche(value)}
                      className="min-h-[44px]"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2 min-h-[44px]">
                  <X className="w-4 h-4" />
                  Clear all filters
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredGrants.length}</span> grants
            </p>
            {(selectedNiches.length > 0 || selectedEcosystems.length > 0 || search) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-emerald hover:text-emerald">
                Show all categories
              </Button>
            )}
          </div>

          {/* Grants Grid */}
          {filteredGrants.length > 0 ? (
            <MotionSection stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrants.map((grant) => (
                <MotionItem key={grant.id}>
                  <GrantCard grant={grant} />
                </MotionItem>
              ))}
            </MotionSection>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No grants found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms.
              </p>
              <Button variant="outline" onClick={clearFilters} className="min-h-[44px]">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
