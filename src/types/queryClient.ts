import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient } from '@apollo/client'

export enum ClientOptions {
  Apollo = 'apollo',
  Urql = 'urql',
}

export interface QuilttApolloClient {
  name: ClientOptions.Apollo
  client: ApolloClient<NormalizedCacheObject>
}

export interface QuilttUrqlClient {
  name: ClientOptions.Urql
  client: ApolloClient<NormalizedCacheObject>
}

export type QueryClient = QuilttApolloClient | QuilttUrqlClient

export type QuilttQueryClientContext = QueryClient
