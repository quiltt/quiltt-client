import * as React from 'react'

import { useOnClickOutside } from 'hooks'
import { ConnectionMxCreateInput, MxEvent, MxPostMessageEventType } from 'types'

type MxWidgetProps = {
  url: string
  onEvent: (event: MessageEvent<MxEvent>) => void
  onSuccess: (input: ConnectionMxCreateInput) => void
  closeWidget: (event?: MxEvent) => void
}

const MxWidget: React.FC<MxWidgetProps> = ({ url, onEvent, onSuccess, closeWidget }) => {
  const ref = React.useRef(null)

  const handleEvent = React.useCallback(
    (event: MessageEvent<MxEvent>) => {
      switch (event.type) {
        case MxPostMessageEventType.MEMBER_CONNECTED:
          onSuccess(event.data)
          onEvent(event)
          closeWidget()
          break
        case MxPostMessageEventType.PRIMARY_ACTION:
          onSuccess(event.data)
          onEvent(event)
          closeWidget()
          break
        default:
          onEvent(event)
          break
      }
    },
    [closeWidget, onEvent, onSuccess]
  )

  /**
   * Handle MX Postmessages and call the event callback with the payload.
   * NOTE: this only looks for post messages with `ui_message_version: 4`
   */
  const onPostMessage = React.useCallback(
    (event: MessageEvent<MxEvent>) => {
      if (event.data && event.data.mx === true) {
        handleEvent(event)
      }
    },
    [handleEvent]
  )

  const handleClickOutside = () => {
    closeWidget()
  }

  useOnClickOutside(ref, handleClickOutside)

  React.useEffect(() => {
    window.addEventListener('message', onPostMessage)
    return () => {
      window.removeEventListener('message', onPostMessage)
    }
  }, [onPostMessage])

  return (
    <iframe
      height={550}
      width={500}
      marginHeight={0}
      marginWidth={0}
      src={url}
      title="MX Widget"
      ref={ref}
    />
  )
}

export default MxWidget
