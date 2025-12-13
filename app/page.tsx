'use client'

import { useState, useEffect, useRef } from 'react'
import QRGenerator from '@/app/components/QRGenerator'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Zap, Grid3x3, UserX } from 'lucide-react'
import Image from 'next/image'

// Custom hook para animar el contador
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * target))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return count
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [totalQRs, setTotalQRs] = useState(12500)
  const qrGeneratorRef = useRef<HTMLDivElement>(null)
  const animatedCount = useCountUp(totalQRs, 2000)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Cargar contador desde localStorage
  useEffect(() => {
    const baseCount = 12500
    const sessionCount = parseInt(localStorage.getItem('qrGeneratedCount') || '0', 10)
    setTotalQRs(baseCount + sessionCount)
  }, [])

  // Escuchar evento de nuevo QR generado
  useEffect(() => {
    const handleQRGenerated = () => {
      const sessionCount = parseInt(localStorage.getItem('qrGeneratedCount') || '0', 10)
      setTotalQRs(12500 + sessionCount)
    }

    window.addEventListener('qrGenerated', handleQRGenerated)
    return () => window.removeEventListener('qrGenerated', handleQRGenerated)
  }, [])

  const scrollToGenerator = () => {
    qrGeneratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <Image
            src="/qr-code-logo.svg"
            alt="QR Code Generator Logo"
            width={40}
            height={40}
          />
          <h1 className="text-2xl font-bold">QR Code Generator</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </header>
      
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-8 py-20 md:py-32 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Genera Códigos QR<br />
            <span className="text-primary">Gratis Para Siempre</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Crea códigos QR personalizados sin límites, sin registro y sin costos ocultos. 
            100% gratuito, ahora y siempre.
          </p>

          <div className="mb-10 p-6 bg-secondary rounded-lg border">
            <p className="text-sm text-muted-foreground mb-2">Códigos QR generados</p>
            <p className="text-4xl md:text-5xl font-bold text-primary">
              {animatedCount.toLocaleString()}+
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={scrollToGenerator}
            className="text-lg px-8 py-6 h-auto"
          >
            Generar mi código QR
          </Button>
        </section>

        {/* Features Section */}
        <section className="px-8 py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">100% Gratis Para Siempre</h3>
                <p className="text-muted-foreground">
                  Sin tarifas ocultas, sin suscripciones. Totalmente gratuito sin límites de uso.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <Grid3x3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">8 Tipos de QR</h3>
                <p className="text-muted-foreground">
                  Texto, URL, Email, Teléfono, SMS, WiFi, Ubicación y vCard. Todo en una herramienta.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background border">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <UserX className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Sin Registro Necesario</h3>
                <p className="text-muted-foreground">
                  Empieza a generar códigos QR al instante. No se requiere cuenta ni email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* QR Generator Section */}
        <section ref={qrGeneratorRef} className="flex items-center justify-center p-8 py-16">
          <QRGenerator />
        </section>
      </main>
      
      <footer className="text-center p-4 border-t">
        <p>&copy; {currentYear} QR Code Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}