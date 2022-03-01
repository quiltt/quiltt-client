import * as React from 'react'
import type { PlaidLinkError, PlaidLinkOnExitMetadata } from 'react-plaid-link'

import type { ConnectorPlaidInitializeMutation, ConnectorPlaidInitializePayload } from '../../types'
import { useConnectorPlaidInitializeMutation } from '../../types'
import DefaultLoadingComponent from '../DefaultLoadingComponent'

import LinkLauncherWrapper from './LinkLauncherWrapper'

type ReconnectButtonProps = {
  id: string
  LoadingComponent?: React.ReactElement
}

const ReconnectButton: React.FC<ReconnectButtonProps> = ({
  id,
  LoadingComponent = <DefaultLoadingComponent />,
}) => {
  const onSuccess = React.useCallback(() => {}, [])

  const onExit = React.useCallback((err: PlaidLinkError, metadata: PlaidLinkOnExitMetadata) => {
    if (err) throw new Error(`${err.error_code} ${err.error_message} - ${JSON.stringify(metadata)}`)
  }, [])

  const [linkToken, setLinkToken] = React.useState<string | null>(null)

  const [createLinkToken, { called, error }] = useConnectorPlaidInitializeMutation({
    variables: {
      input: {
        connectionId: id,
        countryCodes: ['US'],
      },
    },
    onCompleted(data: ConnectorPlaidInitializeMutation) {
      const { record, errors } = data.connectorPlaidInitialize as ConnectorPlaidInitializePayload

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

  if (!linkToken) return LoadingComponent

  return (
    <LinkLauncherWrapper token={linkToken} onSuccess={onSuccess} onExit={onExit}>
      {(props) => (
        <button type="button" {...props}>
          Reconnect
        </button>
      )}
    </LinkLauncherWrapper>
  )
}

export default ReconnectButton
