import { setContext } from '@apollo/client/link/context'

import useQuilttAuth from '../../contexts/useQuilttAuth'

const useAuthLink = () => {
  const { authorizationToken } = useQuilttAuth()

  return setContext((_, { headers }: { headers: Headers }) => ({
    headers: {
      ...headers,
      authorization: authorizationToken ? `Bearer ${authorizationToken}` : undefined,
    },
  }))
}

export default useAuthLink
