import * as React from 'react'

import { ApolloProvider } from '@apollo/client'

import useLocalStorage from '../../hooks/useLocalStorage'
import useQuilttClient from '../../hooks/useQuilttClient'
import { QuilttContext } from '../../hooks/useQuilttContext'

type QuilttProviderProps = {
  deploymentId: string
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({ deploymentId, children }) => {
  const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
    'QUILTT_SESSION',
    null
  )
  const QuilttClient = useQuilttClient(authorizationToken)

  const value = React.useMemo(
    () => ({
      deploymentId,
      authorizationToken,
      setAuthorizationToken,
    }),
    [authorizationToken, deploymentId, setAuthorizationToken]
  )

  return (
    <QuilttContext.Provider value={value}>
      <ApolloProvider client={QuilttClient}>{children}</ApolloProvider>{' '}
    </QuilttContext.Provider>
  )
}

export default QuilttProvider
