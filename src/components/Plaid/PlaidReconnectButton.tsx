import * as React from 'react'
import type { PlaidLinkError, PlaidLinkOnExitMetadata } from 'react-plaid-link'

import type {
  PlaidLinkTokenCreateForUpdateMutation,
  PlaidLinkTokenCreateForUpdatePayload,
} from '../../types'
import { PlaidItemStatus, usePlaidLinkTokenCreateForUpdateMutation } from '../../types'
import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'
import DefaultLoadingComponent from '../DefaultLoadingComponent'

import PlaidLinkLauncherWrapper from './PlaidLinkLauncherWrapper'

type PlaidReconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    itemId: string
    setConnectionStatus: React.Dispatch<React.SetStateAction<PlaidItemStatus>>
    loadingComponent?: React.ReactElement
  }

type Ref = React.ReactNode | HTMLElement | string

const PlaidReconnectButton: CustomComponentRefForwardingComponent<
  'button',
  PlaidReconnectButtonProps
> = React.forwardRef<Ref, PlaidReconnectButtonProps>(function PlaidReconnectButton(props, ref) {
  const {
    as = 'button',
    className = '',
    children = 'Reconnect',
    itemId,
    loadingComponent = <DefaultLoadingComponent />,
    setConnectionStatus,
    ...otherProps
  } = props
  const onSuccess = React.useCallback(() => {
    setConnectionStatus(PlaidItemStatus.Syncing)
  }, [setConnectionStatus])

  const onExit = React.useCallback((err: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => {
    if (err) {
      // throw new Error(`${err.error_code} ${err.error_message} - ${JSON.stringify(metadata)}`)
      console.error(err)
      console.error(metadata)
    }
  }, [])

  const [linkToken, setLinkToken] = React.useState<string | null>(null)

  const [createLinkToken, { called, error }] = usePlaidLinkTokenCreateForUpdateMutation({
    variables: {
      input: {
        plaidItemId: itemId,
        countryCodes: ['US'],
      },
    },
    onCompleted(data: PlaidLinkTokenCreateForUpdateMutation) {
      const { record, errors } =
        data.plaidLinkTokenCreateForUpdate as PlaidLinkTokenCreateForUpdatePayload

      if (errors) {
        errors.map((err) => {
          throw new Error(`${err.code}: ${err.message}`)
        })
      }

      if (record) {
        setLinkToken(record.linkToken)
      }
    },
  })

  React.useEffect(() => {
    if (!called && !linkToken) {
      createLinkToken()
    }
  }, [])

  if (error) throw error

  if (!linkToken) return loadingComponent

  return (
    <PlaidLinkLauncherWrapper token={linkToken} onSuccess={onSuccess} onExit={onExit}>
      {(childProps) => {
        return React.createElement(
          as as string,
          {
            className,
            ref,
            ...otherProps,
            ...childProps,
          },
          children
        )
      }}
    </PlaidLinkLauncherWrapper>
  )
})

export default PlaidReconnectButton
