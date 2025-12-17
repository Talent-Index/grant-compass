import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, shouldReduceMotion } from "@/lib/motion";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  stagger?: boolean;
}

export function MotionSection({ 
  children, 
  className, 
  variants = fadeUp,
  delay = 0,
  stagger = false
}: MotionSectionProps) {
  const reduceMotion = shouldReduceMotion();
  
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const selectedVariants = stagger ? staggerContainer : variants;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={selectedVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface MotionItemProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export function MotionItem({ children, className, variants = fadeUp }: MotionItemProps) {
  const reduceMotion = shouldReduceMotion();
  
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function MotionCard({ children, className, hoverEffect = true }: MotionCardProps) {
  const reduceMotion = shouldReduceMotion();
  
  if (reduceMotion) {
    return <div className={cn("rounded-xl", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("rounded-xl", className)}
      variants={fadeUp}
      whileHover={hoverEffect ? { 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      } : undefined}
    >
      {children}
    </motion.div>
  );
}
