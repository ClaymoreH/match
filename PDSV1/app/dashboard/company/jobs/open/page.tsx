"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Edit, X, Plus } from "lucide-react"

// Mock data for demonstration
const jobsData = [
  {
    id: "1",
    title: "Desenvolvedor Full Stack",
    area: "Tecnologia",
    openDate: "05/06/2025",
    status: "Ativa",
    candidates: 12,
  },
  {
    id: "2",
    title: "Analista de Dados",
    area: "BI",
    openDate: "01/06/2025",
    status: "Ativa",
    candidates: 8,
  },
  {
    id: "3",
    title: "Coordenador de Projetos",
    area: "PMO",
    openDate: "28/05/2025",
    status: "Ativa",
    candidates: 15,
  },
  {
    id: "4",
    title: "Designer UX/UI",
    area: "Design",
    openDate: "25/05/2025",
    status: "Ativa",
    candidates: 22,
  },
  {
    id: "5",
    title: "Analista de Marketing",
    area: "Marketing",
    openDate: "20/05/2025",
    status: "Ativa",
    candidates: 18,
  },
  {
    id: "6",
    title: "Desenvolvedor Backend",
    area: "Tecnologia",
    openDate: "15/05/2025",
    status: "Ativa",
    candidates: 9,
  },
]

export default function OpenJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [areaFilter, setAreaFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = areaFilter === "all" || job.area === areaFilter
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesArea && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vagas Abertas</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Vagas</span>
          <span>›</span>
          <span>Abertas</span>
        </nav>
      </div>

      {/* Summary and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">
                Total de Vagas Abertas: <span className="text-green-600">{filteredJobs.length}</span>
              </h2>
              <p className="text-sm text-gray-600">
                Essas vagas estão visíveis para os candidatos e recebendo aplicações.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                placeholder="Buscar por cargo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-48"
              />
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Todas as áreas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as áreas</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="BI">BI</SelectItem>
                  <SelectItem value="PMO">PMO</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Ativa">Ativa</SelectItem>
                  <SelectItem value="Pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Lista de Vagas Abertas</CardTitle>
          <Button asChild>
            <Link href="/dashboard/company/jobs/edit" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Adicionar Nova Vaga</span>
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Cargo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Área</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Data de Abertura</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Candidatos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{job.title}</td>
                    <td className="py-3 px-4">{job.area}</td>
                    <td className="py-3 px-4">{job.openDate}</td>
                    <td className="py-3 px-4">
                      <span className="text-blue-600 font-medium">{job.candidates}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{job.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex items-center space-x-1 bg-transparent"
                        >
                          <Link href={`/dashboard/company/jobs/${job.id}`}>
                            <Eye className="w-3 h-3" />
                            <span>Ver</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex items-center space-x-1 bg-transparent"
                        >
                          <Link href={`/dashboard/company/jobs/edit?id=${job.id}`}>
                            <Edit className="w-3 h-3" />
                            <span>Editar</span>
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm" className="flex items-center space-x-1">
                          <X className="w-3 h-3" />
                          <span>Encerrar</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhuma vaga encontrada com os filtros aplicados.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Próxima
              </Button>
            </nav>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
