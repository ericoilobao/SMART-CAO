import React from 'react'
import { AlertTriangle, CheckCircle, AlertCircle, Lock } from 'lucide-react'

function HubOperacional() {
  const [circuitBreakerActive, setCircuitBreakerActive] = React.useState(false)

  const alerts = [
    {
      type: 'error',
      title: 'Divergência de Coordenadas GPS',
      description: 'Token #CAB-089 com scan fora do polígono do CAR',
      severity: 'Crítico'
    },
    {
      type: 'warning',
      title: 'Validação Pendente',
      description: 'Token #CAB-088 aguardando verificação de documentos',
      severity: 'Alto'
    },
    {
      type: 'info',
      title: 'Certificação Vencida',
      description: 'Token #CAB-076 com certificado ZARC expirado em 2025',
      severity: 'Médio'
    },
  ]

  const validationQueue = [
    { id: 'CAB-090', farmer: 'Carlos Mendes', score: 89, status: 'Pronto' },
    { id: 'CAB-089', farmer: 'João Silva', score: 45, status: 'Aguardando' },
    { id: 'CAB-088', farmer: 'Maria Santos', score: 72, status: 'Revisão' },
  ]

  return (
    <div className="space-y-8">
      {/* Circuit Breaker Alert */}
      {circuitBreakerActive && (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-center space-x-4">
          <Lock className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-red-900">CIRCUIT BREAKER ATIVADO</h3>
            <p className="text-red-700 text-sm">Sistema em modo de emergência. Novas emissões bloqueadas.</p>
          </div>
          <button
            onClick={() => setCircuitBreakerActive(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
          >
            Desativar
          </button>
        </div>
      )}

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Blockchain</p>
              <p className="text-lg font-bold text-green-600">Operacional</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Vision API</p>
              <p className="text-lg font-bold text-green-600">Conectado</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Database</p>
              <p className="text-lg font-bold text-yellow-600">Alerta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Control */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Controle de Emergência</h3>
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Auditor Responsável: <span className="font-bold text-gray-900">Prof. Eduardo Palmeira</span>
          </p>
          <button
            onClick={() => setCircuitBreakerActive(!circuitBreakerActive)}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition ${
              circuitBreakerActive
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {circuitBreakerActive ? '✓ DESATIVAR CIRCUIT BREAKER' : '⚠ ATIVAR CIRCUIT BREAKER'}
          </button>
          <p className="text-xs text-gray-500">
            Clique para {circuitBreakerActive ? 'retomar' : 'bloquear'} operações do sistema em caso de emergência
          </p>
        </div>
      </div>

      {/* Validation Queue */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Fila de Validação (Vision API)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agricultor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score IA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ação</th>
              </tr>
            </thead>
            <tbody>
              {validationQueue.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{item.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.farmer}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-gray-900 font-medium">{item.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === 'Pronto'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'Revisão'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-green-600 hover:text-green-800 font-medium">
                      {item.status === 'Pronto' ? 'Liberar' : 'Revisar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Alerts */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Alertas de Conformidade</h3>
          <p className="text-sm text-gray-600 mt-1">CAR, ZARC, MCR e validações regulatórias</p>
        </div>
        <div className="divide-y divide-gray-200">
          {alerts.map((alert, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {alert.type === 'error' ? (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{alert.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      alert.severity === 'Crítico'
                        ? 'bg-red-100 text-red-800'
                        : alert.severity === 'Alto'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HubOperacional
