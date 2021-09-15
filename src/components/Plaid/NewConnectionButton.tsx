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

type PlaidProduct = 'transactions' | 'auth' | 'liabilities' | 'investments'

type Props = {
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

const NewConnectionButton: React.FC<Props> = ({
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
}) => {
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

  React.useEffect(() => {
    if (!called && !linkToken) {
      createLinkToken()
    }
  }, [])

  if (error) throw error

  if (!linkToken) return null

  const config = {
    token: linkToken,
    onSuccess,
    onLoad,
    onExit,
  } as PlaidLinkOptions

  const { open, ready, error: plaidLinkError } = usePlaidLink(config)

  if (plaidLinkError) throw new Error(plaidLinkError.message)

  return (
    <button type="button" id={id} onClick={() => open()} disabled={!ready} {...otherProps}>
      {children}
    </button>
  )
}

export default NewConnectionButton
