export enum MxPostMessageEventType {
  CONNECT_LOADED = 'mx/connect/loaded',
  ENTER_CREDSENTIALS = 'mx/connect/enterCredentials',
  INSTITUTION_SEARCH = 'mx/connect/institutionSearch',
  MEMBER_CONNECTED = 'mx/connect/memberConnected',
  MEMBER_DELETED = 'mx/connect/memberDeleted',
  MEMBER_CREATE_ERROR = 'mx/connect/createMemberError',
  MEMBER_STATUS_UPDATE = 'mx/connect/memberStatusUpdate',
  OAUTH_ERROR = 'mx/connect/oauthError',
  OAUTH_REQUESTED = 'mx/connect/oauthRequested',
  PRIMARY_ACTION = 'mx/connect/primaryAction',
  SELECTED_INSTITUTION = 'mx/connect/selectedInstitution',
  STEP_CHANGE = 'mx/connect/stepChange',
  SUBMIT_MFA = 'mx/connect/submitMfa',
  UPDATE_CREDENTIALS = 'mx/connect/updateCredentials',
  WIDGET_LOAD = 'mx/load',
}

export enum MxWidgetStep {
  /* Where the users search for institutions. */
  SEARCH = 'search',
  /* Where the users can verify existing members when mode set to verification. */
  SELECT_MEMBER = 'selectMember',
  /* Where the users enter credentials for a particular institution. */
  ENTER_CREDS = 'enterCreds',
  /* Where the users go instead of enter credentials if the institution and client supports oauth. */
  OAUTH = 'oauth',
  /* Where the users enter in MFA responses. */
  MFA = 'mfa',
  /* Where the users go while the connection is being attempted. */
  CONNECTING = 'connecting',
  /* Where the users land if they are trying to add a member they have previously added. */
  EXISTING_MEMBER = 'existingMember',
  /* When the users have been connecting for more than 30 seconds without any updates to the member. */
  TIMEOUT = 'timeOut',
  /* Where the user lands when they have successfully connected. */
  CONNECTED = 'connected',
  /* Where the user lands when they have unsuccessfully connected due to user or system error. */
  LOGIN_ERROR = 'loginError',
  /* Where the user lands when the member create was unsuccessful due to user or system error. */
  ERROR = 'error',
  // Where the user lands when a verification job fails to start. */
  VERIFY_ERROR = 'verifyError',
  /* Where the users create manual accounts. Manual accounts are not currently offered in the Platform API, so partners should not expect to see this value. */
  ADD_MANUAL_ACCOUNT = 'addManualAccount',
}

export type MxConnectBaseEvent = Event & {
  type: MxPostMessageEventType
  mx: boolean
  metadata?: Record<string, any>
}

export type MxConnectLoadedEvent = Event & {
  type: MxPostMessageEventType.CONNECT_LOADED
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    initial_step: MxWidgetStep.SEARCH
  }
}

export type MxConnectEnterCredentialsEvent = Event & {
  type: MxPostMessageEventType.ENTER_CREDSENTIALS
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    institution: {
      code: string
      guid: string
    }
  }
}

export type MxConnectInstitutionSearchEvent = Event & {
  type: MxPostMessageEventType.INSTITUTION_SEARCH
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    query: string
  }
}

export type MxConnectSelectedInstitutionEvent = Event & {
  type: MxPostMessageEventType.SELECTED_INSTITUTION
  mx: true
  metadata: {
    code: string
    guid: string
    name: string
    session_guid: string
    url: string
    user_guid: string
  }
}

export type MxConnectMemberConnectedEvent = Event & {
  type: MxPostMessageEventType.MEMBER_CONNECTED
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    member_guid: string
  }
}

export type MxConnectPrimaryActionEvent = Event & {
  type: MxPostMessageEventType.PRIMARY_ACTION
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
  }
}

export type MxConnectMemberDeletedEvent = Event & {
  type: MxPostMessageEventType.MEMBER_DELETED
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    member_guid: string
  }
}

export type MxConnectCreateMemberErrorEvent = Event & {
  type: MxPostMessageEventType.MEMBER_CREATE_ERROR
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    institution_guid: string
    institution_code: string
  }
}

export type MxConnectMemberStatusUpdateEvent = Event & {
  type: MxPostMessageEventType.MEMBER_STATUS_UPDATE
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    member_guid: string
    connection_status: number
  }
  data: string
  lastEventId: string
  origin: string
  ports: string
}

export type MxConnectOauthErrorEvent = Event & {
  type: MxPostMessageEventType.OAUTH_ERROR
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    member_guid: string
  }
}

export type MxConnectOauthRequestedEvent = Event & {
  type: MxPostMessageEventType.OAUTH_REQUESTED
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    url: string
    member_guid: string
  }
}

export type MxConnectStepChangeEvent = Event & {
  type: MxPostMessageEventType.STEP_CHANGE
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    previous: MxWidgetStep.SEARCH
    current: MxWidgetStep.ENTER_CREDS
  }
}

export type MxConnectSubmitMfaEvent = Event & {
  type: MxPostMessageEventType.SUBMIT_MFA
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    member_guid: string
  }
}

export type MxConnectUpdateCredentialsEvent = Event & {
  type: MxPostMessageEventType.UPDATE_CREDENTIALS
  mx: true
  metadata: {
    user_guid: string
    session_guid: string
    member_guid: string
    institution: {
      code: string
      guid: string
    }
  }
}

export type MxWidgetLoadEvent = Event & {
  type: MxPostMessageEventType.WIDGET_LOAD
  mx: true
}

export type MxEvent =
  | MxConnectUpdateCredentialsEvent
  | MxConnectEnterCredentialsEvent
  | MxConnectInstitutionSearchEvent
  | MxConnectSelectedInstitutionEvent
  | MxConnectMemberConnectedEvent
  | MxConnectPrimaryActionEvent
  | MxConnectMemberDeletedEvent
  | MxConnectCreateMemberErrorEvent
  | MxConnectMemberStatusUpdateEvent
  | MxConnectOauthErrorEvent
  | MxConnectOauthRequestedEvent
  | MxConnectStepChangeEvent
  | MxConnectSubmitMfaEvent
  | MxConnectUpdateCredentialsEvent
