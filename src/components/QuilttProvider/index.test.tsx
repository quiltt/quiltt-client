import * as React from 'react'

import { render } from '@testing-library/react'

import QuilttProvider from '.'

const deploymentId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

const quilttProviderComponent: React.ReactElement = (
  <QuilttProvider deploymentId={deploymentId}>
    <div>Lorem Ipsum</div>
  </QuilttProvider>
)

it('renders quiltt provider component', () => {
  render(quilttProviderComponent)
  expect(quilttProviderComponent).toBeTruthy()
})
