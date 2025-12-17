import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-base", ring: 2 },
    md: { icon: "w-8 h-8", text: "text-lg", ring: 2.5 },
    lg: { icon: "w-12 h-12", text: "text-2xl", ring: 3 },
  };

  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Bullseye Logo */}
      <div className={cn("relative", s.icon)}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="currentColor"
            strokeWidth={s.ring}
            className="text-emerald/30"
          />
          {/* Middle ring */}
          <circle
            cx="20"
            cy="20"
            r="12"
            stroke="currentColor"
            strokeWidth={s.ring}
            className="text-emerald/60"
          />
          {/* Inner ring */}
          <circle
            cx="20"
            cy="20"
            r="6"
            fill="currentColor"
            className="text-emerald"
          />
          {/* Center dot - hit marker */}
          <circle
            cx="20"
            cy="20"
            r="2"
            fill="currentColor"
            className="text-emerald-foreground"
          />
          {/* Arrow/dart indicator */}
          <path
            d="M32 8L28 12M32 8L26 10M32 8L30 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald"
          />
        </svg>
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", s.text)}>
          Grantees
        </span>
      )}
    </div>
  );
}
