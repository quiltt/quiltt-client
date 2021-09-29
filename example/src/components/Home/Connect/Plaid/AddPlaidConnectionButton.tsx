import * as React from 'react'

import type { PlaidLinkOnLoad } from 'react-plaid-link'

import { PlaidLinkButton, usePlaidItemCreateMutation } from '@quiltt/client'
import { Button } from '@quiltt/ui'
import type { ButtonProps } from '@quiltt/ui/dist/src/components/Button'

type AddPlaidConnectionButtonProps = ButtonProps & {
  refetch: () => void
  onLoad?: PlaidLinkOnLoad
}

const AddPlaidConnectionButton: React.FC<AddPlaidConnectionButtonProps> = ({
  children,
  refetch,
  ...buttonProps
}) => {
  const [addConnection] = usePlaidItemCreateMutation()

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

  const onEvent = React.useCallback(
    (eventName) => {
      if (eventName === 'HANDOFF') {
        refetch()
      }
    },
    [refetch]
  )

  return (
    <PlaidLinkButton
      as={Button}
      onSuccess={handleSuccess}
      onEvent={onEvent}
      {...buttonProps}
      {...plaidLinkOptions}
    >
      {children}
    </PlaidLinkButton>
  )
}

const plaidLinkOptions = {
  products: ['transactions'],
}

export default AddPlaidConnectionButton
