import { ApolloClient, InMemoryCache } from '@apollo/client'

import useQuilttLink from './apollo/useQuilttLink'

const useApolloClient = () => {
  const quilttLink = useQuilttLink()

  return new ApolloClient({
    link: quilttLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  })
}

export default useApolloClient
