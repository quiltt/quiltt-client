import * as React from 'react'
import type {
  PlaidLinkError,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
} from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'

type LinkLauncherWrapperChildProps = {
  onClick: () => void
  disabled: boolean
}

type LinkLauncherWrapperProps = {
  token: string
  children: React.FC<LinkLauncherWrapperChildProps>
  onSuccess: PlaidLinkOnSuccess
  onExit?: (err: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => void
  onLoad?: PlaidLinkOnLoad
}

const LinkLauncherWrapper: React.FC<LinkLauncherWrapperProps> = ({
  token,
  onLoad,
  onSuccess,
  onExit,
  children,
}) => {
  const config = {
    token,
    onSuccess,
    onLoad,
    onExit,
  } as PlaidLinkOptions

  const { open, ready, error } = usePlaidLink(config)

  if (error) {
    // throw new Error(`${error.error} ${error.message}`)
    console.error(error)
  }

  return children({
    onClick: () => open() as () => void,
    disabled: !ready,
  })
}

export default LinkLauncherWrapper
