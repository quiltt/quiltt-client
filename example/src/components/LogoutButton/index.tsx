import * as React from 'react'

import { useQuilttDeployment } from '@quiltt/client'
import { Button } from '@quiltt/ui'

const LogoutButton: React.FC = () => {
  const { setAuthorizationToken } = useQuilttDeployment()

  const handleClick = () => {
    setAuthorizationToken(null)
  }

  return (
    <Button variant="danger" onClick={handleClick} block>
      Sign out
    </Button>
  )
}

export default LogoutButton
