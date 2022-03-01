import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

import useQuilttLink from '../apollo/useQuilttLink'

export type QueryClients = 'apollo'

const useQuilttClient = (
  token: string | null,
  client: QueryClients
): ApolloClient<NormalizedCacheObject> => {
  const quilttLink = useQuilttLink(token)

  switch (client) {
    case 'apollo':
      return new ApolloClient({
        link: quilttLink,
        cache: new InMemoryCache(),
        connectToDevTools: true,
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
