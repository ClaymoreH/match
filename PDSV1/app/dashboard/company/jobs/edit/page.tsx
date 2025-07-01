"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"

export default function JobEditPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditing = searchParams.get("id") !== null

  const [stages, setStages] = useState(["Triagem", "Teste Técnico", "Entrevista", "Finalistas"])
  const [questions, setQuestions] = useState(["Por que você quer trabalhar conosco?", "Qual sua pretensão salarial?"])

  const addStage = () => {
    setStages([...stages, "Nova Etapa"])
  }

  const removeStage = (index: number) => {
    setStages(stages.filter((_, i) => i !== index))
  }

  const updateStage = (index: number, value: string) => {
    const newStages = [...stages]
    newStages[index] = value
    setStages(newStages)
  }

  const addQuestion = () => {
    setQuestions([...questions, "Nova Pergunta"])
  }

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
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
            <h1 className="text-2xl font-bold text-gray-900">{isEditing ? "Editar Vaga" : "Nova Vaga"}</h1>
            <nav className="flex space-x-2 text-sm text-gray-600 mt-1">
              <span>Vagas</span>
              <span>›</span>
              <span>{isEditing ? "Editar" : "Nova"}</span>
            </nav>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Job Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">Informações da Vaga</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="title">Título da Vaga</Label>
                <Input
                  id="title"
                  placeholder="Ex: Analista de Dados Senior"
                  defaultValue={isEditing ? "Desenvolvedor Full Stack" : ""}
                />
              </div>
              <div>
                <Label htmlFor="area">Área</Label>
                <Select defaultValue={isEditing ? "Tecnologia" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contract">Tipo de Contrato</Label>
                <Select defaultValue={isEditing ? "CLT" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLT">CLT</SelectItem>
                    <SelectItem value="PJ">PJ</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Estágio">Estágio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="workModel">Modelo de Trabalho</Label>
                <Select defaultValue={isEditing ? "Híbrido" : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Remoto">Remoto</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" placeholder="São Paulo" defaultValue={isEditing ? "São Paulo" : ""} />
              </div>
              <div>
                <Label htmlFor="salary">Salário</Label>
                <Input id="salary" placeholder="R$ 6.000,00" defaultValue={isEditing ? "R$ 6.500,00" : ""} />
              </div>
              <div>
                <Label htmlFor="vacancies">Qtd. de Vagas</Label>
                <Input id="vacancies" type="number" placeholder="1" defaultValue={isEditing ? "1" : ""} />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descrição da Vaga</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Descreva os objetivos e responsabilidades do cargo..."
                defaultValue={isEditing ? "Buscamos profissional com experiência em desenvolvimento full stack..." : ""}
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requisitos</Label>
              <Textarea
                id="requirements"
                rows={3}
                placeholder="Liste os conhecimentos, experiências e habilidades..."
                defaultValue={isEditing ? "Experiência com React, Node.js, TypeScript..." : ""}
              />
            </div>
          </CardContent>
        </Card>

        {/* Selection Process Stages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-blue-600">Etapas do Processo Seletivo</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addStage}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Etapa</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stages.map((stage, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <Input
                    value={stage}
                    onChange={(e) => updateStage(index, e.target.value)}
                    className="text-center mb-3"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeStage(index)}
                    className="w-full flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remover</span>
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">Clique para editar o nome. Etapas devem estar em ordem lógica.</p>
          </CardContent>
        </Card>

        {/* Custom Questions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-gray-800">Perguntas Personalizadas</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addQuestion}
              className="flex items-center space-x-2 bg-transparent"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Pergunta</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input value={question} onChange={(e) => updateQuestion(index, e.target.value)} className="flex-1" />
                <Button type="button" variant="destructive" size="sm" onClick={() => removeQuestion(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/company/jobs/open")}>
            Cancelar
          </Button>
          <Button type="submit" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>{isEditing ? "Salvar Alterações" : "Criar Vaga"}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
