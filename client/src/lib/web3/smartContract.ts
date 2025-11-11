import { PublicKey, TransactionInstruction, AccountMeta } from '@solana/web3.js';
import { solanaAdapter } from '../solana/walletAdapter';

export interface ContractMethod {
  name: string;
  discriminator: number[];
  accounts: AccountMeta[];
  data: Buffer;
}

export class SmartContractInteraction {
  private programId: PublicKey;

  constructor(programAddress: string) {
    this.programId = new PublicKey(programAddress);
  }

  createInstruction(
    method: string,
    accounts: AccountMeta[],
    data: Buffer
  ): TransactionInstruction {
    return new TransactionInstruction({
      keys: accounts,
      programId: this.programId,
      data,
    });
  }

  encodeMethodData(methodName: string, args: any[]): Buffer {
    const methodHash = this.hashMethod(methodName);
    const argsBuffer = this.serializeArgs(args);
    
    return Buffer.concat([methodHash, argsBuffer]);
  }

  private hashMethod(methodName: string): Buffer {
    const hash = require('crypto')
      .createHash('sha256')
      .update(`global:${methodName}`)
      .digest();
    
    return hash.slice(0, 8);
  }

  private serializeArgs(args: any[]): Buffer {
    const buffers: Buffer[] = [];
    
    args.forEach(arg => {
      if (typeof arg === 'number') {
        const buf = Buffer.allocUnsafe(8);
        buf.writeBigUInt64LE(BigInt(arg));
        buffers.push(buf);
      } else if (typeof arg === 'string') {
        const strBuf = Buffer.from(arg, 'utf-8');
        const lenBuf = Buffer.allocUnsafe(4);
        lenBuf.writeUInt32LE(strBuf.length);
        buffers.push(lenBuf, strBuf);
      } else if (arg instanceof PublicKey) {
        buffers.push(arg.toBuffer());
      } else if (Buffer.isBuffer(arg)) {
        buffers.push(arg);
      }
    });
    
    return Buffer.concat(buffers);
  }

  async getProgramAccounts(filters?: any[]): Promise<any[]> {
    const connection = await solanaAdapter.getConnection();
    
    const accounts = await connection.getProgramAccounts(this.programId, {
      filters: filters || [],
    });
    
    return accounts;
  }

  async getAccountInfo(accountAddress: PublicKey) {
    const connection = await solanaAdapter.getConnection();
    return await connection.getAccountInfo(accountAddress);
  }

  async parseAccountData(data: Buffer): Promise<any> {
    return JSON.parse(data.toString('utf-8'));
  }

  static async findProgramAddress(
    seeds: (Buffer | Uint8Array)[],
    programId: PublicKey
  ): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddress(seeds, programId);
  }

  async deriveAssociatedTokenAddress(
    walletAddress: PublicKey,
    tokenMintAddress: PublicKey
  ): Promise<PublicKey> {
    const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    );
    
    const [address] = await PublicKey.findProgramAddress(
      [
        walletAddress.toBuffer(),
        new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA').toBuffer(),
        tokenMintAddress.toBuffer(),
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    );
    
    return address;
  }
}

export class X402PaymentContract extends SmartContractInteraction {
  private static readonly PROGRAM_ADDRESS = 'X402PaymentProgram1111111111111111111111111';

  constructor() {
    super(X402PaymentContract.PROGRAM_ADDRESS);
  }

  async initializePayment(
    sender: PublicKey,
    recipient: PublicKey,
    amount: number,
    metadata: string
  ): TransactionInstruction {
    const accounts: AccountMeta[] = [
      { pubkey: sender, isSigner: true, isWritable: true },
      { pubkey: recipient, isSigner: false, isWritable: true },
    ];

    const data = this.encodeMethodData('initialize_payment', [
      amount,
      metadata,
    ]);

    return this.createInstruction('initializePayment', accounts, data);
  }

  async executePayment(
    paymentAccount: PublicKey,
    authority: PublicKey
  ): TransactionInstruction {
    const accounts: AccountMeta[] = [
      { pubkey: paymentAccount, isSigner: false, isWritable: true },
      { pubkey: authority, isSigner: true, isWritable: false },
    ];

    const data = this.encodeMethodData('execute_payment', []);

    return this.createInstruction('executePayment', accounts, data);
  }

  async getPaymentState(paymentAccount: PublicKey): Promise<any> {
    const accountInfo = await this.getAccountInfo(paymentAccount);
    
    if (!accountInfo) {
      throw new Error('Payment account not found');
    }

    return this.parseAccountData(accountInfo.data);
  }
}

export const x402Contract = new X402PaymentContract();
