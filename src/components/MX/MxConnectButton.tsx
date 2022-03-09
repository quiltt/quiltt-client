import * as React from 'react'

import { ConnectorMxInitializeInput, useConnectorMxInitializeMutation } from '../../types/graphql'
import type { CustomComponentProps } from '../../utils/components'

import MXWidget from './MxWidget'

export type MxConnectButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  ConnectorMxInitializeInput & {
    onEvent?: (event: any) => void
  }

const MxConnectButton: React.FC<MxConnectButtonProps> = ({
  className = '',
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

  const [generateMxWidgetUrl] = useConnectorMxInitializeMutation({
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
  })

  React.useEffect(() => {
    const getWidgetUrl = async () => {
      const { data } = await generateMxWidgetUrl()
      if (data?.connectorMxInitialize?.record?.connectWidgetUrl) {
        setWidgetURL(data.connectorMxInitialize.record.connectWidgetUrl)
      }
      setWidgetURL('')
    }
    getWidgetUrl()
  }, [generateMxWidgetUrl])

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

  const disabled = !widgetURL

  const ChildComponent = React.useMemo(
    () => (
      <>
        {children}
        {widgetURL && loadWidget && <MXWidget url={widgetURL} onEvent={handleEvent} />}
      </>
    ),
    [children, loadWidget, widgetURL, handleEvent]
  )

  // Auto close modal after 10 seconds of inactivity
  React.useEffect(() => {
    if (inactive) {
      setTimeout(() => {
        setLoadWidget(false)
      }, 10000)
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
