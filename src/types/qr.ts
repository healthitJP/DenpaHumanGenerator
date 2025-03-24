export type DataType = 'text' | 'url' | 'tel' | 'email' | 'vcard'

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

export interface QRInputData {
  type: DataType
  content: string | VCardData
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