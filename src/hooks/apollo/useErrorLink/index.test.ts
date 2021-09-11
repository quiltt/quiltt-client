import { renderHook } from '@testing-library/react-hooks'

import useErrorLink from '.'

test('should return apollo error link', () => {
  const link = renderHook(() => useErrorLink())

  expect(link.result.current).toBeDefined()
})
