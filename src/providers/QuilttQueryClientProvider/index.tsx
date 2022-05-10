import * as React from 'react'

import { ApolloProvider } from '@apollo/client'

import { useQuilttQueryClient } from '../../hooks'

type QuilttQueryClientProviderProps = {
  children: React.ReactNode
}

const QuilttQueryClientProvider: React.FC<QuilttQueryClientProviderProps> = ({ children }) => {
  const client = useQuilttQueryClient()
  const value = React.useMemo(() => client, [client])

  return <ApolloProvider client={value}>{children}</ApolloProvider>
}

export default QuilttQueryClientProvider
