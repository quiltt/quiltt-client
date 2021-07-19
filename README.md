# @quiltt/client

[![NPM](https://img.shields.io/npm/v/@quiltt/client.svg)](https://www.npmjs.com/package/@quiltt/client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript/tree/master/react)

## Install

```bash
npm install --save @quiltt/client
```

or

```bash
yarn add @quiltt/client
```

## Usage

```tsx
import * as React from 'react'

import { gql, useQuery } from '@apollo/client'
import { QuilttProvider } from '@quiltt/client'

export const App: React.FC = () => {
  return (
    <QuilttProvider>
      <div>Hello, World!</div>
    </QuilttProvider>
  )
}
export default App
```

## License

MIT © [quiltt](https://github.com/quiltt)
