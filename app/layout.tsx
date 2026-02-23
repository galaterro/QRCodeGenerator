import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GA_MEASUREMENT_ID } from '@/lib/gtag'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            var debugMode = new URLSearchParams(window.location.search).get('debug_mode') === '1';
            gtag('config', '${GA_MEASUREMENT_ID}', debugMode ? { debug_mode: true } : {});
          `}
        </Script>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}