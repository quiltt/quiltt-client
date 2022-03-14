import * as React from 'react'
import type { PlaidLinkOnLoad, PlaidLinkOnSuccess } from 'react-plaid-link'

import { CustomComponentProps } from 'utils/components'

import {
  ConnectorPlaidInitializeInput,
  useConnectionPlaidCreateMutation,
} from '../../types/graphql'

import PlaidConnectButton from './PlaidConnectButton'

type PlaidNewConnectionButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  ConnectorPlaidInitializeInput & {
    refetch?: (variables?: Record<string, unknown>) => Promise<unknown>
    onLoad?: PlaidLinkOnLoad
  }

const PlaidNewConnectionButton: React.FC<PlaidNewConnectionButtonProps> = ({
  className = '',
  as = 'button',
  children,
  refetch,
  ...buttonProps
}) => {
  const [addConnection] = useConnectionPlaidCreateMutation()

  const plaidLinkOptions = {
    products: ['transactions', 'liabilities'],
  }

  const handleSuccess = React.useCallback(
    (publicToken: string, metadata: Record<string, unknown>) => {
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
  const handleEvent = React.useCallback(
    (eventName, _metadata) => {
      if (refetch && eventName === 'HANDOFF') {
        refetch()
      }
    },
    [refetch]
  )

  return (
    <PlaidConnectButton
      as={as}
      onSuccess={handleSuccess as unknown as PlaidLinkOnSuccess}
      onEvent={handleEvent}
      className={className}
      {...buttonProps}
      {...plaidLinkOptions}
    >
      {children}
    </PlaidConnectButton>
  )
}

export default PlaidNewConnectionButton
