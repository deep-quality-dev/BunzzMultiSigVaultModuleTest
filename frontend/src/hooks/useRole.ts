import { useEthers } from '@usedapp/core';
import { useEffect, useState } from 'react';

import { useMultiSigVaultContract } from './useContract';

export const useRole = () => {
  const [hasRole, setHasRole] = useState<boolean | undefined>(undefined);
  const [signerLimit, setSignerLimit] = useState<number | undefined>(undefined);

  const { account } = useEthers();
  const contract = useMultiSigVaultContract();

  useEffect(() => {
    const fetch = async () => {
      const SIGNER_ROLE = await contract.SIGNER();

      const has = await contract.hasRole(SIGNER_ROLE, account);
      setHasRole(has);

      const limit = await contract.signerLimit();
      setSignerLimit(limit);
    };

    if (account) {
      void fetch();
    }
  }, [contract, account]);

  return { hasRole, signerLimit };
};
