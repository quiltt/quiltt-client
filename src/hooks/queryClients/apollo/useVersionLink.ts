import { setContext } from '@apollo/client/link/context'

import useQuilttDeployment from '../../contexts/useQuilttDeployment'

const useVersionLink = () => {
  const { apiVersion } = useQuilttDeployment()
  return setContext((_, { headers }: { headers: Headers }) => {
    if (apiVersion) {
      headers['Quiltt-Version'] = apiVersion
    }

    return { headers: { ...headers } }
  })
}

export default useVersionLink
