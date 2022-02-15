import { BatchHttpLink } from '@apollo/client/link/batch-http'
import fetch from 'cross-fetch'

import useQuilttDeployment from '../../contexts/useQuilttDeployment'

const useBatchLink = () => {
  const { apiEndpoint } = useQuilttDeployment()

  return new BatchHttpLink({
    uri: apiEndpoint.toString(),
    fetch,
  })
}

export default useBatchLink
