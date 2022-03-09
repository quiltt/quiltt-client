import * as React from 'react'

type MXWidgetProps = {
  url: string
  onEvent: (event: any) => void
}

const MXWidget: React.FC<MXWidgetProps> = ({ url, onEvent }) => {
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

  React.useEffect(() => {
    window.addEventListener('message', onPostMessage)
    return () => {
      window.removeEventListener('message', onPostMessage)
    }
  }, [onPostMessage])

  return (
    <iframe
      height={500}
      marginHeight={0}
      marginWidth={0}
      src={url}
      title="MX Widget"
      width={500}
      allowFullScreen
    />
  )
}

export default MXWidget
