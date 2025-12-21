import React from 'react';
import { ConnectButton } from 'thirdweb/react';
import { thirdwebClient, avalancheChain } from '@/lib/thirdweb';

interface ConnectWalletButtonProps {
  onConnect?: (address: string) => void;
}

export function ConnectWalletButton({ onConnect }: ConnectWalletButtonProps) {
  return (
    <ConnectButton
      client={thirdwebClient}
      chain={avalancheChain}
      connectButton={{
        label: "Connect Wallet",
        style: {
          backgroundColor: "hsl(160 84% 39%)",
          color: "hsl(222 47% 6%)",
          borderRadius: "0.75rem",
          padding: "0.75rem 1.5rem",
          fontWeight: 600,
          fontSize: "0.875rem",
        },
      }}
      detailsButton={{
        style: {
          backgroundColor: "hsl(222 30% 14%)",
          color: "hsl(210 40% 98%)",
          borderRadius: "0.75rem",
          padding: "0.5rem 1rem",
        },
      }}
      theme="dark"
      connectModal={{
        size: "compact",
        title: "Connect to Grantees",
        showThirdwebBranding: false,
      }}
    />
  );
}
