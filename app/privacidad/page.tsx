import type { Metadata } from 'next'
import PrivacidadClient from '@/app/components/PrivacidadClient'

export const metadata: Metadata = {
  title: 'Política de Privacidad y Cookies',
  description: 'Información sobre el tratamiento de datos personales y el uso de cookies en generadorqr.app. Cumplimiento RGPD y LOPDGDD.',
  alternates: {
    canonical: 'https://generadorqr.app/privacidad',
  },
  robots: {
    index: false,
  },
}

export default function PrivacidadPage() {
  return <PrivacidadClient />
}
