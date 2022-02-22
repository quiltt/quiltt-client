import type { AvailablePlaidProducts } from '../../types'
import type {
  InputMaybe,
  PlaidLinkAccountFiltersInput,
  PlaidLinkTokenCreateMutation,
} from '../../types/quiltt'
import { usePlaidLinkTokenCreateMutation } from '../../types/quiltt'

type AccountFilters = InputMaybe<PlaidLinkAccountFiltersInput> | undefined
type LinkCustomizationName = InputMaybe<string> | undefined
type Products = AvailablePlaidProducts[]

export type LinkCreateParams = {
  accountFilters?: AccountFilters
  linkCustomizationName?: LinkCustomizationName
  products?: Products
  onCompleted: (data: PlaidLinkTokenCreateMutation) => void
}

const usePlaidLinkTokenCreate = ({
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

export default usePlaidLinkTokenCreate
