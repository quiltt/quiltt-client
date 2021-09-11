import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { Client, createClient } from 'urql'

import useQuilttLink, { graphqlEndpoint } from '../apollo/useQuilttLink'

export type QueryClients = 'apollo' | 'urql'

const useQuilttClient = (
  token: string | null,
  client: QueryClients
): ApolloClient<NormalizedCacheObject> | Client | null => {
  const quilttLink = useQuilttLink(token)

  switch (client) {
    case 'apollo':
      return new ApolloClient({
        link: quilttLink,
        cache: new InMemoryCache(),
        connectToDevTools: true,
      })
      break
    case 'urql':
      return createClient({
        url: graphqlEndpoint.toString(),
        fetchOptions: () => {
          return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
          }
        },
      })
      break
    default:
      return null
      break
  }
}

export default useQuilttClient
