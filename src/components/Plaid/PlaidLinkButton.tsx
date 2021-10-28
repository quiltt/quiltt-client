import * as React from 'react'
import type {
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOnLoad,
  PlaidLinkOnSuccess,
} from 'react-plaid-link'

import {
  PlaidLinkTokenCreateInput,
  PlaidLinkTokenCreateMutation,
  PlaidLinkTokenCreatePayload,
  usePlaidLinkTokenCreateMutation,
} from '../../types'
import { CustomComponentProps, CustomComponentRefForwardingComponent } from '../../utils/components'

import PlaidLinkLauncher from './PlaidLinkLauncher'

export type LinkButtonProps = React.HTMLAttributes<HTMLElement> &
  CustomComponentProps &
  PlaidLinkTokenCreateInput & {
    onSuccess: PlaidLinkOnSuccess
    onExit?: PlaidLinkOnExit
    onEvent?: PlaidLinkOnEvent
    onLoad?: PlaidLinkOnLoad
  }

type Ref = React.ReactNode | HTMLElement | string

const LinkButton: CustomComponentRefForwardingComponent<'button', LinkButtonProps> =
  React.forwardRef<Ref, LinkButtonProps>(function LinkButton(props, ref) {
    const {
      as = 'button',
      products,
      linkCustomizationName,
      accountFilters,
      children,
      onSuccess,
      onExit = undefined,
      onEvent = undefined,
      onLoad = undefined,
      ...otherProps
    } = props

    const [linkToken, setLinkToken] = React.useState<string | null>(null)

    const handlePlaidTokenCreated = (data: PlaidLinkTokenCreateMutation) => {
      const { record, errors } = data.plaidLinkTokenCreate as PlaidLinkTokenCreatePayload
      if (errors)
        errors.map((error) => {
          throw new Error(`${error.code}: ${error.message}`)
        })

      if (record && record.linkToken) {
        setLinkToken(record.linkToken)
      }
    }

    const [createLinkToken] = usePlaidLinkTokenCreateMutation({
      variables: {
        input: {
          accountFilters,
          linkCustomizationName,
          products,
        },
      },
      onCompleted: handlePlaidTokenCreated,
    })

    React.useEffect(() => {
      if (createLinkToken) {
        createLinkToken()
      }
    }, [createLinkToken])

    if (!linkToken) {
      return React.createElement(
        as as string,
        {
          ref,
          disabled: true,
          ...otherProps,
        },
        children
      )
    }

    return React.createElement(
      PlaidLinkLauncher,
      {
        as,
        ref,
        token: linkToken,
        onSuccess,
        onExit,
        onEvent,
        onLoad,
        ...otherProps,
      },
      children
    )
  })

export default LinkButton
