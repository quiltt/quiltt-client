import * as React from 'react'

import { TrashIcon } from '@heroicons/react/outline'
import {
  PlaidUnlinkButton,
  PlaidItem,
  PlaidItemStatus,
  PlaidItemStatusIndicator,
  PlaidItemReconnectButton,
  usePlaidItemUpdatedSubscription,
} from '@quiltt/client'
import { AccountList } from '@quiltt/components'
import { Button, Card, Heading } from '@quiltt/ui'

type ItemProps = {
  item: PlaidItem
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const [syncStatus, setSyncStatus] = React.useState(item.status)
  // Apollo automagically updates the cache so we don't need to do anything when subscription fires
  const { loading, error } = usePlaidItemUpdatedSubscription({
    variables: { id: item.id },
  })

  if (!loading && error) {
    console.error(error)
  }

  const onSuccess = () => {
    setSyncStatus(PlaidItemStatus.Syncing)
  }

  return (
    <Card className="my-3 shadow-sm">
      <Card.Header>
        <Heading as="h5" className="items-center">
          {item?.logo?.url ? (
            <img
              src={item.logo.url}
              alt={`${item.name} logo`}
              className="object-contain w-8 h-8 mr-2"
              width="32"
              height="32"
            />
          ) : null}
          {item.name}
        </Heading>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        {syncStatus === PlaidItemStatus.Disconnected ? (
          <div className="flex items-center justify-center p-4">
            <PlaidItemReconnectButton onSuccess={onSuccess} itemId={item.id} as={Button} block />
          </div>
        ) : (
          <AccountList accounts={item.accounts} />
        )}
      </Card.Body>
      <Card.Footer className="flex items-center justify-between border-top-0">
        <div className="flex space-x-3">
          <PlaidItemStatusIndicator status={item.status} syncedAt={item.syncedAt} />
        </div>
        <PlaidUnlinkButton
          as={Button}
          id={item.id}
          name={item.name}
          variant="danger"
          layout="outline"
          size="sm"
          className="ml-auto"
          icon={TrashIcon}
        >
          Unlink
        </PlaidUnlinkButton>
      </Card.Footer>
    </Card>
  )
}

export default Item
