import { PlaidLinkTokenCreateMutation, usePlaidLinkTokenCreateForUpdateMutation } from '../../types'

type PlaidItemId = string
type CountryCodes = string[]

export type LinkUpdateParams = {
  plaidItemId?: PlaidItemId
  countryCodes?: CountryCodes
  onCompleted: (data: PlaidLinkTokenCreateMutation) => void
}

const useLinkTokenUpdate = ({
  plaidItemId = '',
  countryCodes = ['US'],
  onCompleted,
}: LinkUpdateParams) => {
  const [generatePlaidLinkToken, { data, loading, called, error }] =
    usePlaidLinkTokenCreateForUpdateMutation({
      variables: {
        input: {
          plaidItemId,
          countryCodes,
        },
      },
      onCompleted,
    })

  return { generatePlaidLinkToken, data, loading, called, error }
}

export default useLinkTokenUpdate
