import * as React from 'react'

import { QuilttAuth, useQuilttAuth } from '../../hooks'

type QuilttAuthProviderProps = {
  authorizationToken?: string
}

const QuilttAuthProvider: React.FC<QuilttAuthProviderProps> = ({
  authorizationToken = null,
  children,
}) => {
  const auth = useQuilttAuth()
  const value = React.useMemo(() => auth, [auth])

  React.useEffect(() => {
    const { setAuthorizationToken } = auth
    if (authorizationToken) {
      setAuthorizationToken(authorizationToken)
    }
  }, [auth, authorizationToken])

  return <QuilttAuth.Provider value={value}>{children}</QuilttAuth.Provider>
}

export default QuilttAuthProvider
