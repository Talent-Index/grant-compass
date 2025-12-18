export type GrantStatus = 'open' | 'upcoming' | 'closed';

export type GrantType = 'microgrant' | 'dev-grant' | 'dao-funding' | 'accelerator' | 'research' | 'community';

export type OpportunityType = 
  | 'grant'
  | 'travel_grant'
  | 'hackathon'
  | 'conference'
  | 'pop_up_city'
  | 'incubator'
  | 'accelerator'
  | 'fellowship';

export type Ecosystem = 
  | 'ethereum' 
  | 'avalanche' 
  | 'solana' 
  | 'polkadot' 
  | 'polygon' 
  | 'arbitrum' 
  | 'optimism' 
  | 'base'
  | 'celo'
  | 'near'
  | 'cosmos'
  | 'starknet'
  | 'other';

export type BuilderNiche = 
  | 'defi'
  | 'fintech'
  | 'gaming'
  | 'infra'
  | 'ai-crypto'
  | 'social'
  | 'public-goods'
  | 'enterprise'
  | 'nft'
  | 'dao-tooling';

export type ProjectMaturity = 'idea' | 'mvp' | 'live' | 'scaling';

export type BuilderRole = 'solo-dev' | 'founder' | 'dao-member' | 'team';

export interface Grant {
  id: string;
  name: string;
  organization: string;
  description: string;
  ecosystem: Ecosystem;
  type: GrantType;
  focusAreas: BuilderNiche[];
  eligibilityRules: string[];
  fundingMin: number;
  fundingMax: number;
  deadline: string | null; // null = rolling
  applicationUrl: string;
  status: GrantStatus;
  region?: string[];
  projectMaturityRequired?: ProjectMaturity[];
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  organization: string;
  description: string;
  opportunityType: OpportunityType;
  ecosystem: Ecosystem;
  focusAreas: BuilderNiche[];
  status: GrantStatus;
  
  // Funding
  fundingMin?: number;
  fundingMax?: number;
  travelCoverage?: 'full' | 'partial' | 'none';
  equityRequired?: boolean;
  
  // Dates
  deadline?: string | null;
  eventStartDate?: string;
  eventEndDate?: string;
  
  // Location
  eventLocation?: string;
  isRemote?: boolean;
  visaSupportProvided?: boolean;
  
  // Program details
  residencyDuration?: string;
  isRecurring?: boolean;
  frequency?: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  
  // Application
  externalApplicationUrl: string;
  eligibilityRules?: string[];
  projectMaturityRequired?: ProjectMaturity[];
  builderRolesAllowed?: BuilderRole[];
  
  createdAt: string;
  updatedAt: string;
}

export interface BuilderProfile {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  githubUsername?: string;
  role: BuilderRole;
  niches: BuilderNiche[];
  targetEcosystems: Ecosystem[];
  projectMaturity: ProjectMaturity;
  region: string;
  primaryLanguages: string[];
  frameworks: string[];
  isOpenSource: boolean;
  willingToTravel?: boolean;
  bio?: string;
  projectDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GrantMatch {
  grant: Grant;
  matchScore: number; // 0-100
  matchReasons: string[];
  eligibilityStatus: 'eligible' | 'partial' | 'ineligible';
  eligibilityNotes: string[];
}

export interface OpportunityMatch {
  opportunity: Opportunity;
  matchScore: number;
  matchReasons: string[];
  eligibilityStatus: 'eligible' | 'partial' | 'ineligible';
  eligibilityNotes: string[];
}

export interface GrantApplication {
  id: string;
  grantId: string;
  builderId: string;
  status: 'draft' | 'submitted' | 'under-review' | 'accepted' | 'rejected';
  proposalDraft?: string;
  submittedAt?: string;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

// Helper type for opportunity type labels
export const opportunityTypeLabels: Record<OpportunityType, string> = {
  grant: 'Grant',
  travel_grant: 'Travel Grant',
  hackathon: 'Hackathon',
  conference: 'Conference',
  pop_up_city: 'Pop-up City',
  incubator: 'Incubator',
  accelerator: 'Accelerator',
  fellowship: 'Fellowship',
};

export const ecosystemLabels: Record<Ecosystem, string> = {
  ethereum: 'Ethereum',
  avalanche: 'Avalanche',
  solana: 'Solana',
  polkadot: 'Polkadot',
  polygon: 'Polygon',
  arbitrum: 'Arbitrum',
  optimism: 'Optimism',
  base: 'Base',
  celo: 'Celo',
  near: 'NEAR',
  cosmos: 'Cosmos',
  starknet: 'Starknet',
  other: 'Other',
};