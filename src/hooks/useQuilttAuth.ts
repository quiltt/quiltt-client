import fetch from 'cross-fetch'

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

export type UsernamePayload = { email: string } | { phone: string }

export type PasscodePayload = {
  email: string
  passcode: string
}

export type AuthAPI = {
  ping: (token: string) => Promise<Response>
  identify: (user: UsernamePayload) => Promise<Response>
  authenticate: (user: UsernamePayload, passcode: string) => Promise<Response>
  revoke: (token: string) => Promise<Response>
}

const useQuilttAuth = (
  appId: string,
  endpoint: string = DEFAULT_ENDPOINT,
  appConfig: AuthConfig = DEFAULT_CONFIG
): AuthAPI => {
  const AuthAPI = {
    ping: (token: string) => {
      const config = appConfig
      config.headers.set('Authorization', `Bearer ${token}`)

      return fetch(endpoint, {
        method: 'GET',
        headers: config.headers,
        body: JSON.stringify(config.validateStatus),
      }).then((response) => {
        return response
          .json()
          .then((data) => {
            return data
          })
          .catch((err) => {
            console.error(err)
          })
      })
    },
    identify: (username: UsernamePayload) => {
      const config = { ...appConfig }
      return fetch(endpoint, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ session: { appId, ...username } }),
      }).then((response) => {
        return response
          .json()
          .then((data) => {
            return data
          })
          .catch((err) => {
            console.error(err)
          })
      })
    },
    authenticate: (username: UsernamePayload, passcode: string) => {
      const config = { ...appConfig }
      return fetch(endpoint, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ session: { appId, ...username, passcode } }),
      }).then((response) => {
        return response
          .json()
          .then((data) => {
            return data
          })
          .catch((err) => {
            console.error(err)
          })
      })
    },
    revoke: (token: string) => {
      const config = { ...appConfig }
      config.headers.set('Authorization', `Bearer ${token}`)
      return fetch(endpoint, {
        method: 'DELETE',
        headers: config.headers,
      }).then((response) => {
        return response
          .json()
          .then((data) => {
            return data
          })
          .catch((err) => {
            console.error(err)
          })
      })
    },
  }

  return AuthAPI
}

export default useQuilttAuth
