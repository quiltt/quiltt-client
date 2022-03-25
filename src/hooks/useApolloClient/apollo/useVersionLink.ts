import { setContext } from '@apollo/client/link/context'

import * as packageJson from '../../../../package.json'
import useQuilttSettings from '../../contexts/useQuilttSettings'

const useVersionLink = () => {
  const settings = useQuilttSettings()
  const apiVersion = settings?.apiVersion

  return setContext((_, { headers }: { headers: Headers }) =>
    apiVersion
      ? {
          headers: {
            ...headers,
            'Quiltt-Version': apiVersion,
            'Quiltt-Client-Version': packageJson
              ? `${packageJson.name}: ${packageJson.version}`
              : undefined,
          },
        }
      : {
          headers: {
            ...headers,
            'Quiltt-Client-Version': `${packageJson.name}: v${packageJson.version}`,
          },
        }
  )
}

export default useVersionLink
