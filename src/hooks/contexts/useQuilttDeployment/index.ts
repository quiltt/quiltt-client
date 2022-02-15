import * as React from 'react'

import {
  DEFAULT_API_ENDPOINT,
  DEFAULT_API_VERSION,
  DEFAULT_AUTH_ENDPOINT,
} from '../../../constants'
import type { QuilttDeploymentContext } from '../../../types'

export const QuilttDeployment = React.createContext<QuilttDeploymentContext>({
  authEndpoint: DEFAULT_AUTH_ENDPOINT,
  apiEndpoint: DEFAULT_API_ENDPOINT,
  apiVersion: DEFAULT_API_VERSION,
  deploymentId: '',
  errorLogger: console.log,
})

const useQuilttDeployment = () => {
  const [deployment, setDeployment] = React.useState<QuilttDeploymentContext>({
    authEndpoint: DEFAULT_AUTH_ENDPOINT,
    apiEndpoint: DEFAULT_API_ENDPOINT,
    apiVersion: DEFAULT_API_VERSION,
    deploymentId: '',
    errorLogger: console.log,
  })

  return { ...deployment, setDeployment }
}

export default useQuilttDeployment
