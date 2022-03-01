import * as React from 'react'

import { useNavigate } from 'react-router'
import { useQuilttContext } from '@quiltt/client'
import LogoutButton from '../LogoutButton'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { authorizationToken } = useQuilttContext()

  React.useEffect(() => {
    if (!authorizationToken) {
      navigate('/auth')
    }
  }, [navigate, authorizationToken])

  return (
    <div className="flex flex-col w-full h-full space-y-8">
      <p className="text-2xl font-semibold text-center">Welcome Home</p>
      <LogoutButton />
    </div>
  )
}

export default Home
