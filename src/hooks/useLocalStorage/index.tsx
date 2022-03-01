import * as React from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        if (valueToStore) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } else {
          window.localStorage.removeItem(key)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

export default useLocalStorage
