import * as React from 'react'

import { useQuilttAuth } from '@quiltt/client'
import type { PasscodePayload, UsernamePayload } from '@quiltt/client'
import { Button } from '@quiltt/ui'
import { Formik, Field, Form } from 'formik'

export type PasscodeProps = UsernamePayload & {
  onAuthentication: (token: string) => void
}

export const Passcode: React.VFC<PasscodeProps> = ({
  email = undefined,
  phone = undefined,
  onAuthentication,
}) => {
  const auth = useQuilttAuth()

  const handleSubmit = async (values: PasscodePayload) => {
    if (!values.passcode) return

    let response
    if (email) {
      response = await auth.authenticate({
        email,
        passcode: values.passcode,
      })
    }
    if (phone) {
      response = await auth.authenticate({
        phone,
        passcode: values.passcode,
      })
    }

    if (response) {
      switch (response.status) {
        case 201: // Created
          onAuthentication(response.data.token)
          break
        case 401: // Unauthorized
        case 422: // Unprocessable Entity
          break
        // TODO: Handle Error
      }
    }
  }

  let initialValues: UsernamePayload & { passcode: string } = { email: '', passcode: '' }

  if (email) {
    initialValues = {
      email: email as string,
      passcode: '',
    }
  }
  if (phone) {
    initialValues = {
      phone: phone as string,
      passcode: '',
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="mt-8 space-y-6">
        <Field type="hidden" name="remember" value="true" />
        <div className="-space-y-px shadow-sm">
          <div>
            <label htmlFor="passcode" className="sr-only">
              Pass Code
            </label>
            <Field
              id="passcode"
              name="passcode"
              type="text"
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[0-9]*"
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="000000"
              required
            />
          </div>
        </div>

        <div>
          <Button type="submit" block className="relative group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-blue-500 group-hover:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  )
}

export default Passcode
