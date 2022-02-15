import * as React from 'react'

import {
  DEFAULT_API_ENDPOINT,
  DEFAULT_API_VERSION,
  DEFAULT_AUTH_ENDPOINT,
  DEFAULT_WS_ENDPOINT,
} from '../../../constants'
import type { QuilttDeploymentContext } from '../../../types'

export const QuilttDeployment = React.createContext<QuilttDeploymentContext>({
  authEndpoint: DEFAULT_AUTH_ENDPOINT,
  apiEndpoint: DEFAULT_API_ENDPOINT,
  apiVersion: DEFAULT_API_VERSION,
  websocketEndpoint: DEFAULT_WS_ENDPOINT,
  deploymentId: '',
  // eslint-disable-next-line no-console
  errorLogger: console.log,
})

const useQuilttDeployment = () => {
  const [deployment, setDeployment] = React.useState<QuilttDeploymentContext>({
    authEndpoint: DEFAULT_AUTH_ENDPOINT,
    apiEndpoint: DEFAULT_API_ENDPOINT,
    apiVersion: DEFAULT_API_VERSION,
    websocketEndpoint: DEFAULT_WS_ENDPOINT,
    deploymentId: '',
    // eslint-disable-next-line no-console
    errorLogger: console.log,
  })

  return { ...deployment, setDeployment }
}

export default useQuilttDeployment
