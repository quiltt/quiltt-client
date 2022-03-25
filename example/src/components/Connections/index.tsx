import * as React from 'react'
import { useQuery, gql } from '@quiltt/client'

const Connections: React.FC = () => {
  const CONNECTIONS_QUERY = gql`
    query Connections {
      connections {
        id
      }
    }
  `
  const { data, loading, error } = useQuery(CONNECTIONS_QUERY)

  if (!data || loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)
  }

  return (
    <div>
      <h1>Connections</h1>
      <div>
        {data.connections.map((connection: { id: string }) => (
          <span key={connection.id}>{connection.id}</span>
        ))}
      </div>
    </div>
  )
}

export default Connections
