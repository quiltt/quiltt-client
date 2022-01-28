import * as React from 'react'
import type {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
} from 'react-plaid-link'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

type LinkLauncherChildProps = {
  onClick: () => void
  disabled: boolean
}

type LinkLauncherProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  PlaidLinkOptions & {
    token: string
    children: React.FC<LinkLauncherChildProps>
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

type Ref = React.ReactNode | HTMLElement | string

const LinkLauncher: CustomComponentRefForwardingComponent<'button', LinkLauncherProps> =
  React.forwardRef<Ref, LinkLauncherProps>((props, ref) => {
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

    const config = {
      token,
      onSuccess,
      onExit,
      onEvent,
      onLoad,
    } as PlaidLinkOptions

    const { open, ready, error } = usePlaidLink(config)

    if (error) {
      // throw new Error(`${error.error} ${error.message}`)
      console.error(error)
    }

    const handleClick = () => {
      open()
    }

    return React.createElement(
      as as string,
      {
        className,
        disabled: !ready,
        ref,
        onClick: handleClick,
        onLoad,
        ...otherProps,
      },
      children
    )
  })

export default LinkLauncher
