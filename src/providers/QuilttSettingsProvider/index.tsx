import * as React from 'react'

import { QuilttSettings } from '../../hooks'

type QuilttSettingsProviderProps = {
  deploymentId: string
  authBase: string
  apiBase: string
  apiVersion?: string
}

const QuilttSettingsProvider: React.FC<QuilttSettingsProviderProps> = ({
  deploymentId,
  authBase,
  apiBase,
  apiVersion,
  children,
}) => {
  const [_deploymentId, setDeploymentId] = React.useState<string | null>(deploymentId)
  const [_authBase, setAuthBase] = React.useState(authBase)
  const [_apiBase, setApiBase] = React.useState(apiBase)
  const [_apiVersion, setApiVersion] = React.useState<string | undefined>(apiVersion)

  const value = React.useMemo(
    () => ({
      deploymentId: _deploymentId,
      authBase: _authBase,
      apiBase: _apiBase,
      apiVersion: _apiVersion,
      setDeploymentId,
      setAuthBase,
      setApiBase,
      setApiVersion,
    }),
    [_deploymentId, _authBase, _apiBase, _apiVersion]
  )

  return <QuilttSettings.Provider value={value}>{children}</QuilttSettings.Provider>
}

export default QuilttSettingsProvider
