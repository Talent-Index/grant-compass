export type GrantStatus = 'open' | 'upcoming' | 'closed';

export type GrantType = 'microgrant' | 'dev-grant' | 'dao-funding' | 'accelerator' | 'research' | 'community';

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
