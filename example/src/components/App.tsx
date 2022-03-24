import * as React from 'react'
import { useQuilttAuth, useQuery, gql } from '@quiltt/client'
import Auth from './Auth'

const App: React.FC = () => {
  const auth = useQuilttAuth()
  const { authorizationToken } = auth
  const CONNECTIONS_QUERY = gql`
    query Connections {
      connections {
        id
      }
    }
  `
  const { data, loading, error } = useQuery(CONNECTIONS_QUERY)

  console.log({ data, loading, error })

  if (!authorizationToken) {
    return <Auth />
  }

  return <div>App</div>
}

export default App
