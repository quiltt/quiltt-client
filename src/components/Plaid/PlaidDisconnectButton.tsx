import * as React from 'react'

import { useConnectionDeleteMutation } from '../../types/graphql'
import type { CustomComponentProps } from '../../utils/components'

export type PlaidDisconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & { id: string }

const PlaidDisconnectButton: React.FC<PlaidDisconnectButtonProps> = ({
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

  const disabled = !loading || !disconnect

  React.useEffect(() => {
    if (error) {
      throw new Error(`Plaid Link Error: ${error.message}`)
    }
  }, [error])

  return React.createElement(
    as as string,
    {
      className,
      disabled,
      id: id ? `plaid-disconnect-${id}` : undefined,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default PlaidDisconnectButton
