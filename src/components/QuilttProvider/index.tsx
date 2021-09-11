import * as React from 'react'

import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { Client, Provider } from 'urql'

import useLocalStorage from '../../hooks/useLocalStorage'
import useQuilttClient from '../../hooks/useQuilttClient'
import { QuilttContext } from '../../hooks/useQuilttContext'

type QueryClients = 'apollo' | 'urql'

type QuilttProviderProps = {
  appId: string
  client?: QueryClients
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({ appId, client = 'apollo', children }) => {
  const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
    'QUILTT_TOKEN',
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
    urql: <Provider value={quilttClient as Client}>{children}</Provider>,
  }

  return (
    <QuilttContext.Provider
      value={{ appId, authorizationToken, setAuthorizationToken, queryClient, setQueryClient }}
    >
      {clients[client]}
    </QuilttContext.Provider>
  )
}

export default QuilttProvider
