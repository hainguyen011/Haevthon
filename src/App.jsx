import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PoweredBy from './components/PoweredBy'
import LanguageToggle from './components/LanguageToggle'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Register from './pages/Register'
import Sponsors from './pages/Sponsors'
import Handbook from './pages/Handbook'
import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/handbook" element={<Handbook />} />
          </Routes>
        </AnimatePresence>
        <Footer />
        <PoweredBy />
      </Router>
    </LanguageProvider>
  )
}

export default App
