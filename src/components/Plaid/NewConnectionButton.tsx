import * as React from 'react'
import {
  PlaidLinkError,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link'

import {
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
  usePlaidLinkTokenCreateMutation,
} from '../../types'
import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

type PlaidProduct = 'transactions' | 'auth' | 'liabilities' | 'investments'

type NewConnectionButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    id: string
    token: string
    accountFilters: any
    linkCustomizationName?: string
    children: React.ReactNode
    products: PlaidProduct[]
    onSuccess: PlaidLinkOnSuccess
    onExit?: (err: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => void
    onLoad?: PlaidLinkOnLoad
  }

type Ref = React.ReactNode | HTMLElement | string

const NewConnectionButton: CustomComponentRefForwardingComponent<
  'button',
  NewConnectionButtonProps
> = React.forwardRef<Ref, NewConnectionButtonProps>(function NewConnectionButton(props, ref) {
  const {
    as = 'button',
    id,
    token,
    accountFilters,
    products,
    linkCustomizationName,
    children,
    onSuccess,
    onExit = undefined,
    onLoad = undefined,
    ...otherProps
  } = props
  const [linkToken, setLinkToken] = React.useState<string | null>(null)
  const [createLinkToken, { called, error }] = usePlaidLinkTokenCreateMutation({
    variables: {
      input: {
        accountFilters,
        linkCustomizationName,
        products,
        countryCodes: ['US'],
      },
    },
    onCompleted(data: PlaidLinkTokenCreateMutation) {
      const { record, errors } = data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload

      if (errors) {
        errors.map((err) => {
          throw new Error(`${err.code}: ${err.message}`)
        })
      }

      if (record) {
        setLinkToken(record.linkToken)
      }
    },
  })

  const config = {
    token: linkToken,
    onSuccess,
    onLoad,
    onExit,
  } as PlaidLinkOptions

  const { open, ready, error: plaidLinkError } = usePlaidLink(config)

  React.useEffect(() => {
    if (!called && !linkToken) {
      createLinkToken()
    }
  })

  if (plaidLinkError) throw new Error(plaidLinkError.message)
  if (error) throw error

  if (!linkToken) return null

  return React.createElement(
    as as string,
    {
      ref,
      id: id,
      disabled: !ready,
      onClick: () => open(),
      ...otherProps,
    },
    children
  )
})

export default NewConnectionButton
