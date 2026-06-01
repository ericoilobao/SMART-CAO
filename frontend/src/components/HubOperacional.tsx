import React from 'react'
import { AlertTriangle, Shield, CheckCircle, AlertCircle, Zap, Lock } from 'lucide-react'

function HubOperacional() {
  const [circuitBreakerActive, setCircuitBreakerActive] = React.useState(false)
  const [validationQueue, setValidationQueue] = React.useState([
    { id: 'VAL-001', token: 'CAB-089', farmer: 'João Silva', type: 'Validação GPS', status: 'Pendente', priority: 'Alta' },
    { id: 'VAL-002', token: 'CAB-088', farmer: 'Maria Santos', type: 'Conferência CAR', status: 'Pendente', priority: 'Normal' },
    { id: 'VAL-003', token: 'CAB-087', farmer: 'Pedro Oliveira', type: 'Validação Área', status: 'Processando', priority: 'Normal' },
  ])

  const systemStatus = {
    blockchain: 'Operacional',
    visionApi: 'Operacional',
    database: 'Operacional',
    redis: 'Operacional'
  }

  const alerts = [
    {
      id: 1,
      title: 'Divergência de Coordenadas GPS',
      description: 'Token #CAB-089 com scan fora do polígono do CAR',
      type: 'critical',
      timestamp: '2026-05-20 14:32'
    },
    {
      id: 2,
      title: 'Documentação Incompleta',
      description: 'Agricultor #456 sem documentação ZARC',
      type: 'warning',
      timestamp: '2026-05-20 13:15'
    },
    {
      id: 3,
      title: 'Taxa de Validação Baixa',
      description: 'Vision API com acurácia em 87% (esperado >95%)',
      type: 'warning',
      timestamp: '2026-05-20 12:45'
    }
  ]

  const handleCircuitBreaker = () => {
    setCircuitBreakerActive(!circuitBreakerActive)
  }

  const handleApproveValidation = (id: string) => {
    setValidationQueue(validationQueue.filter(v => v.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Centro de Comando - Hub Operacional</h2>
        <p className="text-green-100">Gestão e auditoria do ecossistema SMART-CAO</p>
        <p className="text-green-100 text-sm mt-2">👤 Auditor Responsável: <strong>Prof. Eduardo Palmeira</strong></p>
      </div>

      {/* Circuit Breaker */}
      <div className={`rounded-lg shadow p-6 ${circuitBreakerActive ? 'bg-red-50 border-2 border-red-500' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Circuit Breaker - Bloqueio Emergencial
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {circuitBreakerActive 
                ? '🔴 ATIVO - Sistema em bloqueio emergencial'
                : '🟢 INATIVO - Sistema operando normalmente'}
            </p>
          </div>
          <button
            onClick={handleCircuitBreaker}
            className={`px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 ${
              circuitBreakerActive
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {circuitBreakerActive ? (
              <>
                <Lock className="w-5 h-5" />
                Desativar
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Ativar
              </>
            )}
          </button>
        </div>
        {circuitBreakerActive && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-800 text-sm">
            ⚠️ <strong>Aviso:</strong> O Circuit Breaker está ativo. Todas as operações de minting e emissão de tokens foram bloqueadas.
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(systemStatus).map(([service, status]) => (
          <div key={service} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm capitalize">{service.replace(/([A-Z])/g, ' $1')}</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-xs font-medium text-green-600">Operacional</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Alertas de Conformidade
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-6 ${alert.type === 'critical' ? 'bg-red-50' : 'bg-yellow-50'}`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${alert.type === 'critical' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                  {alert.type === 'critical' ? (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{alert.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                  <p className="text-gray-500 text-xs mt-2">{alert.timestamp}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  alert.type === 'critical' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                }`}>
                  {alert.type === 'critical' ? 'Crítico' : 'Aviso'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Queue */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Fila de Validação - Vision API
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Validação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agricultor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ação</th>
              </tr>
            </thead>
            <tbody>
              {validationQueue.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-blue-600">{item.token}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.farmer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.type}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.priority === 'Alta' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Processando'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleApproveValidation(item.id)}
                      className="text-green-600 hover:text-green-900 font-medium"
                    >
                      Aprovar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">ℹ️ Sobre o Hub Operacional</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>✓ Gerenciamento centralizado de todas as operações</li>
          <li>✓ Monitoramento em tempo real de validações</li>
          <li>✓ Controle de emergência (Circuit Breaker) para bloqueio rápido</li>
          <li>✓ Alertas de conformidade com CAR, ZARC e MCR</li>
          <li>✓ Auditoria completa por Prof. Eduardo Palmeira</li>
        </ul>
      </div>
    </div>
  )
}

export default HubOperacional
