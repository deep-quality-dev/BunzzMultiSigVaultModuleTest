import { useEthers } from '@usedapp/core';
import { useEffect } from 'react';

import { CONNECTOR_NAMES, connectorLocalStorageKey, injected } from '../config';

export const useEagerConnect = () => {
  const { activateBrowserWallet } = useEthers();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId) {
      if ((connectorId as CONNECTOR_NAMES) === CONNECTOR_NAMES.Injected) {
        const isEthereumDefined = Reflect.has(window, 'ethereum');

        if (!isEthereumDefined) {
          setTimeout(() => activateBrowserWallet());
          return;
        }

        injected
          .isAuthorized()
          .then(() => setTimeout(() => activateBrowserWallet()))
          .catch((error) => console.error(error));
      }
    }
  }, [activateBrowserWallet]);
};
