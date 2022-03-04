// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : (JSON.parse(value ?? '') as T)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('parsing error on', { value })
    return undefined
  }
}

export default parseJSON
