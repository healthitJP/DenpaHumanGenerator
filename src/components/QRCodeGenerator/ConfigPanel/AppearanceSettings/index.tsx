import { QRCodeConfig } from '../../../../types/qr'

interface AppearanceSettingsProps {
  config: QRCodeConfig
  onConfigChange: (config: Partial<QRCodeConfig>) => void
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  config,
  onConfigChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">外観設定</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          エラー訂正レベル
        </label>
        <select
          value={config.errorCorrectionLevel}
          onChange={(e) => onConfigChange({ errorCorrectionLevel: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
          className="w-full p-2 border rounded-md"
        >
          <option value="L">レベルL (7%)</option>
          <option value="M">レベルM (15%)</option>
          <option value="Q">レベルQ (25%)</option>
          <option value="H">レベルH (30%)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          サイズ
        </label>
        <input
          type="range"
          min="128"
          max="512"
          step="32"
          value={config.size}
          onChange={(e) => onConfigChange({ size: Number(e.target.value) })}
          className="w-full"
        />
        <div className="text-sm text-gray-500 text-right">{config.size}px</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            前景色
          </label>
          <input
            type="color"
            value={config.fgColor}
            onChange={(e) => onConfigChange({ fgColor: e.target.value })}
            className="w-full p-1 h-10 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            背景色
          </label>
          <input
            type="color"
            value={config.bgColor}
            onChange={(e) => onConfigChange({ bgColor: e.target.value })}
            className="w-full p-1 h-10 border rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="includeMargin"
          checked={config.includeMargin}
          onChange={(e) => onConfigChange({ includeMargin: e.target.checked })}
          className="h-4 w-4 text-blue-600 rounded border-gray-300"
        />
        <label htmlFor="includeMargin" className="ml-2 text-sm text-gray-700">
          余白を含める
        </label>
      </div>
    </div>
  )
} 