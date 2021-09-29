import * as React from 'react'

import { TrashIcon } from '@heroicons/react/outline'
import {
  PlaidUnlinkButton,
  PlaidReconnectButton,
  PlaidSyncStatus,
  PlaidItem,
  PlaidItemStatus,
  usePlaidItemUpdatedSubscription,
} from '@quiltt/client'
import { AccountList } from '@quiltt/components'
import { Button, Card, Heading } from '@quiltt/ui'

type ReconnectCTAProps = {
  id: string
  name: string
  setConnectionStatus: React.Dispatch<React.SetStateAction<PlaidItemStatus>>
}

const ReconnectCTA: React.FC<ReconnectCTAProps> = ({ id, name, setConnectionStatus }) => (
  <PlaidReconnectButton
    as={Button}
    data-name={name}
    id={id}
    setConnectionStatus={setConnectionStatus}
    block
  />
)

type ItemProps = {
  item: PlaidItem
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const [connectionStatus, setConnectionStatus] = React.useState(item.status)

  // Apollo automagically updates the cache so we don't need to do anything when subscription fires
  const { error } = usePlaidItemUpdatedSubscription({
    variables: { id: item.id },
  })

  if (error) {
    console.error(error)
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
        {connectionStatus === PlaidItemStatus.Disconnected ? (
          <ReconnectCTA id={item.id} name={item.name} setConnectionStatus={setConnectionStatus} />
        ) : (
          <AccountList accounts={item.accounts} />
        )}
      </Card.Body>
      <Card.Footer className="flex items-center justify-between border-top-0">
        <PlaidSyncStatus id={item.id} />
        <PlaidUnlinkButton
          as={Button}
          id={item.id}
          name={item.name}
          variant="danger"
          layout="outline"
          size="sm"
          icon={TrashIcon}
        >
          Unlink
        </PlaidUnlinkButton>
      </Card.Footer>
    </Card>
  )
}

export default Item
