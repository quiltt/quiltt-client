import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { Client, createClient } from 'urql'

import useQuilttLink, { graphqlEndpoint } from '../apollo/useQuilttLink'

export type QueryClients = 'apollo' | 'urql'

const useQuilttClient = (
  token: string | null,
  client: QueryClients
): ApolloClient<NormalizedCacheObject> | Client => {
  const quilttLink = useQuilttLink(token)

  switch (client) {
    case 'apollo':
      return new ApolloClient({
        link: quilttLink,
        cache: new InMemoryCache(),
        connectToDevTools: true,
      })
    case 'urql':
      return createClient({
        url: graphqlEndpoint.toString(),
        fetchOptions: () => {
          return {
            headers: { authorization: token ? `Bearer ${token}` : '' },
          }
        },
      })
    default:
      return new ApolloClient({
        link: quilttLink,
        cache: new InMemoryCache(),
        connectToDevTools: true,
      })
      break
  }
}

export default useQuilttClient
