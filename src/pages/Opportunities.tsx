import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Calendar,
  Filter,
  X,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Frame } from '@/components/layout/Frame';
import { Footer } from '@/components/Footer';
import { MotionSection, MotionItem, MotionCard } from '@/components/Motion/MotionSection';
import { mockOpportunities } from '@/data/mockOpportunities';
import { opportunityTypeLabels, ecosystemLabels, OpportunityType, Ecosystem } from '@/types/grant';

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<OpportunityType[]>([]);
  const [selectedEcosystems, setSelectedEcosystems] = useState<Ecosystem[]>([]);
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Get URL params for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get('type') as OpportunityType | null;

  // Initialize from URL if present
  useMemo(() => {
    if (typeFromUrl && !selectedTypes.includes(typeFromUrl)) {
      setSelectedTypes([typeFromUrl]);
    }
  }, []);

  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter(opp => {
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          opp.name.toLowerCase().includes(query) ||
          opp.description.toLowerCase().includes(query) ||
          opp.organization.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(opp.opportunityType)) {
        return false;
      }

      // Ecosystem filter
      if (selectedEcosystems.length > 0 && !selectedEcosystems.includes(opp.ecosystem)) {
        return false;
      }

      // Remote only
      if (showRemoteOnly && !opp.isRemote) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTypes, selectedEcosystems, showRemoteOnly]);

  const toggleType = (type: OpportunityType) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleEcosystem = (ecosystem: Ecosystem) => {
    setSelectedEcosystems(prev => 
      prev.includes(ecosystem) ? prev.filter(e => e !== ecosystem) : [...prev, ecosystem]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedEcosystems([]);
    setShowRemoteOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedTypes.length > 0 || selectedEcosystems.length > 0 || showRemoteOnly || searchQuery;

  const opportunityTypeOptions: OpportunityType[] = [
    'grant', 'travel_grant', 'hackathon', 'conference', 
    'pop_up_city', 'incubator', 'accelerator', 'fellowship'
  ];

  const ecosystemOptions: Ecosystem[] = [
    'ethereum', 'avalanche', 'solana', 'polygon', 'arbitrum', 
    'optimism', 'base', 'starknet', 'cosmos', 'near', 'celo'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="container">
          <MotionSection className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Opportunities
            </h1>
            <p className="text-lg text-muted-foreground">
              Grants, hackathons, conferences, fellowships, and more. All in one place.
            </p>
          </MotionSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="pb-8 border-b border-border/30">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Filter Toggle */}
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                  {selectedTypes.length + selectedEcosystems.length + (showRemoteOnly ? 1 : 0)}
                </Badge>
              )}
            </Button>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <MotionSection className="mt-6 p-6 bg-muted/30 rounded-xl border border-border/30">
              <div className="space-y-6">
                {/* Type Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3 text-foreground">Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunityTypeOptions.map(type => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedTypes.includes(type) 
                            ? 'bg-emerald text-emerald-foreground border-emerald' 
                            : 'bg-background border-border hover:border-emerald/50'
                        }`}
                      >
                        {opportunityTypeLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ecosystem Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3 text-foreground">Ecosystem</h4>
                  <div className="flex flex-wrap gap-2">
                    {ecosystemOptions.map(ecosystem => (
                      <button
                        key={ecosystem}
                        onClick={() => toggleEcosystem(ecosystem)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                          selectedEcosystems.includes(ecosystem) 
                            ? 'bg-emerald text-emerald-foreground border-emerald' 
                            : 'bg-background border-border hover:border-emerald/50'
                        }`}
                      >
                        {ecosystemLabels[ecosystem]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Remote Toggle */}
                <div>
                  <h4 className="text-sm font-medium mb-3 text-foreground">Format</h4>
                  <button
                    onClick={() => setShowRemoteOnly(!showRemoteOnly)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      showRemoteOnly 
                        ? 'bg-emerald text-emerald-foreground border-emerald' 
                        : 'bg-background border-border hover:border-emerald/50'
                    }`}
                  >
                    Remote only
                  </button>
                </div>
              </div>
            </MotionSection>
          )}
        </div>
      </section>

      {/* Results */}
      <Frame background="default" className="py-12 md:py-16">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredOpportunities.length} opportunit{filteredOpportunities.length === 1 ? 'y' : 'ies'} found
          </p>
        </div>

        {filteredOpportunities.length > 0 ? (
          <MotionSection stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <MotionItem key={opp.id}>
                <Link to={`/opportunities/${opp.id}`}>
                  <MotionCard 
                    className="p-6 bg-card border border-border/50 hover:border-emerald/30 transition-all h-full flex flex-col"
                    hoverEffect
                  >
                    {/* Type + Ecosystem badges */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {opportunityTypeLabels[opp.opportunityType]}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {ecosystemLabels[opp.ecosystem]}
                      </Badge>
                      {opp.status === 'open' && (
                        <Badge variant="success" className="text-xs">Open</Badge>
                      )}
                    </div>

                    {/* Title + Org */}
                    <h3 className="font-semibold mb-1 text-foreground">{opp.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{opp.organization}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                      {opp.description}
                    </p>

                    {/* Funding */}
                    {(opp.fundingMin || opp.fundingMax) && (
                      <p className="text-sm font-medium text-emerald mb-3">
                        ${opp.fundingMin?.toLocaleString()} - ${opp.fundingMax?.toLocaleString()}
                      </p>
                    )}

                    {/* Meta: location, date */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {opp.eventLocation && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {opp.eventLocation}
                        </span>
                      )}
                      {opp.isRemote && !opp.eventLocation && (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No opportunities match your filters.</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </Frame>

      {/* CTA */}
      <Frame background="subtle" className="py-16">
        <MotionSection className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Can't find what you're looking for?
          </h2>
          <p className="text-muted-foreground mb-6">
            Complete your builder profile to get personalized recommendations.
          </p>
          <Link to="/onboarding">
            <Button className="bg-emerald hover:bg-emerald/90 text-emerald-foreground">
              Get matched
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </MotionSection>
      </Frame>

      <Footer />
    </div>
  );
};

export default Opportunities;