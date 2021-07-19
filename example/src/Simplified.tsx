import * as React from 'react'

import { gql, useQuery } from '@apollo/client'
import { QuilttProvider } from '@quiltt/api'
import { AccountList, PlaidLinkButton } from '@quiltt/components'

const GET_ACCOUNTS = gql`
  # insert query here
`

const Connect: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ACCOUNTS)

  if (loading) return <p>Loading...</p>
  if (error) throw error

  const { accounts } = data.plaidItems[0]
  return (
    <div>
      <AccountList accounts={accounts} />
      <PlaidLinkButton block />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <QuilttProvider>
      <Connect />
    </QuilttProvider>
  )
}

export default Connect
