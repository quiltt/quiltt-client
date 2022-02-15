import * as React from 'react'

import {
  DEFAULT_API_ENDPOINT,
  DEFAULT_API_VERSION,
  DEFAULT_AUTH_ENDPOINT,
  DEFAULT_WS_ENDPOINT,
} from '../../constants'
import { QuilttDeployment, useQuilttDeployment } from '../../hooks'

type QuilttDeploymentProviderProps = {
  deploymentId: string
  authEndpoint: string
  apiEndpoint: string
  apiVersion: string
  websocketEndpoint: string
  errorLogger: (error: any) => void
}

const QuilttDeploymentProvider: React.FC<QuilttDeploymentProviderProps> = ({
  deploymentId,
  authEndpoint = DEFAULT_AUTH_ENDPOINT,
  apiEndpoint = DEFAULT_API_ENDPOINT,
  apiVersion = DEFAULT_API_VERSION,
  websocketEndpoint = DEFAULT_WS_ENDPOINT,
  // eslint-disable-next-line no-console
  errorLogger = console.log,
  children,
}) => {
  const { setDeployment } = useQuilttDeployment()
  const value = React.useMemo(
    () => ({
      deploymentId,
      authEndpoint,
      apiEndpoint,
      apiVersion,
      websocketEndpoint,
      errorLogger,
      setDeployment,
    }),
    [
      deploymentId,
      authEndpoint,
      apiEndpoint,
      apiVersion,
      websocketEndpoint,
      errorLogger,
      setDeployment,
    ]
  )

  return <QuilttDeployment.Provider value={value}>{children}</QuilttDeployment.Provider>
}

export default QuilttDeploymentProvider
