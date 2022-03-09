import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { QuilttProvider } from '@quiltt/client'
import App from './components/App'
import 'regenerator-runtime/runtime.js'

import './index.css'

const quilttDeploymentId = import.meta.env.VITE_APP_QUILTT_APP_ID as string

ReactDOM.render(
  <React.StrictMode>
    <QuilttProvider
      deploymentId={quilttDeploymentId}
      apiBase="http://api.lvh.me:3000"
      authBase="http://auth.lvh.me:3000"
    >
      <Router>
        <App />
      </Router>
    </QuilttProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
