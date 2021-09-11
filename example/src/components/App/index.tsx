import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from '../Auth'
import Home from '../Home'

const App: React.FC = () => {
  return (
    <main className="grid min-w-full min-h-screen font-sans antialiased">
      <div className="px-4">
        <div className="w-full h-full max-w-5xl py-4 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default App
