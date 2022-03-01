import * as React from 'react'

export type QuilttContextType = {
  appId: string
  authorizationToken: string | null
  setAuthorizationToken: (token: string | null) => void
}

export const QuilttContext = React.createContext<QuilttContextType>({
  appId: '',
  authorizationToken: null,
  setAuthorizationToken: () => {},
})

const useQuilttContext = () => {
  return React.useContext(QuilttContext)
}

export default useQuilttContext
