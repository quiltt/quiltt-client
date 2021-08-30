import { ApolloClient, InMemoryCache } from '@apollo/client'

import useQuilttLink from '../useQuilttLink'

const useQuilttClient = (token: string | null) => {
  const quilttLink = useQuilttLink(token)

  return new ApolloClient({
    link: quilttLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}

export default useQuilttClient
