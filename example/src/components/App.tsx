import * as React from 'react'
import { useQuilttAuth } from '@quiltt/client'
import Auth from './Auth'
import NewConnectionButton from './NewConnectionButton'
import NewMXConnectionButton from './NewMXConnectionButton'

const App: React.FC = () => {
  const auth = useQuilttAuth()
  const { authorizationToken } = auth

  if (!authorizationToken) {
    return <Auth />
  }

  return (
    <div>
      <NewConnectionButton />
      <NewMXConnectionButton />
    </div>
  )
}

export default App
