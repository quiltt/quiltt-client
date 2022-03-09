import * as React from 'react'

import { useOnClickOutside } from 'hooks'

type MxWidgetProps = {
  url: string
  onEvent: (event: any) => void
  closeWidget: (event?: any) => void
}

const MxWidget: React.FC<MxWidgetProps> = ({ url, onEvent, closeWidget }) => {
  const ref = React.useRef(null)

  /**
   * Handle MX Postmessages and call the event callback with the payload.
   * NOTE: this only looks for post messages with `ui_message_version: 4`
   */
  const onPostMessage = React.useCallback(
    (event: MessageEvent) => {
      if (event.data && event.data.mx === true) {
        onEvent(event.data)
      }
    },
    [onEvent]
  )

  const handleClickOutside = (event?: any) => {
    if (event) {
      closeWidget(event)
    } else {
      closeWidget()
    }
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
