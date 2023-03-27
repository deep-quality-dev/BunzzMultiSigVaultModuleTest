import { ChakraProvider } from '@chakra-ui/react';
import { DAppProvider } from '@usedapp/core';
import React, { PropsWithChildren } from 'react';

import { getProvider, SUPPORTED_CHAINIDS } from './config';
import { RefreshContextProvider } from './contexts';

const config = {
  readOnlyUrls: Object.values(SUPPORTED_CHAINIDS).reduce(
    (prev, current) => ({
      ...prev,
      [current]: getProvider(current as SUPPORTED_CHAINIDS),
    }),
    {},
  ),
  autoConnect: true,
};

const Providers: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ChakraProvider resetCSS>
      <DAppProvider config={config}>
        <RefreshContextProvider>{children}</RefreshContextProvider>
      </DAppProvider>
    </ChakraProvider>
  );
};

export default Providers;
