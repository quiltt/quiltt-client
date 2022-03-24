import { ApolloClient, gql as gqlTag, NormalizedCacheObject } from '@apollo/client'

import useApolloClient from '../../useApolloClient'

export const gql = gqlTag

const useQuilttQueryClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = useApolloClient()

  return client
}

export default useQuilttQueryClient
