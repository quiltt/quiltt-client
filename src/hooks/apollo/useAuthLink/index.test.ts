import { renderHook } from '@testing-library/react-hooks'

import useAuthLink from '.'

test('should return apollo auth link', () => {
  const link = renderHook(() => useAuthLink(null))

  expect(link.result.current).toBeDefined()
})
