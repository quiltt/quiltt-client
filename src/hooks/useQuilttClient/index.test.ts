import { renderHook } from '@testing-library/react-hooks'

import useQuilttClient from '.'

test('should return apollo client', () => {
  const apolloClientHook = renderHook(() => useQuilttClient(null))
  const apolloClient = apolloClientHook.result.current

  if (apolloClient) {
    expect(apolloClient.cache).toBeDefined()
    expect(apolloClient.link).toBeDefined()
    expect(apolloClient.version).toBeDefined()
    expect(apolloClient.defaultOptions).toBeDefined()
  }
})
