import * as React from 'react'

export type QuilttContextType = {
  authorizationToken: string | null
  setAuthorizationToken: (token: string | null) => void
}

export const QuilttContext = React.createContext<QuilttContextType>({
  authorizationToken: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthorizationToken: (_token) => {},
})

const useQuilttContext = () => {
  return React.useContext(QuilttContext)
}

export default useQuilttContext
