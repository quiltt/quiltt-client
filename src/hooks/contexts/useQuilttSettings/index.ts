import * as React from 'react'

import {
  DEFAULT_API_ENDPOINT,
  DEFAULT_API_VERSION,
  DEFAULT_AUTH_ENDPOINT,
  DEFAULT_WS_ENDPOINT,
} from '../../../constants'
import type { QuilttSettingsContext } from '../../../types'

export const QuilttSettings = React.createContext<QuilttSettingsContext>({
  authEndpoint: DEFAULT_AUTH_ENDPOINT,
  apiEndpoint: DEFAULT_API_ENDPOINT,
  apiVersion: DEFAULT_API_VERSION,
  websocketEndpoint: DEFAULT_WS_ENDPOINT,
  deploymentId: '',
  // eslint-disable-next-line no-console
  errorLogger: console.log,
})

const useQuilttSettings = () => {
  const [quilttSettings, setQuilttSettings] = React.useState<QuilttSettingsContext>({
    authEndpoint: DEFAULT_AUTH_ENDPOINT,
    apiEndpoint: DEFAULT_API_ENDPOINT,
    apiVersion: DEFAULT_API_VERSION,
    websocketEndpoint: DEFAULT_WS_ENDPOINT,
    deploymentId: '',
    // eslint-disable-next-line no-console
    errorLogger: console.log,
  })

  return { ...quilttSettings, setQuilttSettings }
}

export default useQuilttSettings
