import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';

export const graphQLQuery = async (
  graphQLClient: GraphQLClient,
  query: RequestDocument,
  variables?: Variables,
  path = '',
) => {
  try {
    const response = await graphQLClient.request(query, variables);

    return !path ? response : (response as any)[path];
  } catch (error: any) {
    throw new Error(error);
  }
};
