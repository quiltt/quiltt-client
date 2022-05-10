import * as React from 'react'

import { QuilttAuth } from '../../hooks'

type QuilttAuthProviderProps = {
  authorizationToken?: string
  children: React.ReactNode
}

const QuilttAuthProvider: React.FC<QuilttAuthProviderProps> = ({
  authorizationToken = undefined,
  children,
}) => {
  const value = React.useContext(QuilttAuth)
  if (authorizationToken) {
    value.authorizationToken = authorizationToken
  }

  return <QuilttAuth.Provider value={value}>{children}</QuilttAuth.Provider>
}

export default QuilttAuthProvider
