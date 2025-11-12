"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Shield } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("admin@squadron375.mil")
  const [password, setPassword] = useState("password")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Sư đoàn Phòng không 375</h1>
          <p className="text-muted-foreground">Hệ thống Quản lý</p>
        </div>

        {/* Login Form */}
        <div className="military-card p-8 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email/Tên đăng nhập</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                placeholder="user@squadron375.mil"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-sm text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full military-btn font-semibold disabled:opacity-50"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Demo Account:</p>
            <p>Email: admin@squadron375.mil</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  )
}
