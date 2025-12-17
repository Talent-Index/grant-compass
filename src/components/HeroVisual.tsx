import { motion } from "framer-motion";
import { shouldReduceMotion } from "@/lib/motion";

export function HeroVisual() {
  const reduceMotion = shouldReduceMotion();

  const cards = [
    { amount: "$50K", ecosystem: "Avalanche", color: "#E84142", delay: 0 },
    { amount: "$25K", ecosystem: "Ethereum", color: "#627EEA", delay: 0.2 },
    { amount: "$100K", ecosystem: "Solana", color: "#9945FF", delay: 0.4 },
  ];

  if (reduceMotion) {
    return (
      <div className="relative w-full h-[300px] md:h-[400px]">
        {cards.map((card, i) => (
          <div
            key={card.ecosystem}
            className="absolute glass rounded-xl p-4 shadow-lg"
            style={{
              top: `${20 + i * 25}%`,
              right: `${10 + i * 15}%`,
              transform: `rotate(${-5 + i * 5}deg)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: card.color }}
              >
                {card.ecosystem.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{card.ecosystem}</p>
                <p className="text-lg font-bold text-foreground">{card.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px]">
      {cards.map((card, i) => (
        <motion.div
          key={card.ecosystem}
          className="absolute glass rounded-xl p-4 shadow-lg backdrop-blur-md border border-border/30"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
          }}
          transition={{ 
            delay: card.delay, 
            duration: 0.5,
            ease: "easeOut"
          }}
          style={{
            top: `${15 + i * 28}%`,
            right: `${5 + i * 12}%`,
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-3 + i * 3, -1 + i * 3, -3 + i * 3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                style={{ backgroundColor: card.color }}
              >
                {card.ecosystem.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{card.ecosystem} Grant</p>
                <p className="text-xl font-bold text-foreground">{card.amount}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
      
      {/* Decorative elements */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-emerald/20 to-transparent blur-xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ top: "10%", right: "60%" }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        style={{ bottom: "20%", right: "40%" }}
      />
    </div>
  );
}
