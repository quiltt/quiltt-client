import type { AxiosResponse } from 'axios'
import Axios from 'axios'

const DEFAULT_ENDPOINT = 'https://auth.quiltt.io/v1/users/session'

const DEFAULT_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  validateStatus: (status: number) => status < 500,
} as AuthConfig

export type AuthConfig = {
  headers: Record<string, unknown>
  validateStatus: (status: number) => boolean
}

export type Strategies = 'phone' | 'email'

export type UsernamePayload = { email: string } | { phone: string }

export type PasscodePayload = {
  email: string
  passcode: string
}

export type AuthAPI = {
  ping: (token: string) => Promise<AxiosResponse<any>>
  identify: (user: UsernamePayload) => Promise<AxiosResponse<any>>
  authenticate: (user: UsernamePayload, passcode: string) => Promise<AxiosResponse<any>>
  revoke: (token: string) => Promise<AxiosResponse<any>>
}

export const useQuilttAuth = (
  appId: string,
  endpoint: string = DEFAULT_ENDPOINT,
  appConfig: AuthConfig = DEFAULT_CONFIG
): AuthAPI => {
  const AuthAPI = {
    ping: (token: string) => {
      const config = { ...appConfig }
      config.headers.Authorization = `Bearer ${token}`

      return Axios.get(endpoint, config)
    },
    identify: (username: UsernamePayload) => {
      const config = { ...appConfig }
      return Axios.post(endpoint, { session: { appId, ...username } }, config)
    },
    authenticate: (username: UsernamePayload, passcode: string) => {
      const config = { ...appConfig }
      return Axios.put(endpoint, { session: { appId, ...username, passcode } }, config)
    },
    revoke: (token: string) => {
      const config = { ...appConfig }
      config.headers.Authorization = `Bearer ${token}`

      return Axios.delete(endpoint, config)
    },
  }

  return AuthAPI
}

export default useQuilttAuth
