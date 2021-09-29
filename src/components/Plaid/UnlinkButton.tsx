import * as React from 'react'

import { usePlaidItemUnlinkMutation } from '../../types'
import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

type UnlinkButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    id: string
    name: string
  }

type Ref = React.ReactNode | HTMLElement | string

const UnlinkButton: CustomComponentRefForwardingComponent<'button', UnlinkButtonProps> =
  React.forwardRef<Ref, UnlinkButtonProps>(function UnlinkButton(props, ref) {
    const { as = 'button', id, name, children, ...otherProps } = props
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

    return React.createElement(
      as as string,
      {
        ref,
        disabled: loading,
        onClick: handleClick,
        ...otherProps,
      },
      children || <span className="uppercase">Unlink</span>
    )
  })

export default UnlinkButton
