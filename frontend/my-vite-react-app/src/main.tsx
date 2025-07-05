import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import Login from './Login.tsx'
import { AuthProvider } from './AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </StrictMode>,
)
