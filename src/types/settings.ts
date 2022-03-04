import React, { SetStateAction } from 'react'

export type QuilttSettingsContext = {
  authBase: string
  apiBase: string
  apiVersion?: string
  deploymentId: string | null
  setAuthBase: React.Dispatch<SetStateAction<string>>
  setApiBase: React.Dispatch<SetStateAction<string>>
  setApiVersion: React.Dispatch<SetStateAction<string | undefined>>
  setDeploymentId: React.Dispatch<SetStateAction<string | null>>
}
