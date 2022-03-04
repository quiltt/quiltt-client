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
  ConnectorPlaidInitializeInput,
  ConnectorPlaidInitializeMutation,
  ConnectorPlaidInitializePayload,
  useConnectorPlaidInitializeMutation,
} from '../../types/queries'
import type { CustomComponentProps } from '../../utils/components'

export type PlaidReconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  ConnectorPlaidInitializeInput & {
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

const PlaidReconnectButton: React.FC<PlaidReconnectButtonProps> = ({
  className = '',
  as = 'button',
  children = 'Repair Connection with Plaid',
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

  const handlePlaidTokenCreated = (data: ConnectorPlaidInitializeMutation) => {
    const { record, errors } = data.connectorPlaidInitialize as ConnectorPlaidInitializePayload
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

  const [generateLinkToken, { called }] = useConnectorPlaidInitializeMutation({
    variables: {
      input: {
        accountFilters,
        linkCustomizationName,
        products,
        connectionId: id,
        countryCodes: ['US'],
      },
    },
    onCompleted: handlePlaidTokenCreated,
  })

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
    if (!called && !token && generateLinkToken) {
      generateLinkToken()
    }
  }, [called, token, generateLinkToken])

  React.useEffect(() => {
    if (error) {
      throw new Error(`Plaid Link Error: ${error.message}`)
    }
  }, [error])

  // Auto close modal after 10 seconds of inactivity
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
      id: id ? `plaid-reconnect-${id}` : undefined,
      onClick: handleClick,
      ...otherProps,
    },
    children
  )
}

export default PlaidReconnectButton
