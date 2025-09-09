import React from 'react'
import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import {
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
    rainbowWallet,
    injectedWallet,
    trustWallet,
    phantomWallet,
    braveWallet,
    ledgerWallet,
    safeWallet,
    // ... add more
} from '@rainbow-me/rainbowkit/wallets';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    avalanche
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";


const config = getDefaultConfig({
    appName: 'Token Portfolio',
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    chains: [mainnet, polygon, optimism, arbitrum, base, avalanche],
    wallets: [
        {
            groupName: 'All Wallets',
            wallets: [
                trustWallet,
                phantomWallet,   // mostly for Solana, only keep if multi-chain needed
                injectedWallet,
                metaMaskWallet,
                coinbaseWallet,
                walletConnectWallet,
                rainbowWallet,
                braveWallet,
                ledgerWallet,
                safeWallet,
            ]
        },
    ],
});
const queryClient = new QueryClient();

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ReduxProvider store={store}>

                        {children}
                    </ReduxProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
