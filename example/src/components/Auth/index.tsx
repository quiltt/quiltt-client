import * as React from 'react'
import { useNavigate } from 'react-router-dom'

import { useQuilttDeployment } from '@quiltt/client'

import Passcode from './Passcode'
import Username from './Username'

export const AuthPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuthorizationToken } = useQuilttDeployment()
  const [email, setEmail] = React.useState<string>()
  // const [phone, setPhone] = React.useState<string>()

  // We're only using email for this example
  const handleIdentification = (email: string) => {
    setEmail(email)
  }

  const handleAuthentication = (token: string) => {
    setAuthorizationToken(token)

    if (navigate) navigate('/')
  }

  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-12 text-black sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">Sign in to your account</h2>
        </div>
        {email ? (
          <Passcode onAuthentication={handleAuthentication} email={email} />
        ) : (
          <Username
            strategy="email"
            onAuthentication={handleAuthentication}
            onIdentification={handleIdentification}
          />
        )}
      </div>
    </div>
  )
}

export default AuthPage
