import * as React from 'react'

import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

import type {
  AuthAPI,
  AuthConfig,
  PasscodePayload,
  QuilttAuthContext,
  QuilttSession,
  UsernamePayload,
} from '../../../types'
import { useLocalStorage } from '../../utils'
import useQuilttDeployment from '../useQuilttDeployment'

const CONFIG: AuthConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: '',
  } as AxiosRequestHeaders,
  validateStatus: (status: number) => status < 500,
}

export const QuilttAuth = React.createContext<QuilttAuthContext>({} as QuilttAuthContext)

const useQuilttAuth = () => {
  const { authEndpoint, deploymentId } = useQuilttDeployment()
  const [session, setSession] = useLocalStorage<QuilttSession>('QUILTT_SESSION', {
    id: null,
    token: null,
    userId: null,
  })

  const { ping, identify, authenticate, revoke }: AuthAPI = {
    ping: (authToken: string) => {
      const config = { ...CONFIG }
      config.headers.Authorization = `Bearer ${authToken}`
      return axios.get(authEndpoint, config)
    },
    identify: (username: UsernamePayload) => {
      const config = { ...CONFIG }
      return axios.post(authEndpoint, { session: { deploymentId, ...username } }, config)
    },
    authenticate: (authenticationVariables: PasscodePayload) => {
      const config = { ...CONFIG }
      return axios.put(
        authEndpoint,
        { session: { deploymentId, ...authenticationVariables } },
        config
      )
    },
    revoke: (authToken: string) => {
      const config = { ...CONFIG }
      config.headers.Authorization = `Bearer ${authToken}`
      return axios.delete(authEndpoint, config)
    },
  }

  const resetSession = React.useCallback(() => {
    if (session && session.token) {
      revoke(session.token)
    }
    setSession({
      id: null,
      token: null,
      userId: null,
    })
  }, [session, setSession, revoke])

  return { ...session, resetSession, ping, identify, authenticate, revoke }
}

export default useQuilttAuth
