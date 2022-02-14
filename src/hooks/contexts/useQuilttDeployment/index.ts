import * as React from 'react'

import { DEFAULT_API_ENDPOINT, DEFAULT_AUTH_ENDPOINT } from '../../../constants'
import type { QuilttDeploymentContext } from '../../../types'

export const QuilttDeployment = React.createContext<QuilttDeploymentContext>({
  authEndpoint: DEFAULT_AUTH_ENDPOINT,
  apiEndpoint: DEFAULT_API_ENDPOINT,
  deploymentId: '',
})

const useQuilttDeployment = () => React.useContext(QuilttDeployment)

export default useQuilttDeployment
