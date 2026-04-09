'use client'

import { useState, useEffect, useRef } from 'react'
import QRGenerator from '@/app/components/QRGenerator'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Zap, Grid3x3, UserX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BASE_QR_COUNT, QR_COUNT_STORAGE_KEY } from '@/lib/constants'

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [target, duration])

  return count
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [totalQRs, setTotalQRs] = useState(BASE_QR_COUNT)
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sessionCount = parseInt(localStorage.getItem(QR_COUNT_STORAGE_KEY) || '0', 10)
      setTotalQRs(BASE_QR_COUNT + sessionCount)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleQRGenerated = (event: Event) => {
      const sessionCount =
        (event instanceof CustomEvent && typeof event.detail?.count === 'number')
          ? event.detail.count
          : parseInt(localStorage.getItem(QR_COUNT_STORAGE_KEY) || '0', 10)
      setTotalQRs(BASE_QR_COUNT + sessionCount)
    }

    window.addEventListener('qrGenerated', handleQRGenerated)
    return () => window.removeEventListener('qrGenerated', handleQRGenerated)
  }, [])

  const scrollToGenerator = () => {
    qrGeneratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image src="/qr-code-logo.svg" alt="QR Code Generator Logo" width={34} height={34} />
          <span className="font-syne text-lg font-bold tracking-tight">QR Code Generator</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section
          className="relative flex flex-col items-center justify-center px-6 py-28 md:py-40 text-center overflow-hidden"
          style={{
            backgroundImage: darkMode
              ? 'radial-gradient(circle, rgba(0,229,204,0.09) 1px, transparent 1px)'
              : 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        >
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none"
            style={{ background: darkMode ? 'rgba(0,229,204,0.06)' : 'rgba(0,185,165,0.07)' }}
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
            <div className="animate-fade-in-up delay-100">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 rounded-full px-4 py-1.5">
                100% gratuito · sin registro
              </span>
            </div>

            <h2 className="font-syne text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold leading-[1.05] tracking-tight animate-fade-in-up delay-200">
              Genera Códigos QR<br />
              <span className="text-primary">al instante</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in-up delay-300">
              Personaliza colores, elige entre 8 tipos y descarga en PNG. Sin límites, sin costes ocultos.
            </p>

            <div className="animate-fade-in-up delay-400">
              <div className="inline-flex flex-col items-center gap-2 px-10 py-6 rounded-2xl border border-border bg-card/70 backdrop-blur-sm shadow-sm">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  Códigos QR generados
                </p>
                <p className="font-syne text-5xl md:text-6xl font-extrabold text-primary tabular-nums leading-none">
                  {animatedCount.toLocaleString()}<span className="text-muted-foreground/60 text-4xl">+</span>
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up delay-500">
              <Button
                size="lg"
                onClick={scrollToGenerator}
                className="text-base px-10 py-6 h-auto rounded-full font-semibold shadow-lg transition-all hover:scale-105"
                style={{ boxShadow: darkMode ? '0 8px 32px rgba(0,229,204,0.25)' : '0 8px 24px rgba(0,185,165,0.2)' }}
              >
                Crear mi QR ahora
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 border-t border-border/50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="h-5 w-5 text-primary" />,
                title: 'Gratis Para Siempre',
                desc: 'Sin tarifas ocultas, sin suscripciones. Totalmente gratuito sin límites de uso.',
              },
              {
                icon: <Grid3x3 className="h-5 w-5 text-primary" />,
                title: '8 Tipos de QR',
                desc: 'Texto, URL, Email, Teléfono, SMS, WiFi, Ubicación y vCard. Todo en una herramienta.',
              },
              {
                icon: <UserX className="h-5 w-5 text-primary" />,
                title: 'Sin Registro',
                desc: 'Empieza a generar códigos QR al instante. No se requiere cuenta ni email.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                style={{ ['--tw-shadow' as string]: '0 8px 30px rgba(0,229,204,0.08)' }}
              >
                <div className="mb-4 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-syne text-base font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* QR Generator Section */}
        <section ref={qrGeneratorRef} className="px-6 py-20 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-syne text-3xl md:text-4xl font-bold mb-2">Crea tu código QR</h2>
              <p className="text-muted-foreground text-sm">Elige el tipo, personaliza y descarga</p>
            </div>
            <QRGenerator />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>&copy; {currentYear} QR Code Generator</p>
          <Link href="/privacidad" className="hover:text-foreground transition-colors">
            Política de Privacidad
          </Link>
        </div>
      </footer>
    </div>
  )
}
