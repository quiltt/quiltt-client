import * as React from 'react'

import { Form } from '@quiltt/ui'

import { AuthStrategies, UsernamePayload, QuilttAuthContext } from '@quiltt/client'

import { LoginPasscode } from './schema'

export type PasscodeFormProps = {
  auth: QuilttAuthContext
  username: UsernamePayload
  strategy: AuthStrategies
  onAuthentication: (token: string) => void
}

const PasscodeForm: React.VFC<PasscodeFormProps> = ({
  auth,
  username,
  strategy,
  onAuthentication,
}) => {
  const handleSubmit = async (values: { passcode: string }) => {
    const { passcode } = values
    const response = await auth.authenticate({ ...username, passcode })

    switch (response.status) {
      case 201: // Created -> New Session
        onAuthentication(response.data.token)
        return
      case 401: // Unauthorized
        return { FORM_ERROR: 'Login code is incorrect' }
      case 422: // Unprocessable Entity
        return { FORM_ERROR: `${response.status}: ${response.toString()}` }
      case 404: // Not Found (can occur if user was recently deleted)
        return { FORM_ERROR: `${response.status}: ${response.toString()}` }
      default:
        return { FORM_ERROR: `${response.status}: ${response.toString()}` }
    }
  }

  return (
    <Form
      submitText="Next"
      schema={LoginPasscode}
      initialValues={{
        strategy,
        username: strategy === AuthStrategies.Email ? username.email : username.phone,
        passcode: '',
      }}
      onSubmit={handleSubmit}
    >
      <input type="hidden" className="sr-only" title="Strategy" name="strategy" value={strategy} />
      <input
        type="hidden"
        className="sr-only"
        title="Username"
        name="username"
        value={username[strategy]}
      />
      <div className="relative">
        <Form.Input
          id="formPasscode"
          name="passcode"
          label="Passcode"
          placeholder="Enter your login code"
        />
      </div>
    </Form>
  )
}

export default PasscodeForm
