import { useState, useEffect } from 'react'
import './App.css'
import Stars from './components/Stars'
import StoaHome from './pages/StoaHome'
import PlatformBuilder from './pages/PlatformBuilder'

const SAVE_KEY = 'stoa_platform'

export default function App() {
  const [mode, setMode] = useState(() => {
    if (window.location.hash === '#builder') return 'builder'
    if (localStorage.getItem(SAVE_KEY)) return 'builder'
    return 'home'
  })

  return (
    <div>
      <Stars count={mode === 'home' ? 180 : 80} />
      {mode === 'home' && <StoaHome onBuild={() => { setMode('builder'); window.location.hash = 'builder' }} />}
      {mode === 'builder' && <PlatformBuilder onBack={() => { setMode('home'); window.location.hash = '' }} />}
    </div>
  )
}
