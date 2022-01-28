import { onError } from '@apollo/client/link/error'

const useErrorLink = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => {
        const locations = error?.locations !== undefined ? error.locations : []
        const path = error?.path !== undefined ? error.path : []
        console.error(
          `[GraphQL error]: Message: ${error.message},
          Location: ${locations
            .map((location) => `${location.line}:${location.column}`)
            .join(', ')},
          Path: ${path.map((singlePath) => singlePath).join(', ')}`
        )

        return error
      })
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError.message}`)
    }
  })

  return errorLink
}

export default useErrorLink
