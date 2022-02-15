import * as React from 'react'

import { usePlaidItemUnlinkMutation } from '../../types/quiltt'
import { CustomComponentProps } from '../../utils/components'

type PlaidUnlinkButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    plaidItemId: string
    name: string
  }

const PlaidUnlinkButton: React.FC<PlaidUnlinkButtonProps> = ({
  as = 'button',
  className = '',
  plaidItemId,
  name,
  children,
  ...otherProps
}) => {
  const [unlink, { loading }] = usePlaidItemUnlinkMutation({
    variables: { id: plaidItemId },
    update: (cache, results) => {
      if (results?.data?.plaidItemDelete?.record) {
        cache.evict({
          id: cache.identify(results.data.plaidItemDelete.record),
        })
      }
    },
  })

  const handleClick = () => {
    unlink()
  }

  return React.createElement(
    as as string,
    {
      className,
      id: `plaid-unlink-${plaidItemId}`,
      disabled: loading,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default PlaidUnlinkButton
