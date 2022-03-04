import * as React from 'react'
import { useQuilttAuth } from '@quiltt/client'
import Auth from './Auth'
import NewConnectionButton from './NewConnectionButton'

const App: React.FC = () => {
  const auth = useQuilttAuth()
  const { authorizationToken } = auth

  if (!authorizationToken) {
    return <Auth />
  }

  return (
    <div>
      <NewConnectionButton />
    </div>
  )
}

export default App
