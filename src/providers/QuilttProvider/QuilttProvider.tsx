import * as React from 'react'

import QuilttAuthProvider from '../QuilttAuthProvider'
import QuilttDeploymentProvider from '../QuilttDeploymentProvider'
import QuilttQueryClientProvider from '../QuilttQueryClientProvider'

import Compose from './Compose'

type QuilttProviderProps = {
  deploymentId: string
  authEndpoint: string
  apiEndpoint: string
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({ children, ...otherProps }) => {
  // Collect all providers into one array
  const providers = React.useMemo(
    () => [QuilttDeploymentProvider, QuilttAuthProvider, QuilttQueryClientProvider],
    []
  )

  return (
    <Compose {...otherProps} components={providers}>
      {children}
    </Compose>
  )
}

export default QuilttProvider
