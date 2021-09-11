import * as React from 'react'

import { useQuilttContext } from '@quiltt/client'
import { Button } from '@quiltt/ui'

const LogoutButton: React.FC = () => {
  const { setAuthorizationToken } = useQuilttContext()

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
