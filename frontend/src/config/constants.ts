import gql from 'graphql-tag';

export const EXPIRE_TIME = 1200; // 20min

export const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/deep-quality-dev/multisigvault';

export const TRANSACTION_QUERY = gql`
  query Transactions {
    transactions {
      id
      to
      amount
      unlockTime
      signatureCount
      signers
      executed
    }
  }
`;
