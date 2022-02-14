import * as React from 'react'

import { QuilttDeployment, useQuilttDeployment } from '../../hooks'

const QuilttDeploymentProvider: React.FC = ({ children }) => {
  const { deploymentId, authEndpoint, apiEndpoint, setDeployment } = useQuilttDeployment()
  const value = React.useMemo(
    () => ({ deploymentId, authEndpoint, apiEndpoint, setDeployment }),
    [deploymentId, authEndpoint, apiEndpoint, setDeployment]
  )

  return <QuilttDeployment.Provider value={value}>{children}</QuilttDeployment.Provider>
}

export default QuilttDeploymentProvider
