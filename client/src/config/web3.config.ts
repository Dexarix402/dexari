import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const WEB3_CONFIG = {
  network: WalletAdapterNetwork.Mainnet,
  
  rpcEndpoints: {
    mainnet: 'https://api.mainnet-beta.solana.com',
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
  },

  programIds: {
    x402Payment: 'X402PaymentProgram1111111111111111111111111',
    x402Registry: 'X402RegistryProgram111111111111111111111111',
    memo: 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
    token: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  },

  tokens: {
    DXRI: {
      mint: 'DXRITokenMint11111111111111111111111111111',
      decimals: 9,
      symbol: 'DXRI',
      name: 'DEXARI Token',
    },
    USDC: {
      mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin',
    },
  },

  fees: {
    platformFeePercentage: 0.02,
    priorityFee: 5000,
    maxComputeUnits: 200000,
  },

  transaction: {
    confirmationTimeout: 60000,
    maxRetries: 3,
    commitment: 'confirmed' as const,
  },

  wallet: {
    autoConnect: true,
    preferredWallets: ['Phantom', 'Solflare', 'Backpack'],
  },
} as const;

export type Web3Config = typeof WEB3_CONFIG;
