import * as React from 'react'
import { useQuilttAuth } from '@quiltt/client'
import Auth from './Auth'
import Connections from './Connections'

const App: React.FC = () => {
  const auth = useQuilttAuth()
  const { authorizationToken } = auth

  if (!authorizationToken) {
    return <Auth />
  }

  return (
    <div>
      <Connections />
    </div>
  )
}

export default App
