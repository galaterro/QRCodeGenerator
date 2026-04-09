export const GA_MEASUREMENT_ID = 'G-XE74T3CCXV'
export const GTM_ID = 'GTM-W5245GTV'

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
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: action, ...params })
  }
}
