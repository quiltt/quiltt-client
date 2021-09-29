import * as React from 'react'
import type {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
} from 'react-plaid-link'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

export type LinkLauncherProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  PlaidLinkOptions & {
    token: string
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

type Ref = React.ReactNode | HTMLElement | string

const LinkLauncher: CustomComponentRefForwardingComponent<'button', LinkLauncherProps> =
  React.forwardRef<Ref, LinkLauncherProps>(function LinkLauncher(props, ref) {
    const {
      as = 'button',
      className = '',
      token,
      children,
      onSuccess,
      onExit = undefined,
      onEvent = undefined,
      onLoad = undefined,
      ...otherProps
    } = props
    const { open, ready, error } = usePlaidLink({
      token,
      onSuccess,
      onExit,
      onEvent,
    })

    if (error) throw new Error(`${error.error} ${error.message}`)

    const handleClick = () => {
      open()
    }

    return React.createElement(
      as as string,
      {
        className,
        disabled: !ready,
        ref,
        ...otherProps,
        onClick: handleClick,
        onLoad,
      },
      children
    )
  })

export default LinkLauncher
