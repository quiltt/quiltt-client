import * as React from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link'

import {
  PlaidLinkAccountFiltersInput,
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
  usePlaidLinkTokenCreateMutation,
} from '../../types/quiltt'
import type { CustomComponentProps } from '../../utils/components'

import PlaidLinkLauncherWrapper from './PlaidLinkLauncherWrapper'

type PlaidProduct = 'transactions' | 'auth' | 'liabilities' | 'investments'

type PlaidNewConnectionButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    linkAccountFilters: PlaidLinkAccountFiltersInput
    linkProducts: PlaidProduct[]
    linkCustomizationName?: string
    itemId: string
    children: React.ReactChildren
    onSuccess: PlaidLinkOnSuccess
  }

const PlaidNewConnectionButton: React.FC<PlaidNewConnectionButtonProps> = ({
  as = 'button',
  className = '',
  linkAccountFilters,
  linkProducts,
  linkCustomizationName,
  itemId,
  children,
  onSuccess,
  ...otherProps
}) => {
  const [linkToken, setLinkToken] = React.useState<string | null>(null)
  const [createLinkToken, { called, error }] = usePlaidLinkTokenCreateMutation({
    variables: {
      input: {
        accountFilters: linkAccountFilters,
        linkCustomizationName,
        products: linkProducts,
        countryCodes: ['US'],
      },
    },
    onCompleted(data: PlaidLinkTokenCreateMutation) {
      const { record, errors } = data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload

      if (errors) {
        // errors.map((err) => {
        //   throw new Error(`${err.code}: ${err.message}`)
        // })
        console.error(error)
      }

      if (record) {
        setLinkToken(record.linkToken)
      }
    },
  })

  React.useEffect(() => {
    if (!called && !linkToken) {
      createLinkToken()
    }
  }, [called, createLinkToken, linkToken])

  if (error) throw error

  if (!linkToken) {
    return React.createElement(
      as as string,
      {
        className,
        id: `plaid-new-connection-${itemId}`,
        disabled: true,
        ...otherProps,
      },
      children
    )
  }

  return (
    <PlaidLinkLauncherWrapper token={linkToken} onSuccess={onSuccess}>
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
    </PlaidLinkLauncherWrapper>
  )
}

export default PlaidNewConnectionButton
