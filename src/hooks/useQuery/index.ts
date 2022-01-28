import { gql, QueryResult, useQuery as useApolloQuery } from '@apollo/client'

const useQuery = (query: string, variables: { [key: string]: any } = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { loading, error, data, refetch, networkStatus } = useApolloQuery(gql(query), {
    variables,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { loading, error, data, refetch, networkStatus } as QueryResult<typeof data>
}

export default useQuery
