"use client"

import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      toast.success("تم إرسال رسالتك بنجاح!")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      toast.error("حدث خطأ أثناء الإرسال، حاول مرة أخرى.")
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">تواصل معنا</h2>
          <p className="text-gray-600 dark:text-gray-400">
            هل لديك استفسار؟ نحن هنا للمساعدة. أرسل لنا رسالة وسنعاود الاتصال بك قريبًا.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Phone className="text-easyoft-sky" />
              <div>
                <p className="font-medium">رقم الهاتف</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+20 100 123 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-easyoft-sky" />
              <div>
                <p className="font-medium">البريد الإلكتروني</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">info@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-easyoft-sky" />
              <div>
                <p className="font-medium">العنوان</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">123 شارع، القاهرة، مصر</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-easyoft-sky" />
              <div>
                <p className="font-medium">ساعات العمل</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">الأحد - الخميس: 9 صباحًا - 5 مساءً</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              id="name"
              placeholder="الاسم الكامل"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              id="email"
              type="email"
              placeholder="البريد الإلكتروني"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              id="phone"
              placeholder="رقم الهاتف"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              id="subject"
              placeholder="الموضوع"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <Textarea
            id="message"
            placeholder="اكتب رسالتك هنا"
            className="min-h-[120px]"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="flex gap-2 items-center">
            <Send className="w-4 h-4" />
            إرسال الرسالة
          </Button>
        </form>
      </div>
    </section>
  )
}
