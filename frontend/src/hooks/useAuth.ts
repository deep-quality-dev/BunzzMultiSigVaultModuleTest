import { useEthers } from '@usedapp/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { useCallback } from 'react';

import {
  CONNECTOR_NAMES,
  connectorLocalStorageKey,
  CONNECTORS_BY_NAME,
} from '../config';

export const useAuth = () => {
  const { activate, deactivate } = useEthers();

  const login = useCallback(
    async (connectorId: CONNECTOR_NAMES) => {
      window.localStorage.setItem(connectorLocalStorageKey, connectorId);

      if (connectorId === CONNECTOR_NAMES.WalletConnect) {
        const connector = CONNECTORS_BY_NAME[
          connectorId
        ] as WalletConnectConnector;
        connector.walletConnectProvider = undefined;
      }

      activate(CONNECTORS_BY_NAME[connectorId])
        .then(async () => {
          console.log(`Connected: ${connectorId}`);
        })
        .catch((error: any) => {
          console.log(`Failed to connect wallet: ${error.message}`);
          window.localStorage.removeItem(connectorLocalStorageKey);
        });
    },
    [activate],
  );

  const logout = useCallback(() => {
    deactivate();
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate]);

  return { login, logout };
};
