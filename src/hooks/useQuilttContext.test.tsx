import { renderHook } from '@testing-library/react-hooks'

import useQuilttContext from './useQuilttContext'

test('should return value from local storage', () => {
  const context = renderHook(() => {
    const { authorizationToken, setAuthorizationToken } = useQuilttContext()

    expect(authorizationToken).toBeNull()
    expect(setAuthorizationToken).toBeDefined()

    return [authorizationToken, setAuthorizationToken]
  })

  expect(context.result.current).toBeDefined()
})
