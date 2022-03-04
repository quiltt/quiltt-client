import * as React from 'react'

import { Form } from '@quiltt/ui'

import { AuthStrategies, UsernamePayload, QuilttAuthContext } from '@quiltt/client'

import { LoginUsername } from './schema'

export type UsernameFormProps = {
  auth: QuilttAuthContext
  strategy: AuthStrategies
  onAuthentication: (token: string) => void
  onIdentification: (username: UsernamePayload) => void
}

const UsernameForm: React.VFC<UsernameFormProps> = ({
  auth,
  strategy,
  onAuthentication,
  onIdentification,
}) => {
  const schema = React.useMemo(
    () =>
      strategy === AuthStrategies.Email
        ? LoginUsername.omit({ phone: true })
        : LoginUsername.omit({ email: true }),
    [strategy]
  )

  const initialValues = React.useMemo(
    () =>
      strategy === AuthStrategies.Email
        ? { strategy: AuthStrategies.Email, email: '' }
        : { strategy: AuthStrategies.Phone, phone: '' },
    [strategy]
  )

  const handleSubmit = async (values: { email?: string; phone?: string }) => {
    const { email, phone } = values
    const payload = strategy === AuthStrategies.Email ? { email } : { phone: `+1${phone}` }
    const response = await auth.identify(payload as UsernamePayload)
    switch (response.status) {
      case 201: // Created -> New Enrollment
        // @ts-ignore
        onAuthentication(response?.data?.token)
        return
      case 202: // Accepted -> New Session
        onIdentification(payload as UsernamePayload)
        return
      default:
        return { FORM_ERROR: `${response.status}: ${response.toString()}` }
    }
  }

  return (
    <Form submitText="Next" schema={schema} initialValues={initialValues} onSubmit={handleSubmit}>
      <input type="hidden" className="sr-only" title="Strategy" name="strategy" value={strategy} />
      {strategy === AuthStrategies.Email ? (
        <Form.Input
          id="formEmail"
          name="email"
          label="Email"
          placeholder="Enter your Email"
          leftIcon="MailIcon"
        />
      ) : (
        <Form.Input
          id="formPhone"
          name="phone"
          label="Cellphone"
          placeholder="Enter your Cellphone"
          leftIcon="PhoneIcon"
        />
      )}
    </Form>
  )
}

export default UsernameForm
