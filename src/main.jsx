import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Drop the boot overlay as soon as the app has painted.
requestAnimationFrame(() => {
  document.documentElement.classList.add('is-ready')
  document.getElementById('boot')?.remove()
})
