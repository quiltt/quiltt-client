import * as React from 'react'

import { PlaidItemStatus, usePlaidItemSyncStatusQuery } from '../../types'
import { timeDifference } from '../../utils/date'

import DefaultLoadingComponent from '../DefaultLoadingComponent'
import DefaultSyncingComponent from '../DefaultSyncingComponent'

type SyncStatusProps = {
  id: string
  loadingComponent?: React.ReactElement
  syncingComponent?: React.ReactElement
}

const SyncStatus: React.VFC<SyncStatusProps> = ({
  id,
  loadingComponent = <DefaultLoadingComponent />,
  syncingComponent = <DefaultSyncingComponent />,
}) => {
  const { data, loading, error } = usePlaidItemSyncStatusQuery({
    variables: { id },
  })

  if (error) throw error

  if (loading) {
    return loadingComponent
  }

  if (data?.plaidItem && data.plaidItem.status === PlaidItemStatus.Syncing) {
    return syncingComponent
  }

  if (data?.plaidItem && data.plaidItem.syncedAt) {
    return <small>Last synced {timeDifference(data.plaidItem.syncedAt)}</small>
  }
  return <small>Error Syncing</small>
}

export default SyncStatus
