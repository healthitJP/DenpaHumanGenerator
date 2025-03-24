import { useState } from 'react'
import { DataType, QRInputData, VCardData } from '../../../../types/qr'

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
      } : ''
    })
  }

  const handleTextChange = (content: string) => {
    onInputChange({ ...input, content })
  }

  const handleVCardChange = (field: keyof VCardData, value: string) => {
    if (typeof input.content !== 'string') {
      onInputChange({
        ...input,
        content: { ...input.content, [field]: value }
      })
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
        </select>
      </div>

      {input.type === 'vcard' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              姓
            </label>
            <input
              type="text"
              value={typeof input.content !== 'string' ? input.content.lastName : ''}
              onChange={(e) => handleVCardChange('lastName', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名
            </label>
            <input
              type="text"
              value={typeof input.content !== 'string' ? input.content.firstName : ''}
              onChange={(e) => handleVCardChange('firstName', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={typeof input.content !== 'string' ? input.content.email || '' : ''}
              onChange={(e) => handleVCardChange('email', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              value={typeof input.content !== 'string' ? input.content.phone || '' : ''}
              onChange={(e) => handleVCardChange('phone', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      ) : (
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
      )}
    </div>
  )
} 