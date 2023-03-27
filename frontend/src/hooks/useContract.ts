import { useEthers } from '@usedapp/core';
import { Contract, getDefaultProvider } from 'ethers';
import { useMemo } from 'react';

import { ADDRESS_MAP, getDefaultChainId } from '../config';
import ERC20MockAbi from '../config/abi/ERC20Mock.json';
import MultiSigVaultAbi from '../config/abi/MultiSigVault.json';

export const useERC20MockContract = (): Contract => {
  const { library, chainId } = useEthers();
  return useMemo(() => {
    const network = chainId ?? getDefaultChainId();
    const providerOrSigner = library?.getSigner() ?? getDefaultProvider();

    const contract = new Contract(
      ADDRESS_MAP[network].ERC20Mock,
      ERC20MockAbi,
      providerOrSigner,
    );

    return contract;
  }, [chainId, library]);
};

export const useMultiSigVaultContract = (): Contract => {
  const { library, chainId } = useEthers();
  return useMemo(() => {
    const network = chainId ?? getDefaultChainId();
    const providerOrSigner = library?.getSigner() ?? getDefaultProvider();

    const contract = new Contract(
      ADDRESS_MAP[network].MultiSigVault,
      MultiSigVaultAbi,
      providerOrSigner,
    );

    return contract;
  }, [chainId, library]);
};
