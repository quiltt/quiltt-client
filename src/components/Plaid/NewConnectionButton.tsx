import * as React from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link'

import {
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
  usePlaidLinkTokenCreateMutation,
} from '../../types'

import LinkLauncherWrapper from './LinkLauncherWrapper'

type PlaidProduct = 'transactions' | 'auth' | 'liabilities' | 'investments'

type Props = {
  linkAccountFilters: any
  linkProducts: PlaidProduct[]
  linkCustomizationName?: string
  buttonId: string
  children: React.ReactChildren
  onSuccess: PlaidLinkOnSuccess
}

const NewConnectionButton: React.FC<Props> = ({
  linkAccountFilters,
  linkProducts,
  linkCustomizationName,
  buttonId,
  children,
  onSuccess,
}) => {
  const [linkToken, setLinkToken] = React.useState<string | null>()
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
      const { record, errors } =
        data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload

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

  return (
    <LinkLauncherWrapper token={linkToken} onSuccess={onSuccess}>
      {(props) => (
        <button id={buttonId} type="button" {...props}>
          {children}
        </button>
      )}
    </LinkLauncherWrapper>
  )
}

export default NewConnectionButton
