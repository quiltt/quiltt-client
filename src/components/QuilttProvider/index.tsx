import * as React from 'react'

import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { Client as UrqlClient, Provider as UrqlProvider } from 'urql'

import useLocalStorage from '../../hooks/useLocalStorage'
import type { QueryClients } from '../../hooks/useQuilttClient'
import useQuilttClient from '../../hooks/useQuilttClient'
import { QuilttContext } from '../../hooks/useQuilttContext'

type QuilttProviderProps = {
  deploymentId: string
  client?: QueryClients
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({
  deploymentId,
  client = 'apollo',
  children,
}) => {
  const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
    'QUILTT_SESSION',
    null
  )
  const [queryClient, setQueryClient] = useLocalStorage<QueryClients>('QUILTT_CLIENT', client)
  const quilttClient = useQuilttClient(authorizationToken, queryClient)

  const clients = {
    apollo: (
      <ApolloProvider client={quilttClient as ApolloClient<NormalizedCacheObject>}>
        {children}
      </ApolloProvider>
    ),
    urql: <UrqlProvider value={quilttClient as UrqlClient}>{children}</UrqlProvider>,
  }

  const value = React.useMemo(
    () => ({
      deploymentId,
      authorizationToken,
      setAuthorizationToken,
      queryClient,
      setQueryClient,
    }),
    [authorizationToken, deploymentId, queryClient, setAuthorizationToken, setQueryClient]
  )

  return <QuilttContext.Provider value={value}>{clients[client]}</QuilttContext.Provider>
}

export default QuilttProvider
