'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Moon, Sun, ArrowLeft } from 'lucide-react'

export default function PrivacidadPage() {
  const [darkMode, setDarkMode] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-2">
          <Image src="/qr-code-logo.svg" alt="QR Code Generator Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">QR Code Generator</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </header>

      <main className="flex-grow mx-auto w-full max-w-3xl px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <h2 className="mb-2 text-3xl font-bold">Política de Privacidad y Cookies</h2>
        <p className="mb-10 text-sm text-muted-foreground">Última actualización: abril de 2025</p>

        <div className="space-y-10 text-sm leading-relaxed">

          <section>
            <h3 className="mb-3 text-lg font-semibold">1. Responsable del tratamiento</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li><span className="font-medium text-foreground">Nombre:</span> Adrián de la Gala Moreno</li>
              <li><span className="font-medium text-foreground">Dirección:</span> Calle Olímpico Francisco Fernández Ochoa 1, 28923 Alcorcón, Madrid, España</li>
              <li>
                <span className="font-medium text-foreground">Email:</span>{' '}
                <a href="mailto:adrian.delagala@proton.me" className="underline hover:text-foreground">
                  adrian.delagala@proton.me
                </a>
              </li>
              <li><span className="font-medium text-foreground">Sitio web:</span> https://generadorqr.app</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">2. Datos que se recogen</h3>
            <p className="text-muted-foreground">
              Este sitio no recoge datos personales de forma directa. No hay formularios de registro,
              cuentas de usuario ni bases de datos propias. Únicamente si aceptas las cookies analíticas,
              se recogen datos de navegación anonimizados a través de Google Analytics 4 (páginas visitadas,
              dispositivo, navegador, país). Estos datos no permiten identificarte personalmente.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">3. Finalidad y base legal</h3>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Finalidad</th>
                    <th className="px-4 py-3 text-left font-medium">Base legal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 text-muted-foreground">Analítica web</td>
                    <td className="px-4 py-3 text-muted-foreground">Consentimiento del usuario (art. 6.1.a RGPD)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted-foreground">
              Las cookies analíticas solo se activan tras tu consentimiento explícito. Puedes retirarlo
              en cualquier momento borrando las cookies de tu navegador.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">4. Cookies</h3>
            <p className="mb-4 text-muted-foreground">
              Este sitio usa exclusivamente cookies de analítica de terceros, condicionadas a tu consentimiento previo.
            </p>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Cookie</th>
                    <th className="px-4 py-3 text-left font-medium">Proveedor</th>
                    <th className="px-4 py-3 text-left font-medium">Finalidad</th>
                    <th className="px-4 py-3 text-left font-medium">Duración</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_ga</td>
                    <td className="px-4 py-3 text-muted-foreground">Google Analytics</td>
                    <td className="px-4 py-3 text-muted-foreground">Distinguir usuarios únicos</td>
                    <td className="px-4 py-3 text-muted-foreground">2 años</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">_ga_*</td>
                    <td className="px-4 py-3 text-muted-foreground">Google Analytics</td>
                    <td className="px-4 py-3 text-muted-foreground">Mantener estado de sesión</td>
                    <td className="px-4 py-3 text-muted-foreground">2 años</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted-foreground">
              Más info:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Política de privacidad de Google
              </a>.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">5. Conservación de los datos</h3>
            <p className="text-muted-foreground">
              Los datos de analítica se conservan durante 14 meses (configuración por defecto de Google Analytics),
              tras lo cual se eliminan automáticamente.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">6. Destinatarios</h3>
            <p className="text-muted-foreground">
              Los datos se transfieren a Google LLC (EE. UU.), bajo el marco EU-U.S. Data Privacy Framework,
              que garantiza un nivel de protección adecuado según la Comisión Europea.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">7. Tus derechos</h3>
            <p className="mb-3 text-muted-foreground">Conforme al RGPD y la LOPDGDD, puedes ejercer los derechos de:</p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li><span className="font-medium text-foreground">Acceso</span> — conocer qué datos tratamos sobre ti.</li>
              <li><span className="font-medium text-foreground">Rectificación</span> — corregir datos inexactos.</li>
              <li><span className="font-medium text-foreground">Supresión</span> — solicitar que eliminemos tus datos.</li>
              <li><span className="font-medium text-foreground">Oposición</span> — oponerte al tratamiento.</li>
              <li><span className="font-medium text-foreground">Limitación</span> — restringir el tratamiento.</li>
              <li><span className="font-medium text-foreground">Portabilidad</span> — recibir tus datos en formato estructurado.</li>
              <li><span className="font-medium text-foreground">Retirar el consentimiento</span> en cualquier momento.</li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Escríbenos a{' '}
              <a href="mailto:adrian.delagala@proton.me" className="underline hover:text-foreground">
                adrian.delagala@proton.me
              </a>{' '}
              indicando el derecho que deseas ejercer.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">8. Reclamaciones</h3>
            <p className="text-muted-foreground">
              Si consideras que el tratamiento de tus datos no es conforme a la normativa, puedes reclamar ante la{' '}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Agencia Española de Protección de Datos (AEPD)
              </a>.
            </p>
          </section>

          <section>
            <h3 className="mb-3 text-lg font-semibold">9. Cambios en esta política</h3>
            <p className="text-muted-foreground">
              Podemos actualizar esta política para reflejar cambios en el sitio o en la normativa.
              La fecha de actualización siempre estará indicada al inicio de la página.
            </p>
          </section>

        </div>
      </main>

      <footer className="text-center p-4 border-t text-sm text-muted-foreground">
        <p>&copy; {currentYear} QR Code Generator. All rights reserved.</p>
      </footer>
    </div>
  )
}
