import * as React from 'react'

import { useQuilttDeployment } from 'hooks'

type SetDeploymentProps = {
  deploymentId: string
  authEndpoint: string
  apiEndpoint: string
}

const SetDeployment: React.FC<SetDeploymentProps> = ({
  deploymentId,
  authEndpoint,
  apiEndpoint,
}) => {
  // Combine all providers into one provider from left to right
  const { setDeployment } = useQuilttDeployment()
  React.useEffect(() => {
    setDeployment({ deploymentId, authEndpoint, apiEndpoint })
  }, [apiEndpoint, authEndpoint, deploymentId, setDeployment])

  return null
}

export default SetDeployment
