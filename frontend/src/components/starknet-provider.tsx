"use client";
import { ReactNode } from "react";

import { goerli, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  alchemyProvider,
  useInjectedConnectors,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: ReactNode }) {
  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random",
  });

  const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

  return (
    <StarknetConfig
      chains={[mainnet, goerli]}
      provider={alchemyProvider({ apiKey })}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
