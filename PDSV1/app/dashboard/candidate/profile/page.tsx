"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  Share2,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import {
  getCurrentUserData,
  getCurrentUserCPF,
  type CandidateData,
} from "@/lib/storage";

export default function CandidateProfile() {
  const [activeTab, setActiveTab] = useState("about");
  const [candidateData, setCandidateData] = useState<CandidateData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidateData = () => {
      const data = getCurrentUserData();
      setCandidateData(data);
      setLoading(false);
    };

    loadCandidateData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!candidateData) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Perfil não encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            Complete seu cadastro para visualizar seu perfil.
          </p>
          <Link href="/dashboard/candidate/profile/edit">
            <Button>Completar Cadastro</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Perfil do Candidato
        </h1>
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
              <h3 className="text-xl font-bold text-gray-900 mt-4">
                {candidateData.personal.fullName || "Nome não informado"}
              </h3>
              <p className="text-gray-600 mb-4">
                {candidateData.experiences.length > 0
                  ? candidateData.experiences[0].title
                  : "Profissional"}
              </p>

              <div className="space-y-3 text-left">
                {candidateData.personal.email && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{candidateData.personal.email}</span>
                  </div>
                )}
                {candidateData.personal.phone && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>{candidateData.personal.phone}</span>
                  </div>
                )}
                {(candidateData.personal.city ||
                  candidateData.personal.state) && (
                  <div className="flex items-center space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>
                      {[
                        candidateData.personal.city,
                        candidateData.personal.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="p-2 bg-transparent"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-2 bg-transparent"
                >
                  <Github className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-2 bg-transparent"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex space-x-2 mt-6">
                <Link
                  href="/dashboard/candidate/profile/edit"
                  className="flex-1"
                >
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
                  <TabsTrigger value="behavior">
                    Perfil Comportamental
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent>
              <Tabs value={activeTab}>
                {/* About Tab */}
                <TabsContent value="about" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Resumo Profissional
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {candidateData.personal.about ||
                        "Nenhuma descrição pessoal adicionada ainda."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education */}
                    <div>
                      <h4 className="font-semibold mb-3">Educação</h4>
                      <div className="space-y-4">
                        {candidateData.education.length > 0 ? (
                          candidateData.education.map((edu) => (
                            <div key={edu.id}>
                              <h5 className="font-medium">{edu.degree}</h5>
                              <p className="text-sm text-gray-600">
                                {edu.institution}
                              </p>
                              <p className="text-xs text-gray-500">
                                {edu.completionYear}
                              </p>
                              {edu.description && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Nenhuma formação acadêmica adicionada.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-semibold mb-3">Idiomas</h4>
                      <div className="space-y-3">
                        {candidateData.languages.length > 0 ? (
                          candidateData.languages.map((language) => (
                            <div key={language.id}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">{language.name}</span>
                                <span className="text-sm">
                                  {language.level}
                                </span>
                              </div>
                              <Progress
                                value={language.proficiency}
                                className="h-2"
                              />
                              {language.certification && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {language.certification}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Nenhum idioma adicionado.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Technical Skills */}
                    <div>
                      <h4 className="font-semibold mb-3">Habilidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidateData.skills.technical.length > 0 ? (
                          candidateData.skills.technical.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Nenhuma habilidade adicionada.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Knowledge Skills */}
                    <div>
                      <h4 className="font-semibold mb-3">Conhecimentos</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidateData.skills.soft.length > 0 ? (
                          candidateData.skills.soft.map((knowledge) => (
                            <Badge key={knowledge} variant="outline">
                              {knowledge}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">
                            Nenhum conhecimento adicionado.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    Experiência Profissional
                  </h3>

                  <div className="space-y-6">
                    {candidateData.experiences.length > 0 ? (
                      candidateData.experiences.map((experience, index) => (
                        <div
                          key={experience.id}
                          className={`border-l-4 ${
                            index === 0
                              ? "border-blue-500"
                              : index === 1
                                ? "border-gray-400"
                                : "border-gray-300"
                          } pl-4`}
                        >
                          <h4
                            className={`font-semibold ${
                              index === 0
                                ? "text-blue-600"
                                : index === 1
                                  ? "text-gray-600"
                                  : "text-gray-500"
                            }`}
                          >
                            {experience.title}
                          </h4>
                          <p className="font-medium">{experience.company}</p>
                          <p className="text-sm text-gray-500 mb-2">
                            {experience.startDate} -{" "}
                            {experience.isCurrent
                              ? "Presente"
                              : experience.endDate}
                          </p>
                          {experience.description && (
                            <div className="text-sm text-gray-600">
                              {experience.description
                                .split("\n")
                                .map((line, i) => (
                                  <p key={i}>• {line}</p>
                                ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        Nenhuma experiência profissional adicionada ainda.
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Behavior Tab */}
                <TabsContent value="behavior" className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    Análise Comportamental
                  </h3>

                  {candidateData.behavioralAnalysis ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Perfil</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-600">
                              Perfil em branco - será gerado pela IA
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">
                            Resumo do Perfil
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-600">
                              Resumo em branco - será gerado pela IA
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">
                            Distribuição de Traços
                          </h4>
                          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">
                              Gráfico será gerado pela IA
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">
                            Destaques Comportamentais
                          </h4>
                          <div className="space-y-2">
                            <div className="bg-gray-50 rounded p-2">
                              <p className="text-gray-600">
                                Destaques serão gerados pela IA
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Descrição do Perfil
                        </h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-800">
                            Descrição detalhada será gerada pela IA baseada nas
                            respostas da análise comportamental.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Sugestões Baseadas
                        </h4>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-green-800">
                            Sugest��es personalizadas serão geradas pela IA para
                            desenvolvimento profissional.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">
                        Análise comportamental não realizada ainda.
                      </p>
                      <Link href="/dashboard/candidate/analysis/edit">
                        <Button>Fazer Análise Comportamental</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Applications Section */}
      <Card>
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
                        <p className="text-sm text-gray-600">
                          {application.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-3">{application.company}</td>
                    <td className="py-3">
                      <Badge className={application.statusColor}>
                        {application.status}
                      </Badge>
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
  );
}
