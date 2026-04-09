import type { Metadata } from 'next'
import HomeClient from '@/app/components/HomeClient'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://generadorqr.app',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Generador de Códigos QR',
  url: 'https://generadorqr.app',
  description: 'Genera códigos QR gratis y personalizados al instante. 8 tipos: URL, texto, WiFi, email, teléfono, SMS, ubicación y vCard.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  inLanguage: 'es',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  featureList: [
    'Generador de QR para URL',
    'Generador de QR para texto',
    'Generador de QR para WiFi',
    'Generador de QR para email',
    'Generador de QR para teléfono',
    'Generador de QR para SMS',
    'Generador de QR para ubicación',
    'Generador de QR para vCard',
    'Personalización de color',
    'Descarga en PNG',
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  )
}
