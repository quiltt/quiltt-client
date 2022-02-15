import * as React from 'react'
import type {
  PlaidLinkOnEvent,
  PlaidLinkOnEventMetadata,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
  PlaidLinkOptionsWithLinkToken,
} from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'

import {
  PlaidLinkTokenCreateInput,
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
} from '../../types'
import type { CustomComponentProps } from '../../utils/components'

import usePlaidLinkTokenCreate, { LinkCreateParams } from './usePlaidLinkTokenCreate'

export type PlaidLinkButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  PlaidLinkTokenCreateInput & {
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({
  className = '',
  as = 'button',
  children = 'Connect with Plaid',
  accountFilters,
  linkCustomizationName,
  products,
  onSuccess,
  onEvent = undefined,
  onExit = undefined,
  onLoad = undefined,
  id,
  ...otherProps
}) => {
  const [inactive, setInactive] = React.useState(false)
  const [token, setToken] = React.useState<string | null>(null)

  const handlePlaidTokenCreated = (data: PlaidLinkTokenCreateMutation) => {
    const { record, errors } = data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload
    if (errors)
      errors.map((error) => {
        throw new Error(`${error.code}: ${error.message}`)
      })

    if (record) {
      setToken(record.linkToken)
    }
  }

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

  const { generatePlaidLinkToken } = usePlaidLinkTokenCreate({
    accountFilters,
    linkCustomizationName,
    products,
    onCompleted: handlePlaidTokenCreated,
  } as LinkCreateParams)

  const config: PlaidLinkOptionsWithLinkToken = {
    token,
    onSuccess,
    onEvent: handleEvent,
    onExit,
    onLoad,
  }

  const { open, ready, error, exit } = usePlaidLink(config)

  const handleClick = () => {
    open()
  }

  const disabled = !ready || !token

  React.useEffect(() => {
    generatePlaidLinkToken()
  }, [generatePlaidLinkToken])

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

  return React.createElement(
    as as string,
    {
      className,
      disabled,
      id: id ? `plaid-connect-${id}` : undefined,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default PlaidLinkButton
