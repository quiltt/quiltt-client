import * as React from 'react'
import type {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
} from 'react-plaid-link'
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'

export type LinkLauncherProps = PlaidLinkOptions & {
  token: string
  onSuccess: PlaidLinkOnSuccess
  onExit?: PlaidLinkOnExit
  onEvent?: PlaidLinkOnEvent
  onLoad?: PlaidLinkOnLoad
}

const LinkLauncher: React.FC<LinkLauncherProps> = ({
  onSuccess,
  onExit,
  onEvent,
  onLoad,
  token,
  children,
  ...buttonProps
}) => {
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

  return (
    <button disabled={!ready} type="button" onClick={handleClick} onLoad={onLoad} {...buttonProps}>
      {children}
    </button>
  )
}

export default LinkLauncher
