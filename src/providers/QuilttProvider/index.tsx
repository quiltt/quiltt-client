import * as React from 'react'

import QuilttSettingsProvider from 'providers/QuilttSettingsProvider'

import { DEFAULT_API_BASE, DEFAULT_AUTH_BASE } from '../../constants'
import QuilttAuthProvider from '../QuilttAuthProvider'
import QuilttQueryClientProvider from '../QuilttQueryClientProvider'

type QuilttProviderProps = {
  deploymentId: string
  authBase?: string
  apiBase?: string
  apiVersion?: string
  authorizationToken?: string
  children: React.ReactNode
}

const QuilttProvider: React.FC<QuilttProviderProps> = ({
  children = null,
  deploymentId = '',
  authBase = DEFAULT_AUTH_BASE,
  apiBase = DEFAULT_API_BASE,
  apiVersion = undefined,
  authorizationToken = undefined,
}) => (
  <QuilttSettingsProvider
    deploymentId={deploymentId}
    authBase={authBase}
    apiBase={apiBase}
    apiVersion={apiVersion}
  >
    <QuilttAuthProvider authorizationToken={authorizationToken}>
      <QuilttQueryClientProvider>{children}</QuilttQueryClientProvider>
    </QuilttAuthProvider>
  </QuilttSettingsProvider>
)

export default QuilttProvider
