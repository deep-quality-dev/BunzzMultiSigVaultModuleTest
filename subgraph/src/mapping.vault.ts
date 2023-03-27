import { TransactionCompleted, TransactionCreated, TransactionRejected, TransactionSigned } from '../generated/MultiSigVault/MultiSigVault';
import { Transaction } from '../generated/schema';
import { BigInt, log, store } from "@graphprotocol/graph-ts";

export function handleTransactionCreated(event: TransactionCreated): void {
  const id = event.params.transactionId.toString();
  log.info("handleTransactionCreated, called {}, {}, {}", [id, event.params.to.toHex(), event.params.amount.toString(), event.params.unlockTime.toString()]);

  const transaction: Transaction = new Transaction(id);
  transaction.to = event.params.to;
  transaction.amount = event.params.amount;
  transaction.unlockTime = event.params.unlockTime.toI32();
  transaction.signatureCount = 0;
  transaction.signers = [];
  transaction.executed = false;
  transaction.save();
}

export function handleTransactionSigned(event: TransactionSigned): void {
  const id = event.params.transactionId.toString();
  log.info("handleTransactionSigned, called {}, {}", [id, event.params.account.toHex()]);

  const transaction: Transaction | null = Transaction.load(id);
  if (transaction) {
    transaction.signatureCount += 1;
    const signers = transaction.signers;
    signers.push(event.params.account);
    transaction.signers = signers;
    transaction.save();
  }
}

export function handleTransactionRejected(event: TransactionRejected): void {
  const id = event.params.transactionId.toString();
  log.info("handleTransactionRejected, called {}, {}", [id, event.params.account.toHex()]);
}

export function handleTransactionCompleted(event: TransactionCompleted): void {
  const id = event.params.transactionId.toString();
  log.info("handleTransactionCompleted, called {}, {}, {}, {}, {}", [id, event.params.account.toHex(), event.params.to.toHex(), event.params.amount.toString(), event.params.unlockTime.toString()]);

  const transaction: Transaction | null = Transaction.load(id);
  if (transaction) {
    transaction.executed = true;
    transaction.save();
  }
}