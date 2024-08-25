'use client'

import { useState, useEffect } from 'react'
import QRGenerator from '@/app/components/QRGenerator'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

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
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <QRGenerator />
      </main>
      <footer className="text-center p-4 border-t">
        <p>&copy; 2023 QR Code Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}