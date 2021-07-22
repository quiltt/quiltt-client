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

```yaml
# .env file
VITE_APP_QUILTT_APP_ID=xxxx-xxxx-xxxx # React app scaffolded with Vite 2
REACT_APP_QUILTT_APP_ID=xxxx-xxxx-xxxx # React app scaffolded with Create React App
```

```tsx
// App entrypoint
import * as React from 'react'

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

## Exported Hooks/Providers/Components

- `useQuilttAuth`
- `useQuilttClient`
- `useQuilttContext`
- `QuilttProvider`
- `PlaidLinkButton`

## License

MIT © [quiltt](https://github.com/quiltt)
