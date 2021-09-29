import * as React from 'react'

import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../utils/components'

type DefaultSyncingComponentProps = React.HTMLAttributes<HTMLElement> & CustomComponentProps & {}

type Ref = React.ReactNode | HTMLElement | string

const DefaultSyncingComponent: CustomComponentRefForwardingComponent<
  'span',
  DefaultSyncingComponentProps
> = React.forwardRef<Ref, DefaultSyncingComponentProps>(function DefaultSyncingComponent(
  props,
  ref
) {
  const { as = 'span', className = '', ...otherProps } = props

  return React.createElement(
    as as string,
    {
      ref,
      className,
      ...otherProps,
    },
    'Syncing...'
  )
})

export default DefaultSyncingComponent
