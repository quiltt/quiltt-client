import * as React from 'react'

import { PlusIcon } from '@heroicons/react/outline'
import { Spinner } from '@quiltt/ui'

import { usePlaidItemsQuery } from '@quiltt/client'

import PlaidItemsList from './Plaid/PlaidItemsList'
import PlaidLinkButton from './Plaid/PlaidLinkButton'

const Connect: React.FC = () => {
  const { data, error, refetch } = usePlaidItemsQuery()

  if (error) {
    console.error('error', error)
  }

  if (!data) return <Spinner kind="overlay" />

  const ConnectCTA = () => {
    return (
      <div className="flex flex-col items-center justify-center flex-auto p-2">
        <h2 className="mb-5 text-3xl text-center">Link an Account to Get Started</h2>
        <PlaidLinkButton size="lg" icon={PlusIcon} variant="dark" refetch={refetch}>
          <span>Link Account</span>
        </PlaidLinkButton>
        <small className="mt-2">Powered by Plaid</small>
      </div>
    )
  }

  if (data?.plaidItems?.length === 0) return <ConnectCTA />

  return <PlaidItemsList data={data} refetch={refetch} />
}

export default Connect
