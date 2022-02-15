import { setContext } from '@apollo/client/link/context'

import useQuilttAuth from '../../contexts/useQuilttAuth'

const useAuthLink = () => {
  const { token } = useQuilttAuth()

  return setContext((_, { headers }: { headers: Headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    },
  }))
}

export default useAuthLink
