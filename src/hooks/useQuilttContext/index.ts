import * as React from 'react'

import type { QueryClients } from '../useQuilttClient'

export type QuilttContextType = {
  appId: string
  authorizationToken: string | null
  setAuthorizationToken: (token: string | null) => void
  queryClient: QueryClients
  setQueryClient: (client: QueryClients) => void
}

export const QuilttContext = React.createContext<QuilttContextType>({
  appId: '',
  authorizationToken: null,
  setAuthorizationToken: () => {},
  queryClient: 'apollo',
  setQueryClient: () => {},
})

const useQuilttContext = () => {
  return React.useContext(QuilttContext)
}

export default useQuilttContext
