'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronUp, ChevronDown, Download } from 'lucide-react'

export default function QRGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [color, setColor] = useState('#000000')
  const [size, setSize] = useState(128)
  const [downloadStatus, setDownloadStatus] = useState('')
  const qrRef = useRef<SVGSVGElement | null>(null)

  const generateQR = () => {
    setQrCode(text)
  }

  const increaseSize = () => {
    setSize(prevSize => Math.min(prevSize + 32, 320))
  }

  const decreaseSize = () => {
    setSize(prevSize => Math.max(prevSize - 32, 96))
  }

  const downloadQR = () => {
    if (!qrRef.current) {
      setDownloadStatus('Error: No se pudo generar la imagen')
      return
    }

    setDownloadStatus('Preparando la descarga...')

    const canvas = document.createElement('canvas')
    const svg = qrRef.current
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    img.onload = () => {
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = 'qrcode.png'
        downloadLink.href = pngFile
        downloadLink.click()
        setDownloadStatus('Descarga completada')
      } else {
        setDownloadStatus('Error: No se pudo crear el contexto del canvas')
      }
    }

    img.onerror = () => {
      setDownloadStatus('Error: No se pudo cargar la imagen')
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-background rounded-lg shadow-lg">
      <div className="space-y-2">
        <Label htmlFor="qr-text">Texto para el código QR</Label>
        <Input
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Introduce el texto aquí"
        />
      </div>

      <div className="space-y-2">
        <Label>Color del QR</Label>
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <Button onClick={generateQR} className="w-full">Generar QR</Button>

      {qrCode && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <QRCodeSVG
              value={qrCode}
              size={size}
              fgColor={color}
              ref={qrRef}
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