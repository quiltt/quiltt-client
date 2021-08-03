import * as React from 'react'

import { ApolloProvider } from '@apollo/client'

import useLocalStorage from './useLocalStorage'
import useQuilttClient from './useQuilttClient'
import { QuilttContext } from './useQuilttContext'

type QuilttProviderProps = {}

const QuilttProvider: React.FC<QuilttProviderProps> = ({ children }) => {
  const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
    'QUILTT_TOKEN',
    null
  )
  const quilttClient = useQuilttClient(authorizationToken)

  return (
    <QuilttContext.Provider value={{ authorizationToken, setAuthorizationToken }}>
      <ApolloProvider client={quilttClient}>{children}</ApolloProvider>
    </QuilttContext.Provider>
  )
}

export default QuilttProvider
