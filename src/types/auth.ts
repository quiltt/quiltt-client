import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

export type EmailInput = { email: string; phone?: never }
export type PhoneInput = { phone: string; email?: never }

export type UsernamePayload = EmailInput | PhoneInput

export type PasscodePayload = UsernamePayload & {
  passcode: string
}

export type LoginPayload = UsernamePayload & PasscodePayload

export type QuilttSession = {
  id: string | null
  token: string | null
  userId: string | null
}

export type AuthAPI = {
  ping: (token: string) => Promise<AxiosResponse<QuilttSession>>
  identify: (user: EmailInput) => Promise<AxiosResponse<QuilttSession>>
  authenticate: (authenticationVariables: LoginPayload) => Promise<AxiosResponse<QuilttSession>>
  revoke: (token: string) => Promise<AxiosResponse<Record<string, unknown>>>
}

export type AuthConfig = AxiosRequestConfig<QuilttSession | Record<string, unknown>> & {
  headers: AxiosRequestHeaders
  validateStatus: (status: number) => boolean
}

export type QuilttAuthContext = AuthAPI &
  QuilttSession & {
    setSession: (value: QuilttSession | ((val: Partial<QuilttSession>) => QuilttSession)) => void
    resetSession: () => void
  }
