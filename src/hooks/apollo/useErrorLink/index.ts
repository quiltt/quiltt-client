import { onError } from '@apollo/client/link/error'

const useErrorLink = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => {
        console.error(
          `[GraphQL error]: Message: ${error.message},
          Location: ${error.locations},
          Path: ${error.path}`
        )

        return error
      })
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  return errorLink
}

export default useErrorLink
