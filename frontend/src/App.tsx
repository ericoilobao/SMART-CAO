import React from 'react'
import { Leaf, TrendingUp, AlertCircle, Activity } from 'lucide-react'
import Dashboard from './components/Dashboard'
import HubOperacional from './components/HubOperacional'

function App() {
  const [currentPage, setCurrentPage] = React.useState<'dashboard' | 'hub'>('dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-green-900">SMART-CAO</h1>
                <p className="text-sm text-green-600">Tokenizing Cabruca - A Natural Climate Asset</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-green-700 hover:bg-green-50 rounded-lg transition">
                Conectar Carteira
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                currentPage === 'dashboard'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('hub')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                currentPage === 'hub'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Hub Operacional
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'hub' && <HubOperacional />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 text-sm">
            © 2026 SMART-CAO. Desenvolvido com ❤️ para a sustentabilidade.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
