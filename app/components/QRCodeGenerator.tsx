import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import styles from './QRCodeGenerator.module.css'

const QRCodeGenerator: React.FC = () => {
  const [inputData, setInputData] = useState('')
  const [qrData, setQrData] = useState('')

  const generateQRCode = () => {
    setQrData(inputData)
  }

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code")
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL("image/png")
        const downloadLink = document.createElement("a")
        downloadLink.download = "QRCode"
        downloadLink.href = `${pngFile}`
        downloadLink.click()
      }
      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    }
  }

  return (
    <div className={styles.qrCodeGenerator}>
      <h2>Generador de Código QR</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="qr-input">Ingresa datos para el código QR:</label>
        <input
          id="qr-input"
          type="text"
          placeholder="Ingresa texto o URL"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className={styles.input}
        />
      </div>
      <button 
        onClick={generateQRCode} 
        disabled={!inputData}
        className={styles.button}
      >
        Generar Código QR
      </button>
      {qrData && (
        <div className={styles.qrCodeContainer}>
          <QRCodeSVG
            id="qr-code"
            value={qrData}
            size={200}
            level="H"
            includeMargin={true}
          />
          <button onClick={downloadQRCode} className={styles.button}>Descargar Código QR</button>
        </div>
      )}
    </div>
  )
}

export default QRCodeGenerator