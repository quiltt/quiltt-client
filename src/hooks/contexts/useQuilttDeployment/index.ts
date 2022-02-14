import * as React from 'react'

import { DEFAULT_API_ENDPOINT, DEFAULT_AUTH_ENDPOINT } from '../../../constants'
import type { QuilttDeploymentContext } from '../../../types'

export const QuilttDeployment = React.createContext<QuilttDeploymentContext>({
  authEndpoint: DEFAULT_AUTH_ENDPOINT,
  apiEndpoint: DEFAULT_API_ENDPOINT,
  deploymentId: '',
})

const useQuilttDeployment = () => {
  const [deployment, setDeployment] = React.useState<QuilttDeploymentContext>({
    authEndpoint: DEFAULT_AUTH_ENDPOINT,
    apiEndpoint: DEFAULT_API_ENDPOINT,
    deploymentId: '',
  })

  return { ...deployment, setDeployment }
}

export default useQuilttDeployment
