"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { db } from "@/lib/db"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = await db.getUserByCredentials(email, password)

      if (user && user.role === "admin") {
        // Store admin session
        localStorage.setItem("adminUser", JSON.stringify(user))
        router.push("/admin/dashboard")
      } else {
        setError("بيانات تسجيل الدخول غير صحيحة")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-sky flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="bg-white rounded-full p-4 shadow-xl mx-auto w-20 h-20 flex items-center justify-center mb-4">
            <Image src="/easyoft-logo.png" alt="EASYoft" width={60} height={40} className="h-10 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-easyoft-navy mb-2">لوحة التحكم</h1>
          <p className="text-easyoft-darkBlue">تسجيل دخول المدير</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-slide-in">
          <CardHeader className="text-center pb-4">
            <div className="bg-gradient-to-r from-brand-primary to-easyoft-blue w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-xl text-easyoft-navy">تسجيل الدخول</CardTitle>
            <CardDescription className="text-easyoft-darkBlue">
              أدخل بيانات المدير للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50 animate-fade-in">
                  <AlertDescription className="text-red-700 text-center">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-easyoft-navy font-medium">
                  البريد الإلكتروني
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-easyoft-blue" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                    placeholder="admin@easyoft.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-easyoft-navy font-medium">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-easyoft-blue" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-easyoft-sky"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-easyoft-blue" />
                    ) : (
                      <Eye className="h-4 w-4 text-easyoft-blue" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    تسجيل الدخول
                    <Shield className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gradient-to-r from-easyoft-sky to-white rounded-lg border border-easyoft-blue/20">
              <p className="text-xs text-easyoft-darkBlue text-center mb-2 font-medium">بيانات تجريبية:</p>
              <div className="text-xs text-easyoft-blue space-y-1 text-center">
                <p>
                  البريد: <span className="font-mono bg-white px-2 py-1 rounded">admin</span>
                </p>
                <p>
                  كلمة المرور: <span className="font-mono bg-white px-2 py-1 rounded">admin123</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
