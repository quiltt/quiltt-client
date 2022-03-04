import * as React from 'react'

import type { PlaidLinkOnLoad } from 'react-plaid-link'

import { PlaidConnectButton, useConnectionPlaidCreateMutation } from '@quiltt/client'
import { Button } from '@quiltt/ui'
import type { ButtonProps } from '@quiltt/ui/dist/src/components/Button'

type NewConnectionButtonProps = ButtonProps & {
  refetch?: (variables?: Record<string, unknown>) => Promise<unknown>
  onLoad?: PlaidLinkOnLoad
}

const NewConnectionButton: React.FC<NewConnectionButtonProps> = ({
  children,
  refetch,
  ...buttonProps
}) => {
  const [addConnection] = useConnectionPlaidCreateMutation()

  const plaidLinkOptions = {
    products: ['transactions', 'liabilities'],
  }

  const handleSuccess = React.useCallback(
    (publicToken: string, metadata: unknown) => {
      addConnection({
        variables: {
          input: {
            publicToken,
            metadata,
          },
        },
      })
    },
    [addConnection]
  )

  // Since onSuccess fires while PlaidLink is still open, refetching or updating the cache in `onSuccess`
  //  will re-render the parent component (since it depends on the # of PlaidItems) and tear down
  //  Plaid Link unexpectedly, before the user has a chance to hit "Continue".
  //  Targeting the HANDOFF event means we refetch ONLY when the user closes Plaid Link.
  const onEvent = React.useCallback(
    (eventName, _metadata) => {
      if (refetch && eventName === 'HANDOFF') {
        refetch()
      }
    },
    [refetch]
  )

  return (
    <PlaidConnectButton
      as={Button}
      onSuccess={handleSuccess}
      onEvent={onEvent}
      {...buttonProps}
      {...plaidLinkOptions}
    >
      {children}
    </PlaidConnectButton>
  )
}

export default NewConnectionButton
