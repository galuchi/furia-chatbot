"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

// Tipos para as mensagens
type MessageType = {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function Home() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, text: "Fala, torcedor! Como posso ajudar você hoje?", sender: "bot" },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Função para rolar para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Função para enviar mensagem
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Adiciona mensagem do usuário
    const userMessage = { id: messages.length + 1, text: input, sender: "user" as const }
    setMessages((prev) => [...prev, userMessage])

    // Inicia o carregamento
    setIsLoading(true)

    try {
      // Envia a mensagem para a API
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Falha ao se comunicar com o bot")
      }

      const data = await response.json()

      // Adiciona a resposta do bot
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: data.response || "Desculpe, não consegui processar sua mensagem.",
          sender: "bot",
        },
      ])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      // Adiciona mensagem de erro
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente mais tarde.",
          sender: "bot",
        },
      ])
    } finally {
      setIsLoading(false)
      setInput("")
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      {/* Banner promocional */}
      <div className="w-full relative h-48 md:h-64 overflow-hidden animate-slide-in">
        <img src="/furia-banner.png" alt="FURIA Team" className="w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <h1 className="absolute bottom-4 left-4 text-2xl md:text-4xl font-bold text-white">
          CONVERSE COM O <span className="text-[#0085FF]">BOT DA FURIA</span>
        </h1>
      </div>

      {/* Container principal */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4 gap-6">
        {/* Área do chat */}
        <div className="flex-1 flex flex-col bg-zinc-900 rounded-lg shadow-lg overflow-hidden border border-zinc-800 animate-fade-in">
          {/* Cabeçalho do chat */}
          <div className="bg-zinc-800 p-4 border-b border-zinc-700">
            <h2 className="text-xl font-bold flex items-center">
              <span className="w-3 h-3 bg-[#0085FF] rounded-full mr-2 animate-pulse"></span>
              FURIA Bot
            </h2>
          </div>

          {/* Mensagens */}
          <div className="flex-1 p-4 overflow-y-auto max-h-[50vh] md:max-h-[60vh]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-[#0085FF] text-white rounded-tr-none"
                      : "bg-zinc-800 text-white rounded-tl-none"
                  } animate-pop-in`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensagem */}
          <form onSubmit={sendMessage} className="p-4 border-t border-zinc-700 bg-zinc-800">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 p-3 rounded-l-lg bg-zinc-700 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#0085FF] text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar com informações e redes sociais */}
        <div className="md:w-80 space-y-4">
          {/* Card de próximo jogo */}
          <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 animate-slide-in">
            <h3 className="text-xl font-bold mb-2 text-[#0085FF]">PRÓXIMO JOGO</h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <img src="/furia-small.svg" alt="FURIA" className="w-16 h-16 mx-auto" />
                <p className="font-bold">FURIA</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">VS</p>
                <p className="text-sm text-[#0085FF]">16:00</p>
              </div>
              <div className="text-center">
                <img src="/big-small.svg" alt="NAVI" className="w-16 h-16 mx-auto" />
                <p className="font-bold">BIG</p>
              </div>
            </div>
          </div>

          {/* Card de redes sociais */}
          <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 animate-slide-in">
            <h3 className="text-xl font-bold mb-2 text-[#0085FF]">SIGA A FURIA</h3>
            <div className="flex justify-between">
              <a href="#" className="text-white hover:text-[#0085FF] transition-colors">
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                  <span className="mt-1 text-sm">Twitter</span>
                </div>
              </a>
              <a href="#" className="text-white hover:text-[#0085FF] transition-colors">
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="mt-1 text-sm">Instagram</span>
                </div>
              </a>
              <a href="#" className="text-white hover:text-[#0085FF] transition-colors">
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <span className="mt-1 text-sm">YouTube</span>
                </div>
              </a>
            </div>
          </div>

          {/* Card de jogadores */}
          <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 animate-slide-in">
            <h3 className="text-xl font-bold mb-2 text-[#0085FF]">LINEUP</h3>
            <div className="grid grid-cols-3 gap-2">
              {["kscerato", "yuurih", "FalleN", "YEKINDAR", "molodoy"].map((player) => (
                <div key={player} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-full overflow-hidden">
                    <img
                      src={`/player-${player}.png`}
                      alt={player}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/player-placeholder.png"
                      }}
                    />
                  </div>
                  <p className="mt-1 text-sm font-bold">{player}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
