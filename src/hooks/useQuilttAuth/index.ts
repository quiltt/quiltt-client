import * as React from 'react'

import type { AxiosResponse } from 'axios'
import axios from 'axios'

import { QuilttContext } from '../useQuilttContext'

const DEFAULT_ENDPOINT = 'https://auth.quiltt.io/v1/users/session'

export type AuthConfig = {
  headers: Headers
  validateStatus: (status: number) => boolean
}

const DEFAULT_CONFIG: AuthConfig = {
  headers: new Headers(),
  validateStatus: (status: number) => status < 500,
}

DEFAULT_CONFIG.headers.append('Content-Type', 'application/json')
DEFAULT_CONFIG.headers.append('Authorization', '')

export type Strategies = 'phone' | 'email'

export type EmailInput = { email: string; phone?: never }
export type PhoneInput = { phone: string; email?: never }

export type UsernamePayload = EmailInput | PhoneInput

export type PasscodePayload = UsernamePayload & {
  passcode: string
}

export type AuthAPI = {
  ping: (token: string) => Promise<AxiosResponse<any>>
  identify: (user: UsernamePayload) => Promise<AxiosResponse<any>>
  authenticate: (authenticationVariables: PasscodePayload) => Promise<AxiosResponse<any>>
  revoke: (token: string) => Promise<AxiosResponse<any>>
}

const useQuilttAuth = (
  endpoint: string = DEFAULT_ENDPOINT,
  appConfig: AuthConfig = DEFAULT_CONFIG
): AuthAPI => {
  const { appId } = React.useContext(QuilttContext)
  const AuthAPI = {
    ping: (token: string) => {
      const config = { ...appConfig }
      config.headers.set('Authorization', `Bearer ${token}`)
      return axios.get(endpoint, config)
    },
    identify: (username: UsernamePayload) => {
      const config = { ...appConfig }
      return axios.post(endpoint, { session: { appId, ...username } }, config)
    },
    authenticate: (authenticationVariables: PasscodePayload) => {
      const config = { ...appConfig }
      return axios.post(endpoint, { session: { appId, ...authenticationVariables } }, config)
    },
    revoke: (token: string) => {
      const config = { ...appConfig }
      config.headers.set('Authorization', `Bearer ${token}`)
      return axios.delete(endpoint, config)
    },
  }

  return AuthAPI
}

export default useQuilttAuth
