import {
  Button,
  Container,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useToken } from '@usedapp/core';
import dayjs from 'dayjs';
import { utils } from 'ethers';
import React, { useCallback, useMemo, useState } from 'react';

import { EXPIRE_TIME } from '../../config';
import { Transaction } from '../../config/types';
import { useERC20MockContract, useMultiSigVaultContract } from '../../hooks';
import { useRole } from '../../hooks/useRole';

const Add: React.FC = () => {
  const [transaction, setTranaction] = useState<Transaction>({
    to: '',
    amount: 0,
    unlockTime: new Date(),
    signerCount: 0,
    executed: false,
  });
  const [{ executing, errorMessage }, setExecuting] = useState<{
    executing: boolean;
    errorMessage: string | undefined;
  }>({
    executing: false,
    errorMessage: undefined,
  });

  const contract = useMultiSigVaultContract();
  const erc20MockContract = useERC20MockContract();
  const tokenInfo = useToken(erc20MockContract.address);
  const toast = useToast();
  const { hasRole } = useRole();

  const valid = useMemo(
    () =>
      transaction.to.length > 1 &&
      transaction.amount > 0 &&
      transaction.unlockTime.getTime() > new Date().getTime() + EXPIRE_TIME,
    [transaction],
  );

  const handleAdd = useCallback(async () => {
    if (!contract || !tokenInfo) return;

    setExecuting({
      executing: true,
      errorMessage: undefined,
    });
    const amount = utils.parseUnits(
      transaction.amount.toString(),
      tokenInfo.decimals,
    );
    try {
      const tx = await contract.addTransaction(
        transaction.to,
        amount,
        transaction.unlockTime.getTime() / 1000,
      );
      await tx.wait();
      console.log('Successfully added');
      toast({
        title: 'Add transaction',
        description: 'Successfully added transaction',
        position: 'top',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      setExecuting({
        executing: false,
        errorMessage: undefined,
      });
    } catch (error: any) {
      console.log('Failed to add');
      toast({
        title: 'Add transaction',
        description: 'Failed to add transaction',
        position: 'top',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setExecuting({
        executing: false,
        errorMessage: error.message,
      });
    }
  }, [contract, tokenInfo, toast, transaction]);

  return (
    <Container width={'md'}>
      <Stack
        alignItems={'center'}
        direction={'column'}
        justifyContent={'start'}
        paddingTop={3}
        spacing={3}
      >
        <Text>
          {hasRole
            ? 'You are the signer'
            : hasRole === false
            ? 'You are not the signer'
            : ''}
        </Text>
        <Text color={'red'} textAlign={'center'}>
          {errorMessage}
        </Text>
        <Stack
          alignItems={'center'}
          direction={'row'}
          spacing={3}
          width={'full'}
        >
          <Text width={'120px'}>To</Text>
          <Input
            placeholder='To'
            value={transaction.to}
            onChange={(evt) => {
              setTranaction({
                ...transaction,
                to: evt.target.value,
              });
            }}
          />
        </Stack>

        <Stack
          direction={'row'}
          spacing={3}
          alignItems={'center'}
          width={'full'}
        >
          <Text width={'120px'}>Amount</Text>
          <NumberInput
            placeholder='Amount'
            value={transaction.amount}
            onChange={(value) => {
              setTranaction({
                ...transaction,
                amount: value,
              });
            }}
            width={'full'}
          >
            <NumberInputField />
          </NumberInput>
        </Stack>

        <Stack
          direction={'row'}
          spacing={3}
          alignItems={'center'}
          width={'full'}
        >
          <Text width={'120px'}>Unlock time</Text>
          <Input
            placeholder='Unlock time'
            type='datetime-local'
            value={dayjs(transaction.unlockTime).format('YYYY-MM-DDTHH:mm')}
            onChange={(evt) => {
              setTranaction({
                ...transaction,
                unlockTime: new Date(evt.target.value),
              });
            }}
          />
        </Stack>
        <Button
          disabled={executing || !valid}
          isLoading={executing}
          loadingText={'Adding'}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Stack>
    </Container>
  );
};

export default Add;
