import { PublicKey, Transaction } from '@solana/web3.js';

export interface PhantomProvider {
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
}

export class PhantomWalletService {
  private provider: PhantomProvider | null = null;

  getProvider(): PhantomProvider | null {
    if (typeof window === 'undefined') return null;
    
    const { solana } = window as any;
    
    if (solana?.isPhantom) {
      return solana as PhantomProvider;
    }
    
    return null;
  }

  isPhantomInstalled(): boolean {
    return this.getProvider() !== null;
  }

  async connect(): Promise<PublicKey | null> {
    try {
      const provider = this.getProvider();
      
      if (!provider) {
        window.open('https://phantom.app/', '_blank');
        return null;
      }

      const response = await provider.connect();
      this.provider = provider;
      
      return response.publicKey;
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.provider) {
        await this.provider.disconnect();
        this.provider = null;
      }
    } catch (error) {
      console.error('Error disconnecting from Phantom wallet:', error);
      throw error;
    }
  }

  async signTransaction(transaction: Transaction): Promise<Transaction> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      return await this.provider.signTransaction(transaction);
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  }

  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      return await this.provider.signAllTransactions(transactions);
    } catch (error) {
      console.error('Error signing transactions:', error);
      throw error;
    }
  }

  async signMessage(message: string): Promise<Uint8Array> {
    if (!this.provider) {
      throw new Error('Wallet not connected');
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const { signature } = await this.provider.signMessage(encodedMessage);
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  getPublicKey(): PublicKey | null {
    return this.provider?.publicKey || null;
  }

  isConnected(): boolean {
    return this.provider?.isConnected || false;
  }

  onAccountChanged(callback: (publicKey: PublicKey | null) => void): void {
    const provider = this.getProvider();
    if (provider) {
      provider.on('accountChanged', callback);
    }
  }

  onDisconnect(callback: () => void): void {
    const provider = this.getProvider();
    if (provider) {
      provider.on('disconnect', callback);
    }
  }

  removeAccountChangedListener(callback: (publicKey: PublicKey | null) => void): void {
    const provider = this.getProvider();
    if (provider) {
      provider.removeListener('accountChanged', callback);
    }
  }

  removeDisconnectListener(callback: () => void): void {
    const provider = this.getProvider();
    if (provider) {
      provider.removeListener('disconnect', callback);
    }
  }
}

export const phantomWallet = new PhantomWalletService();
