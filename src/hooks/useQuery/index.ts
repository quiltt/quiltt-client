import { gql, QueryResult, useQuery as useApolloQuery } from '@apollo/client'
import { useQuery as useUrqlQuery, UseQueryResponse } from 'urql'

import type { QueryClients } from '../useQuilttClient'

const useQuery = (client: QueryClients, query: string, variables: { [key: string]: any } = {}) => {
  switch (client) {
    case 'apollo':
      const { loading, error, data, refetch, networkStatus } = useApolloQuery(gql(query), {
        variables,
      })
      return { loading, error, data, refetch, networkStatus } as QueryResult
    case 'urql':
      const [result, reexecuteQuery] = useUrqlQuery({ query, variables })
      return [result, reexecuteQuery] as UseQueryResponse
  }
}

export default useQuery
