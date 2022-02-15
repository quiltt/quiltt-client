import { setContext } from '@apollo/client/link/context'

import useQuilttSettings from '../../contexts/useQuilttSettings'

const useVersionLink = () => {
  const { apiVersion } = useQuilttSettings()
  return setContext((_, { headers }: { headers: Headers }) => {
    if (apiVersion) {
      headers['Quiltt-Version'] = apiVersion
    }

    return { headers: { ...headers } }
  })
}

export default useVersionLink
