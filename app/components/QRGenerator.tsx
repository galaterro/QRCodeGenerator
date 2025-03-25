'use client'

import React, { useState, useRef, useCallback } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { HexColorPicker } from 'react-colorful'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronUp, ChevronDown, Download } from 'lucide-react'

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
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [color, setColor] = useState('#000000')
  const [size, setSize] = useState(128)
  const [downloadStatus, setDownloadStatus] = useState('')
  const qrRef = useRef<HTMLDivElement>(null)

  const rgb = hexToRgb(color)

  const handleRgbChange = useCallback((component: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value, 10)
    if (isNaN(numValue) || numValue < 0 || numValue > 255) return

    const newRgb = { ...rgb, [component]: numValue }
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }, [rgb])

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
          <PopoverContent className="w-80" side="left" align="start">
            <div className="flex space-x-4">
              <HexColorPicker color={color} onChange={setColor} className="w-48" />
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