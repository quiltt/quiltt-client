import type { GraphQLRequest } from '@apollo/client'
import { ApolloLink } from '@apollo/client'

const useAuthLink = (token?: string): ApolloLink =>
  new ApolloLink((operation, forward) => {
    operation.setContext((_: GraphQLRequest, { headers }: any) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : undefined,
      } as Headers,
    }))
    return forward(operation)
  })

export default useAuthLink
