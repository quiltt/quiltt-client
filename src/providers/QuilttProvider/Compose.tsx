interface ComposeProps {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}

const Compose = (props: ComposeProps) => {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight(
        (acc, Component, ...otherProps) => (
          <Component {...otherProps}>{acc}</Component>
        ),
        children
      )}
    </>
  )
}

export default Compose
