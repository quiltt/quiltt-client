import * as React from 'react'

import type { AxiosRequestHeaders } from 'axios'
import axios from 'axios'

import useLocalStorage from '../useLocalStorage'
import { QuilttContext, QuilttContextType } from '../useQuilttContext'

import { AuthAPI, AuthConfig, PasscodePayload, UsernamePayload } from './types'

const DEFAULT_ENDPOINT = 'https://auth.quiltt.io/v1/users/session'

const DEFAULT_CONFIG: AuthConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  } as AxiosRequestHeaders,
  validateStatus: (status: number) => status < 500,
}

const useQuilttAuth = (
  endpoint: string = DEFAULT_ENDPOINT,
  appConfig: AuthConfig = DEFAULT_CONFIG
) => {
  const { appId } = React.useContext<QuilttContextType>(QuilttContext)
  const [token, setToken] = useLocalStorage<string | null>('QUILTT_TOKEN', null)
  const [userId, setUserId] = useLocalStorage<string | null>('QUILTT_USER_ID', null)

  const { ping, identify, authenticate, revoke }: AuthAPI = {
    ping: (authToken: string) => {
      const config = { ...appConfig }
      config.headers.Authorization = `Bearer ${authToken}`
      return axios.get(endpoint, config)
    },
    identify: (username: UsernamePayload) => {
      const config = { ...appConfig }
      return axios.post(endpoint, { session: { appId, ...username } }, config)
    },
    authenticate: (authenticationVariables: PasscodePayload) => {
      const config = { ...appConfig }
      return axios.put(endpoint, { session: { appId, ...authenticationVariables } }, config)
    },
    revoke: (authToken: string) => {
      const config = { ...appConfig }
      config.headers.Authorization = `Bearer ${authToken}`
      return axios.delete(endpoint, config)
    },
  }

  React.useEffect(() => {
    let unsubscribe = () => {}
    if (token) {
      unsubscribe = () =>
        ping(token).then((response) => {
          if (response.data.userId) {
            setUserId(response.data.userId)
          } else {
            setUserId(null)
          }
        })
    }
    return () => unsubscribe()
  }, [ping, setUserId, token])

  return { ping, identify, authenticate, revoke, token, setToken, userId, setUserId }
}

export default useQuilttAuth
