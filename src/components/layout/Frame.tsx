import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MotionSection } from "@/components/Motion/MotionSection";

type FrameBackground = "default" | "gradient" | "subtle" | "dark" | "accent";

interface FrameProps {
  children: ReactNode;
  className?: string;
  background?: FrameBackground;
  eyebrow?: string;
  title?: string;
  description?: string;
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const backgroundStyles: Record<FrameBackground, string> = {
  default: "bg-background",
  gradient: "bg-gradient-to-b from-background via-background to-secondary/30",
  subtle: "bg-secondary/20",
  dark: "bg-card",
  accent: "bg-gradient-to-br from-emerald/5 via-background to-emerald/10"
};

export function Frame({ 
  children, 
  className, 
  background = "default",
  eyebrow,
  title,
  description,
  id,
  fullWidth = false,
  noPadding = false
}: FrameProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative w-full",
        backgroundStyles[background],
        !noPadding && "py-16 md:py-24 lg:py-32",
        className
      )}
    >
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        !fullWidth && "max-w-7xl"
      )}>
        {(eyebrow || title || description) && (
          <MotionSection className="mb-12 md:mb-16 text-center">
            {eyebrow && (
              <span className="inline-block text-emerald text-sm font-semibold tracking-wider uppercase mb-4">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </MotionSection>
        )}
        {children}
      </div>
    </section>
  );
}

// Hero-specific frame with more dramatic styling
interface HeroFrameProps {
  children: ReactNode;
  className?: string;
}

export function HeroFrame({ children, className }: HeroFrameProps) {
  return (
    <section className={cn(
      "relative min-h-[90vh] flex items-center overflow-hidden",
      "bg-gradient-to-b from-background via-background to-secondary/20",
      className
    )}>
      {/* Subtle background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />
      
      {/* Radial gradient accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-emerald/20 via-transparent to-transparent" />
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {children}
      </div>
    </section>
  );
}
