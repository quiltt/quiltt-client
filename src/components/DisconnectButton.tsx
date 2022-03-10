import * as React from 'react'

import { useConnectionDeleteMutation } from '../types/graphql'
import type { CustomComponentProps } from '../utils/components'

export type DisconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & { id: string }

const DisconnectButton: React.FC<DisconnectButtonProps> = ({
  className = '',
  as = 'button',
  children = 'Disconnect',
  id,
  ...otherProps
}) => {
  const [disconnect, { loading, error }] = useConnectionDeleteMutation({
    variables: {
      id,
    },
  })

  const handleClick = () => {
    disconnect()
  }

  const disabled = loading || !disconnect

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
      id: id ? `disconnect-${id}` : undefined,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default DisconnectButton
