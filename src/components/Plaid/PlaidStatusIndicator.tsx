import * as React from 'react'

import { PlaidItemStatus } from '../../types/quiltt'
import { timeDifference } from '../../utils/date'
import DefaultLoadingComponent from '../DefaultLoadingComponent'
import DefaultSyncingComponent from '../DefaultSyncingComponent'

type PlaidItemStatusIndicatorProps = React.HTMLAttributes<HTMLElement> & {
  status: PlaidItemStatus
  syncedAt?: string
  loadingComponent?: React.ReactElement
  syncingComponent?: React.ReactElement
}

const PlaidItemStatusIndicator: React.FC<PlaidItemStatusIndicatorProps> = ({
  status,
  syncedAt = undefined,
  className = '',
  loadingComponent = <DefaultLoadingComponent />,
  syncingComponent = <DefaultSyncingComponent />,
  ...otherProps
}) => {
  const disconnectedComponent = (
    <div className={className} {...otherProps}>
      Disconnected
    </div>
  )

  const errorComponent = (
    <div className={className} {...otherProps}>
      Error Syncing
    </div>
  )

  const syncedAtComponent = (
    <div className={className} {...otherProps}>{`Last synced ${
      syncedAt ? timeDifference(syncedAt) : 'just now'
    }`}</div>
  )

  switch (status) {
    case 'SYNCING':
      return syncingComponent
    case 'SYNCED':
      return syncedAtComponent
    case 'DISCONNECTED':
      return disconnectedComponent
    case 'ERROR':
      return errorComponent
    default:
      return loadingComponent
  }
}

export default PlaidItemStatusIndicator
