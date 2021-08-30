import { renderHook } from '@testing-library/react-hooks'

import useQuilttAuth from '.'

test('should return quiltt auth API', () => {
  const client = renderHook(() => useQuilttAuth('1'))

  expect(client.result.current.authenticate).toBeDefined()
  expect(client.result.current.identify).toBeDefined()
  expect(client.result.current.ping).toBeDefined()
  expect(client.result.current.revoke).toBeDefined()
})
