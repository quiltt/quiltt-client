import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import useApolloClient from '../../queryClients/apollo/useApolloClient'

const useQuilttQueryClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = useApolloClient()

  return client
}

export default useQuilttQueryClient
