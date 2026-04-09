import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad y Cookies — Generador de Códigos QR',
  description: 'Información sobre el tratamiento de datos personales y el uso de cookies en generadorqr.app',
}

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-700 dark:text-slate-300">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Política de Privacidad y Cookies
      </h1>
      <p className="mb-10 text-sm text-slate-500">Última actualización: abril de 2025</p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">1. Responsable del tratamiento</h2>
        <ul className="space-y-1 text-sm">
          <li><span className="font-medium">Nombre:</span> Adrián de la Gala Moreno</li>
          <li><span className="font-medium">Dirección:</span> Calle Olímpico Francisco Fernández Ochoa 1, 28923 Alcorcón, Madrid, España</li>
          <li><span className="font-medium">Correo electrónico:</span>{' '}
            <a href="mailto:adrian.delagala@proton.me" className="underline hover:text-slate-900 dark:hover:text-slate-100">
              adrian.delagala@proton.me
            </a>
          </li>
          <li><span className="font-medium">Sitio web:</span> https://generadorqr.app</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">2. Datos que se recogen</h2>
        <p className="mb-3 text-sm">
          Este sitio web no recoge datos personales de forma directa. No existen formularios de registro,
          cuentas de usuario ni bases de datos propias.
        </p>
        <p className="text-sm">
          Únicamente si aceptas el uso de cookies analíticas, se recogen de forma automática y anonimizada
          datos de navegación a través de Google Analytics 4, tales como: páginas visitadas, tiempo de
          permanencia, tipo de dispositivo, navegador y país de acceso. Estos datos no permiten identificarte
          personalmente.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">3. Finalidad y base legal del tratamiento</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 pr-4 text-left font-medium text-slate-900 dark:text-slate-100">Finalidad</th>
                <th className="py-2 pr-4 text-left font-medium text-slate-900 dark:text-slate-100">Base legal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4">Analítica web (medir el uso del sitio)</td>
                <td className="py-2">Consentimiento del usuario (art. 6.1.a RGPD)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm">
          Las cookies analíticas solo se activan si das tu consentimiento explícito a través del aviso
          que aparece al acceder al sitio por primera vez. Puedes retirar tu consentimiento en cualquier
          momento borrando las cookies de tu navegador.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">4. Cookies</h2>
        <p className="mb-4 text-sm">
          Este sitio utiliza exclusivamente cookies de analítica de terceros, condicionadas a tu consentimiento previo.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 pr-4 text-left font-medium text-slate-900 dark:text-slate-100">Cookie</th>
                <th className="py-2 pr-4 text-left font-medium text-slate-900 dark:text-slate-100">Proveedor</th>
                <th className="py-2 pr-4 text-left font-medium text-slate-900 dark:text-slate-100">Finalidad</th>
                <th className="py-2 text-left font-medium text-slate-900 dark:text-slate-100">Duración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                <td className="py-2 pr-4">Google Analytics</td>
                <td className="py-2 pr-4">Distinguir usuarios únicos</td>
                <td className="py-2">2 años</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                <td className="py-2 pr-4">Google Analytics</td>
                <td className="py-2 pr-4">Mantener estado de sesión</td>
                <td className="py-2">2 años</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm">
          Para más información sobre cómo Google trata estos datos, consulta la{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-900 dark:hover:text-slate-100"
          >
            política de privacidad de Google
          </a>.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">5. Conservación de los datos</h2>
        <p className="text-sm">
          Los datos de analítica se conservan durante el período configurado en Google Analytics (por
          defecto, 14 meses), tras el cual se eliminan automáticamente.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">6. Destinatarios</h2>
        <p className="text-sm">
          Los datos de analítica se transfieren a Google LLC (EE. UU.), que actúa como encargado del
          tratamiento bajo el marco EU-U.S. Data Privacy Framework, garantizando un nivel de protección
          adecuado según la Comisión Europea.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">7. Tus derechos</h2>
        <p className="mb-3 text-sm">De acuerdo con el RGPD y la LOPDGDD, tienes derecho a:</p>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li><span className="font-medium">Acceso:</span> conocer qué datos tuyos tratamos.</li>
          <li><span className="font-medium">Rectificación:</span> corregir datos inexactos.</li>
          <li><span className="font-medium">Supresión:</span> solicitar que eliminemos tus datos.</li>
          <li><span className="font-medium">Oposición:</span> oponerte al tratamiento de tus datos.</li>
          <li><span className="font-medium">Limitación:</span> solicitar que restrinjamos el tratamiento.</li>
          <li><span className="font-medium">Portabilidad:</span> recibir tus datos en formato estructurado.</li>
          <li><span className="font-medium">Retirar el consentimiento</span> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
        </ul>
        <p className="mt-3 text-sm">
          Para ejercer estos derechos, escríbenos a{' '}
          <a href="mailto:adrian.delagala@proton.me" className="underline hover:text-slate-900 dark:hover:text-slate-100">
            adrian.delagala@proton.me
          </a>{' '}
          indicando el derecho que deseas ejercer.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">8. Reclamaciones</h2>
        <p className="text-sm">
          Si consideras que el tratamiento de tus datos no es conforme a la normativa, puedes presentar
          una reclamación ante la{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-900 dark:hover:text-slate-100"
          >
            Agencia Española de Protección de Datos (AEPD)
          </a>.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">9. Cambios en esta política</h2>
        <p className="text-sm">
          Podemos actualizar esta política para reflejar cambios en el sitio o en la normativa aplicable.
          La fecha de última actualización siempre estará indicada al inicio de esta página.
        </p>
      </section>
    </main>
  )
}
