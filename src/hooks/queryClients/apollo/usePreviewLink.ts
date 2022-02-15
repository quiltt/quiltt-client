import { ApolloLink, HttpLink } from '@apollo/client'
import fetch from 'cross-fetch'

import useQuilttSettings from '../../contexts/useQuilttSettings'

// If request is a preview mutation, then terminates chain and directly calls
// the api with the preview header set. Any requests made in preview mode will
// be rolled back.
const usePreviewLink = () => {
  const { apiEndpoint } = useQuilttSettings()

  const previewLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext()

    operation.setContext({
      headers: {
        ...context.headers,
        'Quiltt-Preview': true,
      } as Headers,
    })

    return forward(operation)
  })

  const httpLink = new HttpLink({ uri: apiEndpoint.toString(), fetch })

  const forwardableLink = new ApolloLink((operation, forward) => forward(operation))

  return ApolloLink.split(
    (operation) => operation.getContext().preview as boolean,
    ApolloLink.from([previewLink, httpLink]),
    forwardableLink
  )
}

export default usePreviewLink
