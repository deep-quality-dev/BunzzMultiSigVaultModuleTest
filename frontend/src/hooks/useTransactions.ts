import { GraphQLClient } from 'graphql-request';
import { useEffect, useMemo, useState } from 'react';

import { SUBGRAPH_URL, TRANSACTION_QUERY } from '../config';
import { Transaction } from '../config/types';
import { graphQLQuery } from '../utils/graphql';
import { useRefresh } from './useRefresh';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[] | undefined>(
    undefined,
  );
  const { fastRefresh } = useRefresh();

  const graphQLClient = useMemo(() => new GraphQLClient(SUBGRAPH_URL), []);

  useEffect(() => {
    let stale = false;

    void graphQLQuery(
      graphQLClient,
      TRANSACTION_QUERY,
      undefined,
      'transactions',
    ).then((value: any) => {
      if (!stale) {
        setTransactions(
          value.map(
            (item: any): Transaction => ({
              transactionId: item.id,
              to: item.to,
              amount: item.amount,
              unlockTime: new Date(item.unlockTime * 1000),
              signerCount: item.signatureCount,
              signers: item.signers,
              executed: item.executed,
            }),
          ),
        );
      }
    });

    return () => {
      stale = true;
    };
  }, [graphQLClient, fastRefresh]);

  return transactions;
};
