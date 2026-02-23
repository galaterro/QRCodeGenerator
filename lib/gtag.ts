export const GA_MEASUREMENT_ID = 'G-XE74T3CCXV'

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

export function event(action: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params)
  }
}
