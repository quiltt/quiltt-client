import { renderHook } from '@testing-library/react-hooks'

import useQuilttLink from './useQuilttLink'

test('should return quiltt apollo link', () => {
  const link = renderHook(() => useQuilttLink(''))

  expect(link.result.current).toBeDefined()
})
