import { ApolloLink, GraphQLRequest } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const useAuthLink = (token: string | null): ApolloLink =>
  setContext((_: GraphQLRequest, { headers }: any) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    } as Headers,
  }))

export default useAuthLink
