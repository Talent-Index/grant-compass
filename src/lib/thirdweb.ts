import { createThirdwebClient, defineChain } from "thirdweb";

// Thirdweb client for wallet connections
export const thirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "1f60a6e44fa4f19d9a73670b12794aa4",
});

// Avalanche C-Chain configuration
export const avalancheChain = defineChain({
  id: 43114,
  name: "Avalanche",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://api.avax.network/ext/bc/C/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://snowtrace.io",
    },
  },
});

// Credit pricing configuration
export const CREDIT_PRICING = {
  // Base package: $10 = 100 credits
  basePrice: 10,
  baseCredits: 100,
  // AVAX equivalent (approximate, would need oracle for production)
  avaxPrice: 0.5, // ~0.5 AVAX for 100 credits
  referralBonus: 10, // Credits earned per referral
  welcomeBonus: 5, // Free credits on signup
};
