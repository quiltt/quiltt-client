import { ApolloLink, Operation } from '@apollo/client'
import { createConsumer } from '@rails/actioncable'
import { OperationTypeNode } from 'graphql'
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink'

import useQuilttAuth from '../../contexts/useQuilttAuth'
import useQuilttSettings from '../../contexts/useQuilttSettings'

const useSubscriptionLink = () => {
  const { websocketEndpoint } = useQuilttSettings()
  const { authorizationToken } = useQuilttAuth()
  const hasSubscriptionOperation = ({
    query: { definitions },
  }: Operation | (OperationTypeNode & Operation)): boolean =>
    definitions.some(
      // @ts-ignore
      ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
    )

  const url = new URL(`?token=${authorizationToken ?? ''}`, websocketEndpoint)
  // eslint-disable-next-line
  const cable = createConsumer(url.toString())

  const channelName = 'GraphQLChannel'

  // eslint-disable-next-line
  const subscriptionsLink = new ActionCableLink({ cable, channelName })
  const forwardableLink = new ApolloLink((operation, forward) => forward(operation))

  return ApolloLink.split(hasSubscriptionOperation, subscriptionsLink, forwardableLink)
}

export default useSubscriptionLink
