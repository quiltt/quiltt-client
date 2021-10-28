import { renderHook } from '@testing-library/react-hooks'

import useLocalStorage from '.'

test('should return value from local storage', () => {
  const storage = renderHook(() => {
    const [authorizationToken, setAuthorizationToken] = useLocalStorage<string | null>(
      'QUILTT_SESSION',
      null
    )

    expect(authorizationToken).toBeNull()
    expect(setAuthorizationToken).toBeDefined()

    return [authorizationToken, setAuthorizationToken]
  })

  expect(storage.result.current).toBeDefined()
})
