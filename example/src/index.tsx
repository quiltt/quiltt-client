// @ts-ignore
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { QuilttProvider } from '@quiltt/client'
import App from './components/App'

import './index.css'

const quilttAppID = import.meta.env.VITE_APP_QUILTT_APP_ID as string

ReactDOM.render(
  <QuilttProvider appId={quilttAppID} client="apollo">
    <Router>
      <App />
    </Router>
  </QuilttProvider>,
  document.getElementById('root')
)