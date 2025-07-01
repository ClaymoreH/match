"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Mail, Phone, MapPin, Edit, Share2, Linkedin, Github, Twitter } from "lucide-react"

export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Perfil do Candidato</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Candidato</span>
          <span>›</span>
          <span>Visão Geral</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <div className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg"></div>
            <CardContent className="p-6 text-center -mt-10">
              <div className="relative inline-block">
                <Image
                  src="/assets/img/sauro.jpg"
                  alt="Enzo Gabriel"
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">Enzo Gabriel</h3>
              <p className="text-gray-600 mb-4">Desenvolvedor Full Stack</p>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>enzogabriel@email.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>(11) 91234-5678</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>São Paulo, SP</span>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mt-4">
                <Button size="sm" variant="outline" className="p-2 bg-transparent">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-2 bg-transparent">
                  <Github className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="p-2 bg-transparent">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex space-x-2 mt-6">
                <Link href="/dashboard/candidate/profile/edit" className="flex-1">
                  <Button size="sm" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </Link>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="experience">Experiência</TabsTrigger>
                  <TabsTrigger value="behavior">Perfil Comportamental</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab}>
                {/* About Tab */}
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Resumo Profissional</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Desenvolvedora Full Stack com 5 anos de experiência em criação de aplicações web responsivas e
                      escaláveis. Especializada em JavaScript (React, Node.js) e Python (Django), com sólidos
                      conhecimentos em arquitetura de software, bancos de dados relacionais e metodologias ágeis.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education */}
                    <div>
                      <h4 className="font-semibold mb-3">Educação</h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium">Bacharelado em Ciência da Computação</h5>
                          <p className="text-sm text-gray-600">Universidade Federal XYZ</p>
                          <p className="text-xs text-gray-500">2017 - 2021</p>
                        </div>
                        <div>
                          <h5 className="font-medium">Pós-graduação em Engenharia de Software</h5>
                          <p className="text-sm text-gray-600">Instituto Tecnológico ABC</p>
                          <p className="text-xs text-gray-500">2022 - 2023</p>
                        </div>
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-semibold mb-3">Idiomas</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Português</span>
                            <span className="text-sm">Nativo</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Inglês</span>
                            <span className="text-sm">Avançado</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Espanhol</span>
                            <span className="text-sm">Intermediário</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Technical Skills */}
                    <div>
                      <h4 className="font-semibold mb-3">Conhecimentos</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "HTML5/CSS3",
                          "JavaScript (ES6+)",
                          "React.js",
                          "Node.js",
                          "Python",
                          "Django",
                          "REST APIs",
                          "Git/GitHub",
                          "SQL/NoSQL",
                          "Docker",
                        ].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Soft Skills */}
                    <div>
                      <h4 className="font-semibold mb-3">Habilidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Trabalho em equipe",
                          "Comunicação",
                          "Resolução de problemas",
                          "Gestão de tempo",
                          "Adaptabilidade",
                          "Pensamento crítico",
                        ].map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="space-y-6">
                  <h3 className="text-lg font-semibold">Experiência Profissional</h3>

                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-blue-600">Desenvolvedora Full Stack Sênior</h4>
                      <p className="font-medium">TechVision Solutions</p>
                      <p className="text-sm text-gray-500 mb-2">2022 - Presente</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Liderança técnica de equipe de 5 desenvolvedores</li>
                        <li>• Arquitetura e implementação de sistemas escaláveis</li>
                        <li>• Migração de aplicações legadas para microserviços</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-gray-400 pl-4">
                      <h4 className="font-semibold text-gray-600">Desenvolvedora Front-end Pleno</h4>
                      <p className="font-medium">Digital Innovation Ltda</p>
                      <p className="text-sm text-gray-500 mb-2">2020 - 2022</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Desenvolvimento de interfaces com React.js</li>
                        <li>• Implementação de testes unitários e de integração</li>
                        <li>• Otimização de performance de aplicações web</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4">
                      <h4 className="font-semibold text-gray-500">Estagiária em Desenvolvimento</h4>
                      <p className="font-medium">StartUp Tech</p>
                      <p className="text-sm text-gray-500 mb-2">2019 - 2020</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Desenvolvimento de features em Django</li>
                        <li>• Manutenção de banco de dados PostgreSQL</li>
                        <li>• Participação em sprints ágeis</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                {/* Behavior Tab */}
                <TabsContent value="behavior" className="space-y-6">
                  <h3 className="text-lg font-semibold">Análise Comportamental</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Soft Skills</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Comunicação</span>
                          <Badge>9/10</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Trabalho em equipe</span>
                          <Badge>8/10</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Adaptabilidade</span>
                          <Badge>9/10</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Destaques Comportamentais</h4>
                      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Gráfico Radar - Chart.js</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Observações</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        Perfil analítico com forte tendência à estabilidade, demonstrando excelente capacidade de manter
                        o foco em ambientes organizados. Habilidade de comunicação acima da média, com potencial para
                        liderança situacional.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applications Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Vagas em Andamento</CardTitle>
            <Badge>3 candidaturas</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Vaga</th>
                  <th className="text-left py-2">Empresa</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    title: "Desenvolvedor Full Stack Pleno",
                    description: "React, Node.js, MongoDB",
                    company: "Tech Solutions Ltda",
                    status: "Em análise",
                    date: "15/05/2024",
                    statusColor: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    title: "Engenheiro de Software Python",
                    description: "Django, Flask, AWS",
                    company: "InovaTech S.A.",
                    status: "Processo seletivo",
                    date: "22/05/2024",
                    statusColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    title: "Front-end Developer",
                    description: "React, TypeScript, GraphQL",
                    company: "Digital Creative",
                    status: "Entrevista agendada",
                    date: "30/05/2024",
                    statusColor: "bg-green-100 text-green-800",
                  },
                ].map((application, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{application.title}</p>
                        <p className="text-sm text-gray-600">{application.description}</p>
                      </div>
                    </td>
                    <td className="py-3">{application.company}</td>
                    <td className="py-3">
                      <Badge className={application.statusColor}>{application.status}</Badge>
                    </td>
                    <td className="py-3">{application.date}</td>
                    <td className="py-3">
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">Ver todas as candidaturas</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
