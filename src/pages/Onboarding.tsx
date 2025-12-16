import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Target, 
  Globe, 
  Rocket,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BuilderRole, BuilderNiche, Ecosystem, ProjectMaturity } from '@/types/grant';
import { ecosystemLabels, nicheLabels } from '@/data/mockGrants';

interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: WizardStep[] = [
  { id: 'role', title: 'Your Role', description: 'Tell us about yourself', icon: User },
  { id: 'niche', title: 'Your Niche', description: 'Select your focus areas', icon: Target },
  { id: 'ecosystem', title: 'Ecosystems', description: 'Where do you build?', icon: Globe },
  { id: 'project', title: 'Project Stage', description: 'Describe your project', icon: Rocket },
];

const roles: { value: BuilderRole; label: string; description: string }[] = [
  { value: 'solo-dev', label: 'Solo Developer', description: 'Building independently' },
  { value: 'founder', label: 'Founder', description: 'Leading a startup or project' },
  { value: 'team', label: 'Team Member', description: 'Part of a development team' },
  { value: 'dao-member', label: 'DAO Member', description: 'Contributing to a DAO' },
];

const maturityLevels: { value: ProjectMaturity; label: string; description: string }[] = [
  { value: 'idea', label: 'Idea Stage', description: 'Concept or planning phase' },
  { value: 'mvp', label: 'MVP', description: 'Working prototype or early version' },
  { value: 'live', label: 'Live Product', description: 'Deployed and active users' },
  { value: 'scaling', label: 'Scaling', description: 'Growing and expanding' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    displayName: '',
    role: '' as BuilderRole | '',
    niches: [] as BuilderNiche[],
    ecosystems: [] as Ecosystem[],
    projectMaturity: '' as ProjectMaturity | '',
    projectDescription: '',
    region: '',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const toggleNiche = (niche: BuilderNiche) => {
    setFormData(prev => ({
      ...prev,
      niches: prev.niches.includes(niche)
        ? prev.niches.filter(n => n !== niche)
        : [...prev.niches, niche],
    }));
  };

  const toggleEcosystem = (eco: Ecosystem) => {
    setFormData(prev => ({
      ...prev,
      ecosystems: prev.ecosystems.includes(eco)
        ? prev.ecosystems.filter(e => e !== eco)
        : [...prev.ecosystems, eco],
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.displayName && formData.role;
      case 1: return formData.niches.length > 0;
      case 2: return formData.ecosystems.length > 0;
      case 3: return formData.projectMaturity;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const niches = Object.entries(nicheLabels) as [BuilderNiche, string][];
  const ecosystems = Object.entries(ecosystemLabels).filter(([k]) => k !== 'other') as [Ecosystem, string][];

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">G</span>
          </div>
          <span className="font-bold text-lg">Grant Spotter</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      i < currentStep
                        ? 'bg-primary text-primary-foreground'
                        : i === currentStep
                        ? 'gradient-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {i < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        'hidden sm:block w-16 md:w-24 h-0.5 mx-2',
                        i < currentStep ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          {/* Step Content */}
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8">
            <div className="mb-6">
              <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10">
                Step {currentStep + 1} of {steps.length}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Step 1: Role */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Display Name
                  </label>
                  <Input
                    placeholder="How should we call you?"
                    value={formData.displayName}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="h-12 bg-secondary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3">
                    What best describes your role?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {roles.map(({ value, label, description }) => (
                      <button
                        key={value}
                        onClick={() => setFormData(prev => ({ ...prev, role: value }))}
                        className={cn(
                          'p-4 rounded-xl border text-left transition-all',
                          formData.role === value
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary/30 hover:border-primary/50'
                        )}
                      >
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-muted-foreground">{description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Niche */}
            {currentStep === 1 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Select all that apply. This helps us match you with relevant grants.
                </p>
                <div className="flex flex-wrap gap-3">
                  {niches.map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => toggleNiche(value)}
                      className={cn(
                        'px-4 py-2.5 rounded-lg border transition-all touch-target',
                        formData.niches.includes(value)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {formData.niches.length > 0 && (
                  <p className="mt-4 text-sm text-primary">
                    Selected: {formData.niches.map(n => nicheLabels[n]).join(', ')}
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Ecosystem */}
            {currentStep === 2 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Which blockchain ecosystems are you building on or interested in?
                </p>
                <div className="flex flex-wrap gap-3">
                  {ecosystems.map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => toggleEcosystem(value)}
                      className={cn(
                        'px-4 py-2.5 rounded-lg border transition-all touch-target',
                        formData.ecosystems.includes(value)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {formData.ecosystems.length > 0 && (
                  <p className="mt-4 text-sm text-primary">
                    Selected: {formData.ecosystems.map(e => ecosystemLabels[e]).join(', ')}
                  </p>
                )}
              </div>
            )}

            {/* Step 4: Project */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    What stage is your project?
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {maturityLevels.map(({ value, label, description }) => (
                      <button
                        key={value}
                        onClick={() => setFormData(prev => ({ ...prev, projectMaturity: value }))}
                        className={cn(
                          'p-4 rounded-xl border text-left transition-all',
                          formData.projectMaturity === value
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary/30 hover:border-primary/50'
                        )}
                      >
                        <div className="font-medium">{label}</div>
                        <div className="text-sm text-muted-foreground">{description}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Brief project description (optional)
                  </label>
                  <Textarea
                    placeholder="Tell us what you're building..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                    className="min-h-[100px] bg-secondary/50"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Find My Grants
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
