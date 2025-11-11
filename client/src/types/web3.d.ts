import { PublicKey, Transaction } from '@solana/web3.js';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      publicKey?: PublicKey;
      isConnected: boolean;
      connect: () => Promise<{ publicKey: PublicKey }>;
      disconnect: () => Promise<void>;
      signTransaction: (transaction: Transaction) => Promise<Transaction>;
      signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      on: (event: string, callback: (args: any) => void) => void;
      removeListener: (event: string, callback: (args: any) => void) => void;
    };
  }
}

export interface WalletAdapter {
  name: string;
  url: string;
  icon: string;
  readyState: 'Installed' | 'NotDetected' | 'Loadable' | 'Unsupported';
  publicKey: PublicKey | null;
  connecting: boolean;
  connected: boolean;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
}

export interface SolanaConfig {
  network: 'mainnet-beta' | 'testnet' | 'devnet';
  endpoint: string;
  commitment: 'processed' | 'confirmed' | 'finalized';
}

export interface TokenAccount {
  mint: string;
  owner: string;
  amount: string;
  decimals: number;
  uiAmount: number;
}

export interface NFTMetadata {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: Array<{
    address: string;
    verified: boolean;
    share: number;
  }>;
}

export interface TransactionMetadata {
  signature: string;
  slot: number;
  blockTime: number | null;
  fee: number;
  status: 'success' | 'failed';
  instructions: number;
}

export {};
