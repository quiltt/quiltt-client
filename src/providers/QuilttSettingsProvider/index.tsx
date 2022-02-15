import * as React from 'react'

import {
  DEFAULT_API_ENDPOINT,
  DEFAULT_API_VERSION,
  DEFAULT_AUTH_ENDPOINT,
  DEFAULT_WS_ENDPOINT,
} from '../../constants'
import { QuilttSettings, useQuilttSettings } from '../../hooks'

type QuilttSettingsProviderProps = {
  deploymentId: string
  authEndpoint?: string
  apiEndpoint?: string
  apiVersion?: string
  websocketEndpoint?: string
  errorLogger?: (error: any) => void
}

const QuilttSettingsProvider: React.FC<QuilttSettingsProviderProps> = ({
  deploymentId,
  authEndpoint = DEFAULT_AUTH_ENDPOINT,
  apiEndpoint = DEFAULT_API_ENDPOINT,
  apiVersion = DEFAULT_API_VERSION,
  websocketEndpoint = DEFAULT_WS_ENDPOINT,
  // eslint-disable-next-line no-console
  errorLogger = console.log,
  children,
}) => {
  const { setQuilttSettings } = useQuilttSettings()
  const value = React.useMemo(
    () => ({
      deploymentId,
      authEndpoint,
      apiEndpoint,
      apiVersion,
      websocketEndpoint,
      errorLogger,
      setQuilttSettings,
    }),
    [
      deploymentId,
      authEndpoint,
      apiEndpoint,
      apiVersion,
      websocketEndpoint,
      errorLogger,
      setQuilttSettings,
    ]
  )

  return <QuilttSettings.Provider value={value}>{children}</QuilttSettings.Provider>
}

export default QuilttSettingsProvider
