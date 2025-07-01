"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function CandidateAnalysis() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Análise Comportamental</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Candidato</span>
          <span>›</span>
          <span>Análise Comportamental</span>
        </nav>
      </div>

      {/* Main Profile Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Perfil: Analítico</h2>
                <p className="text-blue-100">Pensamento lógico, foco em dados e solução de problemas complexos.</p>
              </div>
            </div>
            <Badge className="bg-white text-blue-600 px-4 py-2">Alta Aderência a Cargos Técnicos</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Chart and Characteristics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle>Distribuição de Traços</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Gráfico Radar - Chart.js</p>
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Highlights */}
        <Card>
          <CardHeader className="bg-gray-100">
            <CardTitle className="text-gray-900">Destaques Comportamentais</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">
              O perfil <strong>Analítico</strong> caracteriza-se pela busca por precisão, foco em dados e tomada de
              decisões fundamentadas. Pessoas com esse perfil tendem a ser detalhistas, metódicas e gostam de ambientes
              estruturados, valorizando a lógica e o planejamento.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Comunicação: clara, lógica e objetiva.</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                <span className="text-sm">Decisão: baseada em evidências.</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">Relacionamento: reservado, mas eficaz.</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <span className="text-sm">Ambiente ideal: com estrutura e processos definidos.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions Timeline */}
      <Card>
        <CardHeader className="bg-gray-600 text-white">
          <CardTitle>Sugestões com base na análise</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-blue-600 rounded-full mt-1"></div>
              <div>
                <h4 className="font-semibold">Posições sugeridas:</h4>
                <p className="text-gray-600">
                  Analista de Dados, Desenvolvedor Back-end, Engenheiro de Qualidade de Software.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full mt-1"></div>
              <div>
                <h4 className="font-semibold">Dica para se destacar:</h4>
                <p className="text-gray-600">
                  Fortalecer habilidades de apresentação pode ampliar sua capacidade de influência.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-cyan-600 rounded-full mt-1"></div>
              <div>
                <h4 className="font-semibold">Áreas de desenvolvimento:</h4>
                <p className="text-gray-600">Adaptação a ambientes dinâmicos e com menos controle.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Link href="/dashboard/candidate/analysis/edit">
          <Button size="lg" className="px-8">
            <RefreshCw className="w-5 h-5 mr-2" />
            Refazer Análise Comportamental
          </Button>
        </Link>
      </div>
    </div>
  )
}
