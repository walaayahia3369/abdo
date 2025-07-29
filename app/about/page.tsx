"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Camera, Fingerprint, Home, Users, Award, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { db, type AboutPage, type TeamMember, type Service, type Stat } from "@/lib/db"

export default function AboutPageComponent() {
  const [aboutData, setAboutData] = useState<AboutPage | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [aboutPageData, teamData, servicesData, statsData] = await Promise.all([
        db.getAboutPage(),
        db.getTeamMembers(),
        db.getServices(),
        db.getStats(),
      ])

      setAboutData(aboutPageData)
      setTeamMembers(teamData)
      setServices(servicesData)
      setStats(statsData)
    } catch (error) {
      console.error("Error loading about page data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Fingerprint,
      Shield,
      Camera,
      Home,
      Users,
      Award,
      Clock,
    }
    const IconComponent = icons[iconName] || Users
    return <IconComponent className="w-8 h-8" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
          </div>
          <p className="text-gray-600 font-medium text-lg animate-pulse-soft">جاري تحميل الصفحة...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 animate-fade-in">من نحن</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-up">
            {aboutData?.hero_title || "EazySoft"}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-in-up animation-delay-200">
            {aboutData?.hero_subtitle || "رواد في مجال الأمان والتكنولوجيا الذكية"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-slide-in-up animation-delay-400">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                تصفح منتجاتنا
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">{aboutData?.story_title || "قصتنا"}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {aboutData?.story_content ||
                  "تأسست EazySoft بهدف توفير أحدث حلول الأمان والتكنولوجيا الذكية للمنازل والشركات. نحن نؤمن بأن الأمان والراحة يجب أن يكونا في متناول الجميع."}
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {aboutData?.story_content_2 ||
                  "مع فريق من الخبراء المتخصصين، نقدم حلولاً مبتكرة تجمع بين الجودة العالية والأسعار المناسبة."}
              </p>
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">معتمدون من أفضل الشركات العالمية</span>
              </div>
            </div>
            <div className="animate-slide-in-left">
              <Card className="overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-0">
                  <Image
                    src="/placeholder.jpg"
                    alt="فريق EazySoft"
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services */}
          {services.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">خدماتنا</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <Card
                    key={service.id}
                    className="text-center p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="space-y-4">
                      <div className="flex justify-center text-blue-600">{getIconComponent(service.icon)}</div>
                      <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
                {aboutData?.stats_title || "إنجازاتنا بالأرقام"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.id}
                    className="text-center animate-bounce-gentle"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team */}
          {teamMembers.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">
                {aboutData?.team_title || "فريق العمل"}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card
                    key={member.id}
                    className="text-center overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image
                          src={member.image || "/placeholder-user.jpg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                      {member.bio && <p className="text-sm text-gray-600">{member.bio}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up">
              <CardContent className="text-center space-y-4">
                <Award className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="text-xl font-bold text-gray-800">{aboutData?.mission_title || "مهمتنا"}</h3>
                <p className="text-gray-600">
                  {aboutData?.mission_content ||
                    "نسعى لتوفير أفضل حلول الأمان والتكنولوجيا الذكية مع خدمة عملاء متميزة"}
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up animation-delay-200">
              <CardContent className="text-center space-y-4">
                <Users className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="text-xl font-bold text-gray-800">{aboutData?.vision_title || "رؤيتنا"}</h3>
                <p className="text-gray-600">
                  {aboutData?.vision_content || "أن نكون الشركة الرائدة في مجال الأمان والتكنولوجيا الذكية في المنطقة"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800 animate-fade-in">
              {aboutData?.values_title || "قيمنا"}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up">
                <CardContent className="text-center space-y-4">
                  <Users className="w-12 h-12 text-blue-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800">العملاء أولاً</h3>
                  <p className="text-gray-600">نضع رضا عملائنا في المقدمة دائماً</p>
                </CardContent>
              </Card>
              <Card className="p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up animation-delay-200">
                <CardContent className="text-center space-y-4">
                  <Award className="w-12 h-12 text-blue-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800">الجودة</h3>
                  <p className="text-gray-600">نلتزم بأعلى معايير الجودة في كل ما نقدمه</p>
                </CardContent>
              </Card>
              <Card className="p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-slide-in-up animation-delay-400">
                <CardContent className="text-center space-y-4">
                  <Clock className="w-12 h-12 text-blue-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800">الالتزام</h3>
                  <p className="text-gray-600">نلتزم بالمواعيد ونقدم الدعم المستمر</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
