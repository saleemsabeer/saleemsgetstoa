import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Stars from './components/Stars'
import StoaHome from './pages/StoaHome'

const MedSpaDemoApp = lazy(() => import('./demos/medspa/MedSpaDemoApp'))

export default function App() {
  const location = useLocation()
  const isDemo = location.pathname.startsWith('/demo/')

  if (isDemo) {
    return (
      <Suspense fallback={<div style={{ padding: 60, textAlign: 'center', color: '#999' }}>Loading demo...</div>}>
        <Routes>
          <Route path="/demo/medspa/*" element={<MedSpaDemoApp />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <div>
      <Stars count={180} />
      <StoaHome />
    </div>
  )
}
