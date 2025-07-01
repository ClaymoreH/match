"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"

// Mock data for demonstration
const closedJobsData = [
  {
    id: "7",
    title: "Desenvolvedor Front-end",
    area: "Tecnologia",
    closedDate: "15/06/2025",
    status: "Encerrada",
    reason: "Posição preenchida",
  },
  {
    id: "8",
    title: "Designer UI/UX",
    area: "Design",
    closedDate: "02/06/2025",
    status: "Encerrada",
    reason: "Posição preenchida",
  },
  {
    id: "9",
    title: "Analista de RH",
    area: "Recursos Humanos",
    closedDate: "28/05/2025",
    status: "Encerrada",
    reason: "Cancelada pela empresa",
  },
  {
    id: "10",
    title: "Gerente de Vendas",
    area: "Comercial",
    closedDate: "20/05/2025",
    status: "Encerrada",
    reason: "Posição preenchida",
  },
  {
    id: "11",
    title: "Analista Financeiro",
    area: "Financeiro",
    closedDate: "15/05/2025",
    status: "Encerrada",
    reason: "Posição preenchida",
  },
  {
    id: "12",
    title: "Coordenador de TI",
    area: "Tecnologia",
    closedDate: "10/05/2025",
    status: "Encerrada",
    reason: "Cancelada pela empresa",
  },
  {
    id: "13",
    title: "Especialista em SEO",
    area: "Marketing",
    closedDate: "05/05/2025",
    status: "Encerrada",
    reason: "Posição preenchida",
  },
  {
    id: "14",
    title: "Desenvolvedor Mobile",
    area: "Tecnologia",
    closedDate: "01/05/2025",
    status: "Encerrada",
    reason: "Posição preenchida",
  },
]

export default function ClosedJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [areaFilter, setAreaFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("all")

  const filteredJobs = closedJobsData.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesArea = areaFilter === "all" || job.area === areaFilter
    const matchesMonth = monthFilter === "all" || job.closedDate.includes(monthFilter)
    return matchesSearch && matchesArea && matchesMonth
  })

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vagas Encerradas</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Vagas</span>
          <span>›</span>
          <span>Encerradas</span>
        </nav>
      </div>

      {/* Summary and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">
                Total de Vagas Encerradas: <span className="text-red-600">{filteredJobs.length}</span>
              </h2>
              <p className="text-sm text-gray-600">Vagas arquivadas ou encerradas nos últimos meses.</p>
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
                  <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
              <Select value={monthFilter} onValueChange={setMonthFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Todos os meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os meses</SelectItem>
                  <SelectItem value="06/2025">Junho 2025</SelectItem>
                  <SelectItem value="05/2025">Maio 2025</SelectItem>
                  <SelectItem value="04/2025">Abril 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Closed Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Vagas Encerradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Cargo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Área</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Data de Encerramento</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Motivo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{job.title}</td>
                    <td className="py-3 px-4">{job.area}</td>
                    <td className="py-3 px-4">{job.closedDate}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{job.reason}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{job.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
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
