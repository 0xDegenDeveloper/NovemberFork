import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import React from "react";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  argentWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli, arbitrum, arbitrumGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import App from "./App";

const { chains, provider, webSocketProvider } = configureChains(
  [arbitrumGoerli],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
    publicProvider(),
  ],
  {
    pollingInterval: 2000,
    targetQuorum: 1,
  }
);

const DOMAIN = import.meta.env.VITE_DOMAIN;
const projectId = import.meta.env.VITE_WALLET_CONNECT_ID;

const defWallets = [
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ chains }),
      // walletConnectWallet({ chains, projectId }),
      // rainbowWallet({ chains }),
      // trustWallet({ chains, projectId }),
    ],
  },
];

const connectors = connectorsForWallets([
  ...defWallets,
  // {
  //   groupName: "Other",
  //   wallets: [argentWallet({ chains, projectId })],
  // },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const theme = {
  accentColor: "var(--main-light-color)",
  accentColorForeground: "var(--main-dark-color)",
  borderRadius: "large",
  fontStack: "system",
  overlayBlur: "small",
};

function AppWrapper() {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{
            name: "Novemberfork",
          }}
          chains={chains}
          theme={darkTheme(theme)}
        >
          <App DOMAIN={DOMAIN} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default AppWrapper;
