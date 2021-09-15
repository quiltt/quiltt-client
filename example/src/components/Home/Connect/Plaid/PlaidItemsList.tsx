import * as React from 'react'

import type { ApolloQueryResult } from '@apollo/client/core/types'
import { PlusIcon } from '@heroicons/react/outline'
import type {
  PlaidItem as PlaidItemType,
  Exact,
  PlaidItemsQuery,
} from '@quiltt/client/dist/src/types'
import { Heading } from '@quiltt/ui'

import PlaidItem from './Item'
import PlaidLinkButton from './PlaidLinkButton'

type PlaidItemsListProps = {
  data: PlaidItemsQuery
  refetch: (
    variables?: Partial<
      Exact<{
        [key: string]: never
      }>
    >
  ) => Promise<ApolloQueryResult<PlaidItemsQuery>>
}

const PlaidItemsList: React.FC<PlaidItemsListProps> = ({ data, refetch }) => {
  const variant = 'dark'
  const layout = 'outline'

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <Heading as="h4">Connected Accounts</Heading>
        <PlaidLinkButton
          size="lg"
          icon={PlusIcon}
          layout={layout}
          variant={variant}
          refetch={refetch}
        >
          Add
        </PlaidLinkButton>
      </div>
      {data?.plaidItems?.map((item) => {
        return <PlaidItem item={item as PlaidItemType} key={item.id} />
      })}
    </>
  )
}

export default PlaidItemsList
