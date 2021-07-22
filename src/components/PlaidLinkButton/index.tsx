import * as React from 'react'
import { gql, useMutation } from '@apollo/client'
import PlaidLink from './PlaidLink'

const CREATE_PLAID_LINK_TOKEN = gql`
  mutation plaidLinkTokenCreate($input: PlaidLinkTokenCreateInput!) {
    plaidLinkTokenCreate(input: $input) {
      success
      record {
        linkToken
        expiration
      }
    }
  }
`

type PlaidLinkButtonProps = {}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = (props) => {
  const [linkToken, setLinkToken] = React.useState<string | undefined>()
  const [create] = useMutation(CREATE_PLAID_LINK_TOKEN, {
    variables: { input: { products: ['transactions'] } },
    onCompleted: (result) => {
      setLinkToken(result.plaidLinkTokenCreate.record.linkToken)
    },
  })

  React.useEffect(() => {
    if (!linkToken) create()
  }, [linkToken, create])

  if (!linkToken) {
    return (
      <button type="button" disabled {...props}>
        Loading...
      </button>
    )
  }

  return <PlaidLink linkToken={linkToken} {...props} />
}

export default PlaidLinkButton
