import { renderHook } from '@testing-library/react-hooks'

import useErrorLink from './useErrorLink'

test('should return apollo error link', () => {
  const link = renderHook(() => useErrorLink())

  expect(link.result.current).toBeDefined()
})
