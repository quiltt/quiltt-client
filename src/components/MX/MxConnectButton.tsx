import * as React from 'react'

import { ConnectorMxInitializeInput, useConnectorMxInitializeMutation } from '../../types/graphql'
import type { CustomComponentProps } from '../../utils/components'

import MxWidget from './MxWidget'

export type MxConnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  ConnectorMxInitializeInput & {
    widgetClassName?: string
    onEvent?: (event: any) => void
  }

const MxConnectButton: React.FC<MxConnectButtonProps> = ({
  className = '',
  widgetClassName = undefined,
  as = 'button',
  children = 'Connect with Mx',
  clientMutationId = undefined,
  colorScheme = undefined,
  includeTransactions = undefined,
  isMobileWebview = undefined,
  mode = undefined,
  waitForFullAggregation = undefined,
  id,
  onEvent = () => {},
  ...otherProps
}) => {
  const [inactive, setInactive] = React.useState(false)
  const [widgetURL, setWidgetURL] = React.useState('')
  const [loadWidget, setLoadWidget] = React.useState(false)

  const [connectorMxInitializeMutation] = useConnectorMxInitializeMutation({
    variables: {
      input: {
        clientMutationId,
        colorScheme,
        includeTransactions,
        isMobileWebview,
        mode,
        waitForFullAggregation,
      },
    },
    onCompleted: (data) => {
      if (data?.connectorMxInitialize?.record?.connectWidgetUrl) {
        setWidgetURL(data.connectorMxInitialize.record.connectWidgetUrl)
      } else {
        setWidgetURL('')
        setLoadWidget(false)
      }
    },
  })

  React.useEffect(() => {
    if (connectorMxInitializeMutation) {
      connectorMxInitializeMutation()
    }
  }, [connectorMxInitializeMutation])

  const handleEvent = React.useCallback(
    (event: any) => {
      if (onEvent) {
        onEvent(event)
        setInactive(true)
      } else {
        setInactive(true)
      }
    },
    [onEvent]
  )

  const handleClick = () => {
    setLoadWidget(true)
  }

  const handleClose = React.useCallback(
    (event: any) => {
      onEvent(event)
      setLoadWidget(false)
      connectorMxInitializeMutation()
    },
    [connectorMxInitializeMutation, onEvent]
  )

  const disabled = !widgetURL

  const widgetStyle = React.useMemo(
    (): React.CSSProperties | undefined =>
      widgetClassName
        ? undefined
        : {
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
    [widgetClassName]
  )

  const ChildComponent = React.useMemo(
    () => (
      <>
        {children}
        {widgetURL && loadWidget && (
          <div className={widgetClassName} style={widgetStyle}>
            <MxWidget url={widgetURL} onEvent={handleEvent} closeWidget={handleClose} />
          </div>
        )}
      </>
    ),
    [children, widgetURL, loadWidget, widgetClassName, widgetStyle, handleEvent, handleClose]
  )

  // Auto close modal after 30 seconds of inactivity
  React.useEffect(() => {
    if (inactive) {
      setTimeout(() => {
        setLoadWidget(false)
        connectorMxInitializeMutation()
      }, 30000)
    }
  })

  return React.createElement(
    as as string,
    {
      className,
      disabled,
      id: id ? `mx-connect-${id}` : undefined,
      onClick: handleClick,
      ...otherProps,
    },
    ChildComponent
  )
}

export default MxConnectButton
