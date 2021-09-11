import { renderHook } from '@testing-library/react-hooks'

import usePreviewLink from '.'

test('should return apollo preview link', () => {
  const link = renderHook(() => usePreviewLink(''))

  expect(link.result.current).toBeDefined()
})
