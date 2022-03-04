import type { ServerError } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import useQuilttAuth from '../../contexts/useQuilttAuth'

const useErrorLink = () => {
  const { resetSession } = useQuilttAuth()

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map((error) => {
        console.warn(`[GraphQL error]: Message: ${error.message}`)

        return error
      })
    }

    if (networkError) {
      // @see: https://www.apollographql.com/docs/react/networking/advanced-http-networking/#customizing-response-logic
      // if (networkError.statusCode === 401) {
      if (networkError && (networkError as ServerError).statusCode === 401) {
        resetSession()
      } else {
        console.warn('[Network error]:', networkError)
        throw new Error(networkError.message)
      }
    }
  })

  return errorLink
}

export default useErrorLink
