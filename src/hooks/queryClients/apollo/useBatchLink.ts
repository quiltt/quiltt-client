import { BatchHttpLink } from '@apollo/client/link/batch-http'
import fetch from 'cross-fetch'

import useQuilttSettings from '../../contexts/useQuilttSettings'

const useBatchLink = () => {
  const { apiBase } = useQuilttSettings()

  const apiEndpoint = apiBase ? `${apiBase}/v1/graphql` : ''

  return new BatchHttpLink({
    uri: apiEndpoint.toString(),
    fetch,
  })
}

export default useBatchLink
