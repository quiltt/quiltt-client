import { renderHook } from '@testing-library/react-hooks'

import useLocalStorage from './useLocalStorage'

test('should return value from local storage', () => {
  const storage = renderHook(() => {
    const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
      'QUILTT_TOKEN',
      null
    )

    expect(authorizationToken).toBeNull()
    expect(setAuthorizationToken).toBeDefined()

    return [authorizationToken, setAuthorizationToken]
  })

  expect(storage.result.current).toBeDefined()
})
