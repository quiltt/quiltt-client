import * as React from 'react'

export type QuilttContextType = {
  deploymentId: string
  authorizationToken: string | null
  setAuthorizationToken: (token: string | null) => void
}

export const QuilttContext = React.createContext<QuilttContextType>({
  deploymentId: '',
  authorizationToken: null,
  setAuthorizationToken: () => {},
})

const useQuilttContext = () => React.useContext(QuilttContext)

export default useQuilttContext
