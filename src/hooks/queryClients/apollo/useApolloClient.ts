import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

import useQuilttLink from './useQuilttLink'

const useApolloClient = (token: string): ApolloClient<NormalizedCacheObject> => {
  const quilttLink = useQuilttLink(token)

  return new ApolloClient({
    link: quilttLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}

export default useApolloClient
