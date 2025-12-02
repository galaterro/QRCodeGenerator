'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronUp, ChevronDown, Download, Link2, Mail, Phone, Wifi, MapPin, User } from 'lucide-react'

type QRType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'location' | 'vcard'

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : { r: 0, g: 0, b: 0 } // Default to black if parsing fails
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export default function QRGenerator() {
  const [qrType, setQrType] = useState<QRType>('text')
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
  const [size, setSize] = useState(128)
  const [downloadStatus, setDownloadStatus] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1066)
    }
    
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
      case 'text':
        return text
      case 'url':
        return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`
      case 'email':
        return `mailto:${email}${emailSubject ? `?subject=${encodeURIComponent(emailSubject)}` : ''}${emailBody ? `${emailSubject ? '&' : '?'}body=${encodeURIComponent(emailBody)}` : ''}`
      case 'phone':
        return `tel:${phone}`
      case 'sms':
        return `sms:${smsNumber}${smsMessage ? `?body=${encodeURIComponent(smsMessage)}` : ''}`
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`
      case 'location':
        return `geo:${latitude},${longitude}`
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\n${vcardPhone ? `TEL:${vcardPhone}\n` : ''}${vcardEmail ? `EMAIL:${vcardEmail}\n` : ''}${vcardOrg ? `ORG:${vcardOrg}\n` : ''}${vcardUrl ? `URL:${vcardUrl}\n` : ''}END:VCARD`
      default:
        return text
    }
  }

  const generateQR = () => {
    const content = generateQRContent()
    if (content.trim()) {
      setQrCode(content)
    }
  }

  const increaseSize = () => {
    setSize(prevSize => Math.min(prevSize + 32, 320))
  }

  const decreaseSize = () => {
    setSize(prevSize => Math.max(prevSize - 32, 96))
  }

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
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-background rounded-lg shadow-lg">
      <div className="space-y-2">
        <Label htmlFor="qr-type">Tipo de código QR</Label>
        <Select value={qrType} onValueChange={(value) => setQrType(value as QRType)}>
          <SelectTrigger id="qr-type">
            <SelectValue placeholder="Selecciona el tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">📝 Texto</SelectItem>
            <SelectItem value="url">🔗 Enlace / URL</SelectItem>
            <SelectItem value="email">📧 Email</SelectItem>
            <SelectItem value="phone">📞 Teléfono</SelectItem>
            <SelectItem value="sms">💬 SMS</SelectItem>
            <SelectItem value="wifi">📶 WiFi</SelectItem>
            <SelectItem value="location">📍 Ubicación</SelectItem>
            <SelectItem value="vcard">👤 Tarjeta de contacto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {qrType === 'text' && (
        <div className="space-y-2">
          <Label htmlFor="qr-text">Texto</Label>
          <Input
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Introduce el texto aquí"
          />
        </div>
      )}

      {qrType === 'url' && (
        <div className="space-y-2">
          <Label htmlFor="qr-url">URL</Label>
          <Input
            id="qr-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="example.com o https://example.com"
            type="url"
          />
        </div>
      )}

      {qrType === 'email' && (
        <div className="space-y-2">
          <Label htmlFor="qr-email">Correo electrónico</Label>
          <Input
            id="qr-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            type="email"
          />
          <Label htmlFor="qr-email-subject">Asunto (opcional)</Label>
          <Input
            id="qr-email-subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Asunto del correo"
          />
          <Label htmlFor="qr-email-body">Mensaje (opcional)</Label>
          <Input
            id="qr-email-body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            placeholder="Mensaje del correo"
          />
        </div>
      )}

      {qrType === 'phone' && (
        <div className="space-y-2">
          <Label htmlFor="qr-phone">Número de teléfono</Label>
          <Input
            id="qr-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1234567890"
            type="tel"
          />
        </div>
      )}

      {qrType === 'sms' && (
        <div className="space-y-2">
          <Label htmlFor="qr-sms-number">Número de teléfono</Label>
          <Input
            id="qr-sms-number"
            value={smsNumber}
            onChange={(e) => setSmsNumber(e.target.value)}
            placeholder="+1234567890"
            type="tel"
          />
          <Label htmlFor="qr-sms-message">Mensaje (opcional)</Label>
          <Input
            id="qr-sms-message"
            value={smsMessage}
            onChange={(e) => setSmsMessage(e.target.value)}
            placeholder="Mensaje del SMS"
          />
        </div>
      )}

      {qrType === 'wifi' && (
        <div className="space-y-2">
          <Label htmlFor="qr-wifi-ssid">Nombre de red (SSID)</Label>
          <Input
            id="qr-wifi-ssid"
            value={wifiSSID}
            onChange={(e) => setWifiSSID(e.target.value)}
            placeholder="Mi-Red-WiFi"
          />
          <Label htmlFor="qr-wifi-password">Contraseña</Label>
          <Input
            id="qr-wifi-password"
            value={wifiPassword}
            onChange={(e) => setWifiPassword(e.target.value)}
            placeholder="contraseña123"
            type="password"
          />
          <Label htmlFor="qr-wifi-encryption">Tipo de seguridad</Label>
          <Select value={wifiEncryption} onValueChange={(value) => setWifiEncryption(value as 'WPA' | 'WEP' | 'nopass')}>
            <SelectTrigger id="qr-wifi-encryption">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WPA">WPA/WPA2</SelectItem>
              <SelectItem value="WEP">WEP</SelectItem>
              <SelectItem value="nopass">Sin contraseña</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {qrType === 'location' && (
        <div className="space-y-2">
          <Label htmlFor="qr-latitude">Latitud</Label>
          <Input
            id="qr-latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="40.7128"
            type="number"
            step="any"
          />
          <Label htmlFor="qr-longitude">Longitud</Label>
          <Input
            id="qr-longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="-74.0060"
            type="number"
            step="any"
          />
        </div>
      )}

      {qrType === 'vcard' && (
        <div className="space-y-2">
          <Label htmlFor="qr-vcard-name">Nombre completo</Label>
          <Input
            id="qr-vcard-name"
            value={vcardName}
            onChange={(e) => setVcardName(e.target.value)}
            placeholder="Juan Pérez"
          />
          <Label htmlFor="qr-vcard-phone">Teléfono (opcional)</Label>
          <Input
            id="qr-vcard-phone"
            value={vcardPhone}
            onChange={(e) => setVcardPhone(e.target.value)}
            placeholder="+1234567890"
            type="tel"
          />
          <Label htmlFor="qr-vcard-email">Email (opcional)</Label>
          <Input
            id="qr-vcard-email"
            value={vcardEmail}
            onChange={(e) => setVcardEmail(e.target.value)}
            placeholder="juan@ejemplo.com"
            type="email"
          />
          <Label htmlFor="qr-vcard-org">Organización (opcional)</Label>
          <Input
            id="qr-vcard-org"
            value={vcardOrg}
            onChange={(e) => setVcardOrg(e.target.value)}
            placeholder="Mi Empresa S.A."
          />
          <Label htmlFor="qr-vcard-url">Sitio web (opcional)</Label>
          <Input
            id="qr-vcard-url"
            value={vcardUrl}
            onChange={(e) => setVcardUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            type="url"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Color del QR</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Color
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className={`${isMobile ? 'w-[calc(100vw-2rem)] max-w-[20rem]' : 'w-80'}`}
            side={isMobile ? "bottom" : "left"}
            align={isMobile ? "center" : "start"}
            sideOffset={isMobile ? 5 : 10}
          >
            <div className={`flex ${isMobile ? 'flex-col' : 'space-x-4'}`}>
              <HexColorPicker 
                color={color} 
                onChange={setColor} 
                className={`${isMobile ? 'w-full mb-4' : 'w-48'}`} 
              />
              <div className="space-y-2 flex-1">
                <Label htmlFor="hex-color">HEX</Label>
                <Input
                  id="hex-color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <Label htmlFor="r-color">R</Label>
                <Input
                  id="r-color"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                />
                <Label htmlFor="g-color">G</Label>
                <Input
                  id="g-color"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                />
                <Label htmlFor="b-color">B</Label>
                <Input
                  id="b-color"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={generateQR} className="w-full">Generar QR</Button>

      {qrCode && (
        <div className="space-y-4">
          <div className="flex justify-center" ref={qrRef}>
            <QRCodeCanvas
              value={qrCode}
              size={size}
              fgColor={color}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={decreaseSize} variant="outline" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{size}x{size}</span>
            <Button onClick={increaseSize} variant="outline" size="icon">
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>

          <Button onClick={downloadQR} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Guardar QR
          </Button>

          <p className="text-sm text-center" aria-live="polite">
            {downloadStatus}
          </p>
        </div>
      )}
    </div>
  )
}