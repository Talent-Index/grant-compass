import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { GrantCard } from '@/components/grants/GrantCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockGrants, ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { Grant, Ecosystem, BuilderNiche, GrantStatus } from '@/types/grant';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Grants() {
  const [search, setSearch] = useState('');
  const [selectedEcosystems, setSelectedEcosystems] = useState<Ecosystem[]>([]);
  const [selectedNiches, setSelectedNiches] = useState<BuilderNiche[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<GrantStatus[]>(['open']);
  const [showFilters, setShowFilters] = useState(false);

  const toggleEcosystem = (eco: Ecosystem) => {
    setSelectedEcosystems(prev => 
      prev.includes(eco) ? prev.filter(e => e !== eco) : [...prev, eco]
    );
  };

  const toggleNiche = (niche: BuilderNiche) => {
    setSelectedNiches(prev => 
      prev.includes(niche) ? prev.filter(n => n !== niche) : [...prev, niche]
    );
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
  };

  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch = 
          grant.name.toLowerCase().includes(searchLower) ||
          grant.organization.toLowerCase().includes(searchLower) ||
          grant.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Ecosystem filter
      if (selectedEcosystems.length > 0 && !selectedEcosystems.includes(grant.ecosystem)) {
        return false;
      }

      // Niche filter
      if (selectedNiches.length > 0 && !grant.focusAreas.some(f => selectedNiches.includes(f))) {
        return false;
      }

      // Status filter
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Grants</h1>
            <p className="text-muted-foreground text-lg">
              Discover funding opportunities across Web3 ecosystems and beyond.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search grants by name, organization, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-card border-border"
              />
            </div>
            <Button
              variant={showFilters ? 'secondary' : 'outline'}
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 shrink-0"
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
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
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
          </div>

          {/* Grants Grid */}
          {filteredGrants.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGrants.map((grant) => (
                <GrantCard key={grant.id} grant={grant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No grants found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
