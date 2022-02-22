import * as React from 'react'
import type {
  PlaidLinkError,
  PlaidLinkOnEvent,
  PlaidLinkOnEventMetadata,
  PlaidLinkOnExit,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
  PlaidLinkOptionsWithLinkToken,
} from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'

import type {
  PlaidLinkTokenCreateForUpdateMutation,
  PlaidLinkTokenCreateForUpdatePayload,
  PlaidLinkTokenCreateInput,
} from '../../types/quiltt'
import type { CustomComponentProps } from '../../utils/components'
import DefaultLoadingComponent from '../DefaultLoadingComponent'

import useLinkTokenUpdate, { LinkUpdateParams } from './usePlaidLinkTokenUpdate'

export type PlaidLinkButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  PlaidLinkTokenCreateInput & {
    plaidItemId: string
    countryCodes: string[]
    loadingComponent?: React.ReactElement
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

const PlaidLinkReconnectButton: React.FC<PlaidLinkButtonProps> = ({
  className = '',
  as = 'button',
  children = 'Reconnect with Plaid',
  accountFilters,
  linkCustomizationName,
  products,
  plaidItemId,
  countryCodes = ['US'],
  loadingComponent = <DefaultLoadingComponent />,
  onSuccess,
  onEvent = undefined,
  onExit = undefined,
  onLoad = undefined,
  ...otherProps
}) => {
  const [inactive, setInactive] = React.useState(false)
  const [token, setToken] = React.useState<string | null>(null)

  const handleEvent = React.useCallback(
    (event: string, metadata: PlaidLinkOnEventMetadata) => {
      if (onEvent) {
        onEvent(event, metadata)
        if (event === 'OPEN') {
          setInactive(true)
        }
      } else if (event === 'OPEN') {
        setInactive(true)
      }
    },
    [onEvent]
  )

  const handleCompleted = React.useCallback((data: PlaidLinkTokenCreateForUpdateMutation) => {
    const { record, errors } =
      data.plaidLinkTokenCreateForUpdate as PlaidLinkTokenCreateForUpdatePayload

    if (errors) {
      errors.map((err) => {
        throw new Error(`Plaid Link Error: ${err.message}`)
      })
    }

    if (record) {
      setToken(record.linkToken)
    }
  }, [])

  const {
    generatePlaidLinkToken,
    called,
    error: linkError,
  } = useLinkTokenUpdate({
    plaidItemId,
    countryCodes,
    onCompleted: handleCompleted,
  } as LinkUpdateParams)

  const handleExit = React.useCallback(
    (error: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => {
      if (onExit) {
        onExit(error, metadata)
      }
      if (error) {
        throw new Error(`Plaid Link Error: ${error.error_message}`)
      }
    },
    [onExit]
  ) as PlaidLinkOnExit

  const config: PlaidLinkOptionsWithLinkToken = {
    token,
    onSuccess,
    onEvent: handleEvent,
    onExit: handleExit,
    onLoad,
  }

  const { open, ready, error, exit } = usePlaidLink(config)

  const handleClick = () => {
    open()
  }

  const disabled = !ready

  React.useEffect(() => {
    if (!called && !token) {
      generatePlaidLinkToken()
    }
  }, [generatePlaidLinkToken, called, token])

  React.useEffect(() => {
    if (error) {
      throw new Error(`Plaid Link Error: ${error.message}`)
    }
  }, [error])

  // Auto close modal after 10 seconds
  React.useEffect(() => {
    if (inactive) {
      setTimeout(() => {
        exit()
      }, 10000)
    }
  })

  if (linkError) {
    throw new Error(`Plaid Link Error: ${linkError.message}`)
  }

  if (!token) return loadingComponent

  return React.createElement(
    as as string,
    {
      className,
      disabled,
      id: `plaid-reconnect-${plaidItemId}`,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default PlaidLinkReconnectButton
