import { Goerli, Mainnet } from '@usedapp/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { getDefaultChainId, SUPPORTED_CHAINIDS } from './providers';

export const connectorLocalStorageKey = 'connector';

export const injected = new InjectedConnector({
  supportedChainIds: [Mainnet.chainId, Goerli.chainId],
});

export const walletConnect = new WalletConnectConnector({
  rpc: {
    [SUPPORTED_CHAINIDS.MAINNET]: process.env.REACT_APP_RPC_URL_1 as string,
    [SUPPORTED_CHAINIDS.GOERLI]: process.env.REACT_APP_RPC_URL_5 as string,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  chainId: getDefaultChainId(),
  infuraId: '8a73bbe5d3264a4a92d9b1eab885ae3a',
  supportedChainIds: [SUPPORTED_CHAINIDS.MAINNET, SUPPORTED_CHAINIDS.GOERLI],
});

export enum CONNECTOR_NAMES {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

export const CONNECTORS_BY_NAME: {
  [key in CONNECTOR_NAMES]: AbstractConnector;
} = {
  [CONNECTOR_NAMES.Injected]: injected,
  [CONNECTOR_NAMES.WalletConnect]: walletConnect,
};
