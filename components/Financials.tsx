'use client'

import { MasterSpec } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react'

interface FinancialsProps {
  data?: MasterSpec
  isLoading?: boolean
}

export default function Financials({ data, isLoading }: FinancialsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating financials...</p>
        </div>
      </div>
    )
  }

  if (!data?.financials) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>Financial projections will be generated after the master spec is complete</p>
      </Card>
    )
  }

  const { financials } = data

  // Calculate metrics
  const totalRevenue = financials.revenue_projections.reduce((sum, p) => sum + p.revenue, 0)
  const totalCosts = financials.revenue_projections.reduce((sum, p) => sum + p.costs, 0)
  const breakEvenMonth = financials.revenue_projections.findIndex(p => p.revenue > p.costs)

  // Prepare chart data
  const chartData = financials.revenue_projections.map(p => ({
    month: `M${p.month}`,
    Revenue: p.revenue,
    Costs: p.costs,
    Profit: p.revenue - p.costs
  }))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Startup Costs</CardTitle>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financials.startup_costs.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Burn</CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financials.monthly_burn.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Break-Even</CardTitle>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {breakEvenMonth >= 0 ? `Month ${breakEvenMonth + 1}` : 'TBD'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <Users className="w-4 h-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Projected ({financials.revenue_projections.length} months)</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue vs Costs Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Cost Projections</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Revenue" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
              <Line 
                type="monotone" 
                dataKey="Costs" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Profit Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Profit/Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend />
              <Bar 
                dataKey="Profit" 
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Month</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Revenue</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Costs</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {financials.revenue_projections.map((projection) => {
                  const profit = projection.revenue - projection.costs
                  return (
                    <tr key={projection.month} className="hover:bg-gray-50">
                      <td className="px-4 py-3">Month {projection.month}</td>
                      <td className="px-4 py-3 text-right text-green-600 font-medium">
                        ${projection.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right text-red-600 font-medium">
                        ${projection.costs.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${profit.toLocaleString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
