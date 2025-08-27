import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/index.css'
import Login from './Login.tsx'
import Home from "./Home.tsx";
import { AuthProvider } from './AuthProvider.tsx'
import ChatScreen from './ChatScreen.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/chat" element={<ChatScreen/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
