import {
  InputMaybe,
  PlaidLinkAccountFiltersInput,
  PlaidLinkTokenCreateMutation,
  usePlaidLinkTokenCreateMutation,
} from '../../types'

enum AvailableProducts {
  Auth = 'auth',
  Identity = 'identity',
  Income = 'income',
  Transactions = 'transactions',
  Assets = 'assets',
  Liabilities = 'liabilities',
  Investments = 'investments',
}

type AccountFilters = InputMaybe<PlaidLinkAccountFiltersInput> | undefined
type LinkCustomizationName = InputMaybe<string> | undefined
type Products = AvailableProducts[]

export type LinkCreateParams = {
  accountFilters?: AccountFilters
  linkCustomizationName?: LinkCustomizationName
  products?: Products
  onCompleted: (data: PlaidLinkTokenCreateMutation) => void
}

const useLinkTokenCreate = ({
  accountFilters = undefined,
  linkCustomizationName = undefined,
  products = [],
  onCompleted,
}: LinkCreateParams) => {
  const [generatePlaidLinkToken, { data, called, loading, error }] =
    usePlaidLinkTokenCreateMutation({
      variables: {
        input: {
          accountFilters,
          linkCustomizationName,
          products,
        },
      },
      onCompleted,
    })

  return { generatePlaidLinkToken, data, called, loading, error }
}

export default useLinkTokenCreate
