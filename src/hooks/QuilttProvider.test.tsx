import * as React from 'react'

import { render } from '@testing-library/react'

import QuilttProvider from './QuilttProvider'

const quilttProviderComponent: React.ReactElement = (
  <QuilttProvider>
    <div>Lorem Ipsum</div>
  </QuilttProvider>
)

it('renders quiltt provider component', () => {
  render(quilttProviderComponent)
  expect(quilttProviderComponent).toBeTruthy()
})
