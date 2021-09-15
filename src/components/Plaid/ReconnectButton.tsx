import * as React from 'react'
import type {
  PlaidLinkError,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnLoad,
  PlaidLinkOptions,
} from 'react-plaid-link'
import { usePlaidLink } from 'react-plaid-link'

import type {
  PlaidLinkTokenCreateForUpdateMutation,
  PlaidLinkTokenCreateForUpdatePayload,
} from '../../types'
import { PlaidItemStatus, usePlaidLinkTokenCreateForUpdateMutation } from '../../types'
import DefaultLoadingComponent from '../DefaultLoadingComponent'

type ReconnectButtonProps = {
  id: string
  LoadingComponent?: React.ReactElement
  children?: React.ReactNode
  setConnectionStatus: React.Dispatch<React.SetStateAction<PlaidItemStatus>>
  onLoad?: PlaidLinkOnLoad
}

const ReconnectButton: React.FC<ReconnectButtonProps> = ({
  id,
  LoadingComponent = <DefaultLoadingComponent />,
  children = 'Reconnect',
  setConnectionStatus,
  onLoad = undefined,
  ...otherProps
}) => {
  const [linkToken, setLinkToken] = React.useState<string | null>(null)

  const onSuccess = React.useCallback(() => {
    setConnectionStatus(PlaidItemStatus.Syncing)
  }, [setConnectionStatus])

  const onExit = React.useCallback((err: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => {
    if (err) throw new Error(`${err.error_code} ${err.error_message} - ${JSON.stringify(metadata)}`)
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

  if (!linkToken) return LoadingComponent

  return (
    <button type="button" id={id} onClick={() => open()} disabled={!ready} {...otherProps}>
      {children}
    </button>
  )
}

export default ReconnectButton
