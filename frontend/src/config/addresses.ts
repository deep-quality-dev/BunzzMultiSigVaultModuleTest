import { SUPPORTED_CHAINIDS } from './providers';

interface AddressMap {
  MultiSigVault: string;
  ERC20Mock: string;
}

export const ADDRESS_MAP: { [network in SUPPORTED_CHAINIDS]: AddressMap } = {
  [SUPPORTED_CHAINIDS.MAINNET]: {
    MultiSigVault: '',
    ERC20Mock: '',
  },
  [SUPPORTED_CHAINIDS.GOERLI]: {
    MultiSigVault: '0xcB74f0fEeef569E70C0E422eEF8A3bf6c385aA21',
    ERC20Mock: '0x236Be86dB18863C494DeB7e5DD8A3Ff37fc87948',
  },
};
