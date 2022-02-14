import * as React from 'react'
import type {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
} from 'react-plaid-link'

import type {
  PlaidLinkTokenCreateInput,
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
} from '../../types/quiltt'
import { usePlaidLinkTokenCreateMutation } from '../../types/quiltt'
import type { CustomComponentProps } from '../../utils/components'

import PlaidLinkLauncher from './PlaidLinkLauncher'

export type PlaidLinkButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  PlaidLinkTokenCreateInput & {
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

export const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({
  as = 'button',
  className = '',
  products,
  linkCustomizationName,
  accountFilters,
  children,
  onSuccess,
  onEvent,
  onLoad = undefined,
  ...otherProps
}) => {
  const [linkToken, setLinkToken] = React.useState<string | null>(null)

  const handlePlaidTokenCreated = (data: PlaidLinkTokenCreateMutation) => {
    const { record, errors } = data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload
    if (errors)
      errors.map((error) => {
        throw new Error(`${error.code}: ${error.message}`)
      })

    if (record) {
      setLinkToken(record.linkToken)
    }
  }

  const [createLinkToken] = usePlaidLinkTokenCreateMutation({
    variables: {
      input: {
        accountFilters,
        linkCustomizationName,
        products,
      },
    },
    onCompleted: handlePlaidTokenCreated,
  })

  React.useEffect(() => {
    createLinkToken()
  }, [createLinkToken])

  if (!linkToken) {
    return React.createElement(
      as as string,
      {
        className,
        disabled: true,
        ...otherProps,
      },
      children
    )
  }

  return (
    <PlaidLinkLauncher
      token={linkToken}
      onLoad={onLoad}
      onSuccess={onSuccess}
      onEvent={onEvent}
      {...otherProps}
    >
      {(props) =>
        React.createElement(
          as as string,
          {
            className,
            ...otherProps,
            ...props,
          },
          children
        )
      }
    </PlaidLinkLauncher>
  )
}

export default PlaidLinkButton
