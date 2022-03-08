import * as React from 'react'

import { useConnectionDeleteMutation } from '../types/graphql'
import type { CustomComponentProps } from '../utils/components'

export type PlaidDisconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & { connectionId: string }

const PlaidDisconnectButton: React.FC<PlaidDisconnectButtonProps> = ({
  className = '',
  as = 'button',
  children = 'Disconnect',
  connectionId,
  ...otherProps
}) => {
  const [disconnect, { loading, error }] = useConnectionDeleteMutation({
    variables: {
      id: connectionId,
    },
  })

  const handleClick = () => {
    disconnect()
  }

  const disabled = !loading || !disconnect

  React.useEffect(() => {
    if (error) {
      throw new Error(`Error: ${error.message}`)
    }
  }, [error])

  return React.createElement(
    as as string,
    {
      className,
      disabled,
      id: connectionId ? `disconnect-${connectionId}` : undefined,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default PlaidDisconnectButton
