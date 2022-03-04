import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import { Card, Heading } from '@quiltt/ui'

import { AuthStrategies, useQuilttAuth, useQuilttSettings, UsernamePayload } from '@quiltt/client'
import PasscodeForm from './PasscodeForm'
import UsernameForm from './UsernameForm'

const AuthPage: React.VFC = () => {
  const settings = useQuilttSettings()
  const auth = useQuilttAuth()
  const { setAuthorizationToken } = auth
  const authStrategy = AuthStrategies.Email
  const [username, setUsername] = React.useState<UsernamePayload>()
  const navigate = useNavigate()

  const handleIdentification = (payload: UsernamePayload) => {
    setUsername(payload)
  }

  const handleAuthentication = (token: string) => {
    setAuthorizationToken(token)
    navigate('/')
  }

  React.useEffect(() => {
    console.log({ settings })
  }, [settings])

  return (
    <main className="flex flex-col justify-center flex-auto h-full p-3 overflow-y-auto">
      <img alt="" className="block mx-auto w-50" style={{ maxWidth: '350px' }} />

      <Card className="my-5">
        <Card.Header>
          <Heading as="h1">{username ? 'Log In' : 'Sign Up or Log In'}</Heading>
        </Card.Header>
        <Card.Body>
          {username ? (
            <PasscodeForm
              auth={auth}
              username={username}
              onAuthentication={handleAuthentication}
              strategy={authStrategy}
            />
          ) : (
            <UsernameForm
              auth={auth}
              onAuthentication={handleAuthentication}
              onIdentification={handleIdentification}
              strategy={authStrategy}
            />
          )}
        </Card.Body>
      </Card>
    </main>
  )
}

export default AuthPage
