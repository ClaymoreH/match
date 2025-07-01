"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { User, Building2 } from "lucide-react"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"candidate" | "company">("candidate")

  return (
    <>
      <Preloader />
      <Header />

      <main>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-20 w-20 flex items-center justify-center">
                <Image
                  src="/assets/img/logo/Matchjobslogo.png"
                  alt="MatchJobs"
                  width={80}
                  height={80}
                  className="h-auto"
                />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Criar nova conta</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Ou{" "}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  faça login na sua conta existente
                </Link>
              </p>
            </div>

            {/* User Type Selection */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType("candidate")}
                  className={`relative rounded-lg p-4 border-2 transition-all ${
                    userType === "candidate"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <User size={32} />
                    <span className="font-medium">Candidato</span>
                    <span className="text-xs text-center">Buscar vagas e oportunidades</span>
                  </div>
                  {userType === "candidate" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setUserType("company")}
                  className={`relative rounded-lg p-4 border-2 transition-all ${
                    userType === "company"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Building2 size={32} />
                    <span className="font-medium">Empresa</span>
                    <span className="text-xs text-center">Publicar vagas e contratar</span>
                  </div>
                  {userType === "company" && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            <form className="mt-8 space-y-6">
              {userType === "candidate" ? (
                // Candidate Form
                <div className="space-y-4">
                  <div>
                    <label htmlFor="candidate-name" className="block text-sm font-medium text-gray-700">
                      Nome completo
                    </label>
                    <input
                      id="candidate-name"
                      name="name"
                      type="text"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="candidate-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-phone" className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      id="candidate-phone"
                      name="phone"
                      type="tel"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-city" className="block text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <input
                      id="candidate-city"
                      name="city"
                      type="text"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="São Paulo, SP"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-password" className="block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <input
                      id="candidate-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Mínimo 8 caracteres"
                    />
                  </div>

                  <div>
                    <label htmlFor="candidate-confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirmar senha
                    </label>
                    <input
                      id="candidate-confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Confirme sua senha"
                    />
                  </div>
                </div>
              ) : (
                // Company Form
                <div className="space-y-4">
                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                      Nome da empresa
                    </label>
                    <input
                      id="company-name"
                      name="companyName"
                      type="text"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Nome da sua empresa"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-cnpj" className="block text-sm font-medium text-gray-700">
                      CNPJ
                    </label>
                    <input
                      id="company-cnpj"
                      name="cnpj"
                      type="text"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-email" className="block text-sm font-medium text-gray-700">
                      Email corporativo
                    </label>
                    <input
                      id="company-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="contato@empresa.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-phone" className="block text-sm font-medium text-gray-700">
                      Telefone da empresa
                    </label>
                    <input
                      id="company-phone"
                      name="phone"
                      type="tel"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="(11) 3333-3333"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">
                      Tamanho da empresa
                    </label>
                    <select
                      id="company-size"
                      name="companySize"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Selecione o tamanho</option>
                      <option value="1-10">1-10 funcionários</option>
                      <option value="11-50">11-50 funcionários</option>
                      <option value="51-200">51-200 funcionários</option>
                      <option value="201-500">201-500 funcionários</option>
                      <option value="500+">Mais de 500 funcionários</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="company-password" className="block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <input
                      id="company-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Mínimo 8 caracteres"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirmar senha
                    </label>
                    <input
                      id="company-confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Confirme sua senha"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                  Concordo com os{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Termos de Uso
                  </a>{" "}
                  e{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Política de Privacidade
                  </a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {userType === "candidate" ? "Criar conta como Candidato" : "Criar conta como Empresa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
