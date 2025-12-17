import { cn } from "@/lib/utils";
import { shouldReduceMotion } from "@/lib/motion";

const ecosystems = [
  { name: "Avalanche", color: "#E84142" },
  { name: "Ethereum", color: "#627EEA" },
  { name: "Solana", color: "#9945FF" },
  { name: "Polygon", color: "#8247E5" },
  { name: "Optimism", color: "#FF0420" },
  { name: "Arbitrum", color: "#28A0F0" },
  { name: "Base", color: "#0052FF" },
  { name: "Starknet", color: "#EC796B" },
  { name: "Near", color: "#00EC97" },
  { name: "Cosmos", color: "#2E3148" },
  { name: "Polkadot", color: "#E6007A" },
  { name: "Sui", color: "#4DA2FF" },
];

interface TrustMarqueeProps {
  className?: string;
}

export function TrustMarquee({ className }: TrustMarqueeProps) {
  const reduceMotion = shouldReduceMotion();
  const duplicatedEcosystems = [...ecosystems, ...ecosystems];

  return (
    <div className={cn("relative overflow-hidden py-8", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div 
        className={cn(
          "flex gap-12 items-center",
          !reduceMotion && "animate-marquee hover:[animation-play-state:paused]"
        )}
      >
        {duplicatedEcosystems.map((ecosystem, index) => (
          <div 
            key={`${ecosystem.name}-${index}`}
            className="flex items-center gap-3 flex-shrink-0 group cursor-default"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110"
              style={{ backgroundColor: ecosystem.color }}
            >
              {ecosystem.name.charAt(0)}
            </div>
            <span className="text-muted-foreground font-medium whitespace-nowrap group-hover:text-foreground transition-colors">
              {ecosystem.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
