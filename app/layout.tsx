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
  metadataBase: new URL('https://generadorqr.app'),
  title: {
    default: 'Generador de Códigos QR Gratis — generadorqr.app',
    template: '%s — generadorqr.app',
  },
  description: 'Crea códigos QR gratis y personalizados al instante. 8 tipos: URL, texto, WiFi, email, vCard y más. Sin registro, sin límites, 100% gratuito.',
  keywords: ['generador QR', 'crear código QR', 'código QR gratis', 'QR online', 'QR wifi', 'QR vcard', 'QR url', 'QR personalizado'],
  authors: [{ name: 'generadorqr.app' }],
  creator: 'generadorqr.app',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://generadorqr.app',
    siteName: 'Generador de Códigos QR',
    title: 'Generador de Códigos QR Gratis',
    description: 'Crea códigos QR gratis y personalizados al instante. Sin registro, sin límites.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Generador de Códigos QR Gratis',
    description: 'Crea códigos QR gratis y personalizados al instante. Sin registro, sin límites.',
  },
  icons: {
    icon: '/logo-new.png',
    shortcut: '/logo-new.png',
    apple: '/logo-new.png',
  },
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
