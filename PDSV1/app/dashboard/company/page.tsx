"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, CheckCircle, Clock, Building, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

export default function CompanyDashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Simple chart implementation using canvas
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

        // Draw simple line chart
        ctx.strokeStyle = "#007bff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(50, 100)
        ctx.lineTo(100, 80)
        ctx.lineTo(150, 90)
        ctx.lineTo(200, 70)
        ctx.lineTo(250, 60)
        ctx.lineTo(300, 75)
        ctx.stroke()

        // Draw second line
        ctx.strokeStyle = "#28a745"
        ctx.beginPath()
        ctx.moveTo(50, 120)
        ctx.lineTo(100, 110)
        ctx.lineTo(150, 100)
        ctx.lineTo(200, 95)
        ctx.lineTo(250, 85)
        ctx.lineTo(300, 90)
        ctx.stroke()
      }
    }
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral da Empresa</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Dashboard</span>
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vagas Abertas</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Candidatos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">87</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processos</p>
                <p className="text-2xl font-bold text-gray-900">5 em andamento</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contratações</p>
                <p className="text-2xl font-bold text-gray-900">3 este mês</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">Acme RH Soluções</p>
                  <p className="text-sm text-gray-600">CNPJ: 12.345.678/0001-90</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">São Luís, MA</p>
                  <p className="text-sm text-gray-600">Rua das Empresas, 123 - Centro</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">50-100 funcionários</p>
                  <p className="text-sm text-gray-600">Empresa de médio porte</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">Fundada em 2015</p>
                  <p className="text-sm text-gray-600">10 anos de mercado</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">Sobre a Empresa</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A Acme RH é uma empresa especializada em soluções de recursos humanos, oferecendo serviços de
                  recrutamento e seleção para empresas de diversos segmentos. Com mais de 10 anos de experiência no
                  mercado, nossa missão é conectar talentos às melhores oportunidades profissionais.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">Editar Perfil da Empresa</Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Gerenciar Usuários
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Configurações de Conta
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Vagas Publicadas</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Candidatos Recebidos</span>
                <span className="font-semibold">245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contratações Realizadas</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxa de Sucesso</span>
                <span className="font-semibold text-green-600">67%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chart and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Vagas x Candidatos (Últimos 6 meses)</CardTitle>
            </CardHeader>
            <CardContent>
              <canvas ref={chartRef} width={400} height={200} className="w-full h-48" />
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Vagas Abertas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Candidatos Aplicados</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    Vaga de <strong>Marketing Digital</strong> foi encerrada.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    Processo de <strong>UX Designer</strong> está parado há 10 dias.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    Descrição da vaga de <strong>Desenvolvedor Backend</strong> foi atualizada.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">
                    Etapa de entrevistas finalizadas para <strong>Gerente de Projetos</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Nova campanha de atração de talentos ativada.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
