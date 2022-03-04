import * as React from 'react'

import { usePrevious } from 'hooks'

export interface SingleOTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  index: number
  focus?: boolean
}

export const SingleOTPInputComponent: React.FC<SingleOTPInputProps> = (props) => {
  const { name, index, focus, autoFocus, ...rest } = props
  const inputRef = React.useRef<HTMLInputElement>(null)
  const prevFocus = usePrevious(!!focus)
  React.useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  return (
    <input id={`${name}-${index + 1}`} name={`${name}-${index + 1}`} ref={inputRef} {...rest} />
  )
}

const SingleOTPInput = React.memo(SingleOTPInputComponent)
export default SingleOTPInput
