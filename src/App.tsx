import { QRCodeGenerator } from './components/QRCodeGenerator'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          QRコードジェネレーター🎨
        </h1>
        <QRCodeGenerator />
      </div>
    </div>
  )
}

export default App
