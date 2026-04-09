# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint (next/core-web-vitals preset)
npm run start    # Start production server
```

No test suite is configured.

## Architecture

**Stack:** Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui

This is a fully client-side QR code generator — no API routes, no database, no server-side logic.

### Key Files

- `app/page.tsx` — Home page: header, hero (with animated counter), features, QR generator section, footer
- `app/components/QRGenerator.tsx` — Main component (~450 lines): all generation logic, color picker, size controls, download
- `app/layout.tsx` — Root layout with Google Analytics script injection
- `lib/gtag.ts` — GA4 tracking wrapper (`G-XE74T3CCXV`)
- `lib/constants.ts` — `BASE_QR_COUNT` seed value + localStorage key for counter persistence
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)
- `components/ui/` — shadcn/ui components (Button, Input, Label, Select, Popover)

### Cross-Component Communication

The counter shown on the hero section is updated via a custom browser event:

```
QRGenerator dispatches CustomEvent('qrGenerated', { detail: { count } })
  → page.tsx listens and updates its counter state
```

The count is persisted in `localStorage` and seeded with `BASE_QR_COUNT` from `lib/constants.ts`.

### QR Types

8 supported types: `text`, `url`, `email`, `phone`, `sms`, `wifi`, `location`, `vCard`. Each has its own input fields rendered conditionally in `QRGenerator.tsx`, and generates a formatted string (e.g., `mailto:`, `geo:`, `BEGIN:VCARD`...) passed to `qrcode.react`'s `QRCodeCanvas`.

### Styling Notes

- Tailwind CSS v4 with `@tailwindcss/postcss` (no legacy `tailwind.config.js` plugins needed)
- Dark mode is toggled by adding/removing the `dark` class on `<html>` via `localStorage` persistence
- Mobile breakpoint is 1066px (detected via `useEffect` + `resize` listener, not just CSS breakpoints)
- shadcn/ui uses CSS variables for theming; color palette is `slate`
