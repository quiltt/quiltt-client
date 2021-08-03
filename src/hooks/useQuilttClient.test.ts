import { renderHook } from '@testing-library/react-hooks'

import useQuilttClient from './useQuilttClient'

test('should return apollo client', () => {
  const client = renderHook(() => useQuilttClient(null))

  expect(client.result.current.cache).toBeDefined()
  expect(client.result.current.link).toBeDefined()
  expect(client.result.current.version).toBeDefined()
  expect(client.result.current.defaultOptions).toBeDefined()
})
