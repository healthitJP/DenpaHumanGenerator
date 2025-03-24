import { QRCodeConfig, QRInputData } from '../../../types/qr'
import { DataInputForm } from './DataInputForm'
import { AppearanceSettings } from './AppearanceSettings'

interface ConfigPanelProps {
  config: QRCodeConfig
  input: QRInputData
  onConfigChange: (config: Partial<QRCodeConfig>) => void
  onInputChange: (input: QRInputData) => void
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  input,
  onConfigChange,
  onInputChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold mb-4">設定✨</h2>
      
      <div className="space-y-6">
        <DataInputForm
          input={input}
          onInputChange={onInputChange}
        />
        
        <AppearanceSettings
          config={config}
          onConfigChange={onConfigChange}
        />
      </div>
    </div>
  )
} 