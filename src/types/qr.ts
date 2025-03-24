export type DataType = 'text' | 'url' | 'tel' | 'email' | 'vcard' | 'wifi' | 'geo' | 'calendar' | 'sms' | 'crypto'

export interface VCardData {
  firstName: string
  lastName: string
  organization?: string
  title?: string
  email?: string
  phone?: string
  address?: string
  url?: string
}

export interface WifiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden?: boolean
}

export interface GeoData {
  latitude: number
  longitude: number
}

export interface CalendarData {
  title: string
  startDate: string
  endDate?: string
  description?: string
  location?: string
}

export interface SmsData {
  phoneNumber: string
  message: string
}

export interface CryptoData {
  type: 'BTC' | 'ETH' | 'XRP'
  address: string
  amount?: number
}

export interface QRInputData {
  type: DataType
  content: string | VCardData | WifiData | GeoData | CalendarData | SmsData | CryptoData
}

export interface QRCodeConfig {
  value: string
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
  size: number
  fgColor: string
  bgColor: string
  includeMargin: boolean
  renderAs: 'svg' | 'canvas'
  imageSettings?: {
    src: string
    height: number
    width: number
    excavate: boolean
  }
} 