import * as React from 'react'

import { PlaidLinkOnLoad } from 'react-plaid-link'

import type { ButtonProps } from '@quiltt/ui/dist/src/components/Button'

import AddPlaidConnectionButton from './AddPlaidConnectionButton'

type PlaidLinkButtonProps = ButtonProps & {
  onLoad?: PlaidLinkOnLoad
  refetch: () => void
}

const PlaidLinkButton: React.FC<PlaidLinkButtonProps> = ({ children, refetch, ...buttonProps }) => {
  return (
    <AddPlaidConnectionButton id="plaidLink" refetch={refetch} {...buttonProps}>
      {children}
    </AddPlaidConnectionButton>
  )
}

export default PlaidLinkButton
