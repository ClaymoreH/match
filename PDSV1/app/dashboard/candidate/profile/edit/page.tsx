"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Camera, Plus, Edit, Trash2, ArrowLeft, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CandidateProfileEdit() {
  const [currentTab, setCurrentTab] = useState("info")
  const [profileCompletion] = useState(65)

  const tabs = ["info", "experience", "education", "skills"]
  const currentTabIndex = tabs.indexOf(currentTab)

  const handleNext = () => {
    if (currentTabIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentTabIndex + 1])
    }
  }

  const handlePrevious = () => {
    if (currentTabIndex > 0) {
      setCurrentTab(tabs[currentTabIndex - 1])
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Perfil do Candidato</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Candidato</span>
          <span>›</span>
          <span>Editar Perfil</span>
        </nav>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Meu Perfil</CardTitle>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Completo: {profileCompletion}%</span>
              <Progress value={profileCompletion} className="w-32" />
            </div>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="experience">Experiência</TabsTrigger>
              <TabsTrigger value="education">Formação</TabsTrigger>
              <TabsTrigger value="skills">Habilidades</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs value={currentTab}>
            {/* Personal Information Tab */}
            <TabsContent value="info" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Image
                      src="/assets/img/sauro.jpg"
                      alt="Profile"
                      width={120}
                      height={120}
                      className="rounded-full"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                      <Camera size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Formatos: JPG, PNG (Máx. 1MB)</p>
                  <Button variant="link" className="text-red-600 text-sm">
                    Remover foto
                  </Button>
                </div>

                <div className="md:col-span-3 space-y-4">
                  <h3 className="text-lg font-semibold">Informações Básicas</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Nome Completo *</Label>
                      <Input id="fullName" placeholder="Digite seu nome completo" />
                    </div>
                    <div>
                      <Label htmlFor="birthDate">Data de Nascimento *</Label>
                      <Input id="birthDate" type="date" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gênero</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Feminino</SelectItem>
                          <SelectItem value="male">Masculino</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefiro não dizer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" type="email" placeholder="exemplo@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input id="phone" placeholder="(XX) XXXXX-XXXX" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua, número, complemento" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Cidade" />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="about">Sobre mim</Label>
                    <Textarea id="about" rows={3} placeholder="Fale um pouco sobre você..." />
                    <p className="text-sm text-gray-500 mt-1">Máximo 500 caracteres</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Experiência Profissional</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Experiência
                </Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Desenvolvedor Front-end Sênior",
                    company: "Empresa XYZ",
                    period: "Jan 2020 - Presente (3 anos)",
                    description:
                      "Desenvolvimento de interfaces web utilizando React.js, Vue.js e tecnologias relacionadas.",
                  },
                  {
                    title: "Desenvolvedor Front-end Pleno",
                    company: "Empresa ABC",
                    period: "Mar 2017 - Dez 2019 (2 anos 9 meses)",
                    description: "Desenvolvimento de aplicações web responsivas utilizando HTML5, CSS3 e JavaScript.",
                  },
                ].map((experience, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{experience.title}</h4>
                          <p className="text-blue-600">{experience.company}</p>
                          <p className="text-sm text-gray-500">{experience.period}</p>
                          <p className="text-sm text-gray-600 mt-2">{experience.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Formação Acadêmica</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Formação
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Bacharelado em Ciência da Computação</h4>
                      <p className="text-blue-600">Universidade Federal</p>
                      <p className="text-sm text-gray-500">Concluído em 2016</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Cursos Complementares</h3>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Curso
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Curso</th>
                        <th className="text-left py-2">Instituição</th>
                        <th className="text-left py-2">Carga Horária</th>
                        <th className="text-left py-2">Ano</th>
                        <th className="text-left py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">React Avançado</td>
                        <td className="py-2">Alura</td>
                        <td className="py-2">40h</td>
                        <td className="py-2">2022</td>
                        <td className="py-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Habilidades Técnicas</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Adicionar Habilidades</Label>
                      <Input placeholder="Digite uma habilidade e pressione Enter" />
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Suas Habilidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "React", "HTML5", "CSS3", "Node.js", "Python"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center space-x-2">
                            <span>{skill}</span>
                            <button className="text-red-500 hover:text-red-700">
                              <Trash2 size={12} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Idiomas</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Inglês", level: "Fluente - TOEFL 580", progress: 80 },
                      { name: "Espanhol", level: "Intermediário", progress: 50 },
                    ].map((language, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold">{language.name}</h4>
                              <Progress value={language.progress} className="my-2" />
                              <p className="text-sm text-gray-600">{language.level}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button variant="outline" className="mt-4 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Idioma
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Documentos</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resume">Currículo (PDF) *</Label>
                    <Input id="resume" type="file" accept=".pdf" />
                    <p className="text-sm text-gray-500 mt-1">Tamanho máximo: 5MB</p>
                  </div>

                  <div>
                    <Label htmlFor="portfolio">Portfólio (Link)</Label>
                    <Input id="portfolio" type="url" placeholder="https://meuportfolio.com" />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/seu-perfil" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentTabIndex === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline">Cancelar</Button>
              {currentTabIndex === tabs.length - 1 ? (
                <Link href="/dashboard/candidate/profile">
                  <Button>
                    <Check className="w-4 h-4 mr-2" />
                    Finalizar Cadastro
                  </Button>
                </Link>
              ) : (
                <Button onClick={handleNext}>
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
