import type { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { renderHook } from '@testing-library/react-hooks'
import type { Client } from '@urql/core'

import useQuilttClient from '.'

test('should return apollo client', () => {
  const apolloClientHook = renderHook(() => useQuilttClient(null, 'apollo'))
  const apolloClient = apolloClientHook.result.current as ApolloClient<NormalizedCacheObject>

  if (apolloClient) {
    expect(apolloClient.cache).toBeDefined()
    expect(apolloClient.link).toBeDefined()
    expect(apolloClient.version).toBeDefined()
    expect(apolloClient.defaultOptions).toBeDefined()
  }

  const urqlClientHook = renderHook(() => useQuilttClient(null, 'urql'))
  const urqlClient = urqlClientHook.result.current as Client

  if (urqlClient) {
    expect(urqlClient.fetchOptions).toBeDefined()
    expect(urqlClient.maskTypename).toBeDefined()
    expect(urqlClient.suspense).toBeDefined()
  }
})
