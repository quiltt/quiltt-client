import * as React from 'react'

import type { QueryClient, QuilttQueryClientContext } from '../../../types'
import { ClientOptions } from '../../../types'
import useApolloClient from '../../queryClients/apollo/useApolloClient'

export const QuilttQueryClient = React.createContext<QuilttQueryClientContext>(
  {} as QuilttQueryClientContext
)

const useQuilttQueryClient = (clientName?: ClientOptions) => {
  const apolloClient = useApolloClient()
  const urqlClient = useApolloClient()

  const ApolloClient = React.useMemo(
    () =>
      ({
        name: ClientOptions.Apollo,
        client: apolloClient,
      } as QueryClient),
    [apolloClient]
  )

  const UrqlClient = React.useMemo(
    () =>
      ({
        name: ClientOptions.Apollo,
        client: urqlClient,
      } as QueryClient),
    [urqlClient]
  )

  const [queryClient, setQueryClient] = React.useState<QueryClient>(ApolloClient)

  React.useEffect(() => {
    switch (clientName) {
      case ClientOptions.Apollo:
        setQueryClient(ApolloClient)
        break
      case ClientOptions.Urql:
        setQueryClient(UrqlClient)
        break
      default:
        setQueryClient(ApolloClient)
        break
    }
  }, [ApolloClient, UrqlClient, clientName])

  return queryClient
}

export default useQuilttQueryClient
