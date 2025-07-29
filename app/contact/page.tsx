import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Users, Shield, Headphones } from "lucide-react"
import { db, type ContactPage, type ContactInfo } from "@/lib/db"

async function ContactContent() {
  let contactPage: ContactPage | null = null
  let contactInfo: ContactInfo | null = null

  try {
    ;[contactPage, contactInfo] = await Promise.all([db.getContactPage(), db.getContactInfo()])
  } catch (error) {
    console.error("Error loading contact data:", error)
  }

  const services = [
    {
      icon: Shield,
      title: "أنظمة الأمان",
      description: "تركيب وصيانة أنظمة الأمان المتطورة",
    },
    {
      icon: Users,
      title: "الاستشارات التقنية",
      description: "استشارات متخصصة في حلول التكنولوجيا الذكية",
    },
    {
      icon: Headphones,
      title: "الدعم الفني",
      description: "دعم فني متواصل على مدار الساعة",
    },
  ]

  const faqs = [
    {
      question: "ما هي مدة الضمان على المنتجات؟",
      answer: "نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية.",
    },
    {
      question: "هل تقدمون خدمة التركيب؟",
      answer: "نعم، لدينا فريق متخصص لتركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة.",
    },
    {
      question: "كم يستغرق وقت التسليم؟",
      answer: "عادة ما يتم التسليم خلال 3-5 أيام عمل داخل المدن الرئيسية.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-lightBlue/20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-easyoft-navy/90 to-easyoft-darkBlue/90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-brand-primary/20 text-brand-primary border-brand-primary/30 hover:bg-brand-primary/30">
              <MessageCircle className="w-4 h-4 ml-2" />
              {contactPage?.hero_subtitle || "نحن هنا لمساعدتك"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-easyoft-lightBlue bg-clip-text text-transparent">
              {contactPage?.hero_title || "تواصل معنا"}
            </h1>
            <p className="text-xl text-easyoft-lightBlue max-w-2xl mx-auto leading-relaxed">
              {contactPage?.hero_description || "لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة"}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-easyoft-navy mb-2">
                  {contactPage?.form_title || "أرسل لنا رسالة"}
                </CardTitle>
                <CardDescription className="text-lg text-easyoft-darkBlue">
                  {contactPage?.form_subtitle || "سنقوم بالرد عليك في أقرب وقت ممكن"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-easyoft-navy font-medium">
                        الاسم الكامل
                      </Label>
                      <Input
                        id="name"
                        placeholder="أدخل اسمك الكامل"
                        className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-easyoft-navy font-medium">
                        البريد الإلكتروني
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-easyoft-navy font-medium">
                        رقم الهاتف
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+966 50 123 4567"
                        className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-easyoft-navy font-medium">
                        الموضوع
                      </Label>
                      <Input
                        id="subject"
                        placeholder="موضوع الرسالة"
                        className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-easyoft-navy font-medium">
                      الرسالة
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="اكتب رسالتك هنا..."
                      rows={6}
                      className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-easyoft-navy flex items-center gap-2">
                  <Phone className="w-6 h-6 text-brand-primary" />
                  {contactPage?.info_title || "معلومات التواصل"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-easyoft-navy">الهاتف</p>
                      <p className="text-easyoft-darkBlue">{contactInfo?.phone || "+966 50 123 4567"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-easyoft-navy">البريد الإلكتروني</p>
                      <p className="text-easyoft-darkBlue">{contactInfo?.email || "info@easyoft.com"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-easyoft-navy">العنوان</p>
                      <p className="text-easyoft-darkBlue">
                        {contactInfo?.address || "الرياض، المملكة العربية السعودية"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-easyoft-navy">ساعات العمل</p>
                      <p className="text-easyoft-darkBlue">
                        {contactPage?.office_hours || "الأحد - الخميس: 9:00 ص - 6:00 م"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-easyoft-sky">
                  <div className="flex items-center gap-2 text-brand-primary mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">وقت الاستجابة</span>
                  </div>
                  <p className="text-easyoft-darkBlue">{contactPage?.response_time || "نرد خلال 24 ساعة"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-easyoft-navy">خدماتنا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-easyoft-sky/30 transition-all duration-300"
                  >
                    <service.icon className="w-6 h-6 text-brand-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-easyoft-navy">{service.title}</h4>
                      <p className="text-sm text-easyoft-darkBlue">{service.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              الأسئلة الشائعة
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-easyoft-navy mb-4">أسئلة يتكرر طرحها</h2>
            <p className="text-lg text-easyoft-darkBlue max-w-2xl mx-auto">
              إجابات على الأسئلة الأكثر شيوعاً من عملائنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">؟</span>
                    </div>
                    <h3 className="font-semibold text-easyoft-navy">{faq.question}</h3>
                  </div>
                  <p className="text-easyoft-darkBlue text-sm leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
      <ContactContent />
    </Suspense>
  )
}
