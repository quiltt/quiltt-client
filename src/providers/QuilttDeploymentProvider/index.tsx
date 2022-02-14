import * as React from 'react'

import { DEFAULT_API_ENDPOINT, DEFAULT_AUTH_ENDPOINT } from '../../constants'
import { QuilttDeployment } from '../../hooks'
import type { QuilttDeploymentContext } from '../../types'

const QuilttDeploymentProvider: React.FC<QuilttDeploymentContext> = ({
  authEndpoint = DEFAULT_AUTH_ENDPOINT,
  apiEndpoint = DEFAULT_API_ENDPOINT,
  deploymentId,
  children,
}) => {
  const value = React.useMemo(
    () => ({ deploymentId, authEndpoint, apiEndpoint }),
    [deploymentId, authEndpoint, apiEndpoint]
  )

  return <QuilttDeployment.Provider value={value}>{children}</QuilttDeployment.Provider>
}

export default QuilttDeploymentProvider
