import * as React from 'react'

import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../utils/components'

type DefaultLoadingComponentProps = React.HTMLAttributes<HTMLElement> & CustomComponentProps & {}

type Ref = React.ReactNode | HTMLElement | string

const DefaultLoadingComponent: CustomComponentRefForwardingComponent<
  'span',
  DefaultLoadingComponentProps
> = React.forwardRef<Ref, DefaultLoadingComponentProps>(function DefaultLoadingComponent(
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
    'Loading...'
  )
})

export default DefaultLoadingComponent
