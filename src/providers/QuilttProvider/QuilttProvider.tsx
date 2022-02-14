import * as React from 'react'

import { DEFAULT_API_ENDPOINT, DEFAULT_AUTH_ENDPOINT } from '../../constants'
import QuilttAuthProvider from '../QuilttAuthProvider'
import QuilttQueryClientProvider from '../QuilttClientProvider'
import QuilttDeploymentProvider from '../QuilttDeploymentProvider'

import combineProviders from './combineProviders'
import SetDeployment from './SetDeployment'

type QuilttProviderProps = {
  deploymentId: string
  authEndpoint: string
  apiEndpoint: string
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({
  deploymentId,
  authEndpoint = DEFAULT_AUTH_ENDPOINT,
  apiEndpoint = DEFAULT_API_ENDPOINT,
  children,
}) => {
  // Collect all providers into one array
  const providers = React.useMemo(
    () => [QuilttDeploymentProvider, QuilttAuthProvider, QuilttQueryClientProvider],
    []
  )
  const CombinedProvider = React.useMemo(() => combineProviders(...providers), [providers])

  return (
    <CombinedProvider>
      <SetDeployment
        deploymentId={deploymentId}
        authEndpoint={authEndpoint}
        apiEndpoint={apiEndpoint}
      />
      {children}
    </CombinedProvider>
  )
}

export default QuilttProvider
