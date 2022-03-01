import * as React from 'react'
import { PlaidLinkOnSuccess } from 'react-plaid-link'

import {
  ConnectorPlaidInitializeMutation,
  ConnectorPlaidInitializePayload,
  useConnectorPlaidInitializeMutation,
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
  const [linkToken, setLinkToken] = React.useState<string | null>(null)
  const [createLinkToken, { called, error }] = useConnectorPlaidInitializeMutation({
    variables: {
      input: {
        accountFilters: linkAccountFilters,
        linkCustomizationName,
        products: linkProducts,
        countryCodes: ['US'],
      },
    },
    onCompleted(data: ConnectorPlaidInitializeMutation) {
      const { record, errors } = data.connectorPlaidInitialize as ConnectorPlaidInitializePayload

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
