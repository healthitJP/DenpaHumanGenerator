import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { ConfigPanel } from './ConfigPanel'
import { PreviewPanel } from './PreviewPanel'
import { ExportPanel } from './ExportPanel'
import { QRCodeConfig, QRInputData, WifiData, GeoData, CalendarData, SmsData, CryptoData } from '../../types/qr'

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

  const formatQRValue = (input: QRInputData): string => {
    switch (input.type) {
      case 'wifi':
        const wifi = input.content as WifiData
        return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};H:${wifi.hidden ? 'true' : 'false'};`
      
      case 'geo':
        const geo = input.content as GeoData
        return `geo:${geo.latitude},${geo.longitude}`
      
      case 'calendar':
        const cal = input.content as CalendarData
        let icalData = 'BEGIN:VEVENT\n'
        icalData += `SUMMARY:${cal.title}\n`
        icalData += `DTSTART:${cal.startDate.replace(/[-:]/g, '')}\n`
        if (cal.endDate) {
          icalData += `DTEND:${cal.endDate.replace(/[-:]/g, '')}\n`
        }
        if (cal.description) {
          icalData += `DESCRIPTION:${cal.description}\n`
        }
        if (cal.location) {
          icalData += `LOCATION:${cal.location}\n`
        }
        icalData += 'END:VEVENT'
        return icalData
      
      case 'sms':
        const sms = input.content as SmsData
        return `smsto:${sms.phoneNumber}:${sms.message}`
      
      case 'crypto':
        const crypto = input.content as CryptoData
        return `${crypto.type.toLowerCase()}:${crypto.address}${
          crypto.amount ? `?amount=${crypto.amount}` : ''
        }`
      
      case 'vcard':
        if (typeof input.content === 'string') return input.content
        const vcard = input.content
        let vcardData = 'BEGIN:VCARD\nVERSION:3.0\n'
        vcardData += `N:${vcard.lastName};${vcard.firstName};;;\n`
        vcardData += `FN:${vcard.firstName} ${vcard.lastName}\n`
        if (vcard.organization) vcardData += `ORG:${vcard.organization}\n`
        if (vcard.title) vcardData += `TITLE:${vcard.title}\n`
        if (vcard.email) vcardData += `EMAIL:${vcard.email}\n`
        if (vcard.phone) vcardData += `TEL:${vcard.phone}\n`
        if (vcard.address) vcardData += `ADR:;;${vcard.address};;;;\n`
        if (vcard.url) vcardData += `URL:${vcard.url}\n`
        vcardData += 'END:VCARD'
        return vcardData
      
      default:
        return typeof input.content === 'string' ? input.content : JSON.stringify(input.content)
    }
  }

  const handleInputChange = (newInput: QRInputData) => {
    setInput(newInput)
    setConfig(prev => ({
      ...prev,
      value: formatQRValue(newInput)
    }))
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