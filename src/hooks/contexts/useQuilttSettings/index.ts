import * as React from 'react'

import type { QuilttSettingsContext } from '../../../types'

export const QuilttSettings = React.createContext<QuilttSettingsContext>({
  deploymentId: '',
  authBase: '',
  apiBase: '',
  apiVersion: '',
  setDeploymentId: () => {},
  setAuthBase: () => {},
  setApiBase: () => {},
  setApiVersion: () => {},
} as QuilttSettingsContext)

const useQuilttSettings = () => {
  const settings = React.useContext(QuilttSettings)

  return { ...settings }
}

export default useQuilttSettings
