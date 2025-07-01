import Header from "@/components/header"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Entre na sua conta</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Ou{" "}
                <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                  crie uma nova conta
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Endereço de email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Entrar
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
