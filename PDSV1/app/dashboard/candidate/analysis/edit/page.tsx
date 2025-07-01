"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CandidateAnalysisEdit() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const questions = [
    "Gosto de planejar tudo com antecedência.",
    "Sinto-me confortável ao tomar decisões rápidas.",
    "Prefiro seguir regras e procedimentos do que improvisar.",
    "Consigo trabalhar bem sob pressão ou em ambientes caóticos.",
    "Gosto de colaborar com outras pessoas e trocar ideias.",
    "Gosto de analisar problemas antes de tomar qualquer decisão.",
  ]

  const handleAnswerChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      alert("Análise enviada com sucesso!")
      router.push("/dashboard/candidate/analysis")
    }, 1000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Refazer Análise Comportamental</h1>
        <nav className="flex space-x-2 text-sm text-gray-600 mt-2">
          <span>Candidato</span>
          <span>›</span>
          <span>Refazer Análise</span>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle>Autoavaliação</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6">
              Avalie o quanto você se identifica com as afirmações abaixo, onde <strong>0</strong> significa "discordo
              totalmente" e <strong>5</strong> significa "concordo totalmente".
            </p>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <label className="block font-semibold text-gray-900">
                    {index + 1}. {question}
                  </label>
                  <div className="flex space-x-3">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex flex-col items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={value}
                          onChange={() => handleAnswerChange(index, value)}
                          className="sr-only"
                          required
                        />
                        <div
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-colors ${
                            answers[index] === value
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {value}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button type="submit" size="lg" className="px-8">
                <CheckCircle className="w-5 h-5 mr-2" />
                Enviar Respostas
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
