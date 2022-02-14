import * as React from 'react'

import { QuilttAuth, useQuilttAuth } from '../../hooks'
import type { QuilttAuthContext } from '../../types'

const QuilttAuthProvider: React.FC = ({ children }) => {
  const auth = useQuilttAuth()
  const value = React.useMemo(() => auth, [auth]) as QuilttAuthContext
  return <QuilttAuth.Provider value={value}>{children}</QuilttAuth.Provider>
}

export default QuilttAuthProvider
