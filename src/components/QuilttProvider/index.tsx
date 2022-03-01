import * as React from 'react'

import { ApolloProvider } from '@apollo/client'

import useLocalStorage from '../../hooks/useLocalStorage'
import useQuilttClient from '../../hooks/useQuilttClient'
import { QuilttContext } from '../../hooks/useQuilttContext'

type QuilttProviderProps = {
  appId: string
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({ appId, children }) => {
  const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
    'QUILTT_TOKEN',
    null
  )

  const quilttClient = useQuilttClient(authorizationToken, 'apollo')

  return (
    <QuilttContext.Provider value={{ appId, authorizationToken, setAuthorizationToken }}>
      <ApolloProvider client={quilttClient}>{children}</ApolloProvider>
    </QuilttContext.Provider>
  )
}

export default QuilttProvider
