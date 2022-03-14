import * as React from 'react'

import { CustomComponentProps } from 'utils/components'

import { ConnectionMxCreateInput, useConnectionMxCreateMutation } from '../../types/graphql'

import MxConnectButton from './MxConnectButton'

type MxNewConnectionButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    refetch?: (variables?: Record<string, unknown>) => Promise<unknown>
  }

const MxNewConnectionButton: React.FC<MxNewConnectionButtonProps> = ({
  className = '',
  as = 'button',
  children,
  refetch,
  ...buttonProps
}) => {
  const [addConnection] = useConnectionMxCreateMutation()

  const handleSuccess = React.useCallback(
    (input: ConnectionMxCreateInput) => {
      addConnection({
        variables: {
          input,
        },
      }).then(() => {
        if (refetch) {
          refetch()
        }
      })
    },
    [addConnection, refetch]
  )

  const handleEvent = React.useCallback(
    (eventName) => {
      if (refetch && eventName === 'HANDOFF') {
        refetch()
      }
    },
    [refetch]
  )

  return (
    <MxConnectButton
      as={as}
      onEvent={handleEvent}
      onSuccess={handleSuccess}
      className={className}
      {...buttonProps}
    >
      {children}
    </MxConnectButton>
  )
}

export default MxNewConnectionButton
