import * as React from 'react'

import { useForm, useFormContext } from 'react-hook-form'

import SingleOTPInput from './SingleOTPInput'

export type OTPInputProps = {
  name: string
  label: string
  length: number // Number of inputs
  autoFocus?: boolean // Auto focus to input programmatically
  isNumberInput?: boolean // If otp is number
  disabled?: boolean
  className?: string // Class for container OTP
  inputClassName?: string // Class for input
  onChangeOTP: (otp: string) => any // Handle onOTPChange to use its value
  setPasscodeValue: React.Dispatch<React.SetStateAction<string>>
}

const OTPInputComponent = React.forwardRef<HTMLInputElement, OTPInputProps>(
  (
    {
      length,
      label,
      isNumberInput,
      autoFocus,
      disabled,
      inputClassName,
      onChangeOTP,
      setPasscodeValue,
      name,
      ...rest
    },
    ref
  ) => {
    const {
      formState: { isSubmitting, errors },
    } = useFormContext()
    const { setValue } = useForm()

    const error = Array.isArray(errors[name])
      ? (errors[name]?.join(', ') as string)
      : (errors[name]?.message as string) || (errors[name] as string)

    // Define state activeInput = 0
    const [activeInput, setActiveInput] = React.useState(0)

    // Define state otpValues = array with <length> items with default value = ""
    const [otpValues, setOTPValues] = React.useState(Array<string>(length).fill(''))

    // Focus `inputIndex` input
    const focusInput = React.useCallback(
      (inputIndex: number) => {
        // Prevent focusing on an unreachable index
        const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
        setActiveInput(selectedIndex)
      },
      [length]
    )

    // Focus on the next input index
    const focusNextInput = React.useCallback(() => {
      focusInput(activeInput + 1)
    }, [activeInput, focusInput])

    // Focus on the previous input index
    const focusPrevInput = React.useCallback(() => {
      focusInput(activeInput - 1)
    }, [activeInput, focusInput])

    // Helper to return OTP from inputs
    const handleOtpChange = React.useCallback(
      (otp: string[]) => {
        const otpValue = otp.join('')
        onChangeOTP(otpValue)
      },
      [onChangeOTP]
    )

    // Helper to return value with the right type: 'text' or 'number'
    const getRightValue = React.useCallback(
      (str: string) => {
        const changedValue = str
        if (!isNumberInput) {
          return changedValue
        }
        return !changedValue || /\d/.test(changedValue) ? changedValue : ''
      },
      [isNumberInput]
    )

    // Change OTP value at focussing input
    const changeCodeAtFocus = React.useCallback(
      (str: string) => {
        const updatedOTPValues = [...otpValues]
        updatedOTPValues[activeInput] = str[0] || ''
        setOTPValues(updatedOTPValues)
        handleOtpChange(updatedOTPValues)
      },
      [activeInput, handleOtpChange, otpValues]
    )

    // Handle onFocus input
    const handleOnFocus = React.useCallback(
      (index: number) => () => {
        focusInput(index)
      },
      [focusInput]
    )

    // Handle onChange value for each input
    const handleOnChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = getRightValue(e.currentTarget.value)
        if (!val) {
          e.preventDefault()
          return
        }
        changeCodeAtFocus(val)
        focusNextInput()
      },
      [changeCodeAtFocus, focusNextInput, getRightValue]
    )

    // Hanlde onBlur input
    const handleOnBlur = React.useCallback(() => {
      setActiveInput(-1)
    }, [])

    // Handle onKeyDown input
    const handleOnKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'Backspace':
          case 'Delete': {
            e.preventDefault()
            if (otpValues[activeInput]) {
              changeCodeAtFocus('')
            } else {
              focusPrevInput()
            }
            break
          }
          case 'ArrowLeft': {
            e.preventDefault()
            focusPrevInput()
            break
          }
          case 'ArrowRight': {
            e.preventDefault()
            focusNextInput()
            break
          }
          case ' ': {
            e.preventDefault()
            break
          }
          default:
            break
        }
      },
      [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
    )

    // Handle onPaste input
    const handleOnPaste = React.useCallback(
      (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData
          .getData('text/plain')
          .trim()
          .slice(0, length - activeInput)
          .split('')
        if (pastedData) {
          let nextFocusIndex = 0
          const updatedOTPValues = [...otpValues]
          updatedOTPValues.forEach((val, index) => {
            if (index >= activeInput) {
              const changedValue = getRightValue(pastedData.shift() || val)
              if (changedValue) {
                updatedOTPValues[index] = changedValue
                nextFocusIndex = index
              }
            }
          })
          setOTPValues(updatedOTPValues)
          setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
        }
      },
      [activeInput, getRightValue, length, otpValues]
    )

    React.useLayoutEffect(() => {
      if (otpValues.length) {
        const newValue = otpValues.join('')
        setPasscodeValue(newValue)
        setValue(name, newValue, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
      }
    }, [otpValues, setPasscodeValue, setValue])

    return (
      <div className="relative" ref={ref}>
        <label
          id="passcodeLabel"
          className="flex flex-col w-full focus:outline-none focus:ring-0 focus:ring-transparent"
        >
          <input
            type="hidden"
            className="sr-only"
            title="Passcode"
            name={name}
            value={otpValues.join('')}
          />
          <span className="text-sm text-gray-700">{label}</span>
          <div {...rest}>
            {Array(length)
              .fill('')
              .map((_, index) => (
                <SingleOTPInput
                  name={name}
                  index={index}
                  key={`PassCodeInput-${index}`}
                  focus={activeInput === index}
                  value={otpValues && otpValues[index]}
                  autoFocus={autoFocus}
                  onFocus={handleOnFocus(index)}
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyDown}
                  onBlur={handleOnBlur}
                  onPaste={handleOnPaste}
                  className={inputClassName}
                  disabled={disabled || isSubmitting}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  aria-labelledby="passcodeLabel"
                />
              ))}
          </div>
        </label>

        {error && (
          <div role="alert" className="absolute text-xs text-red-600 -bottom-4">
            {error}
          </div>
        )}
      </div>
    )
  }
)

const OTPInput = React.memo(OTPInputComponent)
export default OTPInput
