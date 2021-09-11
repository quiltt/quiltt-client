import * as React from 'react'

import { useQuilttAuth } from '@quiltt/client'
import type { Strategies, UsernamePayload } from '@quiltt/client'
import { Button } from '@quiltt/ui'
import { Formik, Field, Form } from 'formik'

export type UsernameProps = {
  strategy: Strategies
  onIdentification: (username: string) => void
  onAuthentication: (token: string) => void
}

export const Username: React.VFC<UsernameProps> = ({
  strategy,
  onIdentification,
  onAuthentication,
}) => {
  const auth = useQuilttAuth()

  let initialValues

  switch (strategy) {
    case 'email':
      initialValues = { email: '' }
      break
    case 'phone':
      initialValues = { phone: '' }
      break
  }

  const handleSubmit = async (values: UsernamePayload) => {
    switch (strategy) {
      case 'email':
        if (!values.email) return
        break
      case 'phone':
        if (!values.phone) return
        break
    }

    let response

    switch (strategy) {
      case 'email':
        response = await auth.identify({ email: values.email as string })
        break
      case 'phone':
        response = await auth.identify({ phone: values.phone as string })
        break
    }

    switch (response.status) {
      case 201: // Created
        onAuthentication(response.headers['authorization'].split(' ')[1])
        break
      case 202: // Accepted
        switch (strategy) {
          case 'email':
            onIdentification(values.email as string)
            break
          case 'phone':
            onIdentification(values.phone as string)
            break
        }
        break
      case 422: // Unprocessable Entity
        break
      // TODO: Handle Error
    }
  }

  const inputs = {
    email: (
      <Field
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
        required
      />
    ),
    phone: (
      <Field
        id="phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Phone Number"
        required
      />
    ),
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: UsernamePayload) => {
        handleSubmit(values)
      }}
    >
      <Form className="mt-8 space-y-6">
        <Field type="hidden" name="remember" value="true" />
        <div className="-space-y-px shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            {inputs[strategy]}
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

export default Username
