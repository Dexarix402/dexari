import { 
  Transaction, 
  PublicKey, 
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_CLOCK_PUBKEY 
} from '@solana/web3.js';
import { solanaAdapter } from '../solana/walletAdapter';

export interface TransactionConfig {
  feePayer: PublicKey;
  recentBlockhash?: string;
  instructions: TransactionInstruction[];
  signers?: PublicKey[];
}

export class TransactionBuilder {
  private transaction: Transaction;
  private instructions: TransactionInstruction[] = [];

  constructor() {
    this.transaction = new Transaction();
  }

  addInstruction(instruction: TransactionInstruction): TransactionBuilder {
    this.instructions.push(instruction);
    return this;
  }

  addTransferInstruction(
    from: PublicKey,
    to: PublicKey,
    lamports: number
  ): TransactionBuilder {
    const instruction = SystemProgram.transfer({
      fromPubkey: from,
      toPubkey: to,
      lamports,
    });
    this.instructions.push(instruction);
    return this;
  }

  addCreateAccountInstruction(
    payer: PublicKey,
    newAccount: PublicKey,
    lamports: number,
    space: number,
    programId: PublicKey
  ): TransactionBuilder {
    const instruction = SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: newAccount,
      lamports,
      space,
      programId,
    });
    this.instructions.push(instruction);
    return this;
  }

  addMemoInstruction(memo: string, signer: PublicKey): TransactionBuilder {
    const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
    
    const instruction = new TransactionInstruction({
      keys: [{ pubkey: signer, isSigner: true, isWritable: false }],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(memo, 'utf-8'),
    });
    
    this.instructions.push(instruction);
    return this;
  }

  async build(feePayer: PublicKey): Promise<Transaction> {
    const { blockhash } = await solanaAdapter.getConnection().then(
      conn => conn.getLatestBlockhash()
    );

    this.transaction.recentBlockhash = blockhash;
    this.transaction.feePayer = feePayer;
    
    this.instructions.forEach(instruction => {
      this.transaction.add(instruction);
    });

    return this.transaction;
  }

  getTransaction(): Transaction {
    return this.transaction;
  }

  clear(): TransactionBuilder {
    this.transaction = new Transaction();
    this.instructions = [];
    return this;
  }

  static createSimpleTransfer(
    from: PublicKey,
    to: PublicKey,
    amount: number
  ): TransactionBuilder {
    return new TransactionBuilder()
      .addTransferInstruction(from, to, solanaAdapter.solToLamports(amount));
  }

  static createBatchTransfer(
    from: PublicKey,
    recipients: Array<{ address: PublicKey; amount: number }>
  ): TransactionBuilder {
    const builder = new TransactionBuilder();
    
    recipients.forEach(recipient => {
      builder.addTransferInstruction(
        from,
        recipient.address,
        solanaAdapter.solToLamports(recipient.amount)
      );
    });
    
    return builder;
  }

  async estimateTransactionFee(): Promise<number> {
    const connection = await solanaAdapter.getConnection();
    const { feeCalculator } = await connection.getRecentBlockhashAndContext();
    
    return feeCalculator.lamportsPerSignature;
  }

  async serialize(): Promise<Buffer> {
    return this.transaction.serialize();
  }

  addPriorityFee(microLamports: number): TransactionBuilder {
    const COMPUTE_BUDGET_PROGRAM = new PublicKey('ComputeBudget111111111111111111111111111111');
    
    const priorityFeeInstruction = new TransactionInstruction({
      keys: [],
      programId: COMPUTE_BUDGET_PROGRAM,
      data: Buffer.from([
        3,
        ...new Uint8Array(new BigUint64Array([BigInt(microLamports)]).buffer)
      ])
    });
    
    this.instructions.unshift(priorityFeeInstruction);
    return this;
  }

  setComputeUnitLimit(units: number): TransactionBuilder {
    const COMPUTE_BUDGET_PROGRAM = new PublicKey('ComputeBudget111111111111111111111111111111');
    
    const computeLimitInstruction = new TransactionInstruction({
      keys: [],
      programId: COMPUTE_BUDGET_PROGRAM,
      data: Buffer.from([
        2,
        ...new Uint8Array(new Uint32Array([units]).buffer)
      ])
    });
    
    this.instructions.unshift(computeLimitInstruction);
    return this;
  }
}

export const createTransaction = () => new TransactionBuilder();
