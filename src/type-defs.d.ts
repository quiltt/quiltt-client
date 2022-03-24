declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

type SvgrComponent = React.FC<React.SVGAttributes<SVGElement>>

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}

// WICG Spec: https://wicg.github.io/ua-client-hints

// https://wicg.github.io/ua-client-hints/#navigatorua
declare interface NavigatorUA {
  readonly userAgentData?: NavigatorUAData
}

// https://wicg.github.io/ua-client-hints/#dictdef-navigatoruabrandversion
interface NavigatorUABrandVersion {
  readonly brand: string
  readonly version: string
}

// https://wicg.github.io/ua-client-hints/#dictdef-uadatavalues
interface UADataValues {
  readonly brands?: NavigatorUABrandVersion[]
  readonly mobile?: boolean
  readonly platform?: string
  readonly architecture?: string
  readonly bitness?: string
  readonly model?: string
  readonly platformVersion?: string
  readonly uaFullVersion?: string
}

// https://wicg.github.io/ua-client-hints/#dictdef-ualowentropyjson
interface UALowEntropyJSON {
  readonly brands: NavigatorUABrandVersion[]
  readonly mobile: boolean
  readonly platform: string
}

// https://wicg.github.io/ua-client-hints/#navigatoruadata
interface NavigatorUAData extends UALowEntropyJSON {
  getHighEntropyValues(hints: string[]): Promise<UADataValues>
  toJSON(): UALowEntropyJSON
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface Navigator extends NavigatorUA {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface WorkerNavigator extends NavigatorUA {}
