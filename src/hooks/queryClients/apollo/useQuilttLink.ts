import { ApolloLink } from '@apollo/client'

import useAuthLink from './useAuthLink'
import useBatchLink from './useBatchLink'
import useErrorLink from './useErrorLink'
import usePreviewLink from './usePreviewLink'
import useSubscriptionsLink from './useSubscriptionsLink'
import useVersionLink from './useVersionLink'

const useQuilttLink = () => {
  const versionLink = useVersionLink()
  const errorLink = useErrorLink()
  const authLink = useAuthLink()
  const subscriptionsLink = useSubscriptionsLink()
  const previewLink = usePreviewLink()
  const batchLink = useBatchLink()

  const quilttLink = ApolloLink.from([
    versionLink,
    errorLink,
    authLink,
    subscriptionsLink,
    previewLink,
    batchLink,
  ])

  return quilttLink
}

export default useQuilttLink
