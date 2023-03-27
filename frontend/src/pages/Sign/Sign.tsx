import {
  Button,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { shortenAddress, useEthers, useToken } from '@usedapp/core';
import { BigNumber } from 'ethers';
import React, { useCallback, useState } from 'react';

import { Transaction } from '../../config/types';
import { useERC20MockContract, useMultiSigVaultContract } from '../../hooks';
import { useRole } from '../../hooks/useRole';
import { useTransactions } from '../../hooks/useTransactions';
import { getBalanceNumber } from '../../utils/number';

enum ActionType {
  NO_ACTION,
  SIGNING,
  EXECUTING,
}

const Add: React.FC = () => {
  const [{ executing, errorMessage, executingTransaction }, setExecuting] =
    useState<{
      executing: ActionType;
      errorMessage: string | undefined;
      executingTransaction: Transaction | undefined;
    }>({
      executing: ActionType.NO_ACTION,
      errorMessage: undefined,
      executingTransaction: undefined,
    });

  const { account } = useEthers();
  const multisigVaultContract = useMultiSigVaultContract();
  const erc20MockContract = useERC20MockContract();
  const tokenInfo = useToken(erc20MockContract.address);
  const transactions = useTransactions();
  const toast = useToast();
  const { hasRole, signerLimit } = useRole();

  const handleExecute = useCallback(
    async (transaction: Transaction) => {
      if (!multisigVaultContract) return;

      setExecuting({
        executing: ActionType.EXECUTING,
        errorMessage: undefined,
        executingTransaction: transaction,
      });
      try {
        const tx = await multisigVaultContract.executeTransaction(
          transaction.transactionId,
        );
        await tx.wait();
        console.log('Successfully executed');
        toast({
          title: 'Execute transaction',
          description: 'Successfully executed transaction',
          position: 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setExecuting({
          executing: ActionType.NO_ACTION,
          errorMessage: undefined,
          executingTransaction: undefined,
        });
      } catch (error: any) {
        console.error('Failed to execute', error);
        const errorMsg =
          error.error.data.originalError.message ?? error.message;
        toast({
          title: 'Execute transaction',
          description: errorMsg,
          position: 'top',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        setExecuting({
          executing: ActionType.NO_ACTION,
          errorMessage: errorMsg,
          executingTransaction: undefined,
        });
      }
    },
    [multisigVaultContract, toast],
  );

  const handleSign = useCallback(
    async (transaction: Transaction) => {
      if (!multisigVaultContract) return;

      setExecuting({
        executing: ActionType.SIGNING,
        errorMessage: undefined,
        executingTransaction: transaction,
      });
      try {
        const tx = await multisigVaultContract.signTransaction(
          transaction.transactionId,
        );
        await tx.wait();
        console.log('Successfully signed');
        toast({
          title: 'Sign transaction',
          description: 'Successfully signed transaction',
          position: 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setExecuting({
          executing: ActionType.NO_ACTION,
          errorMessage: undefined,
          executingTransaction: undefined,
        });
      } catch (error: any) {
        console.error('Failed to sign', error);
        const errorMsg =
          error.error.data.originalError.message ?? error.message;
        toast({
          title: 'Sign transaction',
          description: errorMsg,
          position: 'top',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
        setExecuting({
          executing: ActionType.NO_ACTION,
          errorMessage: errorMsg,
          executingTransaction: undefined,
        });
      }
    },
    [multisigVaultContract, toast],
  );

  return (
    <Stack direction={'column'} spacing={3}>
      <Stack direction={'row'} justifyContent={'center'}>
        <Text>
          {hasRole
            ? 'You are the signer'
            : hasRole === false
            ? 'You are not the signer'
            : ''}
        </Text>
      </Stack>
      <Stack direction={'row'} justifyContent={'center'}>
        <Text color={'red'}>{errorMessage}</Text>{' '}
      </Stack>
      <TableContainer
        border={'1px solid'}
        borderColor={'gray.300'}
        borderRadius={6}
      >
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>To</Th>
              <Th>Amount</Th>
              <Th>Unlock Time</Th>
              <Th>Signer Count</Th>
              <Th>Executed</Th>
              <Th>Sign</Th>
              <Th>Execute</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!transactions
              ? Array.from({ length: 3 }, (_, i) => i).map((item) => (
                  <Tr key={item}>
                    {Array.from({ length: 5 }, (_, i) => i).map((item) => (
                      <Td key={item}>
                        <Skeleton padding={3} width={'100%'} />
                      </Td>
                    ))}
                  </Tr>
                ))
              : transactions.map((transaction, index) => {
                  const isExecutable =
                    signerLimit && transaction.signerCount >= signerLimit;
                  const isMine =
                    transaction.signers && account
                      ? transaction.signers.indexOf(account.toLowerCase()) >= 0
                      : false;

                  return (
                    <Tr key={`${index}-${transaction.transactionId}`}>
                      <Td>{transaction.transactionId}</Td>
                      <Td>{shortenAddress(transaction.to)}</Td>
                      <Td>
                        {getBalanceNumber(
                          BigNumber.from(transaction.amount),
                          tokenInfo?.decimals,
                        )}
                      </Td>
                      <Td>{transaction.unlockTime.toLocaleString()}</Td>
                      <Td>{transaction.signerCount}</Td>
                      <Td>{transaction.executed ? 'Executed' : ''}</Td>
                      <Td>
                        <Button
                          fontSize={'sm'}
                          fontWeight={600}
                          width={'100%'}
                          onClick={() => handleSign(transaction)}
                          isLoading={
                            executing === ActionType.SIGNING &&
                            executingTransaction?.transactionId ===
                              transaction.transactionId
                          }
                          loadingText={'Signing'}
                          disabled={
                            !account ||
                            executing !== ActionType.NO_ACTION ||
                            isMine
                          }
                        >
                          Sign
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          fontSize={'sm'}
                          fontWeight={600}
                          width={'100%'}
                          onClick={() => handleExecute(transaction)}
                          isLoading={
                            executing === ActionType.EXECUTING &&
                            executingTransaction?.transactionId ===
                              transaction.transactionId
                          }
                          loadingText={'Executing'}
                          disabled={
                            !account ||
                            executing !== ActionType.NO_ACTION ||
                            transaction.executed ||
                            !isExecutable
                          }
                        >
                          Execute
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Add;
