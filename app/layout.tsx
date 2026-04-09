import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieConsent from './components/CookieConsent'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Generador de Códigos QR',
  description: 'Crea y personaliza tus propios códigos QR',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${syne.variable} ${dmSans.variable}`}>
        {children}
        <SpeedInsights />
        <CookieConsent />
      </body>
    </html>
  )
}
