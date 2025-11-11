import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Connection, clusterApiUrl, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

export const SOLANA_NETWORK = WalletAdapterNetwork.Mainnet;
export const RPC_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

export class SolanaWalletAdapter {
  private connection: Connection;
  private network: WalletAdapterNetwork;

  constructor(network: WalletAdapterNetwork = SOLANA_NETWORK) {
    this.network = network;
    this.connection = new Connection(clusterApiUrl(network), 'confirmed');
  }

  async getConnection(): Promise<Connection> {
    return this.connection;
  }

  async getBalance(publicKey: PublicKey): Promise<number> {
    const balance = await this.connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  async requestAirdrop(publicKey: PublicKey, amount: number): Promise<string> {
    if (this.network !== WalletAdapterNetwork.Devnet) {
      throw new Error('Airdrops only available on devnet');
    }
    const signature = await this.connection.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL
    );
    await this.connection.confirmTransaction(signature);
    return signature;
  }

  async getRecentBlockhash(): Promise<string> {
    const { blockhash } = await this.connection.getLatestBlockhash();
    return blockhash;
  }

  async sendTransaction(transaction: Transaction, signers: any[]): Promise<string> {
    const signature = await this.connection.sendTransaction(transaction, signers);
    await this.connection.confirmTransaction(signature);
    return signature;
  }

  async getTransactionDetails(signature: string) {
    return await this.connection.getTransaction(signature, {
      maxSupportedTransactionVersion: 0
    });
  }

  createTransferInstruction(
    fromPubkey: PublicKey,
    toPubkey: PublicKey,
    lamports: number
  ) {
    return SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    });
  }

  lamportsToSol(lamports: number): number {
    return lamports / LAMPORTS_PER_SOL;
  }

  solToLamports(sol: number): number {
    return sol * LAMPORTS_PER_SOL;
  }
}

export const solanaAdapter = new SolanaWalletAdapter();
