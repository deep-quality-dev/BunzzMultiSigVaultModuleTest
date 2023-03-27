import { Goerli, Mainnet } from '@usedapp/core';
import { ethers } from 'ethers';

export enum SUPPORTED_CHAINIDS {
  MAINNET = Mainnet.chainId,
  GOERLI = Goerli.chainId,
}

export const getDefaultChainId = () => {
  return Number(process.env.REACT_APP_CHAIN_ID ?? SUPPORTED_CHAINIDS.GOERLI);
};

export const getProvider = (network: SUPPORTED_CHAINIDS) => {
  return network === SUPPORTED_CHAINIDS.MAINNET
    ? new ethers.providers.JsonRpcProvider(
        'https://eth-mainnet.alchemyapi.io/v2/ITA7SY6tOm5bJtXScrBZg_WVfqqR1nU6',
      )
    : // getEthersDefaultProvider('mainnet')
      new ethers.providers.JsonRpcProvider(
        'https://goerli.infura.io/v3/97e75e0bbc6a4419a5dd7fe4a518b917',
      ); // getEthersDefaultProvider('goerli');
};

export const getDefaultProvider = () => {
  return getProvider(getDefaultChainId());
};
