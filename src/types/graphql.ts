export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Represents an ISO 8601-encoded date */
  Date: string
  /** Represents an ISO 8601-encoded datetime */
  DateTime: string
  /** Represents untyped JSON */
  JSON: Record<string, unknown>
  /** A valid URL, transported as a string */
  URL: string
}

/** Represents an Account */
export type Account = {
  __typename?: 'Account'
  /** Balance */
  balance: LedgerBalance
  /** Primary Connection for this Account */
  connection?: Maybe<ConnectionType>
  /** ID */
  id: Scalars['ID']
  /** @deprecated Use `mask` instead. */
  lastFourDigits?: Maybe<Scalars['String']>
  /** A mostly unique identifier, typically last 4 account numbers */
  mask?: Maybe<Scalars['String']>
  /** Customizable metadata */
  metadata?: Maybe<Scalars['JSON']>
  /** Name */
  name: Scalars['String']
  /** API Account Data Source */
  source?: Maybe<AccountSources>
  /** API Account Data Sources */
  sources?: Maybe<Array<AccountSources>>
  /** State */
  state: LedgerState
  /** A limited list of transactions. Use `transactionsConnection` for a full paginated list. */
  transactions: Array<Transaction>
  /** Cursor-based pagination transactions */
  transactionsConnection: TransactionConnection
  /** Account type */
  type: AccountType
}

/** Represents an Account */
export type AccountSourceArgs = {
  type: AccountSourceType
}

/** Represents an Account */
export type AccountSourcesArgs = {
  types?: InputMaybe<Array<AccountSourceType>>
}

/** Represents an Account */
export type AccountTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>
  limit?: Scalars['Int']
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Represents an Account */
export type AccountTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TransactionFilter>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Options for Filtering Accounts */
export type AccountFilter = {
  source?: InputMaybe<AccountSourceFilter>
  /** Account classification */
  type?: InputMaybe<Array<AccountType>>
}

/** Source-specific filters */
export type AccountSourceFilter = {
  plaid?: InputMaybe<AccountSourcePlaidFilter>
}

/** Options for filtering inside Plaid's API payload */
export type AccountSourcePlaidFilter = {
  /** Plaid???s unique identifier for the account */
  accountId?: InputMaybe<Scalars['String']>
  /**
   * The last 2-4 alphanumeric characters of an account's official account number.
   * Note that the mask may be non-unique between an Item's accounts, and it may
   * also not match the mask that the bank displays to the user.
   */
  mask?: InputMaybe<Scalars['String']>
  /** The name of the account, either assigned by the user or by the financial institution itself */
  name?: InputMaybe<Scalars['String']>
  /** The official name of the account as given by the financial institution */
  officialName?: InputMaybe<Scalars['String']>
  /**
   * Possible values: 401a, 401k, 403B, 457b, 529, brokerage, cash isa, education
   * savings account, gic, health reimbursement arrangement, hsa, isa, ira, lif,
   * lira, lrif, lrsp, non-taxable brokerage account, other, prif, rdsp, resp,
   * rlif, rrif, pension, profit sharing plan, retirement, roth, roth 401k, rrsp,
   * sep ira, simple ira, sipp, stock plan, thrift savings plan, tfsa, trust, ugma,
   * utma, variable annuity, credit card, paypal, cd, checking, savings, money
   * market, prepaid, auto, commercial, construction, consumer, home, home equity,
   * loan, mortgage, overdraft, line of credit, student, cash management, keogh,
   * mutual fund, recurring, rewards, safe deposit, sarsep, null
   */
  subtype?: InputMaybe<Scalars['String']>
  /** Possible values: investment, credit, depository, loan, brokerage, other */
  type?: InputMaybe<Scalars['String']>
  /**
   * The current verification status of an Auth Item initiated through Automated or
   * Manual micro-deposits.  Returned for Auth Items only.
   * Possible values: pending_automatic_verification, pending_manual_verification,
   * manually_verified, verification_expired, verification_failed
   */
  verificationStatus?: InputMaybe<Scalars['String']>
}

/** Represents a data source for the Account */
export enum AccountSourceType {
  /** Mock connection */
  Mock = 'MOCK',
  /** MX connection */
  Mx = 'MX',
  /** Plaid connection */
  Plaid = 'PLAID',
}

export type AccountSources = MockAccount | MxAccount | PlaidAccount

/** Represents the classification of an Account */
export enum AccountType {
  /** Checking and cash management accounts */
  Checking = 'CHECKING',
  /** Credit card accounts */
  Credit = 'CREDIT',
  /** Brokerage, retirement and other retirement accounts */
  Investment = 'INVESTMENT',
  /** Lines of credit, mortgage, student and installment loans */
  Loan = 'LOAN',
  /** All other accounts */
  Other = 'OTHER',
  /** Savings and money market accounts */
  Savings = 'SAVINGS',
}

/** Autogenerated input type of AccountUpdate */
export type AccountUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  /** Customizable metadata */
  metadata?: InputMaybe<Scalars['JSON']>
}

/** Autogenerated return type of AccountUpdate */
export type AccountUpdatePayload = {
  __typename?: 'AccountUpdatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated Account Information */
  record?: Maybe<Account>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** ISO 3166-1 alpha-3 Country Codes */
export enum AddressCountryCode {
  /** United States of America */
  Usa = 'USA',
}

/** Autogenerated input type of ConnectionDelete */
export type ConnectionDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of Connection */
  id: Scalars['ID']
}

/** Autogenerated return type of ConnectionDelete */
export type ConnectionDeletePayload = {
  __typename?: 'ConnectionDeletePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Connection */
  record?: Maybe<ConnectionType>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Options for Filtering Connections */
export type ConnectionFilter = {
  source?: InputMaybe<ConnectionSourceFilter>
  /** Connection status */
  status?: InputMaybe<Array<ConnectionStatus>>
}

/** Autogenerated input type of ConnectionMxCreate */
export type ConnectionMxCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `metadata` object from Mx Connect's `memberConnected` callback */
  metadata: Scalars['JSON']
}

/** Autogenerated return type of ConnectionMxCreate */
export type ConnectionMxCreatePayload = {
  __typename?: 'ConnectionMxCreatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Mx API Error */
  errors?: Maybe<Array<MxApiError>>
  /** Connection */
  record?: Maybe<ConnectionType>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of ConnectionPlaidCreate */
export type ConnectionPlaidCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The `metadata` object from Plaid Link's `onSuccess` callback */
  metadata: Scalars['JSON']
  /** The `public_token` string from Plaid Link's `onSuccess` callback */
  publicToken: Scalars['String']
}

/** Autogenerated return type of ConnectionPlaidCreate */
export type ConnectionPlaidCreatePayload = {
  __typename?: 'ConnectionPlaidCreatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Plaid API Error */
  errors?: Maybe<Array<PlaidApiError>>
  /** Connection */
  record?: Maybe<ConnectionType>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of ConnectionPlaidImport */
export type ConnectionPlaidImportInput = {
  /** The `access_token` for the item */
  accessToken: Scalars['String']
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** Whether the Plaid Item is managed by an external system */
  externallyManaged?: InputMaybe<Scalars['Boolean']>
}

/** Autogenerated return type of ConnectionPlaidImport */
export type ConnectionPlaidImportPayload = {
  __typename?: 'ConnectionPlaidImportPayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Plaid API Error */
  errors?: Maybe<Array<PlaidApiError>>
  /** Connection */
  record?: Maybe<ConnectionType>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Source-specific filters */
export type ConnectionSourceFilter = {
  plaid?: InputMaybe<ConnectionSourcePlaidFilter>
}

/** Options for filtering inside Plaid's API payload */
export type ConnectionSourcePlaidFilter = {
  /** A list of products available for the Item that have not yet been accessed. */
  availableProducts?: InputMaybe<Array<Scalars['String']>>
  /**
   * A list of products that have been billed for the Item. Note -
   * `billed_products` is populated in all environments but only requests in
   * Production are billed.
   */
  billedProducts?: InputMaybe<Array<Scalars['String']>>
  /**
   * The RFC 3339 timestamp after which the consent provided by the end user will
   * expire. Upon consent expiration, the item will enter the `ITEM_LOGIN_REQUIRED`
   * error state. To circumvent the `ITEM_LOGIN_REQUIRED` error and maintain
   * continuous consent, the end user can reauthenticate via Link???s update mode in
   * advance of the consent expiration time.  Note - This is only relevant for
   * certain OAuth-based institutions. For all other institutions, this field will be null.
   */
  consentExpirationTime?: InputMaybe<Scalars['DateTime']>
  /** The Plaid Institution ID associated with the Item. Field is `null` for Items created via Same Day Micro-deposits. */
  institutionId?: InputMaybe<Scalars['String']>
  /**
   * The Plaid Item ID. The `item_id` is always unique; linking the same account at
   * the same institution twice will result in two Items with different `item_id`
   * values. Like all Plaid identifiers, the `item_id` is case-sensitive.
   */
  itemId?: InputMaybe<Scalars['String']>
  /** A list of authorized products for the Item. */
  products?: InputMaybe<Array<Scalars['String']>>
  /**
   * Indicates whether an Item requires user interaction to be updated, which can
   * be the case for Items with some forms of two-factor authentication.
   * `background` - Item can be updated in the background `user_present_required` -
   * Item requires user interaction to be updated
   */
  updateType?: InputMaybe<Scalars['String']>
  /** The URL registered to receive webhooks for the Item. */
  webhook?: InputMaybe<Scalars['String']>
}

/** Represents a data source for the Connection */
export enum ConnectionSourceType {
  /** Mock connection */
  Mock = 'MOCK',
  /** MX connection */
  Mx = 'MX',
  /** Plaid connection */
  Plaid = 'PLAID',
}

export type ConnectionSources = MockConnection | MxConnection | PlaidConnection

/** Represents the status of an Connection */
export enum ConnectionStatus {
  /** Institution Error */
  ErrorInstitution = 'ERROR_INSTITUTION',
  /** Provider Error */
  ErrorProvider = 'ERROR_PROVIDER',
  /** Repairable Error */
  ErrorRepairable = 'ERROR_REPAIRABLE',
  /** Service Error */
  ErrorService = 'ERROR_SERVICE',
  /** Initializing */
  Initializing = 'INITIALIZING',
  /** Synced */
  Synced = 'SYNCED',
  /** Syncing */
  Syncing = 'SYNCING',
}

/** Represents a Connection */
export type ConnectionType = {
  __typename?: 'ConnectionType'
  /** The list of accounts */
  accounts: Array<Account>
  /** Is this Connection managed by an external system? */
  externallyManaged: Scalars['Boolean']
  /** ID */
  id: Scalars['ID']
  /** Institution */
  institution: Institution
  /** Customizable metadata */
  metadata?: Maybe<Scalars['JSON']>
  /** API Connection Data Source */
  source?: Maybe<ConnectionSources>
  /** Source type */
  sourceType: ConnectionSourceType
  /** API Connection Data Sources */
  sources?: Maybe<Array<ConnectionSources>>
  /** Status */
  status: ConnectionStatus
}

/** Represents a Connection */
export type ConnectionTypeAccountsArgs = {
  filter?: InputMaybe<AccountFilter>
  search?: InputMaybe<SearchQuery>
}

/** Represents a Connection */
export type ConnectionTypeSourceArgs = {
  type: ConnectionSourceType
}

/** Represents a Connection */
export type ConnectionTypeSourcesArgs = {
  types?: InputMaybe<Array<ConnectionSourceType>>
}

/** Autogenerated input type of ConnectionUpdate */
export type ConnectionUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  /** Customizable metadata */
  metadata?: InputMaybe<Scalars['JSON']>
}

/** Autogenerated return type of ConnectionUpdate */
export type ConnectionUpdatePayload = {
  __typename?: 'ConnectionUpdatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated Connection Information */
  record?: Maybe<ConnectionType>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of ConnectorMxInitialize */
export type ConnectorMxInitializeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** Load the Connect widget in the specified `color_scheme`; options are `light` and `dark`. Defaults to `light`. */
  colorScheme?: InputMaybe<Scalars['String']>
  /**
   * When set to `false` while creating or updating a member, transaction data will
   * not be automatically aggregated. Future manual or background aggregations will
   * not be affected. Defaults to `true`.
   */
  includeTransactions?: InputMaybe<Scalars['Boolean']>
  /** Renders the widget in a mobile WebView. Executes URL updates in place of the JavaScript event postMessages. */
  isMobileWebview?: InputMaybe<Scalars['Boolean']>
  /** Loads the Connect widget into a specified mode; options are `verification` and `aggregation`. Defaults to `aggregation`. */
  mode?: InputMaybe<Scalars['String']>
  /**
   * Loads Connect, but forces the widget to wait until any aggregation-type
   * process is complete in order to fire a member connected postMessage. This
   * allows clients to have transactional data by the time the widget is closed.
   */
  waitForFullAggregation?: InputMaybe<Scalars['Boolean']>
}

/** Autogenerated return type of ConnectorMxInitialize */
export type ConnectorMxInitializePayload = {
  __typename?: 'ConnectorMxInitializePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Mx API Error */
  errors?: Maybe<Array<MxApiError>>
  record?: Maybe<MxConnector>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of ConnectorPlaidInitialize */
export type ConnectorPlaidInitializeInput = {
  /**
   * By default, Link will provide limited account filtering: it will only display
   * Institutions that are compatible with all products supplied in the products
   * parameter of /link/token/create, and, if auth is specified in the products
   * array, will also filter out accounts other than checking and savings accounts
   * on the Account Select pane. You can further limit the accounts shown in Link
   * by using account_filters to specify the account subtypes to be shown in Link.
   * Only the specified subtypes will be shown. This filtering applies to both the
   * Account Select view (if enabled) and the Institution Select view. Institutions
   * that do not support the selected subtypes will be omitted from Link. To
   * indicate that all subtypes should be shown, use the value "all". If the
   * account_filters filter is used, any account type for which a filter is not
   * specified will be entirely omitted from Link. For a full list of valid types
   * and subtypes, see the Account schema.
   */
  accountFilters?: InputMaybe<PlaidLinkTokenAccountFilters>
  /**
   * The name of your app's Android package. Required if using the link_token to
   * initialize Link on Android. When creating a link_token for initializing Link
   * on other platforms, this field must be left blank. Any package name specified
   * here must also be added to the Allowed Android package names setting on the
   * developer dashboard.
   */
  androidPackageName?: InputMaybe<Scalars['String']>
  /**
   * Specifies options for initializing Link for use with the Auth product. This
   * field is currently only required if using the Flexible Auth product (currently
   * in closed beta).
   */
  auth?: InputMaybe<PlaidLinkTokenCreateRequestAuth>
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /**
   * Used when launching Link in update mode, when completing the Same-day (manual)
   * Micro-deposit flow, or (optionally) when initializing Link as part of the
   * Payment Initiation (UK and Europe) flow.
   */
  connectionId?: InputMaybe<Scalars['ID']>
  /** An array of Plaid-supported country codes using ISO-3166-1 alpha-2 country code standard */
  countryCodes?: InputMaybe<Array<Scalars['String']>>
  /** Configuration parameters for EU flows */
  euConfig?: InputMaybe<PlaidLinkTokenEuConfig>
  /**
   * The language that Link should be displayed in.
   *
   * Supported languages are:
   * English ('en')
   * French ('fr')
   * Spanish ('es')
   * Dutch ('nl')
   * German('de')
   *
   * When using a Link customization, the language configured here must match the
   * setting in the customization, or the customization will not be applied.
   */
  language?: InputMaybe<Scalars['String']>
  /** The name of the Link customization from the Plaid Dashboard to be applied to Link */
  linkCustomizationName?: InputMaybe<Scalars['String']>
  /** List of products to use with Link */
  products?: InputMaybe<Array<Scalars['String']>>
  /** Specifies options for initializing Link for update mode. */
  update?: InputMaybe<PlaidLinkTokenCreateRequestUpdate>
}

/** Autogenerated return type of ConnectorPlaidInitialize */
export type ConnectorPlaidInitializePayload = {
  __typename?: 'ConnectorPlaidInitializePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Plaid API Error */
  errors?: Maybe<Array<PlaidApiError>>
  record?: Maybe<PlaidConnector>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Represents an Error */
export type Error = {
  __typename?: 'Error'
  /** A description of the error */
  message?: Maybe<Scalars['String']>
  /** Which input value this error came from */
  path?: Maybe<Array<Scalars['String']>>
}

/** Represents an image */
export type Image = {
  __typename?: 'Image'
  /** API Source */
  _sourcename: ImageSource
  /** URL for the image */
  url?: Maybe<Scalars['URL']>
}

/** Represents the data source for the image */
export enum ImageSource {
  /** MX */
  Mx = 'MX',
  /** Plaid */
  Plaid = 'PLAID',
  /** Spade */
  Spade = 'SPADE',
}

/** Represents an Institution */
export type Institution = {
  __typename?: 'Institution'
  /** Single logo */
  logo?: Maybe<Image>
  /** List of logos */
  logos?: Maybe<Array<Image>>
  /** Name */
  name: Scalars['String']
  /** API Institution Data Source */
  source?: Maybe<InstitutionSources>
  /** API Institution Data Sources */
  sources?: Maybe<Array<InstitutionSources>>
}

/** Represents an Institution */
export type InstitutionLogoArgs = {
  source?: InputMaybe<ImageSource>
}

/** Represents an Institution */
export type InstitutionLogosArgs = {
  sources?: InputMaybe<Array<ImageSource>>
}

/** Represents an Institution */
export type InstitutionSourceArgs = {
  type: InstitutionSourceType
}

/** Represents an Institution */
export type InstitutionSourcesArgs = {
  types?: InputMaybe<Array<InstitutionSourceType>>
}

/** Represents a data source for the Institution */
export enum InstitutionSourceType {
  /** MX institution */
  Mx = 'MX',
  /** Plaid institution */
  Plaid = 'PLAID',
}

export type InstitutionSources = MxInstitution | PlaidInstitution

export type LedgerBalance = {
  __typename?: 'LedgerBalance'
  /** The amount of funds including pending transactions */
  available?: Maybe<Scalars['Float']>
  /** The amount of funds based on posted transactions */
  current?: Maybe<Scalars['Float']>
  /** Cache Key */
  id: Scalars['ID']
  /** The amount of funds that may be overdraft or spent on credit */
  limit?: Maybe<Scalars['Float']>
}

export enum LedgerState {
  /** Terminated */
  Closed = 'CLOSED',
  /** Open */
  Open = 'OPEN',
  /** Disabled */
  Paused = 'PAUSED',
}

/** Represents a Merchant */
export type Merchant = {
  __typename?: 'Merchant'
  /** ID */
  id: Scalars['ID']
  /** Name */
  name: Scalars['String']
  /** API Merchant Data Source */
  source?: Maybe<MerchantSources>
  /** API Merchant Data Sources */
  sources?: Maybe<Array<MerchantSources>>
  /** State */
  state: LedgerState
  /** A limited list of transactions. Use `transactionsConnection` for a full paginated list. */
  transactions: Array<Transaction>
  /** Cursor-based pagination transactions */
  transactionsConnection: TransactionConnection
}

/** Represents a Merchant */
export type MerchantSourceArgs = {
  type: MerchantSourceType
}

/** Represents a Merchant */
export type MerchantSourcesArgs = {
  types?: InputMaybe<Array<MerchantSourceType>>
}

/** Represents a Merchant */
export type MerchantTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>
  limit?: Scalars['Int']
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Represents a Merchant */
export type MerchantTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TransactionFilter>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Represents a data source for the Merchant */
export enum MerchantSourceType {
  /** Plaid Transaction Data */
  Plaid = 'PLAID',
  /** Spade Transaction Enrichment */
  Spade = 'SPADE',
}

export type MerchantSources = PlaidMerchant | SpadeMerchant

/** Mock Account Data */
export type MockAccount = {
  __typename?: 'MockAccount'
  /** API Source */
  _sourcename: AccountSourceType
}

/** Mock Connection Data */
export type MockConnection = {
  __typename?: 'MockConnection'
  /** API Source */
  _sourcename: ConnectionSourceType
}

/** Mock Transaction Data */
export type MockTransaction = {
  __typename?: 'MockTransaction'
  /** API Source */
  _sourcename: TransactionSourceType
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type Mutation = {
  __typename?: 'Mutation'
  /** Update Account Information */
  accountUpdate?: Maybe<AccountUpdatePayload>
  /** Delete a Connection */
  connectionDelete?: Maybe<ConnectionDeletePayload>
  /** Create a Mx Member from a successful Connect submission */
  connectionMxCreate?: Maybe<ConnectionMxCreatePayload>
  /** Create a Plaid Item from a successful Link submission */
  connectionPlaidCreate?: Maybe<ConnectionPlaidCreatePayload>
  /** Import a Plaid Item with a valid access token */
  connectionPlaidImport?: Maybe<ConnectionPlaidImportPayload>
  /** Update Connection Information */
  connectionUpdate?: Maybe<ConnectionUpdatePayload>
  /** Create a MX Connect Widget URL */
  connectorMxInitialize?: Maybe<ConnectorMxInitializePayload>
  /** Create a Link Token to configure an instance of Link */
  connectorPlaidInitialize?: Maybe<ConnectorPlaidInitializePayload>
  /** Create a Plaid Processor Token suitable for sending to one of Plaid's integration partners */
  plaidProcessorTokenCreate?: Maybe<PlaidProcessorTokenCreatePayload>
  /** Update Profile Information */
  profileUpdate?: Maybe<ProfileUpdatePayload>
  /** Create a RoundUp */
  roundUpCreate?: Maybe<RoundUpCreatePayload>
  /** Pause a RoundUp */
  roundUpPause?: Maybe<RoundUpPausePayload>
  /** Resume a RoundUp */
  roundUpResume?: Maybe<RoundUpResumePayload>
  /** Set the funding account for a RoundUp */
  roundUpSetFundingAccount?: Maybe<RoundUpSetFundingAccountPayload>
  /** Set the RoundUp start time */
  roundUpSetStartTime?: Maybe<RoundUpSetStartTimePayload>
  /** Add Accounts to a RoundUp */
  roundUpSubscribedAccountsAdd?: Maybe<RoundUpSubscribedAccountsAddPayload>
  /** Remove Accounts from a RoundUp */
  roundUpSubscribedAccountsRemove?: Maybe<RoundUpSubscribedAccountsRemovePayload>
  /** Update Transaction Information */
  transactionUpdate?: Maybe<TransactionUpdatePayload>
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationAccountUpdateArgs = {
  input: AccountUpdateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectionDeleteArgs = {
  input: ConnectionDeleteInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectionMxCreateArgs = {
  input: ConnectionMxCreateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectionPlaidCreateArgs = {
  input: ConnectionPlaidCreateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectionPlaidImportArgs = {
  input: ConnectionPlaidImportInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectionUpdateArgs = {
  input: ConnectionUpdateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectorMxInitializeArgs = {
  input: ConnectorMxInitializeInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationConnectorPlaidInitializeArgs = {
  input: ConnectorPlaidInitializeInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationPlaidProcessorTokenCreateArgs = {
  input: PlaidProcessorTokenCreateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationProfileUpdateArgs = {
  input: ProfileUpdateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpCreateArgs = {
  input: RoundUpCreateInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpPauseArgs = {
  input: RoundUpPauseInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpResumeArgs = {
  input: RoundUpResumeInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpSetFundingAccountArgs = {
  input: RoundUpSetFundingAccountInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpSetStartTimeArgs = {
  input: RoundUpSetStartTimeInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpSubscribedAccountsAddArgs = {
  input: RoundUpSubscribedAccountsAddInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationRoundUpSubscribedAccountsRemoveArgs = {
  input: RoundUpSubscribedAccountsRemoveInput
}

/** The top-level Mutation type. Mutations are used to make requests that create or modify data. */
export type MutationTransactionUpdateArgs = {
  input: TransactionUpdateInput
}

/** Represents a Mx API Error */
export type MxApiError = {
  __typename?: 'MxAPIError'
  /** A developer-friendly representation of the error */
  message: Scalars['String']
  /** A representation of the http status code */
  status?: Maybe<Scalars['String']>
  /** A categorization of the error */
  type: Scalars['String']
}

/** MX Account Data */
export type MxAccount = {
  __typename?: 'MxAccount'
  /** API Source */
  _sourcename: AccountSourceType
  /** The account number associated with the account. This will typically be a masked or partial account number. */
  accountNumber?: Maybe<Scalars['String']>
  /** The annual percentage rate associated with the account. */
  apr?: Maybe<Scalars['Float']>
  /** The annual percentage yield associated with the account. */
  apy?: Maybe<Scalars['Float']>
  /**
   * The balance that is available for use in asset accounts like checking and
   * savings. PENDING transactions are typically taken into account with the
   * available balance, but this may not always be the case. available_balance will
   * usually be a positive value for all account types, determined in the same way
   * as the balance field.
   */
  availableBalance?: Maybe<Scalars['Float']>
  /**
   * The amount of credit available for use in liability accounts like credit cards
   * and lines of credit. PENDING transactions are typically taken into account
   * with available credit, but this may not always be the case. available_credit
   * will usually be a positive value for all account types, determined in the same
   * way as the balance field.
   */
  availableCredit?: Maybe<Scalars['Float']>
  /**
   * The current balance of the account. PENDING transactions are typically not
   * taken into account with the current balance, but this may not always be the
   * case. This is the value used for the account balance displayed in MX UIs. The
   * balance will usually be a positive value for all account types. Asset-type
   * accounts (CHECKING, SAVINGS, INVESTMENT) may have a negative balance if they
   * are in overdraft. Debt-type accounts (CREDIT_CARD, LOAN, LINE_OF_CREDIT,
   * MORTGAGE) may have a negative balance if they are overpaid.
   */
  balance?: Maybe<Scalars['Float']>
  /** The cash balance of the account. */
  cashBalance?: Maybe<Scalars['Float']>
  /**
   * The sum of money paid to the policyholder or annuity holder in the event the
   * policy is voluntarily terminated before it matures, or the insured event occurs.
   */
  cashSurrenderValue?: Maybe<Scalars['Float']>
  /** The date and time at which the account was created on the MX Platform. */
  createdAt?: Maybe<Scalars['String']>
  /** The credit limit associated with the account. */
  creditLimit?: Maybe<Scalars['Float']>
  /** The three-character ISO 4217 currency code. */
  currencyCode?: Maybe<Scalars['String']>
  /** The day of the month the payment is due. For example, the 14th is passed as 14. */
  dayPaymentIsDue?: Maybe<Scalars['Int']>
  /** The amount paid to the beneficiary of the account upon death of the account owner. */
  deathBenefit?: Maybe<Scalars['Int']>
  /** The unique identifier for the account. Defined by MX. */
  guid?: Maybe<Scalars['String']>
  /** The sum of all long holdings within this account, not including any that are shorted and not including cash. */
  holdingsValue?: Maybe<Scalars['Float']>
  /** The unique partner-defined identifier for the account */
  id?: Maybe<Scalars['String']>
  /** The date and time at which the account was last successfully aggregated and received data. */
  importedAt?: Maybe<Scalars['String']>
  /** A unique identifier for the institution associated with this account. Defined by MX. */
  institutionCode?: Maybe<Scalars['String']>
  /** The name of the insured individual. */
  insuredName?: Maybe<Scalars['String']>
  /** The interest rate associated with the account. */
  interestRate?: Maybe<Scalars['Float']>
  /** This indicates whether an account has been closed. */
  isClosed?: Maybe<Scalars['Boolean']>
  /** This indicates whether the account is hidden. Defaults to false. */
  isHidden?: Maybe<Scalars['Boolean']>
  /** The date and time of the most recent payment on the account. */
  lastPayment?: Maybe<Scalars['Float']>
  /** The amount of the most recent payment on the account. */
  lastPaymentAt?: Maybe<Scalars['String']>
  /** The amount of the loan associated with the account. */
  loanAmount?: Maybe<Scalars['Float']>
  /** The date on which the account matures. */
  maturesOn?: Maybe<Scalars['String']>
  /** The unique identifier for the member associated with the account. Defined by MX. */
  memberGuid?: Maybe<Scalars['String']>
  /** The unique, partner-defined, identifier for the member associated with this account. */
  memberId?: Maybe<Scalars['String']>
  /**
   * This indicates whether the associated member is managed by the user or the MX
   * partner. Members created with the managed member feature will have this field set to false.
   */
  memberIsManagedByUser?: Maybe<Scalars['Boolean']>
  /** Additional information a partner can store on the account. */
  metadata?: Maybe<Scalars['String']>
  /** The minimum balance associated with the account. */
  minimumBalance?: Maybe<Scalars['Float']>
  /** The minimum payment required for an account. This can apply to any debt account. */
  minimumPayment?: Maybe<Scalars['Float']>
  /** The human-readable name for the account. */
  name?: Maybe<Scalars['String']>
  /** An alternate name for the account. */
  nickname?: Maybe<Scalars['String']>
  /** The original balance associated with the account. This will always be positive. */
  originalBalance?: Maybe<Scalars['Float']>
  /** The amount paid out to the insured individual or beneficiary under the conditions of the insurance policy. */
  payOutAmount?: Maybe<Scalars['Float']>
  /** The date and time at which the next payment is due on the account. */
  paymentDueAt?: Maybe<Scalars['String']>
  /** The payoff balance for a debt account. This will normally be a positive number. */
  payoffBalance?: Maybe<Scalars['Float']>
  /** The insurance policy???s premium amount. */
  premiumAmount?: Maybe<Scalars['Float']>
  /** The routing number for the account. */
  routingNumber?: Maybe<Scalars['String']>
  /** The date on which a debt account was started. */
  startedOn?: Maybe<Scalars['String']>
  /** The account???s subtype, e.g., PLAN_401_K, MONEY_MARKET, or HOME_EQUITY. */
  subtype?: Maybe<Scalars['String']>
  /** The total value of the account. */
  totalAccountValue?: Maybe<Scalars['Float']>
  /** The general or parent type of the account. */
  type?: Maybe<Scalars['String']>
  /** The date and time at which the account was most recently updated. */
  updatedAt?: Maybe<Scalars['String']>
  /** The unique identifier for the user associated with the account. Defined by MX. */
  userGuid?: Maybe<Scalars['String']>
  /** The unique, partner-defined, identifier for the user associated with this account. */
  userId?: Maybe<Scalars['String']>
}

/** MX Member Data */
export type MxConnection = {
  __typename?: 'MxConnection'
  /** API Source */
  _sourcename: ConnectionSourceType
  /**
   * The date and time the most recent aggregation-type job was started, given in
   * ISO 8601 format with a time component. A job will automatically be started
   * when a member is created or its credentials are updated, unless the
   * skip_aggregation parameter is used. Jobs can also be started via manual
   * aggregations, background aggregations, API endpoints, or when opening an MX
   * widget. A job can be a normal aggregation, or a premium job such as
   * identification, verification, fetching statements, or fetching an extended
   * transaction history.
   */
  aggregatedAt?: Maybe<Scalars['String']>
  /** This indicates the state of a member???s aggregation. See member connection statuses for more information. */
  connectionStatus?: Maybe<Scalars['String']>
  /** The unique identifier for the member. Defined by MX. */
  guid?: Maybe<Scalars['String']>
  /** The partner-defined unique identifier for the member. */
  id?: Maybe<Scalars['String']>
  /** The unique identifier for the institution associated with the member. Defined by MX. */
  institutionCode?: Maybe<Scalars['String']>
  /** This indicates whether the member was being aggregated at the time of the request. */
  isBeingAggregated?: Maybe<Scalars['Boolean']>
  /**
   * This indicates whether the member is managed by the user or the MX partner.
   * Members created with the managed member feature will have this field set to false.
   */
  isManagedByUser?: Maybe<Scalars['Boolean']>
  /** This indicates whether the member uses OAuth to authenticate. Defaults to false. */
  isOauth?: Maybe<Scalars['Boolean']>
  /** Additional information you can store on this member. */
  metadata?: Maybe<Scalars['String']>
  /** The name of the member. */
  name?: Maybe<Scalars['String']>
  oauthWindowUri?: Maybe<Scalars['String']>
  /** The date and time the member was last successfully aggregated. */
  successfullyAggregatedAt?: Maybe<Scalars['String']>
  /** The unique identifier for the user associated with the member. Defined by MX. */
  userGuid?: Maybe<Scalars['String']>
  /** The unique partner-defined identifier for the user associated with the member. */
  userId?: Maybe<Scalars['String']>
}

/** MX Connect Widget Response */
export type MxConnector = {
  __typename?: 'MxConnector'
  connectWidgetUrl?: Maybe<Scalars['String']>
  guid?: Maybe<Scalars['String']>
}

/** MX Institution Data */
export type MxInstitution = {
  __typename?: 'MxInstitution'
  /** API Source */
  _sourcename: InstitutionSourceType
  /** A unique identifier for each institution, defined by MX. */
  code?: Maybe<Scalars['String']>
  /** The URL for a 100px X 100px logo for each institution. A generic logo is returned for institutions that don???t have one. */
  mediumLogoUrl?: Maybe<Scalars['String']>
  /** An easy-to-read name for an institution, e.g., ???Chase Bank??? or ???Wells Fargo Bank.??? */
  name?: Maybe<Scalars['String']>
  /**
   * String	The URL for a 50px X 50px logo for each institution. A generic logo is
   * returned for institutions that don???t have one.
   */
  smallLogoUrl?: Maybe<Scalars['String']>
  /** This indicates whether the institution supports account identification. */
  supportsAccountIdentification?: Maybe<Scalars['Boolean']>
  /** This indicates whether the institution provides access to account statements. */
  supportsAccountStatement?: Maybe<Scalars['Boolean']>
  /** This indicates whether the institution supports account verification. */
  supportsAccountVerification?: Maybe<Scalars['Boolean']>
  /** This indicates whether the institution supports OAuth authentication. */
  supportsOauth?: Maybe<Scalars['Boolean']>
  /** This indicates whether the institution allows access to up to 24 months of transaction data. */
  supportsTransactionHistory?: Maybe<Scalars['Boolean']>
  /** The URL for particular institution???s website , e.g., www.chase.com. */
  url?: Maybe<Scalars['String']>
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>
}

/** Represents a Plaid API Error */
export type PlaidApiError = {
  __typename?: 'PlaidAPIError'
  /** The particular error code. Safe for programmatic use. */
  code: Scalars['String']
  /** A user-friendly representation of the error code */
  displayMessage?: Maybe<Scalars['String']>
  /** A developer-friendly representation of the error code */
  message: Scalars['String']
  /** A unique ID identifying the request, to be used for troubleshooting purposes */
  requestId?: Maybe<Scalars['String']>
  /** A broad categorization of the error. Safe for programatic use. */
  type: Scalars['String']
}

/** Interest rates */
export type PlaidApr = {
  __typename?: 'PlaidAPR'
  /** Annual Percentage Rate applied. */
  aprPercentage: Scalars['Float']
  /** The type of balance to which the APR applies. Possible values: balance_transfer_apr, cash_apr, purchase_apr, special */
  aprType: Scalars['String']
  /**
   * Amount of money that is subjected to the APR if a balance was carried beyond
   * payment due date. How it is calculated can vary by card issuer. It is often
   * calculated as an average daily balance.
   */
  balanceSubjectToApr?: Maybe<Scalars['Float']>
  /** Amount of money charged due to interest from last statement. */
  interestChargeAmount?: Maybe<Scalars['Float']>
}

/** Plaid Account Data */
export type PlaidAccount = {
  __typename?: 'PlaidAccount'
  /** API Source */
  _sourcename: AccountSourceType
  /** Plaid???s unique identifier for the account */
  accountId: Scalars['String']
  /** A set of fields describing the balance for an account. Balance information may be cached */
  balances: PlaidAccountBalance
  /** The liabilities account details */
  liabilities?: Maybe<PlaidAccountLiabilities>
  /**
   * The last 2-4 alphanumeric characters of an account's official account number.
   * Note that the mask may be non-unique between an Item's accounts, and it may
   * also not match the mask that the bank displays to the user.
   */
  mask?: Maybe<Scalars['String']>
  /** The name of the account, either assigned by the user or by the financial institution itself */
  name: Scalars['String']
  /** The official name of the account as given by the financial institution */
  officialName?: Maybe<Scalars['String']>
  /**
   * Possible values: 401a, 401k, 403B, 457b, 529, brokerage, cash isa, education
   * savings account, gic, health reimbursement arrangement, hsa, isa, ira, lif,
   * lira, lrif, lrsp, non-taxable brokerage account, other, prif, rdsp, resp,
   * rlif, rrif, pension, profit sharing plan, retirement, roth, roth 401k, rrsp,
   * sep ira, simple ira, sipp, stock plan, thrift savings plan, tfsa, trust, ugma,
   * utma, variable annuity, credit card, paypal, cd, checking, savings, money
   * market, prepaid, auto, commercial, construction, consumer, home, home equity,
   * loan, mortgage, overdraft, line of credit, student, cash management, keogh,
   * mutual fund, recurring, rewards, safe deposit, sarsep, null
   */
  subtype?: Maybe<Scalars['String']>
  /** Possible values: investment, credit, depository, loan, brokerage, other */
  type: Scalars['String']
  /**
   * The current verification status of an Auth Item initiated through Automated or
   * Manual micro-deposits.  Returned for Auth Items only.
   * Possible values: pending_automatic_verification, pending_manual_verification,
   * manually_verified, verification_expired, verification_failed
   */
  verificationStatus?: Maybe<Scalars['String']>
}

/** A set of fields describing the balance for an account. */
export type PlaidAccountBalance = {
  __typename?: 'PlaidAccountBalance'
  /** The amount of funds available to be withdrawn from the account, as determined by the financial institution. */
  available?: Maybe<Scalars['Float']>
  /** The total amount of funds in or owed by the account. */
  current?: Maybe<Scalars['Float']>
  /** The ISO-4217 currency code of the balance. Always null if unofficial_currency_code is non-null. */
  isoCurrencyCode?: Maybe<Scalars['String']>
  /** The last time that the balance for the given account has been updated */
  lastUpdatedDatetime?: Maybe<Scalars['DateTime']>
  /** For credit-type accounts, this represents the credit limit. */
  limit?: Maybe<Scalars['Float']>
  /**
   * The unofficial currency code associated with the balance. Always null if
   * iso_currency_code is non-null. Unofficial currency codes are used for
   * currencies that do not have official ISO currency codes, such as
   * cryptocurrencies and the currencies of certain countries.
   */
  unofficialCurrencyCode?: Maybe<Scalars['String']>
}

/** Plaid Liabilities Data */
export type PlaidAccountLiabilities = {
  __typename?: 'PlaidAccountLiabilities'
  /** The credit card account details */
  credit?: Maybe<PlaidAccountLiabilitiesCredit>
  /** The mortgage account details */
  mortgage?: Maybe<PlaidAccountLiabilitiesMortgage>
  /** The student loan account details */
  student?: Maybe<PlaidAccountLiabilitiesStudent>
}

/** Plaid Credit Card Data */
export type PlaidAccountLiabilitiesCredit = {
  __typename?: 'PlaidAccountLiabilitiesCredit'
  /** Plaid???s unique identifier for the account */
  accountId?: Maybe<Scalars['String']>
  /** The various interest rates that apply to the account. */
  aprs: Array<PlaidApr>
  /** true if a payment is currently overdue. Availability for this field is limited. */
  isOverdue?: Maybe<Scalars['Boolean']>
  /** The amount of the last payment. */
  lastPaymentAmount: Scalars['Float']
  /** The date of the last payment. */
  lastPaymentDate?: Maybe<Scalars['Date']>
  /** The total amount owed as of the last statement issued */
  lastStatementBalance: Scalars['Float']
  /** The date of the last statement. */
  lastStatementIssueDate: Scalars['Date']
  /**
   * The minimum payment due for the next billing cycle. There are some exceptions:
   * Some institutions require a minimum payment across all loans associated with
   * an account number. Our API presents that same minimum payment amount on each
   * loan. The institutions that do this are: Great Lakes (ins_116861), Firstmark
   * (ins_116295), Commonbond Firstmark Services (ins_116950), Nelnet (ins_116528),
   * EdFinancial Services (ins_116304), Granite State (ins_116308), and Oklahoma
   * Student Loan Authority (ins_116945).
   * Firstmark (ins_116295) will display as $0 if there is an autopay program in effect.
   */
  minimumPaymentAmount: Scalars['Float']
  /** The due date for the next payment. */
  nextPaymentDueDate?: Maybe<Scalars['Date']>
}

/** Plaid Mortgage Data */
export type PlaidAccountLiabilitiesMortgage = {
  __typename?: 'PlaidAccountLiabilitiesMortgage'
  /** Plaid???s unique identifier for the account */
  accountId: Scalars['String']
  /**
   * The account number of the loan. For some institutions, this may be a masked
   * version of the number (e.g., the last 4 digits instead of the entire number).
   */
  accountNumber: Scalars['String']
  /** The current outstanding amount charged for late payment. */
  currentLateFee?: Maybe<Scalars['Float']>
  /** Total amount held in escrow to pay taxes and insurance on behalf of the borrower. */
  escrowBalance?: Maybe<Scalars['Float']>
  /** Indicates whether the borrower has private mortgage insurance in effect. */
  hasPmi?: Maybe<Scalars['Boolean']>
  /** Indicates whether the borrower will pay a penalty for early payoff of mortgage. */
  hasPrepaymentPenalty?: Maybe<Scalars['Boolean']>
  /** Object containing metadata about the interest rate for the mortgage. */
  interestRate: PlaidMortgageInterestRate
  /** The amount of the last payment. */
  lastPaymentAmount?: Maybe<Scalars['Float']>
  /** The date of the last payment. */
  lastPaymentDate?: Maybe<Scalars['Date']>
  /** Full duration of mortgage as at origination (e.g. 10 year). */
  loanTerm?: Maybe<Scalars['String']>
  /**
   * Description of the type of loan, for example conventional, fixed, or variable.
   * This field is provided directly from the loan servicer and does not have an
   * enumerated set of possible values.
   */
  loanTypeDescription?: Maybe<Scalars['String']>
  /** Original date on which mortgage is due in full. */
  maturityDate?: Maybe<Scalars['Date']>
  /** The amount of the next payment. */
  nextMonthlyPayment?: Maybe<Scalars['Float']>
  /** The due date for the next payment. */
  nextPaymentDueDate?: Maybe<Scalars['Date']>
  /** The date on which the loan was initially lent. */
  originationDate?: Maybe<Scalars['Date']>
  /** The original principal balance of the mortgage. */
  originationPrincipalAmount?: Maybe<Scalars['Float']>
  /** Amount of loan (principal + interest) past due for payment. */
  pastDueAmount?: Maybe<Scalars['Float']>
  /** Object containing fields describing property address. */
  propertyAddress: PlaidMortgagePropertyAddress
  /** The year to date (YTD) interest paid. Availability for this field is limited. */
  ytdInterestPaid?: Maybe<Scalars['Float']>
  /** The year to date (YTD) principal paid. Availability for this field is limited. */
  ytdPrincipalPaid?: Maybe<Scalars['Float']>
}

/** Plaid Studen Loan Data */
export type PlaidAccountLiabilitiesStudent = {
  __typename?: 'PlaidAccountLiabilitiesStudent'
  /** Plaid???s unique identifier for the account */
  accountId?: Maybe<Scalars['String']>
  /**
   * The account number of the loan. For some institutions, this may be a masked
   * version of the number (e.g., the last 4 digits instead of the entire number).
   */
  accountNumber?: Maybe<Scalars['String']>
  /** The dates on which loaned funds were disbursed or will be disbursed. These are often in the past. */
  disbursementDates?: Maybe<Array<Scalars['Date']>>
  /** The date when the student loan is expected to be paid off. Availability for this field is limited. */
  expectedPayoffDate?: Maybe<Scalars['Date']>
  /** The guarantor of the student loan. */
  guarantor?: Maybe<Scalars['String']>
  /** The interest rate on the loan as a percentage. */
  interestRatePercentage: Scalars['Float']
  /** true if a payment is currently overdue. Availability for this field is limited. */
  isOverdue?: Maybe<Scalars['Boolean']>
  /** The amount of the last payment. */
  lastPaymentAmount?: Maybe<Scalars['Float']>
  /** The date of the last payment. */
  lastPaymentDate?: Maybe<Scalars['Date']>
  /** The date of the last statement. */
  lastStatementIssueDate?: Maybe<Scalars['Date']>
  /** The type of loan, e.g., "Consolidation Loans". */
  loanName?: Maybe<Scalars['String']>
  /** An object representing the status of the student loan */
  loanStatus: PlaidStudentLoanStatus
  /**
   * The minimum payment due for the next billing cycle. There are some exceptions:
   * Some institutions require a minimum payment across all loans associated with
   * an account number. Our API presents that same minimum payment amount on each
   * loan. The institutions that do this are: Great Lakes (ins_116861), Firstmark
   * (ins_116295), Commonbond Firstmark Services (ins_116950), Nelnet (ins_116528),
   * EdFinancial Services (ins_116304), Granite State (ins_116308), and Oklahoma
   * Student Loan Authority (ins_116945).
   * Firstmark (ins_116295) will display as $0 if there is an autopay program in effect.
   */
  minimumPaymentAmount?: Maybe<Scalars['Float']>
  /** The due date for the next payment. */
  nextPaymentDueDate?: Maybe<Scalars['Date']>
  /** The date on which the loan was initially lent. */
  originationDate?: Maybe<Scalars['Date']>
  /** The original principal balance of the mortgage. */
  originationPrincipalAmount?: Maybe<Scalars['Float']>
  /**
   * The total dollar amount of the accrued interest balance. For Sallie Mae (
   * ins_116944), this amount is included in the current balance of the loan, so
   * this field will return as null.
   */
  outstandingInterestAmount?: Maybe<Scalars['Float']>
  /**
   * The relevant account number that should be used to reference this loan for
   * payments. In the majority of cases, payment_reference_number will match
   * account_number, but in some institutions, such as Great Lakes (ins_116861), it
   * will be different.
   */
  paymentReferenceNumber?: Maybe<Scalars['String']>
  /**
   * Information about the student's eligibility in the Public Service Loan
   * Forgiveness program. This is only returned if the institution is Fedloan (ins_116527).
   */
  pslfStatus: PlaidPslfStatus
  /** An object representing the repayment plan for the student loan */
  repaymentPlan: PlaidStudentRepaymentPlan
  /** The sequence number of the student loan. Heartland ECSI (ins_116948) does not make this field available. */
  sequenceNumber?: Maybe<Scalars['String']>
  /** The address of the student loan servicer. This is generally the remittance address to which payments should be sent. */
  servicerAddress: PlaidServicerAddressData
  /** The year to date (YTD) interest paid. Availability for this field is limited. */
  ytdInterestPaid?: Maybe<Scalars['Float']>
  /** The year to date (YTD) principal paid. Availability for this field is limited. */
  ytdPrincipalPaid?: Maybe<Scalars['Float']>
}

/** Metadata that captures information about the Auth features of an institution. */
export type PlaidAuthMetadata = {
  __typename?: 'PlaidAuthMetadata'
  supportedMethods?: Maybe<PlaidAuthSupportedMethods>
}

/** Metadata specifically related to which auth methods an institution supports. */
export type PlaidAuthSupportedMethods = {
  __typename?: 'PlaidAuthSupportedMethods'
  /** Indicates if automated microdeposits are supported. */
  automatedMicroDeposits: Scalars['Boolean']
  /** Indicates if instant auth is supported. */
  instantAuth: Scalars['Boolean']
  /** Indicates if instant match is supported. */
  instantMatch: Scalars['Boolean']
}

/** Plaid Item Data */
export type PlaidConnection = {
  __typename?: 'PlaidConnection'
  /** API Source */
  _sourcename: ConnectionSourceType
  /** A list of products available for the Item that have not yet been accessed. */
  availableProducts: Array<Scalars['String']>
  /**
   * A list of products that have been billed for the Item. Note -
   * `billed_products` is populated in all environments but only requests in
   * Production are billed.
   */
  billedProducts: Array<Scalars['String']>
  /**
   * The RFC 3339 timestamp after which the consent provided by the end user will
   * expire. Upon consent expiration, the item will enter the `ITEM_LOGIN_REQUIRED`
   * error state. To circumvent the `ITEM_LOGIN_REQUIRED` error and maintain
   * continuous consent, the end user can reauthenticate via Link???s update mode in
   * advance of the consent expiration time.  Note - This is only relevant for
   * certain OAuth-based institutions. For all other institutions, this field will be null.
   */
  consentExpirationTime?: Maybe<Scalars['DateTime']>
  error?: Maybe<PlaidError>
  /** The Plaid Institution ID associated with the Item. Field is `null` for Items created via Same Day Micro-deposits. */
  institutionId?: Maybe<Scalars['String']>
  /**
   * The Plaid Item ID. The `item_id` is always unique; linking the same account at
   * the same institution twice will result in two Items with different `item_id`
   * values. Like all Plaid identifiers, the `item_id` is case-sensitive.
   */
  itemId: Scalars['String']
  /** A list of authorized products for the Item. */
  products: Array<Scalars['String']>
  /**
   * Indicates whether an Item requires user interaction to be updated, which can
   * be the case for Items with some forms of two-factor authentication.
   * `background` - Item can be updated in the background `user_present_required` -
   * Item requires user interaction to be updated
   */
  updateType: Scalars['String']
  /** The URL registered to receive webhooks for the Item. */
  webhook?: Maybe<Scalars['String']>
}

/** Plaid Link Token Create Response */
export type PlaidConnector = {
  __typename?: 'PlaidConnector'
  /**
   * The expiration date for the `link_token`, in [ISO
   * 8601](https://wikipedia.org/wiki/ISO_8601) format. A `link_token` created to
   * generate a `public_token` that will be exchanged for a new `access_token`
   * expires after 4 hours. A `link_token` created for an existing Item (such as
   * when updating an existing `access_token` by launching Link in update mode)
   * expires after 30 minutes.
   */
  expiration: Scalars['DateTime']
  /**
   * A `link_token`, which can be supplied to Link in order to initialize it and
   * receive a `public_token`, which can be exchanged for an `access_token`.
   */
  linkToken: Scalars['String']
  /**
   * A unique identifier for the request, which can be used for troubleshooting.
   * This identifier, like all Plaid identifiers, is case sensitive.
   */
  requestId: Scalars['String']
}

/** A filter to apply to `credit`-type accounts */
export type PlaidCreditFilter = {
  /**
   * An array of account subtypes to display in Link. If not specified, all account
   * subtypes will be shown. For a full list of valid types and subtypes, see the
   * [Account schema](https://plaid.com/docs/api/accounts#accounts-schema).
   */
  accountSubtypes?: InputMaybe<Array<Scalars['String']>>
}

/** A filter to apply to `depository`-type accounts */
export type PlaidDepositoryFilter = {
  /**
   * An array of account subtypes to display in Link. If not specified, all account
   * subtypes will be shown. For a full list of valid types and subtypes, see the
   * [Account schema](https://plaid.com/docs/api/accounts#accounts-schema).
   */
  accountSubtypes?: InputMaybe<Array<Scalars['String']>>
}

/**
 * We use standard HTTP response codes for success and failure notifications, and
 * our errors are further classified by error_type. In general, 200 HTTP codes
 * correspond to success, 40X codes are for developer- or user-related failures,
 * and 50X codes are for Plaid-related issues.  Error fields will be null if no
 * error has occurred.
 */
export type PlaidError = {
  __typename?: 'PlaidError'
  /**
   * In the Assets product, a request can pertain to more than one Item. If an
   * error is returned for such a request, `causes` will return an array of errors
   * containing a breakdown of these errors on the individual Item level, if any
   * can be identified.  `causes` will only be provided for the `error_type`
   * `ASSET_REPORT_ERROR`. `causes` will also not be populated inside an error
   * nested within a `warning` object.
   */
  causes: Array<Scalars['String']>
  /**
   * A user-friendly representation of the error code. `null` if the error is not
   * related to user action.  This may change over time and is not safe for
   * programmatic use.
   */
  displayMessage?: Maybe<Scalars['String']>
  /** The URL of a Plaid documentation page with more information about the error */
  documentationUrl: Scalars['String']
  /** The particular error code. Safe for programmatic use. */
  errorCode: Scalars['String']
  /** A developer-friendly representation of the error code. This may change over time and is not safe for programmatic use. */
  errorMessage: Scalars['String']
  /** A broad categorization of the error. Safe for programatic use. */
  errorType: Scalars['String']
  /**
   * A unique ID identifying the request, to be used for troubleshooting purposes.
   * This field will be omitted in errors provided by webhooks.
   */
  requestId: Scalars['String']
  /**
   * The HTTP status code associated with the error. This will only be returned in
   * the response body when the error information is provided via a webhook.
   */
  status?: Maybe<Scalars['Float']>
  /** Suggested steps for resolving the error */
  suggestedAction: Scalars['String']
}

/** Plaid Institution Data */
export type PlaidInstitution = {
  __typename?: 'PlaidInstitution'
  /** API Source */
  _sourcename: InstitutionSourceType
  /** A list of the country codes supported by the institution. */
  authMetadata?: Maybe<PlaidAuthMetadata>
  /** A list of the country codes supported by the institution. */
  countryCodes: Array<Scalars['String']>
  /** Unique identifier for the institution */
  institutionId: Scalars['String']
  /** Base64 encoded representation of the institution's logo */
  logo?: Maybe<Scalars['String']>
  /** The official name of the institution */
  name: Scalars['String']
  /**
   * Indicates that the institution has an OAuth login flow. This is primarily
   * relevant to institutions with European country codes.
   */
  oauth: Scalars['Boolean']
  /** Hexadecimal representation of the primary color used by the institution */
  primaryColor?: Maybe<Scalars['String']>
  /**
   * A list of the Plaid products supported by the institution. Note that only
   * institutions that support Instant Auth will return `auth` in the product
   * array; institutions that do not list `auth` may still support other Auth
   * methods such as Instant Match or Automated Micro-deposit Verification. For
   * more details, see [Full Auth coverage](https://plaid.com/docs/auth/coverage/).
   */
  products: Array<Scalars['String']>
  /**
   * A partial list of routing numbers associated with the institution. This list
   * is provided for the purpose of looking up institutions by routing number. It
   * is not comprehensive and should never be used as a complete list of routing
   * numbers for an institution.
   */
  routingNumbers: Array<Scalars['String']>
  /** The URL for the institution's website */
  url?: Maybe<Scalars['String']>
}

/** A filter to apply to `investment`-type accounts */
export type PlaidInvestmentFilter = {
  /**
   * An array of account subtypes to display in Link. If not specified, all account
   * subtypes will be shown. For a full list of valid types and subtypes, see the
   * [Account schema](https://plaid.com/docs/api/accounts#accounts-schema).
   */
  accountSubtypes?: InputMaybe<Array<Scalars['String']>>
}

/**
 * By default, Link will provide limited account filtering: it will only display
 * Institutions that are compatible with all products supplied in the `products`
 * parameter of `/link/token/create`, and, if `auth` is specified in the `products`
 * array, will also filter out accounts other than `checking` and `savings`
 * accounts on the Account Select pane. You can further limit the accounts shown in
 * Link by using `account_filters` to specify the account subtypes to be shown in
 * Link. Only the specified subtypes will be shown. This filtering applies to both
 * the Account Select view (if enabled) and the Institution Select view.
 * Institutions that do not support the selected subtypes will be omitted from
 * Link. To indicate that all subtypes should be shown, use the value `\"all\"`. If
 * the `account_filters` filter is used, any account type for which a filter is not
 * specified will be entirely omitted from Link. For a full list of valid types and
 * subtypes, see the [Account
 * schema](https://plaid.com/docs/api/accounts#accounts-schema).  For institutions
 * using OAuth, the filter will not affect the list of accounts shown by the bank
 * in the OAuth window.
 */
export type PlaidLinkTokenAccountFilters = {
  credit?: InputMaybe<PlaidCreditFilter>
  depository?: InputMaybe<PlaidDepositoryFilter>
  investment?: InputMaybe<PlaidInvestmentFilter>
  loan?: InputMaybe<PlaidLoanFilter>
}

/**
 * Specifies options for initializing Link for use with the Auth product. This
 * field is currently only required if using the Flexible Auth product (currently
 * in closed beta).
 */
export type PlaidLinkTokenCreateRequestAuth = {
  /** The optional Auth flow to use. Currently only used to enable Flexible Auth. */
  flowType?: InputMaybe<Scalars['String']>
}

/** Specifies options for initializing Link for [update mode](https://plaid.com/docs/link/update-mode). */
export type PlaidLinkTokenCreateRequestUpdate = {
  /** If `true`, enables [update mode with Account Select](https://plaid.com/docs/link/update-mode/#using-update-mode-to-request-new-accounts). */
  accountSelectionEnabled?: InputMaybe<Scalars['Boolean']>
}

/** Configuration parameters for EU flows */
export type PlaidLinkTokenEuConfig = {
  /** If `true`, open Link without an initial UI. Defaults to `false`. */
  headless?: InputMaybe<Scalars['Boolean']>
}

/**
 * An array of account subtypes to display in Link. If not specified, all account
 * subtypes will be shown. For a full list of valid types and subtypes, see the
 * [Account schema](https://plaid.com/docs/api/accounts#accounts-schema).
 */
export type PlaidLoanFilter = {
  /**
   * An array of account subtypes to display in Link. If not specified, all account
   * subtypes will be shown. For a full list of valid types and subtypes, see the
   * [Account schema](https://plaid.com/docs/api/accounts#accounts-schema).
   */
  accountSubtypes?: InputMaybe<Array<Scalars['String']>>
}

/** A representation of where a transaction took place */
export type PlaidLocation = {
  __typename?: 'PlaidLocation'
  /** The street address where the transaction occurred. */
  address?: Maybe<Scalars['String']>
  /** The city where the transaction occurred. */
  city?: Maybe<Scalars['String']>
  /** The ISO 3166-1 alpha-2 country code where the transaction occurred. */
  country?: Maybe<Scalars['String']>
  /** The latitude where the transaction occurred. */
  lat?: Maybe<Scalars['Float']>
  /** The longitude where the transaction occurred. */
  lon?: Maybe<Scalars['Float']>
  /** The postal code where the transaction occurred. */
  postalCode?: Maybe<Scalars['String']>
  /** The region or state where the transaction occurred. */
  region?: Maybe<Scalars['String']>
  /** The merchant defined store number where the transaction occurred. */
  storeNumber?: Maybe<Scalars['String']>
}

/** Plaid Merchant Data */
export type PlaidMerchant = {
  __typename?: 'PlaidMerchant'
  /** API Source */
  _sourcename: MerchantSourceType
  /** The name of the merchant */
  name: Scalars['String']
}

/** Object containing metadata about the interest rate for the mortgage. */
export type PlaidMortgageInterestRate = {
  __typename?: 'PlaidMortgageInterestRate'
  /** Percentage value (interest rate of current mortgage, not APR) of interest payable on a loan. */
  percentage?: Maybe<Scalars['Float']>
  /** The type of interest charged (fixed or variable). */
  type?: Maybe<Scalars['String']>
}

/** Object containing fields describing property address. */
export type PlaidMortgagePropertyAddress = {
  __typename?: 'PlaidMortgagePropertyAddress'
  /** The city name. */
  city?: Maybe<Scalars['String']>
  /** The ISO 3166-1 alpha-2 country code. */
  country?: Maybe<Scalars['String']>
  /** The five or nine digit postal code. */
  postalCode?: Maybe<Scalars['String']>
  /** The region or state (example "NC"). */
  region?: Maybe<Scalars['String']>
  /** The full street address (example "564 Main Street, Apt 15"). */
  street?: Maybe<Scalars['String']>
}

/**
 * Information about the student's eligibility in the Public Service Loan
 * Forgiveness program. This is only returned if the institution is Fedloan (ins_116527).
 */
export type PlaidPslfStatus = {
  __typename?: 'PlaidPSLFStatus'
  /** The estimated date borrower will have completed 120 qualifying monthly payments. */
  estimatedEligibilityDate?: Maybe<Scalars['Date']>
  /** The number of qualifying payments that have been made. */
  paymentsMade?: Maybe<Scalars['Float']>
  /** The number of qualifying payments remaining. */
  paymentsRemaining?: Maybe<Scalars['Float']>
}

/**
 * Transaction information specific to inter-bank transfers. If the transaction was
 * not an inter-bank transfer, all fields will be null.
 */
export type PlaidPaymentMeta = {
  __typename?: 'PlaidPaymentMeta'
  /** The party initiating a wire transfer. Will be null if the transaction is not a wire transfer. */
  byOrderOf?: Maybe<Scalars['String']>
  /** For transfers, the party that is receiving the transaction. */
  payee?: Maybe<Scalars['String']>
  /** For transfers, the party that is paying the transaction. */
  payer?: Maybe<Scalars['String']>
  /** The type of transfer, e.g. 'ACH' */
  paymentMethod?: Maybe<Scalars['String']>
  /** The name of the payment processor */
  paymentProcessor?: Maybe<Scalars['String']>
  /** The ACH PPD ID for the payer. */
  ppdId?: Maybe<Scalars['String']>
  /** The payer-supplied description of the transfer. */
  reason?: Maybe<Scalars['String']>
  /** The transaction reference number supplied by the financial institution. */
  referenceNumber?: Maybe<Scalars['String']>
}

/**
 * Information describing the intent of the transaction. Most relevant for personal
 * finance use cases, but not limited to such use cases.
 */
export type PlaidPersonalFinanceCategory = {
  __typename?: 'PlaidPersonalFinanceCategory'
  /** Provides additional granularity to the primary categorization. */
  detailed: Scalars['String']
  /** A high level category that communicates the broad category of the transaction. */
  primary: Scalars['String']
}

/** Represents a Processor Token */
export type PlaidProcessorToken = {
  __typename?: 'PlaidProcessorToken'
  /** The `processor_token` that can then be used by the Plaid partner to make API requests */
  processorToken: Scalars['ID']
}

/** Autogenerated input type of PlaidProcessorTokenCreate */
export type PlaidProcessorTokenCreateInput = {
  /**
   * The Plaid `account_id` from Plaid Link's `onSuccess` callback or the
   * `accountId` from the Quiltt Account's PlaidAccount source
   */
  accountId: Scalars['ID']
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** The ID associated with the Connection data is being requested for. */
  connectionId: Scalars['ID']
  /** The processor you are integrating with */
  processor: Scalars['String']
}

/** Autogenerated return type of PlaidProcessorTokenCreate */
export type PlaidProcessorTokenCreatePayload = {
  __typename?: 'PlaidProcessorTokenCreatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** Plaid API Error */
  errors?: Maybe<Array<PlaidApiError>>
  /** Processor token */
  record?: Maybe<PlaidProcessorToken>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** The address of the student loan servicer. This is generally the remittance address to which payments should be sent. */
export type PlaidServicerAddressData = {
  __typename?: 'PlaidServicerAddressData'
  /** The full city name */
  city?: Maybe<Scalars['String']>
  /** The ISO 3166-1 alpha-2 country code */
  country?: Maybe<Scalars['String']>
  /** The postal code */
  postalCode?: Maybe<Scalars['String']>
  /** The region or state */
  region?: Maybe<Scalars['String']>
  /** The full street address */
  street?: Maybe<Scalars['String']>
}

/** An object representing the status of the student loan */
export type PlaidStudentLoanStatus = {
  __typename?: 'PlaidStudentLoanStatus'
  /** The date until which the loan will be in its current status. */
  endDate?: Maybe<Scalars['Date']>
  /** The status type of the student loan */
  type?: Maybe<Scalars['String']>
}

/** An object representing the repayment plan for the student loan */
export type PlaidStudentRepaymentPlan = {
  __typename?: 'PlaidStudentRepaymentPlan'
  /** The description of the repayment plan as provided by the servicer. */
  description?: Maybe<Scalars['String']>
  /**
   * The type of the repayment plan.
   * Possible values: extended graduated, extended standard, graduated,
   * income-contingent repayment, income-based repayment, interest-only, other, pay
   * as you earn, revised pay as you earn, standard, null
   */
  type?: Maybe<Scalars['String']>
}

/** Plaid Transaction Data */
export type PlaidTransaction = {
  __typename?: 'PlaidTransaction'
  /** API Source */
  _sourcename: TransactionSourceType
  /** The ID of the account in which this transaction occurred. */
  accountId: Scalars['String']
  /** The name of the account owner. This field is not typically populated and only relevant when dealing with sub-accounts. */
  accountOwner?: Maybe<Scalars['String']>
  /**
   * The settled value of the transaction, denominated in the account's currency,
   * as stated in iso_currency_code or unofficial_currency_code. Positive values
   * when money moves out of the account; negative values when money moves in. For
   * example, debit card purchases are positive; credit card payments, direct
   * deposits, and refunds are negative.
   */
  amount: Scalars['Float']
  /** The date that the transaction was authorized. */
  authorizedDate?: Maybe<Scalars['Date']>
  /** Date and time when a transaction was authorized */
  authorizedDatetime?: Maybe<Scalars['DateTime']>
  /** A hierarchical array of the categories to which this transaction belongs. */
  category?: Maybe<Array<Scalars['String']>>
  /** The ID of the category to which this transaction belongs. */
  categoryId?: Maybe<Scalars['String']>
  /** The check number of the transaction. This field is only populated for check transactions. */
  checkNumber?: Maybe<Scalars['String']>
  /**
   * For pending transactions, the date that the transaction occurred; for posted
   * transactions, the date that the transaction posted.
   */
  date: Scalars['Date']
  /** Date and time when a transaction was posted */
  datetime?: Maybe<Scalars['DateTime']>
  /** The ISO-4217 currency code of the transaction. Always null if unofficial_currency_code is non-null. */
  isoCurrencyCode?: Maybe<Scalars['String']>
  /** A representation of where a transaction took place */
  location: PlaidLocation
  /** The merchant name, as extracted by Plaid from the name field. */
  merchantName?: Maybe<Scalars['String']>
  /** The merchant name or transaction description. */
  name: Scalars['String']
  /** The string returned by the financial institution to describe the transaction. */
  originalDescription?: Maybe<Scalars['String']>
  /** The channel used to make a payment. Possible values: online, in store, other */
  paymentChannel: Scalars['String']
  /**
   * Transaction information specific to inter-bank transfers. If the transaction
   * was not an inter-bank transfer, all fields will be null.
   */
  paymentMeta: PlaidPaymentMeta
  /**
   * When true, identifies the transaction as pending or unsettled. Pending
   * transaction details (name, type, amount, category ID) may change before they are settled.
   */
  pending: Scalars['Boolean']
  /** The ID of a posted transaction's associated pending transaction, where applicable. */
  pendingTransactionId?: Maybe<Scalars['String']>
  /**
   * Information describing the intent of the transaction. Most relevant for
   * personal finance use cases, but not limited to such use cases.
   */
  personalFinanceCategory?: Maybe<PlaidPersonalFinanceCategory>
  /**
   * An identifier classifying the transaction type. Possible values: adjustment,
   * atm, bank charge, bill payment, cash, cashback, cheque, direct debit,
   * interest, purchase, standing order, transfer, null
   */
  transactionCode?: Maybe<Scalars['String']>
  /** The unique ID of the transaction. */
  transactionId: Scalars['String']
  /**
   * Please use the payment_channel field, transaction_type will be deprecated in
   * the future. digital: transactions that took place online. place: transactions
   * that were made at a physical location. special: transactions that relate to
   * banks, e.g. fees or deposits. unresolved: transactions that do not fit into
   * the other three types. Possible values: digital, place, special, unresolved
   */
  transactionType: Scalars['String']
  /**
   * The unofficial currency code associated with the transaction. Always null if
   * iso_currency_code is non-null. Unofficial currency codes are used for
   * currencies that do not have official ISO currency codes, such as
   * cryptocurrencies and the currencies of certain countries.
   */
  unofficialCurrencyCode?: Maybe<Scalars['String']>
}

/** Represents a Profile */
export type Profile = {
  __typename?: 'Profile'
  /** Mailing Address */
  address?: Maybe<ProfileAddress>
  /** Birthday */
  dateOfBirth?: Maybe<Scalars['Date']>
  /** Email */
  email?: Maybe<Scalars['String']>
  /** ID */
  id: Scalars['ID']
  /** Customizable metadata */
  metadata?: Maybe<Scalars['JSON']>
  /** Common or Nickname */
  name?: Maybe<Scalars['String']>
  /** Legal Name */
  names?: Maybe<ProfileName>
  /** Cellphone in E164 Format */
  phone?: Maybe<Scalars['String']>
}

/** Represents an Address */
export type ProfileAddress = {
  __typename?: 'ProfileAddress'
  /** City */
  city?: Maybe<Scalars['String']>
  /** Country Code */
  countryCode?: Maybe<AddressCountryCode>
  /** Line 1 */
  line1?: Maybe<Scalars['String']>
  /** Line 2 */
  line2?: Maybe<Scalars['String']>
  /** Postal Code */
  postalCode?: Maybe<Scalars['String']>
  /** State */
  state?: Maybe<Scalars['String']>
}

/** Attributes for setting an Address */
export type ProfileAddressInput = {
  /** City */
  city: Scalars['String']
  /** Country Code */
  countryCode: AddressCountryCode
  /** Line 1 */
  line1: Scalars['String']
  /** Line 2 */
  line2?: InputMaybe<Scalars['String']>
  /** Postal Code */
  postalCode: Scalars['String']
  /** State */
  state: Scalars['String']
}

/** Represents an Legal Name */
export type ProfileName = {
  __typename?: 'ProfileName'
  /** Given Name */
  first?: Maybe<Scalars['String']>
  /** Full Name */
  full?: Maybe<Scalars['String']>
  /** Surname */
  last?: Maybe<Scalars['String']>
}

/** Attributes for setting a Legal Name */
export type ProfileNameInput = {
  /** Legal Given Name */
  first: Scalars['String']
  /** Legal Surname */
  last: Scalars['String']
}

/** Autogenerated input type of ProfileUpdate */
export type ProfileUpdateInput = {
  /** Mailing Address */
  address?: InputMaybe<ProfileAddressInput>
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** Birthday */
  dateOfBirth?: InputMaybe<Scalars['Date']>
  /** Email */
  email?: InputMaybe<Scalars['String']>
  /** Customizable metadata */
  metadata?: InputMaybe<Scalars['JSON']>
  /** Common or Nickname */
  name?: InputMaybe<Scalars['String']>
  /** Legal Name */
  names?: InputMaybe<ProfileNameInput>
  /** Cellphone in E164 Format */
  phone?: InputMaybe<Scalars['String']>
}

/** Autogenerated return type of ProfileUpdate */
export type ProfileUpdatePayload = {
  __typename?: 'ProfileUpdatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated Profile Information */
  record?: Maybe<Profile>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** The top-level Query type. Queries are used to fetch data. */
export type Query = {
  __typename?: 'Query'
  /** Look up an Account by its ID */
  account?: Maybe<Account>
  /** Get a list of Accounts */
  accounts?: Maybe<Array<Account>>
  /** Look up a Connection by its ID */
  connection?: Maybe<ConnectionType>
  /** Get a list of Connections */
  connections?: Maybe<Array<ConnectionType>>
  /** Look up an Merchant by its ID */
  merchant?: Maybe<Merchant>
  /** Get a list of Merchants */
  merchants?: Maybe<Array<Merchant>>
  /** Get profile information for the authenticated user */
  profile?: Maybe<Profile>
  /** Look up a Recurrence by its ID */
  recurrence?: Maybe<Recurrence>
  /** Get a list of Recurrences */
  recurrences?: Maybe<Array<Recurrence>>
  /** Look up a RoundUp by its ID */
  roundUp?: Maybe<RoundUp>
  /** Get a list of RoundUps */
  roundUps?: Maybe<Array<RoundUp>>
  /** Look up a Transaction by its ID */
  transaction?: Maybe<Transaction>
  /** Get a cursor paginated list of Transactions */
  transactionsConnection: TransactionConnection
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryAccountArgs = {
  id: Scalars['ID']
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryAccountsArgs = {
  filter?: InputMaybe<AccountFilter>
  search?: InputMaybe<SearchQuery>
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryConnectionArgs = {
  id: Scalars['ID']
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryConnectionsArgs = {
  filter?: InputMaybe<ConnectionFilter>
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryMerchantArgs = {
  id: Scalars['ID']
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryMerchantsArgs = {
  search?: InputMaybe<SearchQuery>
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryRecurrenceArgs = {
  id: Scalars['ID']
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryRoundUpArgs = {
  id: Scalars['ID']
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryTransactionArgs = {
  id: Scalars['ID']
}

/** The top-level Query type. Queries are used to fetch data. */
export type QueryTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TransactionFilter>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Represents a recurring set of transactions */
export type Recurrence = {
  __typename?: 'Recurrence'
  entryType: RecurrenceEntryType
  frequency: RecurrenceFrequency
  /** ID */
  id: Scalars['ID']
  /** Name */
  name?: Maybe<Scalars['String']>
  /** State */
  state: LedgerState
  /** The next projected payment */
  transactionNext?: Maybe<Transaction>
  /** A limited list of transactions. Use `transactionsConnection` for a full paginated list. */
  transactions: Array<Transaction>
  /** Cursor-based pagination transactions */
  transactionsConnection: TransactionConnection
}

/** Represents a recurring set of transactions */
export type RecurrenceTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>
  limit?: Scalars['Int']
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Represents a recurring set of transactions */
export type RecurrenceTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TransactionFilter>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Whether the Recurrence represent money being advanced into or withdrawn from the account. */
export enum RecurrenceEntryType {
  /** a set of entries recording money being advanced into the account */
  Inflow = 'INFLOW',
  /** a set of entries recording money being withdrawn from the account */
  Outflow = 'OUTFLOW',
}

/** Represents the frequency of a recurring event */
export enum RecurrenceFrequency {
  /** Every year */
  Annually = 'ANNUALLY',
  /** Every daily */
  Daily = 'DAILY',
  /** Every 30 days */
  Every_30Days = 'EVERY_30_DAYS',
  /** Every two weeks */
  Fortnightly = 'FORTNIGHTLY',
  /** Every month */
  Monthly = 'MONTHLY',
  /** Every three months */
  Quarterly = 'QUARTERLY',
  /** Every six months */
  Semiannually = 'SEMIANNUALLY',
  /** Twice per month, 1st & 15th */
  SemimonthlyEarly = 'SEMIMONTHLY_EARLY',
  /** Twice per month, 15th & End of Month */
  SemimonthlyLate = 'SEMIMONTHLY_LATE',
  /** Every week */
  Weekly = 'WEEKLY',
}

/** Represents a RoundUp */
export type RoundUp = {
  __typename?: 'RoundUp'
  /** Eligible accounts available for this RoundUp */
  availableAccounts: Array<Maybe<Account>>
  /** Balance */
  balance: LedgerBalance
  /** Source or Funding account for this RoundUp */
  fundingAccount?: Maybe<Account>
  /** ID */
  id: Scalars['ID']
  /** State */
  state: LedgerState
  /** Accounts subscribed to this RoundUp */
  subscribedAccounts: Array<Maybe<Account>>
  /** A limited list of transactions. Use `transactionsConnection` for a full paginated list. */
  transactions: Array<Transaction>
  /** Cursor-based pagination transactions */
  transactionsConnection: TransactionConnection
}

/** Represents a RoundUp */
export type RoundUpBalanceArgs = {
  filter?: InputMaybe<TransactionFilter>
}

/** Represents a RoundUp */
export type RoundUpTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>
  limit?: Scalars['Int']
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Represents a RoundUp */
export type RoundUpTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  filter?: InputMaybe<TransactionFilter>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<SearchQuery>
  sort?: InputMaybe<TransactionSort>
}

/** Autogenerated input type of RoundUpCreate */
export type RoundUpCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of destination account */
  destinationId: Scalars['ID']
  /** ID of the funding account */
  fundingAccountId?: InputMaybe<Scalars['ID']>
  /** IDs of subscribed accounts */
  subscribedAccountIds?: InputMaybe<Array<Scalars['ID']>>
}

/** Autogenerated return type of RoundUpCreate */
export type RoundUpCreatePayload = {
  __typename?: 'RoundUpCreatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Created RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of RoundUpPause */
export type RoundUpPauseInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of the RoundUp */
  id: Scalars['ID']
}

/** Autogenerated return type of RoundUpPause */
export type RoundUpPausePayload = {
  __typename?: 'RoundUpPausePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Paused RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of RoundUpResume */
export type RoundUpResumeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of the RoundUp */
  id: Scalars['ID']
}

/** Autogenerated return type of RoundUpResume */
export type RoundUpResumePayload = {
  __typename?: 'RoundUpResumePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Resumed RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of RoundUpSetFundingAccount */
export type RoundUpSetFundingAccountInput = {
  /** ID of the new funding account to use */
  accountId: Scalars['ID']
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of the RoundUp */
  id: Scalars['ID']
}

/** Autogenerated return type of RoundUpSetFundingAccount */
export type RoundUpSetFundingAccountPayload = {
  __typename?: 'RoundUpSetFundingAccountPayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of RoundUpSetStartTime */
export type RoundUpSetStartTimeInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of the RoundUp */
  id: Scalars['ID']
  /** Time to start rounding up at */
  startAt: Scalars['DateTime']
}

/** Autogenerated return type of RoundUpSetStartTime */
export type RoundUpSetStartTimePayload = {
  __typename?: 'RoundUpSetStartTimePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of RoundUpSubscribedAccountsAdd */
export type RoundUpSubscribedAccountsAddInput = {
  /** IDs of added Accounts */
  accountIds: Array<Scalars['ID']>
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of the RoundUp */
  id: Scalars['ID']
}

/** Autogenerated return type of RoundUpSubscribedAccountsAdd */
export type RoundUpSubscribedAccountsAddPayload = {
  __typename?: 'RoundUpSubscribedAccountsAddPayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Autogenerated input type of RoundUpSubscribedAccountsRemove */
export type RoundUpSubscribedAccountsRemoveInput = {
  /** IDs of removed Accounts */
  accountIds: Array<Scalars['ID']>
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  /** ID of the RoundUp */
  id: Scalars['ID']
}

/** Autogenerated return type of RoundUpSubscribedAccountsRemove */
export type RoundUpSubscribedAccountsRemovePayload = {
  __typename?: 'RoundUpSubscribedAccountsRemovePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated RoundUp */
  record?: Maybe<RoundUp>
  /** Status of the mutation */
  success: Scalars['Boolean']
}

/** Options for Searching */
export type SearchQuery = {
  /** Query for searching */
  term?: InputMaybe<Scalars['String']>
}

/** Spade Category Data */
export type SpadeCategory = {
  __typename?: 'SpadeCategory'
  /** Numerical code describing the category. Two digits per depth of category. */
  hierarchyCode: Scalars['Int']
  /** Category ID */
  id: Scalars['String']
  /** Name of the category */
  name: Scalars['String']
}

/** Spade Location Data */
export type SpadeLocation = {
  __typename?: 'SpadeLocation'
  /** Street and number */
  address?: Maybe<Scalars['String']>
  /** City or town */
  city?: Maybe<Scalars['String']>
  /** Latitude coordinate */
  latitude?: Maybe<Scalars['String']>
  /** Longitude coordinate */
  longitude?: Maybe<Scalars['String']>
  /** State, Province, Territory etc. */
  state?: Maybe<Scalars['String']>
  /** Store number of chain retailer */
  storeNumber?: Maybe<Scalars['String']>
  /** Zip or postal code */
  zipCode?: Maybe<Scalars['String']>
}

/** Spade Logo Data */
export type SpadeLogo = {
  __typename?: 'SpadeLogo'
  /** Name of the logo (for use in logo endpoint, same as path) */
  logoName: Scalars['String']
  /** Full url for logo */
  logoUrl: Scalars['URL']
  /** Path to the image */
  path: Scalars['String']
  /** mime type of image (currently all are PNGs) */
  type: Scalars['String']
  /** Is this logo from our verified logo database */
  verified: Scalars['Boolean']
}

/** Spade Merchant Data */
export type SpadeMerchant = {
  __typename?: 'SpadeMerchant'
  /** API Source */
  _sourcename: MerchantSourceType
  merchantInfo?: Maybe<SpadeMerchantInfo>
  /** Name of the merchant */
  merchantName?: Maybe<Scalars['String']>
  /** Our best guess as to what the true merchant name is. Utilizing AI, our database of merchants, and geolocation providers. */
  normalizedMerchantName?: Maybe<Scalars['String']>
}

/** Spade Merchant Info Data */
export type SpadeMerchantInfo = {
  __typename?: 'SpadeMerchantInfo'
  /** Unique ID for a verified merchant */
  merchantId?: Maybe<Scalars['String']>
  /** Local or corporate phone number */
  phoneNumber?: Maybe<Scalars['String']>
  /** Is this merchant from our verified database */
  verified?: Maybe<Scalars['Boolean']>
  /** Merchant's website */
  website?: Maybe<Scalars['String']>
}

/** Spade Transaction Data */
export type SpadeTransaction = {
  __typename?: 'SpadeTransaction'
  /** API Source */
  _sourcename: TransactionSourceType
  /** Was this transaction at a brick and mortar location */
  brickAndMortar?: Maybe<Scalars['Boolean']>
  /** List of increasingly specific categories and their Id's */
  categories?: Maybe<Array<SpadeCategory>>
  /** @deprecated Use `categories` */
  category?: Maybe<Array<Scalars['String']>>
  /** Code of the most specific category in 'categories' */
  categoryHierarchyCode?: Maybe<Scalars['Int']>
  /** Is likely a recurring transaction */
  isRecurring?: Maybe<Scalars['Boolean']>
  location?: Maybe<SpadeLocation>
  logo?: Maybe<SpadeLogo>
  /** 'Merchant Category Code' (Marqueta, Galileo, etc.) */
  mcc?: Maybe<Scalars['String']>
  merchantInfo?: Maybe<SpadeMerchantInfo>
  /** Name of the merchant */
  merchantName?: Maybe<Scalars['String']>
  /** Our best guess as to what the true merchant name is. Utilizing AI, our database of merchants, and geolocation providers. */
  normalizedMerchantName?: Maybe<Scalars['String']>
  /** 'category_id' from Plaid */
  plaidCategoryId?: Maybe<Scalars['String']>
  /** Spade's ID for the transaction */
  transactionId?: Maybe<Scalars['String']>
  /** Description of the transaction (often just called 'name') */
  transactionName?: Maybe<Scalars['String']>
  /** Facilitator of transaction */
  via?: Maybe<Scalars['String']>
}

/** Represents a Transaction */
export type Transaction = {
  __typename?: 'Transaction'
  /** Transaction account */
  account: Account
  /** Amount */
  amount: Scalars['Float']
  /** Date of Record */
  date: Scalars['Date']
  /** Description or Line Item Name */
  description: Scalars['String']
  /** CREDIT or DEBIT */
  entryType: TransactionEntryType
  /** ID */
  id: Scalars['ID']
  /** Single logo */
  logo?: Maybe<Image>
  /** List of logos */
  logos?: Maybe<Array<Image>>
  /** Customizable metadata */
  metadata?: Maybe<Scalars['JSON']>
  /** API Transaction Data Source */
  source?: Maybe<TransactionSources>
  /** API Transaction Data Sources */
  sources?: Maybe<Array<TransactionSources>>
  /** Status */
  status: TransactionStatus
}

/** Represents a Transaction */
export type TransactionLogoArgs = {
  source?: InputMaybe<ImageSource>
}

/** Represents a Transaction */
export type TransactionLogosArgs = {
  sources?: InputMaybe<Array<ImageSource>>
}

/** Represents a Transaction */
export type TransactionSourceArgs = {
  type: TransactionSourceType
}

/** Represents a Transaction */
export type TransactionSourcesArgs = {
  types?: InputMaybe<Array<TransactionSourceType>>
}

/** The connection type for Transaction. */
export type TransactionConnection = {
  __typename?: 'TransactionConnection'
  count: Scalars['Int']
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TransactionEdge>>>
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Transaction>>>
  /** Information to aid in pagination. */
  pageInfo: PageInfo
}

/** An edge in a connection. */
export type TransactionEdge = {
  __typename?: 'TransactionEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of the edge. */
  node?: Maybe<Transaction>
}

/** Whether the Transaction is a CREDIT or DEBIT */
export enum TransactionEntryType {
  /** an entry recording money being advanced into the account */
  Credit = 'CREDIT',
  /** an entry recording money being withdrawn from the account */
  Debit = 'DEBIT',
}

/** Options for Filtering Transactions */
export type TransactionFilter = {
  /** Account IDs */
  accountIds?: InputMaybe<Array<Scalars['ID']>>
  /** Amount */
  amount?: InputMaybe<Scalars['Float']>
  /** Amount */
  amount_abs?: InputMaybe<Scalars['Float']>
  /** Greater than the absolute value of Amount */
  amount_abs_gt?: InputMaybe<Scalars['Float']>
  /** Greater than or equal to the absolute value of Amount */
  amount_abs_gte?: InputMaybe<Scalars['Float']>
  /** Less than the absolute value of Amount */
  amount_abs_lt?: InputMaybe<Scalars['Float']>
  /** Less than or equal to the absolute value of Amount */
  amount_abs_lte?: InputMaybe<Scalars['Float']>
  /** Greater than the Amount */
  amount_gt?: InputMaybe<Scalars['Float']>
  /** Greater than or equal to the Amount */
  amount_gte?: InputMaybe<Scalars['Float']>
  /** Less than the Amount */
  amount_lt?: InputMaybe<Scalars['Float']>
  /** Less than or equal to the Amount */
  amount_lte?: InputMaybe<Scalars['Float']>
  /** Date */
  date?: InputMaybe<Scalars['Date']>
  /** Greater than the Date */
  date_gt?: InputMaybe<Scalars['Date']>
  /** Greater than or equal to the Date */
  date_gte?: InputMaybe<Scalars['Date']>
  /** Less than the Date */
  date_lt?: InputMaybe<Scalars['Date']>
  /** Less than or equal to the Date */
  date_lte?: InputMaybe<Scalars['Date']>
  entryType?: InputMaybe<TransactionEntryType>
  source?: InputMaybe<TransactionSourceFilter>
  /** Transaction status */
  status?: InputMaybe<Array<TransactionStatus>>
}

/** Options for Sorting Transactions */
export enum TransactionSort {
  /** Oldest First, Pending Last */
  DateAsc = 'DATE_ASC',
  /** Newest First, Pending First */
  DateDesc = 'DATE_DESC',
}

/** Source-specific filters */
export type TransactionSourceFilter = {
  plaid?: InputMaybe<TransactionSourcePlaidFilter>
  spade?: InputMaybe<TransactionSourceSpadeFilter>
}

/** Options for filtering inside Plaid's API payloads */
export type TransactionSourcePlaidFilter = {
  /** The ID of the account in which this transaction occurred. */
  accountId?: InputMaybe<Scalars['String']>
  /** The name of the account owner. This field is not typically populated and only relevant when dealing with sub-accounts. */
  accountOwner?: InputMaybe<Scalars['String']>
  /**
   * The settled value of the transaction, denominated in the account's currency,
   * as stated in iso_currency_code or unofficial_currency_code. Positive values
   * when money moves out of the account; negative values when money moves in. For
   * example, debit card purchases are positive; credit card payments, direct
   * deposits, and refunds are negative.
   */
  amount?: InputMaybe<Scalars['Float']>
  /** The date that the transaction was authorized. */
  authorizedDate?: InputMaybe<Scalars['Date']>
  /** Date and time when a transaction was authorized */
  authorizedDatetime?: InputMaybe<Scalars['DateTime']>
  /** A hierarchical array of the categories to which this transaction belongs. */
  category?: InputMaybe<Array<Scalars['String']>>
  /** The ID of the category to which this transaction belongs. */
  categoryId?: InputMaybe<Scalars['String']>
  /** The check number of the transaction. This field is only populated for check transactions. */
  checkNumber?: InputMaybe<Scalars['String']>
  /**
   * For pending transactions, the date that the transaction occurred; for posted
   * transactions, the date that the transaction posted.
   */
  date?: InputMaybe<Scalars['Date']>
  /** Date and time when a transaction was posted */
  datetime?: InputMaybe<Scalars['DateTime']>
  /** The ISO-4217 currency code of the transaction. Always null if unofficial_currency_code is non-null. */
  isoCurrencyCode?: InputMaybe<Scalars['String']>
  location?: InputMaybe<TransactionSourcePlaidPaymentMetaFilter>
  /** The merchant name, as extracted by Plaid from the name field. */
  merchantName?: InputMaybe<Scalars['String']>
  /** The merchant name or transaction description. */
  name?: InputMaybe<Scalars['String']>
  /** The string returned by the financial institution to describe the transaction. */
  originalDescription?: InputMaybe<Scalars['String']>
  /** The channel used to make a payment. Possible values: online, in store, other */
  paymentChannel?: InputMaybe<Scalars['String']>
  paymentMeta?: InputMaybe<TransactionSourcePlaidLocationFilter>
  /**
   * When true, identifies the transaction as pending or unsettled. Pending
   * transaction details (name, type, amount, category ID) may change before they are settled.
   */
  pending?: InputMaybe<Scalars['Boolean']>
  /** The ID of a posted transaction's associated pending transaction, where applicable. */
  pendingTransactionId?: InputMaybe<Scalars['String']>
  /**
   * An identifier classifying the transaction type. Possible values: adjustment,
   * atm, bank charge, bill payment, cash, cashback, cheque, direct debit,
   * interest, purchase, standing order, transfer, null
   */
  transactionCode?: InputMaybe<Scalars['String']>
  /** The unique ID of the transaction. */
  transactionId?: InputMaybe<Scalars['String']>
  /**
   * The unofficial currency code associated with the transaction. Always null if
   * iso_currency_code is non-null. Unofficial currency codes are used for
   * currencies that do not have official ISO currency codes, such as
   * cryptocurrencies and the currencies of certain countries.
   */
  unofficialCurrencyCode?: InputMaybe<Scalars['String']>
}

/** Options for filtering inside Plaid's Transaction Location data */
export type TransactionSourcePlaidLocationFilter = {
  /** The street address where the transaction occurred. */
  address?: InputMaybe<Scalars['String']>
  /** The city where the transaction occurred. */
  city?: InputMaybe<Scalars['String']>
  /** The ISO 3166-1 alpha-2 country code where the transaction occurred. */
  country?: InputMaybe<Scalars['String']>
  /** The latitude where the transaction occurred. */
  lat?: InputMaybe<Scalars['Float']>
  /** The longitude where the transaction occurred. */
  lon?: InputMaybe<Scalars['Float']>
  /** The postal code where the transaction occurred. */
  postalCode?: InputMaybe<Scalars['String']>
  /** The region or state where the transaction occurred. */
  region?: InputMaybe<Scalars['String']>
  /** The merchant defined store number where the transaction occurred. */
  storeNumber?: InputMaybe<Scalars['String']>
}

/** Options for filtering inside Plaid's Transaction Payment Meta data */
export type TransactionSourcePlaidPaymentMetaFilter = {
  /** The party initiating a wire transfer. Will be null if the transaction is not a wire transfer. */
  byOrderOf?: InputMaybe<Scalars['String']>
  /** For transfers, the party that is receiving the transaction. */
  payee?: InputMaybe<Scalars['String']>
  /** For transfers, the party that is paying the transaction. */
  payer?: InputMaybe<Scalars['String']>
  /** The type of transfer, e.g. 'ACH' */
  paymentMethod?: InputMaybe<Scalars['String']>
  /** The name of the payment processor */
  paymentProcessor?: InputMaybe<Scalars['String']>
  /** The ACH PPD ID for the payer. */
  ppdId?: InputMaybe<Scalars['String']>
  /** The payer-supplied description of the transfer. */
  reason?: InputMaybe<Scalars['String']>
  /** The transaction reference number supplied by the financial institution. */
  referenceNumber?: InputMaybe<Scalars['String']>
}

/** Options for filtering inside Spade's API payloads */
export type TransactionSourceSpadeFilter = {
  /** Was this transaction at a brick and mortar location */
  brickAndMortar?: InputMaybe<Scalars['Boolean']>
  category?: InputMaybe<Array<Scalars['String']>>
  /** Code of the most specific category in 'categories' */
  categoryHierarchyCode?: InputMaybe<Scalars['Int']>
  /** Is likely a recurring transaction */
  isRecurring?: InputMaybe<Scalars['Boolean']>
  /** 'Merchant Category Code' (Marqueta, Galileo, etc.) */
  mcc?: InputMaybe<Scalars['String']>
  /** Name of the merchant */
  merchantName?: InputMaybe<Scalars['String']>
  /** Our best guess as to what the true merchant name is. Utilizing AI, our database of merchants, and geolocation providers. */
  normalizedMerchantName?: InputMaybe<Scalars['String']>
  /** 'category_id' from Plaid */
  plaidCategoryId?: InputMaybe<Scalars['String']>
  /** Spade's ID for the transaction */
  transactionId?: InputMaybe<Scalars['String']>
  /** Description of the transaction (often just called 'name') */
  transactionName?: InputMaybe<Scalars['String']>
  /** Facilitator of transaction */
  via?: InputMaybe<Scalars['String']>
}

/** Represents a data source for the Transaction */
export enum TransactionSourceType {
  /** Mock connection */
  Mock = 'MOCK',
  /** MX connection */
  Mx = 'MX',
  /** Plaid connection */
  Plaid = 'PLAID',
  /** Spade Transaction Enrichment */
  Spade = 'SPADE',
}

export type TransactionSources = MockTransaction | PlaidTransaction | SpadeTransaction

/** Represents the pending, posted, or projected status for a transaction */
export enum TransactionStatus {
  /** Awaiting decision or settlement, may be replaced, updated, or removed */
  Pending = 'PENDING',
  /** Announced or published as conclusive */
  Posted = 'POSTED',
  /** Estimated or forecast on the basis of current trends or data */
  Projected = 'PROJECTED',
}

/** Autogenerated input type of TransactionUpdate */
export type TransactionUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  /** Customizable metadata */
  metadata?: InputMaybe<Scalars['JSON']>
}

/** Autogenerated return type of TransactionUpdate */
export type TransactionUpdatePayload = {
  __typename?: 'TransactionUpdatePayload'
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>
  /** List of errors from mutation */
  errors?: Maybe<Array<Error>>
  /** Updated Account Information */
  record?: Maybe<Account>
  /** Status of the mutation */
  success: Scalars['Boolean']
}
