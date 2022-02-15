export type QuilttDeploymentContext = {
  authEndpoint: string
  apiEndpoint: string | URL
  apiVersion: string
  websocketEndpoint: string | URL
  deploymentId: string | null
  errorLogger: (error: any) => void
}
