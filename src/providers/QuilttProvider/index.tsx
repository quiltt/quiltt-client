import * as React from 'react'

import { DEFAULT_API_BASE, DEFAULT_AUTH_BASE } from '../../constants'
import { QuilttSettings } from '../../hooks'
import QuilttAuthProvider from '../QuilttAuthProvider'
import QuilttQueryClientProvider from '../QuilttQueryClientProvider'

type QuilttProviderProps = {
  deploymentId: string
  authBase?: string
  apiBase?: string
  apiVersion?: string
  authorizationToken?: string
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({
  children = null,
  deploymentId = '',
  authBase = DEFAULT_AUTH_BASE,
  apiBase = DEFAULT_API_BASE,
  apiVersion = undefined,
  authorizationToken = undefined,
}) => {
  const [_deploymentId, setDeploymentId] = React.useState<string | null>(deploymentId)
  const [_authBase, setAuthBase] = React.useState<string>(authBase)
  const [_apiBase, setApiBase] = React.useState<string>(apiBase)
  const [_apiVersion, setApiVersion] = React.useState<string | undefined>(apiVersion)

  const settingsValue = React.useMemo(
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
    [_apiBase, _apiVersion, _authBase, _deploymentId]
  )

  return (
    <QuilttSettings.Provider value={settingsValue}>
      <QuilttAuthProvider authorizationToken={authorizationToken}>
        <QuilttQueryClientProvider>{children}</QuilttQueryClientProvider>
      </QuilttAuthProvider>
    </QuilttSettings.Provider>
  )
}

export default QuilttProvider
