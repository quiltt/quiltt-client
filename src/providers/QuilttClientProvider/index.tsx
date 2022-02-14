import * as React from 'react'

import { QuilttQueryClient, useQuilttQueryClient } from '../../hooks'

const QuilttQueryClientProvider: React.FC = ({ children }) => {
  const client = useQuilttQueryClient()
  const value = React.useMemo(() => client, [client])
  return <QuilttQueryClient.Provider value={value}>{children}</QuilttQueryClient.Provider>
}

export default QuilttQueryClientProvider
