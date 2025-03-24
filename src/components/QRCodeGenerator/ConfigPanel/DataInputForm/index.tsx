import { DataType, QRInputData, VCardData, WifiData, GeoData, CalendarData, SmsData, CryptoData } from '../../../../types/qr'

interface DataInputFormProps {
  input: QRInputData
  onInputChange: (input: QRInputData) => void
}

export const DataInputForm: React.FC<DataInputFormProps> = ({
  input,
  onInputChange
}) => {
  const handleTypeChange = (type: DataType) => {
    onInputChange({
      type,
      content: type === 'vcard' ? {
        firstName: '',
        lastName: ''
      } : type === 'wifi' ? {
        ssid: '',
        password: '',
        encryption: 'WPA'
      } : type === 'geo' ? {
        latitude: 0,
        longitude: 0
      } : type === 'calendar' ? {
        title: '',
        startDate: new Date().toISOString().split('T')[0]
      } : type === 'sms' ? {
        phoneNumber: '',
        message: ''
      } : type === 'crypto' ? {
        type: 'BTC',
        address: ''
      } : ''
    })
  }

  const handleTextChange = (content: string) => {
    onInputChange({ ...input, content })
  }

  const handleVCardChange = (field: keyof VCardData, value: string) => {
    if (typeof input.content !== 'string' && input.type === 'vcard') {
      onInputChange({
        ...input,
        content: { ...input.content, [field]: value }
      })
    }
  }

  const renderForm = () => {
    switch (input.type) {
      case 'vcard':
        const vCardData = input.content as VCardData
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓</label>
              <input
                type="text"
                value={vCardData.lastName}
                onChange={(e) => handleVCardChange('lastName', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">名</label>
              <input
                type="text"
                value={vCardData.firstName}
                onChange={(e) => handleVCardChange('firstName', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input
                type="email"
                value={vCardData.email || ''}
                onChange={(e) => handleVCardChange('email', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input
                type="tel"
                value={vCardData.phone || ''}
                onChange={(e) => handleVCardChange('phone', e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )

      case 'wifi':
        const wifiData = input.content as WifiData
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SSID（ネットワーク名）</label>
              <input
                type="text"
                value={wifiData.ssid}
                onChange={(e) => onInputChange({ ...input, content: { ...wifiData, ssid: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
              <input
                type="password"
                value={wifiData.password}
                onChange={(e) => onInputChange({ ...input, content: { ...wifiData, password: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">暗号化方式</label>
              <select
                value={wifiData.encryption}
                onChange={(e) => onInputChange({ ...input, content: { ...wifiData, encryption: e.target.value as WifiData['encryption'] } })}
                className="w-full p-2 border rounded-md"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">暗号化なし</option>
              </select>
            </div>
          </div>
        )

      case 'geo':
        const geoData = input.content as GeoData
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">緯度</label>
              <input
                type="number"
                step="0.000001"
                value={geoData.latitude}
                onChange={(e) => onInputChange({ ...input, content: { ...geoData, latitude: Number(e.target.value) } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">経度</label>
              <input
                type="number"
                step="0.000001"
                value={geoData.longitude}
                onChange={(e) => onInputChange({ ...input, content: { ...geoData, longitude: Number(e.target.value) } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )

      case 'calendar':
        const calendarData = input.content as CalendarData
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
              <input
                type="text"
                value={calendarData.title}
                onChange={(e) => onInputChange({ ...input, content: { ...calendarData, title: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">開始日時</label>
              <input
                type="datetime-local"
                value={calendarData.startDate}
                onChange={(e) => onInputChange({ ...input, content: { ...calendarData, startDate: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">終了日時（任意）</label>
              <input
                type="datetime-local"
                value={calendarData.endDate || ''}
                onChange={(e) => onInputChange({ ...input, content: { ...calendarData, endDate: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">説明（任意）</label>
              <textarea
                value={calendarData.description || ''}
                onChange={(e) => onInputChange({ ...input, content: { ...calendarData, description: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )

      case 'sms':
        const smsData = input.content as SmsData
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
              <input
                type="tel"
                value={smsData.phoneNumber}
                onChange={(e) => onInputChange({ ...input, content: { ...smsData, phoneNumber: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
              <textarea
                value={smsData.message}
                onChange={(e) => onInputChange({ ...input, content: { ...smsData, message: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )

      case 'crypto':
        const cryptoData = input.content as CryptoData
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">暗号資産の種類</label>
              <select
                value={cryptoData.type}
                onChange={(e) => onInputChange({ ...input, content: { ...cryptoData, type: e.target.value as CryptoData['type'] } })}
                className="w-full p-2 border rounded-md"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="XRP">Ripple (XRP)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">アドレス</label>
              <input
                type="text"
                value={cryptoData.address}
                onChange={(e) => onInputChange({ ...input, content: { ...cryptoData, address: e.target.value } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">金額（任意）</label>
              <input
                type="number"
                step="0.00000001"
                value={cryptoData.amount || ''}
                onChange={(e) => onInputChange({ ...input, content: { ...cryptoData, amount: Number(e.target.value) } })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        )

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.type === 'text' ? 'テキスト' :
               input.type === 'url' ? 'URL' :
               input.type === 'tel' ? '電話番号' : 'メールアドレス'}
            </label>
            <input
              type={input.type === 'email' ? 'email' :
                    input.type === 'tel' ? 'tel' :
                    input.type === 'url' ? 'url' : 'text'}
              value={typeof input.content === 'string' ? input.content : ''}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          データタイプ
        </label>
        <select
          value={input.type}
          onChange={(e) => handleTypeChange(e.target.value as DataType)}
          className="w-full p-2 border rounded-md"
        >
          <option value="text">テキスト</option>
          <option value="url">URL</option>
          <option value="tel">電話番号</option>
          <option value="email">メールアドレス</option>
          <option value="vcard">名刺（VCard）</option>
          <option value="wifi">Wi-Fi設定</option>
          <option value="geo">位置情報</option>
          <option value="calendar">カレンダー</option>
          <option value="sms">SMS</option>
          <option value="crypto">暗号資産</option>
        </select>
      </div>

      {renderForm()}
    </div>
  )
} 