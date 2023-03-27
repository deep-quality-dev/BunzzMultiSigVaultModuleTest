## Preparation before deployment

1. Develop your own token contract which will be used in MultiSigVault.

## Get started(Operation)

1. Deploy your own ERC20 token contract.
2. Deploy MultiSigVault contract and connect ERC20 token contract to the vault contract.
3. If you are the signer, you can add transaction by calling `addTransaction` function.
4. If you are the signer, you can sign transactions which was added already and was not executed yet by calling `signTransaction` function.
5. If you are the signer, you can execute transactions which was signed by over `signLimit` number of signers by calling `executeTransaction` function.
