import * as React from 'react'
import type {
  PlaidLinkError,
  PlaidLinkOnEvent,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOptions,
} from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'

import DefaultLoadingComponent from '../../components/DefaultLoadingComponent'
import type {
  PlaidLinkTokenCreateForUpdateMutation,
  PlaidLinkTokenCreateForUpdatePayload,
} from '../../types'
import { PlaidItemStatus, usePlaidLinkTokenCreateForUpdateMutation } from '../../types'
import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

type ReconnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps & {
    id: string
    setConnectionStatus: React.Dispatch<React.SetStateAction<PlaidItemStatus>>
    loadingComponent?: React.ReactElement
    children?: React.ReactNode
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

type Ref = React.ReactNode | HTMLElement | string

const ReconnectButton: CustomComponentRefForwardingComponent<'button', ReconnectButtonProps> =
  React.forwardRef<Ref, ReconnectButtonProps>(function ReconnectButton(props, ref) {
    const {
      as = 'button',
      id,
      loadingComponent = <DefaultLoadingComponent />,
      children = 'Reconnect',
      setConnectionStatus,
      onEvent = undefined,
      onLoad = undefined,
      ...otherProps
    } = props
    const [linkToken, setLinkToken] = React.useState<string | null>(null)

    const onSuccess = React.useCallback(() => {
      setConnectionStatus(PlaidItemStatus.Syncing)
    }, [setConnectionStatus])

    const onExit = React.useCallback((err: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => {
      if (err)
        throw new Error(`${err.error_code} ${err.error_message} - ${JSON.stringify(metadata)}`)
    }, [])

    const [createLinkToken, { called, error }] = usePlaidLinkTokenCreateForUpdateMutation({
      variables: {
        input: {
          plaidItemId: id,
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

    const config = {
      token: linkToken,
      onSuccess,
      onEvent,
      onLoad,
      onExit,
    } as PlaidLinkOptions

    const { open, ready, error: plaidLinkError } = usePlaidLink(config)

    React.useEffect(() => {
      if (!called && !linkToken) {
        createLinkToken()
      }
    })

    if (error) throw error

    if (plaidLinkError) throw new Error(plaidLinkError.message)

    if (!linkToken) return loadingComponent

    return React.createElement(
      as as string,
      {
        ref,
        id: id,
        disabled: !ready,
        onClick: () => open(),
        onSuccess,
        onEvent,
        onLoad,
        onExit,
        ...otherProps,
      },
      children
    )
  })

export default ReconnectButton