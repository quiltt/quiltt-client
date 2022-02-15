// @ts-ignore
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { QuilttSettingsProvider } from '@quiltt/client'
import App from './components/App'
import 'regenerator-runtime/runtime.js'

import './index.css'

const quilttDeploymentId = import.meta.env.VITE_APP_QUILTT_APP_ID as string

ReactDOM.render(
  <QuilttSettingsProvider deploymentId={quilttDeploymentId} client="apollo">
    <Router>
      <App />
    </Router>
  </QuilttSettingsProvider>,
  document.getElementById('root')
)
