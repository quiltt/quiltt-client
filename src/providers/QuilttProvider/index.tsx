import * as React from 'react'

import QuilttAuthProvider from '../QuilttAuthProvider'
import QuilttQueryClientProvider from '../QuilttQueryClientProvider'
import QuilttSettingsProvider from '../QuilttSettingsProvider'

import Compose from './Compose'

type QuilttProviderProps = {
  deploymentId: string
  authEndpoint?: string
  apiEndpoint?: string
  apiVersion?: string
  websocketEndpoint?: string
  errorLogger?: string
  authorizationToken?: string
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({ children, ...otherProps }) => {
  // Collect all providers into one array
  const providers = React.useMemo(
    () => [QuilttSettingsProvider, QuilttAuthProvider, QuilttQueryClientProvider],
    []
  )

  return (
    <Compose {...otherProps} components={providers}>
      {children}
    </Compose>
  )
}

export default QuilttProvider
