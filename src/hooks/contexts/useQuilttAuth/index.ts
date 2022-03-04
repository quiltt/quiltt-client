import * as React from 'react'

import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

import type {
  AuthAPI,
  AuthConfig,
  PasscodePayload,
  QuilttAuthContext,
  UsernamePayload,
} from '../../../types'
import { useLocalStorage } from '../../utils'
import useQuilttSettings from '../useQuilttSettings'

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
  const { authBase, deploymentId } = useQuilttSettings()
  const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
    'QUILTT_SESSION',
    null
  )

  const authEndpoint = `${authBase}/v1/users/session`

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
    authenticate: (payload: PasscodePayload) => {
      const config = { ...CONFIG }
      return axios.put(authEndpoint, { session: { deploymentId, ...payload } }, config)
    },
    revoke: (authToken: string) => {
      const config = { ...CONFIG }
      config.headers.Authorization = `Bearer ${authToken}`
      return axios.delete(authEndpoint, config)
    },
  }

  const resetSession = React.useCallback(() => {
    if (authorizationToken) {
      revoke(authorizationToken)
    }
    setAuthorizationToken(null)
  }, [authorizationToken, setAuthorizationToken, revoke])

  return {
    authorizationToken,
    setAuthorizationToken,
    resetSession,
    ping,
    identify,
    authenticate,
    revoke,
  }
}

export default useQuilttAuth
