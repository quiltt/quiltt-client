import * as React from 'react'

import type {
  PlaidLinkError,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
} from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'

interface LinkLauncherWrapperChildProps {
  onClick: () => void
  disabled: boolean
}
interface LinkLauncherWrapperProps {
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

  if (error) throw new Error(`${error.error} ${error.message}`)

  return children({
    onClick: () => open(),
    disabled: !ready,
  })
}

export default LinkLauncherWrapper
