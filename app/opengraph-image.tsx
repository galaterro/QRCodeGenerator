import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Generador de Códigos QR Gratis — generadorqr.app'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 80px',
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,229,204,0.12) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, position: 'relative' }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#00E5CC',
              border: '1px solid rgba(0,229,204,0.3)',
              borderRadius: 999,
              padding: '6px 20px',
            }}
          >
            100% GRATUITO · SIN REGISTRO
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-3px',
              lineHeight: 1.05,
              textAlign: 'center',
            }}
          >
            Genera Códigos QR{'\n'}
            <span style={{ color: '#00E5CC' }}>al instante</span>
          </div>

          <div
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.45)',
              textAlign: 'center',
            }}
          >
            generadorqr.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
