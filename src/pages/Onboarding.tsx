// Onboarding wizard with motion transitions (Frame I)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/Logo';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  User, 
  Target, 
  Globe, 
  Rocket,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BuilderRole, BuilderNiche, Ecosystem, ProjectMaturity } from '@/types/grant';
import { ecosystemLabels, nicheLabels } from '@/data/mockGrants';
import { shouldReduceMotion } from '@/lib/motion';

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
  { id: 'review', title: 'All Set!', description: 'Review & launch', icon: PartyPopper },
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const reduceMotion = shouldReduceMotion();
  
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
      case 4: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const niches = Object.entries(nicheLabels) as [BuilderNiche, string][];
  const ecosystems = Object.entries(ecosystemLabels).filter(([k]) => k !== 'other') as [Ecosystem, string][];

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <Logo size="md" />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      i < currentStep
                        ? 'bg-emerald text-emerald-foreground'
                        : i === currentStep
                        ? 'gradient-primary text-emerald-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                    animate={i === currentStep && !reduceMotion ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {i < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        'hidden sm:block w-12 md:w-20 h-0.5 mx-2 transition-colors',
                        i < currentStep ? 'bg-emerald' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-1" />
          </div>

          {/* Step Content with Animation */}
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={reduceMotion ? {} : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="mb-6">
                  <Badge variant="outline" className="mb-4 border-emerald/30 bg-emerald/10">
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
                          <motion.button
                            key={value}
                            onClick={() => setFormData(prev => ({ ...prev, role: value }))}
                            className={cn(
                              'p-4 rounded-xl border text-left transition-all min-h-[80px]',
                              formData.role === value
                                ? 'border-emerald bg-emerald/10'
                                : 'border-border bg-secondary/30 hover:border-emerald/50'
                            )}
                            whileHover={reduceMotion ? {} : { scale: 1.02 }}
                            whileTap={reduceMotion ? {} : { scale: 0.98 }}
                          >
                            <div className="font-medium">{label}</div>
                            <div className="text-sm text-muted-foreground">{description}</div>
                          </motion.button>
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
                        <motion.button
                          key={value}
                          onClick={() => toggleNiche(value)}
                          className={cn(
                            'px-4 py-3 rounded-lg border transition-all min-h-[44px]',
                            formData.niches.includes(value)
                              ? 'border-emerald bg-emerald text-emerald-foreground'
                              : 'border-border bg-secondary/30 hover:border-emerald/50'
                          )}
                          whileHover={reduceMotion ? {} : { scale: 1.05 }}
                          whileTap={reduceMotion ? {} : { scale: 0.95 }}
                        >
                          {label}
                        </motion.button>
                      ))}
                    </div>
                    {formData.niches.length > 0 && (
                      <motion.p 
                        className="mt-4 text-sm text-emerald"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Selected: {formData.niches.map(n => nicheLabels[n]).join(', ')}
                      </motion.p>
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
                        <motion.button
                          key={value}
                          onClick={() => toggleEcosystem(value)}
                          className={cn(
                            'px-4 py-3 rounded-lg border transition-all min-h-[44px]',
                            formData.ecosystems.includes(value)
                              ? 'border-emerald bg-emerald text-emerald-foreground'
                              : 'border-border bg-secondary/30 hover:border-emerald/50'
                          )}
                          whileHover={reduceMotion ? {} : { scale: 1.05 }}
                          whileTap={reduceMotion ? {} : { scale: 0.95 }}
                        >
                          {label}
                        </motion.button>
                      ))}
                    </div>
                    {formData.ecosystems.length > 0 && (
                      <motion.p 
                        className="mt-4 text-sm text-emerald"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Selected: {formData.ecosystems.map(e => ecosystemLabels[e]).join(', ')}
                      </motion.p>
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
                          <motion.button
                            key={value}
                            onClick={() => setFormData(prev => ({ ...prev, projectMaturity: value }))}
                            className={cn(
                              'p-4 rounded-xl border text-left transition-all min-h-[80px]',
                              formData.projectMaturity === value
                                ? 'border-emerald bg-emerald/10'
                                : 'border-border bg-secondary/30 hover:border-emerald/50'
                            )}
                            whileHover={reduceMotion ? {} : { scale: 1.02 }}
                            whileTap={reduceMotion ? {} : { scale: 0.98 }}
                          >
                            <div className="font-medium">{label}</div>
                            <div className="text-sm text-muted-foreground">{description}</div>
                          </motion.button>
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

                {/* Step 5: Review */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center py-4">
                      <motion.div
                        className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4"
                        animate={reduceMotion ? {} : { scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      >
                        <PartyPopper className="w-10 h-10 text-emerald-foreground" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">Profile Complete!</h3>
                      <p className="text-muted-foreground">
                        We found <span className="text-emerald font-bold">12 grants</span> that match your profile.
                      </p>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Name</span>
                        <span className="font-medium">{formData.displayName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Role</span>
                        <span className="font-medium">{roles.find(r => r.value === formData.role)?.label}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Focus Areas</span>
                        <span className="font-medium">{formData.niches.length} selected</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ecosystems</span>
                        <span className="font-medium">{formData.ecosystems.length} selected</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Stage</span>
                        <span className="font-medium">{maturityLevels.find(m => m.value === formData.projectMaturity)?.label}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2 min-h-[44px]"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 min-h-[44px]"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    See My Grants
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
