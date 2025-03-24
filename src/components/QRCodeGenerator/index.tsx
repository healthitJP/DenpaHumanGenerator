import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ConfigPanel } from './ConfigPanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportPanel } from './ExportPanel'
import { QRCodeConfig, QRInputData } from '../../types/qr'

export const QRCodeGenerator: React.FC = () => {
  const [config, setConfig] = useState<QRCodeConfig>({
    value: '',
    errorCorrectionLevel: 'M',
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
    includeMargin: true,
    renderAs: 'svg'
  })

  const [input, setInput] = useState<QRInputData>({
    type: 'text',
    content: ''
  })

  const handleConfigChange = (newConfig: Partial<QRCodeConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }))
  }

  const handleInputChange = (newInput: QRInputData) => {
    setInput(newInput)
    setConfig(prev => ({ ...prev, value: typeof newInput.content === 'string' ? newInput.content : JSON.stringify(newInput.content) }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <ConfigPanel
          config={config}
          input={input}
          onConfigChange={handleConfigChange}
          onInputChange={handleInputChange}
        />
      </div>
      <div className="space-y-8">
        <PreviewPanel config={config} />
        <ExportPanel config={config} />
      </div>
    </div>
  )
} 