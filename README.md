# @quiltt/client

[![NPM](https://img.shields.io/npm/v/@quiltt/client.svg)](https://www.npmjs.com/package/@quiltt/client) ![Tests](https://github.com/quiltt/quiltt-client/workflows/Tests/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/c460e568ab8d141a9ea4/maintainability)](https://codeclimate.com/github/quiltt/quiltt-client/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c460e568ab8d141a9ea4/test_coverage)](https://codeclimate.com/github/quiltt/quiltt-client/test_coverage) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript/tree/master/react)

|                      |                                                                        |
| -------------------- | ---------------------------------------------------------------------- |
| **Git Flow**         | [Github Flow](https://guides.github.com/introduction/flow/)            |
| **TypeScript Style** | [airbnb](https://github.com/airbnb/javascript/tree/master/react)       |
| **Commit Style**     | [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) |

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

import App from './App'

export const Index: React.FC = () => {
  return (
    <QuilttProvider deploymentId={VITE_APP_QUILTT_APP_ID | REACT_APP_QUILTT_APP_ID}>
      <App />
    </QuilttProvider>
  )
}
export default Index
```

## Exported Hooks/Providers/Components

- `QuilttSettingsProvider`
- `useAuthLink`
- `useErrorLink`
- `useLocalStorage`
- `usePreviewLink`
- `useQuilttAuth`
- `useQuilttClient`
- `useQuilttSettings`
- `useQuilttLink`
- `PlaidLinkButton`
- `PlaidLinkLauncher`
- `PlaidNewConnectionButton`
- `PlaidReconnectButton`
- `PlaidSyncStatus`
- `PlaidUnlinkButton`

## License

MIT © [quiltt](https://github.com/quiltt)
