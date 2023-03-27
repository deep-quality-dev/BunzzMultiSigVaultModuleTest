# WRITE

## setSignerLimit

Sets the signer limit of the vault. The caller must be the owner of the contract.

| Name          | Type    | Description          | Example | Default |
| ------------- | ------- | -------------------- | ------- | ------- |
| \_signerLimit | uint256 | the new signer limit |         | N/A     |

## addTransaction

Adds a new transaction to the vault. The caller must have the SIGNER role. If the provided parameters are invalid, the function reverts.

| Name         | Type    | Description                                        | Example | Default |
| ------------ | ------- | -------------------------------------------------- | ------- | ------- |
| \_to         | address | the address to which the transaction will be sent  |         | N/A     |
| \_amount     | uint256 | the amount of tokens to be sent in the transaction |         | N/A     |
| \_unlockTime | uint256 | the time at which the transaction can be executed  |         | N/A     |

## signTransaction

Signs a transaction. The caller must have the SIGNER role.

| Name            | Type    | Description                            | Example | Default |
| --------------- | ------- | -------------------------------------- | ------- | ------- |
| \_transactionId | uint256 | the ID of the transaction to be signed |         | N/A     |

## rejectTransaction

Rejects a transaction. The caller must have the SIGNER role.

| Name            | Type    | Description                            | Example | Default |
| --------------- | ------- | -------------------------------------- | ------- | ------- |
| \_transactionId | uint256 | the ID of the transaction to be signed |         | N/A     |

## executeTransaction

Executes a transaction. If the transaction has not received enough signatures, the function reverts. If the transaction cannot be executed yet, the function reverts. Otherwise, the function transfers the tokens to the recipient and emits a `TransactionCompleted` event.

| Name            | Type    | Description                              | Example | Default |
| --------------- | ------- | ---------------------------------------- | ------- | ------- |
| \_transactionId | uint256 | the ID of the transaction to be executed |         | N/A     |

## emergencyWithdraw

Emergency withdraws all balance to the owner

# READ

## balance

Gets the balance of token in the contract.

## getConfirmationCount

Gets number of confirmations of a transaction.

## getTransactionCount

Gets number of transactions.

| Name      | Type | Description                          | Example | Default |
| --------- | ---- | ------------------------------------ | ------- | ------- |
| \pending  | bool | flag to filter pending transactions  |         | N/A     |
| \executed | bool | flag to filter executed transactions |         | N/A     |

## getConfirmations

Gets array with signer addresses, which confirmed transaction.

| Name            | Type    | Description    | Example | Default |
| --------------- | ------- | -------------- | ------- | ------- |
| \_transactionId | uint256 | transaction id |         | N/A     |
