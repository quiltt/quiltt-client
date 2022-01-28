import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

import useQuilttLink from '../apollo/useQuilttLink'

const useQuilttClient = (token: string | null): ApolloClient<NormalizedCacheObject> => {
  const quilttLink = useQuilttLink(token)

  return new ApolloClient({
    link: quilttLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}

export default useQuilttClient
