'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  ChevronUp, ChevronDown, Download, FileText, Link2, Mail, Phone,
  MessageSquare, Wifi, MapPin, User, QrCode, Palette
} from 'lucide-react'
import { QR_COUNT_STORAGE_KEY } from '@/lib/constants'
import { event as trackEvent } from '@/lib/gtag'

type QRType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'vcard'

const QR_TYPES = [
  { value: 'text' as QRType, icon: FileText, label: 'Texto' },
  { value: 'url' as QRType, icon: Link2, label: 'URL' },
  { value: 'email' as QRType, icon: Mail, label: 'Email' },
  { value: 'phone' as QRType, icon: Phone, label: 'Teléfono' },
  { value: 'sms' as QRType, icon: MessageSquare, label: 'SMS' },
  { value: 'wifi' as QRType, icon: Wifi, label: 'WiFi' },
  { value: 'location' as QRType, icon: MapPin, label: 'Ubicación' },
  { value: 'vcard' as QRType, icon: User, label: 'Contacto' },
]

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 0, g: 0, b: 0 }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export default function QRGenerator() {
  const [qrType, setQrType] = useState<QRType>('url')
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [phone, setPhone] = useState('')
  const [smsNumber, setSmsNumber] = useState('')
  const [smsMessage, setSmsMessage] = useState('')
  const [wifiSSID, setWifiSSID] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [vcardName, setVcardName] = useState('')
  const [vcardPhone, setVcardPhone] = useState('')
  const [vcardEmail, setVcardEmail] = useState('')
  const [vcardOrg, setVcardOrg] = useState('')
  const [vcardUrl, setVcardUrl] = useState('')

  const [qrCode, setQrCode] = useState('')
  const [color, setColor] = useState('#000000')
  const [size, setSize] = useState(200)
  const [downloadStatus, setDownloadStatus] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 1066)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const rgb = hexToRgb(color)

  const handleRgbChange = useCallback((component: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value, 10)
    if (isNaN(numValue) || numValue < 0 || numValue > 255) return
    const newRgb = { ...rgb, [component]: numValue }
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }, [rgb])

  const generateQRContent = (): string => {
    switch (qrType) {
      case 'text': return text
      case 'url': return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
      case 'email':
        return `mailto:${email}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''}${emailBody ? `${emailSubject ? '&' : '?'}body=${encodeURIComponent(emailBody)}` : ''}`
      case 'phone': return `tel:${phone}`
      case 'sms': return `sms:${smsNumber}${smsMessage ? `?body=${encodeURIComponent(smsMessage)}` : ''}`
      case 'wifi': return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`
      case 'location': return `geo:${latitude},${longitude}`
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\n${vcardPhone ? `TEL:${vcardPhone}\n` : ''}${vcardEmail ? `EMAIL:${vcardEmail}\n` : ''}${vcardOrg ? `ORG:${vcardOrg}\n` : ''}${vcardUrl ? `URL:${vcardUrl}\n` : ''}END:VCARD`
      default: return text
    }
  }

  const generateQR = () => {
    const content = generateQRContent()
    if (content.trim()) {
      setQrCode(content)
      trackEvent('generate_qr', { qr_type: qrType })

      if (typeof window !== 'undefined') {
        const currentCount = parseInt(localStorage.getItem(QR_COUNT_STORAGE_KEY) || '0', 10)
        const newCount = currentCount + 1
        localStorage.setItem(QR_COUNT_STORAGE_KEY, String(newCount))
        window.dispatchEvent(new CustomEvent('qrGenerated', { detail: { count: newCount } }))
      }
    }
  }

  const increaseSize = () => setSize(prev => Math.min(prev + 32, 320))
  const decreaseSize = () => setSize(prev => Math.max(prev - 32, 96))

  const downloadQR = () => {
    if (!qrRef.current || !qrCode) {
      setDownloadStatus('Error: No se pudo generar la imagen')
      return
    }
    setDownloadStatus('Preparando la descarga...')
    const canvas = qrRef.current.querySelector('canvas')
    if (!canvas) {
      setDownloadStatus('Error: No se pudo encontrar el canvas')
      return
    }
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'qrcode.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloadStatus('Descarga completada')
  }

  return (
    <div className="w-full">
      {/* Type selector — pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {QR_TYPES.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setQrType(value)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all border ${
              qrType === value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-4">

          {qrType === 'text' && (
            <div className="space-y-1.5">
              <Label htmlFor="qr-text">Texto</Label>
              <Input id="qr-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Introduce el texto aquí" />
            </div>
          )}

          {qrType === 'url' && (
            <div className="space-y-1.5">
              <Label htmlFor="qr-url">URL</Label>
              <Input id="qr-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com o https://example.com" type="url" />
            </div>
          )}

          {qrType === 'email' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="qr-email">Correo electrónico</Label>
                <Input id="qr-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" type="email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-email-subject">Asunto (opcional)</Label>
                <Input id="qr-email-subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Asunto del correo" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-email-body">Mensaje (opcional)</Label>
                <Input id="qr-email-body" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Mensaje del correo" />
              </div>
            </div>
          )}

          {qrType === 'phone' && (
            <div className="space-y-1.5">
              <Label htmlFor="qr-phone">Número de teléfono</Label>
              <Input id="qr-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+34 600 000 000" type="tel" />
            </div>
          )}

          {qrType === 'sms' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="qr-sms-number">Número de teléfono</Label>
                <Input id="qr-sms-number" value={smsNumber} onChange={(e) => setSmsNumber(e.target.value)} placeholder="+34 600 000 000" type="tel" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-sms-message">Mensaje (opcional)</Label>
                <Input id="qr-sms-message" value={smsMessage} onChange={(e) => setSmsMessage(e.target.value)} placeholder="Mensaje del SMS" />
              </div>
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="qr-wifi-ssid">Nombre de red (SSID)</Label>
                <Input id="qr-wifi-ssid" value={wifiSSID} onChange={(e) => setWifiSSID(e.target.value)} placeholder="Mi-Red-WiFi" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-wifi-password">Contraseña</Label>
                <Input id="qr-wifi-password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="contraseña123" type="password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-wifi-encryption">Tipo de seguridad</Label>
                <Select value={wifiEncryption} onValueChange={(value) => setWifiEncryption(value as 'WPA' | 'WEP' | 'nopass')}>
                  <SelectTrigger id="qr-wifi-encryption"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WPA">WPA/WPA2</SelectItem>
                    <SelectItem value="WEP">WEP</SelectItem>
                    <SelectItem value="nopass">Sin contraseña</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {qrType === 'location' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="qr-latitude">Latitud</Label>
                <Input id="qr-latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="40.4168" type="number" step="any" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-longitude">Longitud</Label>
                <Input id="qr-longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="-3.7038" type="number" step="any" />
              </div>
            </div>
          )}

          {qrType === 'vcard' && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="qr-vcard-name">Nombre completo</Label>
                <Input id="qr-vcard-name" value={vcardName} onChange={(e) => setVcardName(e.target.value)} placeholder="Juan Pérez" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-vcard-phone">Teléfono (opcional)</Label>
                <Input id="qr-vcard-phone" value={vcardPhone} onChange={(e) => setVcardPhone(e.target.value)} placeholder="+34 600 000 000" type="tel" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-vcard-email">Email (opcional)</Label>
                <Input id="qr-vcard-email" value={vcardEmail} onChange={(e) => setVcardEmail(e.target.value)} placeholder="juan@ejemplo.com" type="email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-vcard-org">Organización (opcional)</Label>
                <Input id="qr-vcard-org" value={vcardOrg} onChange={(e) => setVcardOrg(e.target.value)} placeholder="Mi Empresa S.L." />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="qr-vcard-url">Sitio web (opcional)</Label>
                <Input id="qr-vcard-url" value={vcardUrl} onChange={(e) => setVcardUrl(e.target.value)} placeholder="https://ejemplo.com" type="url" />
              </div>
            </div>
          )}

          {/* Color picker */}
          <div className="space-y-1.5">
            <Label>Color del QR</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <span>Seleccionar color</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-border shadow-sm" style={{ backgroundColor: color }} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={`${isMobile ? 'w-[calc(100vw-2rem)] max-w-[20rem]' : 'w-80'}`}
                side={isMobile ? 'bottom' : 'left'}
                align={isMobile ? 'center' : 'start'}
                sideOffset={isMobile ? 5 : 10}
              >
                <div className={`flex ${isMobile ? 'flex-col' : 'space-x-4'}`}>
                  <HexColorPicker color={color} onChange={setColor} className={`${isMobile ? 'w-full mb-4' : 'w-48'}`} />
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="hex-color">HEX</Label>
                    <Input id="hex-color" value={color} onChange={(e) => setColor(e.target.value)} />
                    <Label htmlFor="r-color">R</Label>
                    <Input id="r-color" value={rgb.r} onChange={(e) => handleRgbChange('r', e.target.value)} />
                    <Label htmlFor="g-color">G</Label>
                    <Input id="g-color" value={rgb.g} onChange={(e) => handleRgbChange('g', e.target.value)} />
                    <Label htmlFor="b-color">B</Label>
                    <Input id="b-color" value={rgb.b} onChange={(e) => handleRgbChange('b', e.target.value)} />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={generateQR} className="w-full h-11 text-sm font-semibold rounded-xl">
            Generar QR
          </Button>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card min-h-72 p-8">
          {qrCode ? (
            <div className="flex flex-col items-center gap-5 w-full">
              <div ref={qrRef} className="rounded-xl overflow-hidden shadow-md">
                <QRCodeCanvas value={qrCode} size={size} fgColor={color} level="H" includeMargin={true} />
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={decreaseSize} variant="outline" size="icon" className="rounded-full h-8 w-8">
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs font-mono text-muted-foreground w-20 text-center tabular-nums">
                  {size}×{size}px
                </span>
                <Button onClick={increaseSize} variant="outline" size="icon" className="rounded-full h-8 w-8">
                  <ChevronUp className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Button onClick={downloadQR} variant="outline" className="w-full rounded-xl">
                <Download className="mr-2 h-4 w-4" />
                Guardar PNG
              </Button>

              {downloadStatus && (
                <p className="text-xs text-muted-foreground" aria-live="polite">{downloadStatus}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center select-none">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                <QrCode className="h-7 w-7 text-muted-foreground/50" />
              </div>
              <div>
                <p className="font-syne font-semibold text-foreground">Tu QR aparecerá aquí</p>
                <p className="text-sm text-muted-foreground mt-1">Rellena el formulario y pulsa &ldquo;Generar QR&rdquo;</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
