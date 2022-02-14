import * as React from 'react'

const combineProviders = (...components: React.FC[]): React.FC =>
  components.reduce(
    (AccumulatedComponents, CurrentComponent) =>
      ({ children }: React.ComponentProps<React.FC>): JSX.Element =>
        (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        ),
    // eslint-disable-next-line react/jsx-no-useless-fragment
    ({ children }) => <>{children}</>
  )

export default combineProviders
