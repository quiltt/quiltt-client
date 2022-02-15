import * as React from 'react'

import { QuilttQueryClient, useQuilttQueryClient } from '../../hooks'
import { ClientOptions } from '../../types'

const QuilttQueryClientProvider: React.FC = ({ children }) => {
  const client = useQuilttQueryClient(ClientOptions.Apollo)
  const value = React.useMemo(() => client, [client])
  return <QuilttQueryClient.Provider value={value}>{children}</QuilttQueryClient.Provider>
}

export default QuilttQueryClientProvider
