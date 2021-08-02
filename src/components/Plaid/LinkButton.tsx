import * as React from 'react'

import type {
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
} from 'react-plaid-link'

import {
  PlaidLinkTokenCreateInput,
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
  usePlaidLinkTokenCreateMutation,
} from '../../types'

import LinkLauncher from './LinkLauncher'

export type PlaidLinkButtonProps = PlaidLinkTokenCreateInput & {
  onSuccess: PlaidLinkOnSuccess
  onExit?: PlaidLinkOnExit
  onEvent?: PlaidLinkOnEvent
  onLoad?: PlaidLinkOnLoad
  callback?: (data: any) => void
}

export const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = (props) => {
  const {
    products,
    linkCustomizationName,
    accountFilters,
    children,
    onSuccess,
    onEvent,
    callback,
    onLoad = null,
    ...buttonProps
  } = props

  const [linkToken, setLinkToken] = React.useState<string | undefined>()

  const handlePlaidTokenCreated = (data: PlaidLinkTokenCreateMutation) => {
    const { record, errors } =
      data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload
    if (errors)
      errors.map((error) => {
        throw new Error(`${error.code}: ${error.message}`)
      })

    if (record) {
      setLinkToken(record.linkToken)
    }
  }

  const [createLinkToken] = usePlaidLinkTokenCreateMutation({
    variables: {
      input: {
        accountFilters,
        linkCustomizationName,
        products,
      },
    },
    onCompleted: handlePlaidTokenCreated,
  })

  React.useEffect(() => {
    createLinkToken()
  }, [createLinkToken])

  if (!linkToken) {
    return (
      <button {...buttonProps} type="button" disabled>
        {children}
      </button>
    )
  }

  return (
    <LinkLauncher
      onLoad={onLoad as PlaidLinkOnLoad}
      token={linkToken}
      onSuccess={onSuccess}
      onEvent={onEvent}
      {...buttonProps}
    >
      {children}
    </LinkLauncher>
  )
}

export default PlaidLinkButton
