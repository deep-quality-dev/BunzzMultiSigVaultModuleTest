import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import { useERC20MockContract } from './useContract';
import { useRefresh } from './useRefresh';

export const useBalanceOf = (address: string | undefined) => {
  const contract = useERC20MockContract();
  const { fastRefresh } = useRefresh();
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from('0'));

  useEffect(() => {
    const fetch = async (address: string) => {
      const result = await contract.balanceOf(address);
      setBalance(result);
    };
    if (address) {
      void fetch(address);
    }
  }, [contract, fastRefresh, address]);

  return balance;
};
