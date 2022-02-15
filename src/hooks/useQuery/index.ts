import { ApolloClient, useQuery as useApolloQuery } from '@apollo/client'

import useQuilttQueryClient from '../contexts/useQuilttQueryClient'

const useQuery = () => {
  const { client } = useQuilttQueryClient()

  if (client instanceof ApolloClient) {
    return useApolloQuery
  }
  return useApolloQuery
}

export default useQuery
