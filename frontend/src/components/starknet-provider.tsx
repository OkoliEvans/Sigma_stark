"use client";
import { ReactNode } from "react";

import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

import { goerli, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  alchemyProvider,
  useInjectedConnectors,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: ReactNode }) {
  // const { connectors } = useInjectedConnectors({
  //   // Show these connectors if the user has no connector installed.
  //   recommended: [argent(), braavos()],
  //   // Hide recommended connectors if the user has any connector installed.
  //   includeRecommended: "onlyIfNoConnectors",
  //   // Randomize the order of the connectors.
  //   order: "alphabetical",
  // });

  const connectors = [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

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
