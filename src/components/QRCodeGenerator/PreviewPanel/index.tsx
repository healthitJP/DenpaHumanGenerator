import { QRCodeSVG } from 'qrcode.react'
import { QRCodeConfig } from '../../../types/qr'

interface PreviewPanelProps {
  config: QRCodeConfig
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ config }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">プレビュー👀</h2>
      
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <QRCodeSVG
          value={config.value || 'https://example.com'}
          size={config.size}
          level={config.errorCorrectionLevel}
          fgColor={config.fgColor}
          bgColor={config.bgColor}
          includeMargin={config.includeMargin}
          imageSettings={config.imageSettings}
        />
      </div>
    </div>
  )
} 