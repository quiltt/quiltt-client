import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export type Strategies = 'phone' | 'email'

export type EmailInput = { email: string; phone?: never }
export type PhoneInput = { phone: string; email?: never }

export type UsernamePayload = EmailInput | PhoneInput

export type PasscodePayload = UsernamePayload & {
  passcode: string
}

export type AuthConfig = AxiosRequestConfig<
  PingData | IdentifyData | AuthenticateData | RevokeData
> & {
  headers: AxiosRequestHeaders
  validateStatus: (status: number) => boolean
}

type PingData = {
  id: string
  expiration: string
  userId: string
  token: string
}

type IdentifyData = Record<string, unknown>

type AuthenticateData = {
  id: string
  expiration: string
  userId: string
  token: string
}

type RevokeData = Record<string, unknown>

export type AuthAPI = {
  ping: (token: string) => Promise<AxiosResponse<PingData>>
  identify: (user: UsernamePayload) => Promise<AxiosResponse<IdentifyData>>
  authenticate: (
    authenticationVariables: PasscodePayload
  ) => Promise<AxiosResponse<AuthenticateData>>
  revoke: (token: string) => Promise<AxiosResponse<RevokeData>>
}
