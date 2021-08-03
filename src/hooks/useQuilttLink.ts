import { ApolloLink } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import fetch from 'cross-fetch'

import useAuthLink from './useAuthLink'
import useErrorLink from './useErrorLink'
import usePreviewLink from './usePreviewLink'

const graphqlEndpoint = new URL('v1/graphql', 'https://api.quiltt.io')

const useQuilttLink = (token: string | null) => {
  const errorLink = useErrorLink()
  const authLink = useAuthLink(token)
  const previewLink = usePreviewLink(graphqlEndpoint.toString())
  const batchLink = new BatchHttpLink({ uri: graphqlEndpoint.toString(), fetch })

  const quilttLink = ApolloLink.from([errorLink, authLink, previewLink, batchLink])

  return quilttLink
}

export default useQuilttLink
