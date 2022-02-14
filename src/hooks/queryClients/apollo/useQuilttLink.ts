import { ApolloLink } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import fetch from 'cross-fetch'

import { DEFAULT_API_ENDPOINT } from '../../../constants'
import useQuilttDeployment from '../../contexts/useQuilttDeployment'

import useAuthLink from './useAuthLink'
import useErrorLink from './useErrorLink'
import usePreviewLink from './usePreviewLink'

const useQuilttLink = (token: string) => {
  const { apiEndpoint } = useQuilttDeployment()
  const errorLink = useErrorLink()
  const authLink = useAuthLink(token)
  const previewLink = usePreviewLink(apiEndpoint?.toString() ?? DEFAULT_API_ENDPOINT)
  const batchLink = new BatchHttpLink({
    uri: apiEndpoint?.toString() ?? DEFAULT_API_ENDPOINT,
    fetch,
  })

  const quilttLink = ApolloLink.from([errorLink, authLink, previewLink, batchLink])

  return quilttLink
}

export default useQuilttLink
