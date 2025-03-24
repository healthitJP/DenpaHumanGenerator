import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { QRCodeConfig } from '../../../types/qr'

interface ExportPanelProps {
  config: QRCodeConfig
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ config }) => {
  const qrRef = useRef<SVGSVGElement>(null)

  const downloadSVG = () => {
    if (!qrRef.current) return

    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)
    
    const downloadLink = document.createElement('a')
    downloadLink.href = svgUrl
    downloadLink.download = 'qrcode.svg'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
  }

  const downloadPNG = () => {
    if (!qrRef.current) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const svgData = new XMLSerializer().serializeToString(qrRef.current)
    const img = new Image()
    
    img.onload = () => {
      canvas.width = config.size
      canvas.height = config.size
      ctx.drawImage(img, 0, 0)
      
      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'qrcode.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">エクスポート💾</h2>
      
      <div className="hidden">
        <QRCodeSVG
          ref={qrRef}
          value={config.value || 'https://example.com'}
          size={config.size}
          level={config.errorCorrectionLevel}
          fgColor={config.fgColor}
          bgColor={config.bgColor}
          includeMargin={config.includeMargin}
          imageSettings={config.imageSettings}
        />
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={downloadSVG}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          SVGでダウンロード
        </button>
        <button
          onClick={downloadPNG}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          PNGでダウンロード
        </button>
      </div>
    </div>
  )
} 