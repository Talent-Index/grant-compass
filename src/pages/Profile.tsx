import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BuilderRole, BuilderNiche, Ecosystem, ProjectMaturity } from '@/types/grant';
import { ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { 
  User, 
  Github, 
  Mail, 
  Globe, 
  Save,
  Code,
  Target,
  Rocket
} from 'lucide-react';
import { cn } from '@/lib/utils';

const roles: { value: BuilderRole; label: string }[] = [
  { value: 'solo-dev', label: 'Solo Developer' },
  { value: 'founder', label: 'Founder' },
  { value: 'team', label: 'Team Member' },
  { value: 'dao-member', label: 'DAO Member' },
];

const maturityLevels: { value: ProjectMaturity; label: string }[] = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'MVP' },
  { value: 'live', label: 'Live Product' },
  { value: 'scaling', label: 'Scaling' },
];

export default function Profile() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState({
    displayName: 'Builder',
    email: 'builder@example.com',
    githubUsername: 'builder',
    role: 'founder' as BuilderRole,
    niches: ['defi', 'fintech'] as BuilderNiche[],
    ecosystems: ['ethereum', 'avalanche'] as Ecosystem[],
    projectMaturity: 'mvp' as ProjectMaturity,
    region: 'Africa',
    bio: 'Building DeFi solutions for emerging markets.',
    projectDescription: 'A mobile-first DeFi platform enabling cross-border payments and savings for the unbanked.',
    primaryLanguages: ['TypeScript', 'Solidity', 'Rust'],
  });

  const toggleNiche = (niche: BuilderNiche) => {
    setProfile(prev => ({
      ...prev,
      niches: prev.niches.includes(niche)
        ? prev.niches.filter(n => n !== niche)
        : [...prev.niches, niche],
    }));
  };

  const toggleEcosystem = (eco: Ecosystem) => {
    setProfile(prev => ({
      ...prev,
      ecosystems: prev.ecosystems.includes(eco)
        ? prev.ecosystems.filter(e => e !== eco)
        : [...prev.ecosystems, eco],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: 'Profile saved',
      description: 'Your changes have been saved successfully.',
    });
    setIsSaving(false);
  };

  const niches = Object.entries(nicheLabels) as [BuilderNiche, string][];
  const ecosystems = Object.entries(ecosystemLabels).filter(([k]) => k !== 'other') as [Ecosystem, string][];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Builder Profile</h1>
              <p className="text-muted-foreground">
                Keep your profile updated to get better grant matches.
              </p>
            </div>
            <Button 
              variant="hero" 
              onClick={handleSave} 
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profile.displayName}
                      onChange={(e) => setProfile(p => ({ ...p, displayName: e.target.value }))}
                      className="h-12 bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={profile.email}
                        onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                        className="h-12 pl-10 bg-secondary/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Username</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="github"
                        value={profile.githubUsername}
                        onChange={(e) => setProfile(p => ({ ...p, githubUsername: e.target.value }))}
                        className="h-12 pl-10 bg-secondary/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="region"
                        value={profile.region}
                        onChange={(e) => setProfile(p => ({ ...p, region: e.target.value }))}
                        className="h-12 pl-10 bg-secondary/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                    className="min-h-[80px] bg-secondary/50"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Role & Maturity */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-primary" />
                  Role & Project Stage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-3 block">Your Role</Label>
                  <div className="flex flex-wrap gap-2">
                    {roles.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setProfile(p => ({ ...p, role: value }))}
                        className={cn(
                          'px-4 py-2.5 rounded-lg border transition-all touch-target',
                          profile.role === value
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-secondary/30 hover:border-primary/50'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-3 block">Project Maturity</Label>
                  <div className="flex flex-wrap gap-2">
                    {maturityLevels.map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setProfile(p => ({ ...p, projectMaturity: value }))}
                        className={cn(
                          'px-4 py-2.5 rounded-lg border transition-all touch-target',
                          profile.projectMaturity === value
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-secondary/30 hover:border-primary/50'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectDesc">Project Description</Label>
                  <Textarea
                    id="projectDesc"
                    value={profile.projectDescription}
                    onChange={(e) => setProfile(p => ({ ...p, projectDescription: e.target.value }))}
                    className="min-h-[100px] bg-secondary/50"
                    placeholder="Describe what you're building..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Niches */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Focus Areas (Niches)
                </CardTitle>
                <CardDescription>
                  Select all that apply to improve your grant matches.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {niches.map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => toggleNiche(value)}
                      className={cn(
                        'px-4 py-2.5 rounded-lg border transition-all touch-target',
                        profile.niches.includes(value)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ecosystems */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Target Ecosystems
                </CardTitle>
                <CardDescription>
                  Which blockchain ecosystems are you building on?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ecosystems.map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => toggleEcosystem(value)}
                      className={cn(
                        'px-4 py-2.5 rounded-lg border transition-all touch-target',
                        profile.ecosystems.includes(value)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Technical Profile
                </CardTitle>
                <CardDescription>
                  Auto-detected from your GitHub activity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="mb-3 block text-sm text-muted-foreground">Primary Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.primaryLanguages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-sm py-1.5">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
