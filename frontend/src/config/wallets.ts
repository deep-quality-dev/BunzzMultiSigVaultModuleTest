import MetaMask from '../assets/icons/metamask.svg';
import WalletConnect from '../assets/icons/walletconnect.svg';
import { CONNECTOR_NAMES } from './connectors';

interface Wallet {
  icon: string;
  title: string;
  description?: string;
  connector: CONNECTOR_NAMES;
}

export const SUPPORTED_WALLETS: Wallet[] = [
  {
    icon: MetaMask,
    title: 'MetaMask',
    description: 'Easy-to-use browser extension',
    connector: CONNECTOR_NAMES.Injected,
  },
  {
    icon: WalletConnect,
    title: 'WalletConnect',
    description: 'Easy-to-use extension',
    connector: CONNECTOR_NAMES.WalletConnect,
  },
];
