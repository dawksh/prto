import { http, createConfig, createStorage } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { porto } from 'porto/wagmi'
import { localStorage } from 'porto/Storage'

export const config = createConfig({
    chains: [baseSepolia],
    connectors: [porto()],
    storage: createStorage({
        storage: localStorage(),
    }),
    transports: {
        [baseSepolia.id]: http(),
    },
})