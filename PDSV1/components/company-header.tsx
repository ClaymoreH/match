"use client"

import { Bell, User } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function CompanyHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-semibold">Você tem 3 notificações</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              <DropdownMenuItem className="p-3 border-b">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Nova candidatura para "Dev Front-End"</p>
                    <p className="text-xs text-gray-500">5 min atrás</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 border-b">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Processo de UX Designer foi finalizado</p>
                    <p className="text-xs text-gray-500">1 hora atrás</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Vaga de Marketing sem atualização há 7 dias</p>
                    <p className="text-xs text-gray-500">Ontem</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600">Olá,</p>
                <p className="text-sm font-semibold">Acme RH</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="p-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Acme RH</h4>
                  <p className="text-sm text-gray-600">rh@acme.com.br</p>
                  <Link href="/dashboard/company" className="text-xs text-blue-600 hover:underline">
                    Ver Perfil da Empresa
                  </Link>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="w-full">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
