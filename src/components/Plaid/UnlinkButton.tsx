import * as React from 'react'

import { useConnectionDeleteMutation } from '../../types'

type UnlinkButtonProps = {
  id: string
  name: string
}

const UnlinkButton: React.FC<UnlinkButtonProps> = ({ id, name, children, ...buttonProps }) => {
  const [unlink, { loading }] = useConnectionDeleteMutation({
    variables: { id },
    update: (cache, results) => {
      if (results?.data?.connectionDelete?.record) {
        cache.evict({
          id: cache.identify(results.data.connectionDelete.record),
        })
      }
    },
  })

  const handleClick = () => {
    // eslint-disable-next-line no-alert
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
