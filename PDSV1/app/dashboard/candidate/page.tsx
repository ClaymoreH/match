import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Briefcase, TrendingUp, Eye } from "lucide-react"

export default function CandidateDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard do Candidato</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Dashboard</span>
          <span>›</span>
          <span>Visão Geral</span>
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Candidaturas</p>
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
                <p className="text-sm font-medium text-gray-600">Entrevistas</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Perfil Visto</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Match</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Candidaturas Recentes</CardTitle>
            <Badge variant="secondary">3 ativas</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Desenvolvedor Full Stack Pleno",
                company: "Tech Solutions Ltda",
                status: "Em análise",
                date: "15/05/2024",
                statusColor: "bg-yellow-100 text-yellow-800",
              },
              {
                title: "Engenheiro de Software Python",
                company: "InovaTech S.A.",
                status: "Processo seletivo",
                date: "22/05/2024",
                statusColor: "bg-blue-100 text-blue-800",
              },
              {
                title: "Front-end Developer",
                company: "Digital Creative",
                status: "Entrevista agendada",
                date: "30/05/2024",
                statusColor: "bg-green-100 text-green-800",
              },
            ].map((application, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{application.title}</h4>
                  <p className="text-sm text-gray-600">{application.company}</p>
                  <p className="text-xs text-gray-500">Aplicado em: {application.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={application.statusColor}>{application.status}</Badge>
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">Ver todas as candidaturas</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Completar Perfil</h3>
            <p className="text-sm text-gray-600 mb-4">Aumente suas chances com um perfil completo</p>
            <Link href="/dashboard/candidate/profile/edit">
              <Button className="w-full">Editar Perfil</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Vagas Compatíveis</h3>
            <p className="text-sm text-gray-600 mb-4">Encontre vagas que combinam com você</p>
            <Link href="/dashboard/candidate/jobs/compatible">
              <Button className="w-full">Ver Vagas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Análise Comportamental</h3>
            <p className="text-sm text-gray-600 mb-4">Descubra seu perfil profissional</p>
            <Link href="/dashboard/candidate/analysis">
              <Button className="w-full">Ver Análise</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
