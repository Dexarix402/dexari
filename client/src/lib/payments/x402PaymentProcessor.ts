import { PublicKey, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { solanaAdapter } from '../solana/walletAdapter';
import { phantomWallet } from '../solana/phantomWallet';

export interface PaymentRequest {
  agentAddress: string;
  amount: number;
  currency: 'SOL' | 'USDC' | 'DXRI';
  metadata?: {
    agentName?: string;
    serviceName?: string;
    description?: string;
  };
}

export interface PaymentResponse {
  signature: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  amount: number;
  from: string;
  to: string;
}

export class X402PaymentProcessor {
  private static readonly X402_PROGRAM_ID = new PublicKey('X402PaymentProgram1111111111111111111111111');
  private static readonly FEE_PERCENTAGE = 0.02;

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const senderPublicKey = phantomWallet.getPublicKey();
      
      if (!senderPublicKey) {
        throw new Error('Wallet not connected');
      }

      const recipientPublicKey = new PublicKey(request.agentAddress);
      const connection = await solanaAdapter.getConnection();

      const lamports = solanaAdapter.solToLamports(request.amount);
      const fee = Math.floor(lamports * X402PaymentProcessor.FEE_PERCENTAGE);
      const totalLamports = lamports + fee;

      const transaction = new Transaction();

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports: lamports,
      });

      const feeInstruction = SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: X402PaymentProcessor.X402_PROGRAM_ID,
        lamports: fee,
      });

      transaction.add(transferInstruction);
      transaction.add(feeInstruction);

      if (request.metadata) {
        const metadataInstruction = this.createMetadataInstruction(
          senderPublicKey,
          recipientPublicKey,
          request.metadata
        );
        transaction.add(metadataInstruction);
      }

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderPublicKey;

      const signedTransaction = await phantomWallet.signTransaction(transaction);

      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      await connection.confirmTransaction(signature);

      return {
        signature,
        status: 'confirmed',
        timestamp: Date.now(),
        amount: request.amount,
        from: senderPublicKey.toBase58(),
        to: request.agentAddress,
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  async estimateFee(amount: number): Promise<number> {
    const lamports = solanaAdapter.solToLamports(amount);
    const fee = Math.floor(lamports * X402PaymentProcessor.FEE_PERCENTAGE);
    return solanaAdapter.lamportsToSol(fee);
  }

  async getPaymentStatus(signature: string): Promise<'pending' | 'confirmed' | 'failed'> {
    try {
      const connection = await solanaAdapter.getConnection();
      const status = await connection.getSignatureStatus(signature);

      if (!status.value) {
        return 'pending';
      }

      if (status.value.err) {
        return 'failed';
      }

      if (status.value.confirmationStatus === 'confirmed' || 
          status.value.confirmationStatus === 'finalized') {
        return 'confirmed';
      }

      return 'pending';
    } catch (error) {
      console.error('Error checking payment status:', error);
      return 'failed';
    }
  }

  async verifyPayment(signature: string, expectedAmount: number): Promise<boolean> {
    try {
      const transaction = await solanaAdapter.getTransactionDetails(signature);
      
      if (!transaction) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  private createMetadataInstruction(
    sender: PublicKey,
    recipient: PublicKey,
    metadata: PaymentRequest['metadata']
  ): TransactionInstruction {
    const metadataBuffer = Buffer.from(JSON.stringify(metadata));
    
    return new TransactionInstruction({
      keys: [
        { pubkey: sender, isSigner: true, isWritable: false },
        { pubkey: recipient, isSigner: false, isWritable: false },
      ],
      programId: X402PaymentProcessor.X402_PROGRAM_ID,
      data: metadataBuffer,
    });
  }

  async cancelPayment(signature: string): Promise<boolean> {
    console.warn('Payment cancellation not supported on Solana blockchain');
    return false;
  }

  async refundPayment(signature: string): Promise<string | null> {
    throw new Error('Refunds must be initiated through X402 support');
  }
}

export const x402Processor = new X402PaymentProcessor();
