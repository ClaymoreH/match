"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, UserCheck, UserX } from "lucide-react"

// Mock data for demonstration
const jobData = {
  id: "1",
  title: "Desenvolvedor Full Stack",
  area: "Tecnologia",
  type: "CLT",
  status: "Ativa",
  salary: "R$ 6.500,00",
  description:
    "Buscamos profissional com experiência em desenvolvimento full stack, com domínio em React e Node.js, para atuar em projetos inovadores.",
  requirements: "Experiência com React, Node.js, TypeScript, bancos de dados relacionais e não relacionais.",
  workModel: "Híbrido",
  city: "São Paulo",
  vacancies: 1,
  stages: ["Triagem", "Teste Técnico", "Entrevista", "Finalistas"],
}

const candidatesData = {
  Triagem: [
    { id: 1, name: "Maria Silva", evaluation: "Alta", resume: "#", status: "ativo" },
    { id: 2, name: "João Pereira", evaluation: "Média", resume: "#", status: "ativo" },
    { id: 3, name: "Ana Costa", evaluation: "Alta", resume: "#", status: "ativo" },
    { id: 4, name: "Pedro Santos", evaluation: "Baixa", resume: "#", status: "ativo" },
  ],
  "Teste Técnico": [{ id: 5, name: "Paula Souza", evaluation: "Alta", resume: "#", status: "ativo" }],
  Entrevista: [
    { id: 6, name: "Joana Silva", evaluation: "Alta", resume: "#", status: "ativo" },
    { id: 7, name: "Marcos Pereira", evaluation: "Média", resume: "#", status: "ativo" },
  ],
  Finalistas: [],
}

export default function JobVisualizerPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedStage, setSelectedStage] = useState("Triagem")

  const currentCandidates = candidatesData[selectedStage as keyof typeof candidatesData] || []
  const currentStageIndex = jobData.stages.indexOf(selectedStage)
  const nextStage = jobData.stages[currentStageIndex + 1]

  const getEvaluationColor = (evaluation: string) => {
    switch (evaluation) {
      case "Alta":
        return "bg-green-100 text-green-800"
      case "Média":
        return "bg-yellow-100 text-yellow-800"
      case "Baixa":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStageCount = (stage: string) => {
    return candidatesData[stage as keyof typeof candidatesData]?.length || 0
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => router.back()} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visualizar Vaga</h1>
            <nav className="flex space-x-2 text-sm text-gray-600 mt-1">
              <span>Vagas</span>
              <span>›</span>
              <span>Detalhes</span>
            </nav>
          </div>
        </div>
        <Button asChild>
          <a href={`/dashboard/company/jobs/edit?id=${params.id}`}>Editar Vaga</a>
        </Button>
      </div>

      {/* Job Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{jobData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Área:</span>
              <p className="text-sm">{jobData.area}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Tipo:</span>
              <p className="text-sm">{jobData.type}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Status:</span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{jobData.status}</Badge>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Salário:</span>
              <p className="text-sm">{jobData.salary}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Descrição:</span>
              <p className="text-sm text-gray-700 mt-1">{jobData.description}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Requisitos:</span>
              <p className="text-sm text-gray-700 mt-1">{jobData.requirements}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection Process Stages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">Etapas do Processo Seletivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {jobData.stages.map((stage) => (
              <div
                key={stage}
                onClick={() => setSelectedStage(stage)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedStage === stage ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-center">
                  <h3 className="font-medium text-sm">{stage}</h3>
                  <p className="text-xs text-gray-600 mt-1">{getStageCount(stage)} candidatos</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Candidatos: Etapa de {selectedStage}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentCandidates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Nenhum candidato nesta etapa.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nome</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Currículo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Avaliação</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{candidate.name}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                          <FileText className="w-3 h-3" />
                          <span>Ver</span>
                        </Button>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getEvaluationColor(candidate.evaluation)}>{candidate.evaluation}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          {nextStage && (
                            <Button size="sm" className="flex items-center space-x-1">
                              <UserCheck className="w-3 h-3" />
                              <span>Mover para {nextStage}</span>
                            </Button>
                          )}
                          <Button variant="destructive" size="sm" className="flex items-center space-x-1">
                            <UserX className="w-3 h-3" />
                            <span>Desclassificar</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-center mt-4">
            <Button variant="outline" size="sm">
              Mostrar todos os candidatos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
