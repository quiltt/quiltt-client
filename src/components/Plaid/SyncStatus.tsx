import * as React from 'react'

import { CustomComponentProps, CustomComponentRefForwardingComponent } from 'utils/components'

import { PlaidItemStatus, usePlaidItemSyncStatusQuery } from '../../types'
import { timeDifference } from '../../utils/date'
import DefaultLoadingComponent from '../DefaultLoadingComponent'
import DefaultSyncingComponent from '../DefaultSyncingComponent'

type SyncStatusProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    id: string
    loadingComponent?: React.ReactElement
    syncingComponent?: React.ReactElement
  }

type Ref = React.ReactNode | HTMLElement | string

const SyncStatus: CustomComponentRefForwardingComponent<'small', SyncStatusProps> =
  React.forwardRef<Ref, SyncStatusProps>(function SyncStatus(props, ref) {
    const {
      as = 'small',
      id,
      className = '',
      loadingComponent = <DefaultLoadingComponent as={as} />,
      syncingComponent = <DefaultSyncingComponent as={as} />,
      ...otherProps
    } = props
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

    let children: React.ReactNode = 'Error Syncing'

    if (data?.plaidItem && data.plaidItem.syncedAt) {
      children = `Last synced ${timeDifference(data.plaidItem.syncedAt)}`
    }

    return React.createElement(
      as as string,
      {
        ref,
        className,
        ...otherProps,
      },
      children
    )
  })

export default SyncStatus
