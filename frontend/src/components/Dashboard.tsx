import React from 'react'
import { TrendingUp, Users, AlertCircle, Zap } from 'lucide-react'

function Dashboard() {
  const kpis = [
    {
      title: 'NFTs Emitidos',
      value: '1,248',
      change: '+12.5%',
      icon: Zap,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Volume Antecipado',
      value: 'R$ 2.3M',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Agricultores',
      value: '456',
      change: '+24 este mês',
      icon: Users,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Alertas Ativos',
      value: '7',
      change: '3 críticos',
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600'
    }
  ]

  const recentTokens = [
    { id: 'CAB-089', farmer: 'João Silva', area: '12.5 ha', status: 'Validado', date: '2026-05-20' },
    { id: 'CAB-088', farmer: 'Maria Santos', area: '8.3 ha', status: 'Pendente', date: '2026-05-19' },
    { id: 'CAB-087', farmer: 'Pedro Oliveira', area: '15.2 ha', status: 'Validado', date: '2026-05-18' },
    { id: 'CAB-086', farmer: 'Ana Costa', area: '10.1 ha', status: 'Alerta', date: '2026-05-17' },
  ]

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <p className="text-xs text-green-600 mt-2">{kpi.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg flex items-end justify-around p-4">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-8 bg-gradient-to-t from-green-500 to-teal-400 rounded-t"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600">Total Emitido</span>
              <span className="font-semibold text-green-600">1,248</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600">Validados</span>
              <span className="font-semibold text-green-600">1,089</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600">Pendentes</span>
              <span className="font-semibold text-yellow-600">123</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Com Alerta</span>
              <span className="font-semibold text-red-600">36</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tokens Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tokens Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agricultor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Área</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentTokens.map((token, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{token.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{token.farmer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{token.area}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        token.status === 'Validado'
                          ? 'bg-green-100 text-green-800'
                          : token.status === 'Pendente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {token.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{token.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
