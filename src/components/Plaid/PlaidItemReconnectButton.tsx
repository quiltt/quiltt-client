import * as React from 'react'
import {
  PlaidLinkError,
  PlaidLinkOnEvent,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link'

import {
  PlaidLinkTokenCreateForUpdateMutation,
  PlaidLinkTokenCreateForUpdatePayload,
  usePlaidLinkTokenCreateForUpdateMutation,
} from '../../types'
import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

type PlaidItemReconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    itemId: string
    onSuccess?: PlaidLinkOnSuccess
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

type Ref = React.ReactNode | HTMLElement | string

const PlaidItemReconnectButton: CustomComponentRefForwardingComponent<
  'button',
  PlaidItemReconnectButtonProps
> = React.forwardRef<Ref, PlaidItemReconnectButtonProps>(function PlaidItemReconnectButton(
  props,
  ref
) {
  const {
    as = 'button',
    itemId,
    children = 'Reconnect',
    className,
    onSuccess = undefined,
    onEvent = undefined,
    onLoad = undefined,
    ...otherProps
  } = props
  const [linkToken, setLinkToken] = React.useState<string | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  const onExit = async (err: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
    if (err) {
      console.error(err)
      console.error(metadata)
    }
  }

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
          console.error(`${err.code}: ${err.message}`)
        })
      }

      if (record && record.linkToken) {
        setLinkToken(record.linkToken)
      }
    },
  })

  let handleClick = () => {}

  React.useEffect(() => {
    if (linkToken) {
      const config = {
        token: linkToken,
        onSuccess,
        onEvent,
        onLoad,
        onExit,
      } as PlaidLinkOptions
      const { open, ready, error: plaidLinkError } = usePlaidLink(config)
      handleClick = () => open()
      setIsReady(ready)
      if (error) {
        console.error(plaidLinkError)
      }
    }
  }, [linkToken])

  React.useEffect(() => {
    if (!called && !linkToken) {
      createLinkToken()
    }
  })

  return React.createElement(
    as as string,
    {
      ref,
      onClick: handleClick,
      disabled: !isReady,
      ...otherProps,
    },
    isReady ? children : 'Loading'
  )
})

export default PlaidItemReconnectButton
