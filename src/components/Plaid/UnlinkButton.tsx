import * as React from 'react'

import { usePlaidItemUnlinkMutation } from '../../types'

type UnlinkButtonProps = {
  id: string
  name: string
}

const UnlinkButton: React.FC<UnlinkButtonProps> = ({ id, name, children, ...buttonProps }) => {
  const [unlink, { loading }] = usePlaidItemUnlinkMutation({
    variables: { id },
    update: (cache, results) => {
      if (results?.data?.plaidItemDelete?.record) {
        cache.evict({
          id: cache.identify(results.data.plaidItemDelete.record),
        })
      }
    },
  })

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      if (window.confirm(`Are you sure you want to unlink ${name}?`)) {
        unlink()
      }
    }
  }

  return (
    <button type="button" disabled={loading} onClick={handleClick} {...buttonProps}>
      {children || <span className="uppercase">Unlink</span>}
    </button>
  )
}

export default UnlinkButton
