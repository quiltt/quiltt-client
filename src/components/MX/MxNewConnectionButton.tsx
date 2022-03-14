import * as React from 'react'

import { MxEvent } from 'types'

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
    (event: MessageEvent<MxEvent>) => {
      if (refetch && event.data.mx === true) {
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
