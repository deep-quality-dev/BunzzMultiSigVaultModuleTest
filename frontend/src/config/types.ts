export interface Transaction {
  transactionId?: number;
  to: string;
  amount: number | string;
  unlockTime: Date;
  signerCount: number;
  signers?: string[];
  executed: boolean;
}
