// 'use client';

// import { Suspense } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Users, Shield, Headphones } from "lucide-react"
// import { db, type ContactPage, type ContactInfo } from "@/lib/db"
// import Link from "next/link"
// import { useState, useEffect } from "react"
// import Image from "next/image"

// import { SearchDialog } from "@/components/search-dialog"
// import { MobileNav } from "@/components/mobile-nav"
// import { HeroSlider, type HeroSlide } from "@/components/hero-slider"
// import { useCart } from "@/hooks/use-cart"
// import { toast } from "@/hooks/use-toast"
// import {  type Product, type Category, type SiteSettings } from "@/lib/db"
// import { ShoppingCart, Star, ArrowRight, Truck, RefreshCw, Plus } from "lucide-react"


// async function ContactContent() {
//   let contactPage: ContactPage | null = null
//   let contactInfo: ContactInfo | null = null

//   try {
//     ;[contactPage, contactInfo] = await Promise.all([db.getContactPage(), db.getContactInfo()])
//   } catch (error) {
//     console.error("Error loading contact data:", error)
//   }

//   const services = [
//     {
//       icon: Shield,
//       title: "أنظمة الأمان",
//       description: "تركيب وصيانة أنظمة الأمان المتطورة",
//     },
//     {
//       icon: Users,
//       title: "الاستشارات التقنية",
//       description: "استشارات متخصصة في حلول التكنولوجيا الذكية",
//     },
//     {
//       icon: Headphones,
//       title: "الدعم الفني",
//       description: "دعم فني متواصل على مدار الساعة",
//     },
//   ]

//   const faqs = [
//     {
//       question: "ما هي مدة الضمان على المنتجات؟",
//       answer: "نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية.",
//     },
//     {
//       question: "هل تقدمون خدمة التركيب؟",
//       answer: "نعم، لدينا فريق متخصص لتركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة.",
//     },
//     {
//       question: "كم يستغرق وقت التسليم؟",
//       answer: "عادة ما يتم التسليم خلال 3-5 أيام عمل داخل المدن الرئيسية.",
//     },
//   ]
// const [categories, setCategories] = useState<Category[]>([])
// const { cart, addToCart } = useCart()
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-lightBlue/20">
//                   {/* Header */}
//             <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
//               <div className="container mx-auto px-4">
//                 <div className="flex items-center justify-between h-16">
//                   <Link href="/" className="flex items-center space-x-4 space-x-reverse group">
//                     <div className="relative">
//                       <Image
//                         src="/easyoft-logo.png"
//                         alt="EASYoft Logo"
//                         width={120}
//                         height={60}
//                         className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
//                       />
//                       <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 animate-shimmer"></div>
//                     </div>
//                   </Link>
      
//                   <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
//                     <Link
//                       href="/"
//                       className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
//                     >
//                       الرئيسية
//                       <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue"></span>
//                     </Link>
//                     {categories.map((category) => (
//                       <Link
//                         key={category.id}
//                         href={`/category/${category.slug}`}
//                         className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
//                       >
//                         {category.name}
//                         <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//                       </Link>
//                     ))}
//                     <Link
//                       href="/products"
//                       className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//                     >
//                       كل المنتجات
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//                     </Link>
//                     <Link
//                       href="/about"
//                       className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//                     >
//                       من نحن
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//                     </Link>
//                     <Link
//                       href="/contact"
//                       className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//                     >
//                       تواصل معنا
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//                     </Link>
//                   </nav>
      
//                   <div className="flex items-center space-x-4 space-x-reverse">
//                     <SearchDialog />
//                     <Link href="/cart">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="relative group hover:bg-easyoft-sky transition-all duration-300"
//                       >
//                         <ShoppingCart className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
//                         {cart.itemCount > 0 && (
//                           <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
//                             {cart.itemCount}
//                           </span>
//                         )}
//                       </Button>
//                     </Link>
//                     <span className="text-sm font-semibold text-easyoft-darkBlue bg-easyoft-sky px-3 py-1 rounded-full">
//                       {cart.total.toLocaleString()} ر.س
//                     </span>
//                     <MobileNav categories={categories} />
//                   </div>
//                 </div>
//               </div>
//             </header>
//       {/* Hero Section */}
//       <section className="relative py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-easyoft-navy/90 to-easyoft-darkBlue/90"></div>
//         <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20"></div>
//         <div className="relative container mx-auto px-4 text-center text-white">
//           <div className="animate-fade-in">
//             <Badge className="mb-6 bg-brand-primary/20 text-brand-primary border-brand-primary/30 hover:bg-brand-primary/30">
//               <MessageCircle className="w-4 h-4 ml-2" />
//               {contactPage?.hero_subtitle || "نحن هنا لمساعدتك"}
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-easyoft-lightBlue bg-clip-text text-transparent">
//               {contactPage?.hero_title || "تواصل معنا"}
//             </h1>
//             <p className="text-xl text-easyoft-lightBlue max-w-2xl mx-auto leading-relaxed">
//               {contactPage?.hero_description || "لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة"}
//             </p>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-16">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader className="text-center pb-8">
//                 <CardTitle className="text-3xl font-bold text-easyoft-navy mb-2">
//                   {contactPage?.form_title || "أرسل لنا رسالة"}
//                 </CardTitle>
//                 <CardDescription className="text-lg text-easyoft-darkBlue">
//                   {contactPage?.form_subtitle || "سنقوم بالرد عليك في أقرب وقت ممكن"}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <form className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="name" className="text-easyoft-navy font-medium">
//                         الاسم الكامل
//                       </Label>
//                       <Input
//                         id="name"
//                         placeholder="أدخل اسمك الكامل"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-easyoft-navy font-medium">
//                         البريد الإلكتروني
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-easyoft-navy font-medium">
//                         رقم الهاتف
//                       </Label>
//                       <Input
//                         id="phone"
//                         placeholder="+966 50 123 4567"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="subject" className="text-easyoft-navy font-medium">
//                         الموضوع
//                       </Label>
//                       <Input
//                         id="subject"
//                         placeholder="موضوع الرسالة"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="message" className="text-easyoft-navy font-medium">
//                       الرسالة
//                     </Label>
//                     <Textarea
//                       id="message"
//                       placeholder="اكتب رسالتك هنا..."
//                       rows={6}
//                       className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300 resize-none"
//                     />
//                   </div>
//                   <Button className="w-full bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
//                     <Send className="w-5 h-5 ml-2" />
//                     إرسال الرسالة
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-easyoft-navy flex items-center gap-2">
//                   <Phone className="w-6 h-6 text-brand-primary" />
//                   {contactPage?.info_title || "معلومات التواصل"}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center">
//                       <Phone className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">الهاتف</p>
//                       <p className="text-easyoft-darkBlue">{contactInfo?.phone || "+966 50 123 4567"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
//                       <Mail className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">البريد الإلكتروني</p>
//                       <p className="text-easyoft-darkBlue">{contactInfo?.email || "info@easyoft.com"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                       <MapPin className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">العنوان</p>
//                       <p className="text-easyoft-darkBlue">
//                         {contactInfo?.address || "الرياض، المملكة العربية السعودية"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
//                       <Clock className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">ساعات العمل</p>
//                       <p className="text-easyoft-darkBlue">
//                         {contactPage?.office_hours || "الأحد - الخميس: 9:00 ص - 6:00 م"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-6 border-t border-easyoft-sky">
//                   <div className="flex items-center gap-2 text-brand-primary mb-2">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">وقت الاستجابة</span>
//                   </div>
//                   <p className="text-easyoft-darkBlue">{contactPage?.response_time || "نرد خلال 24 ساعة"}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Services */}
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-easyoft-navy">خدماتنا</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {services.map((service, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 rounded-lg hover:bg-easyoft-sky/30 transition-all duration-300"
//                   >
//                     <service.icon className="w-6 h-6 text-brand-primary mt-1" />
//                     <div>
//                       <h4 className="font-semibold text-easyoft-navy">{service.title}</h4>
//                       <p className="text-sm text-easyoft-darkBlue">{service.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="mt-20">
//           <div className="text-center mb-12">
//             <Badge className="mb-4 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
//               الأسئلة الشائعة
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold text-easyoft-navy mb-4">أسئلة يتكرر طرحها</h2>
//             <p className="text-lg text-easyoft-darkBlue max-w-2xl mx-auto">
//               إجابات على الأسئلة الأكثر شيوعاً من عملائنا
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {faqs.map((faq, index) => (
//               <Card
//                 key={index}
//                 className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-3 mb-4">
//                     <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-white font-bold text-sm">؟</span>
//                     </div>
//                     <h3 className="font-semibold text-easyoft-navy">{faq.question}</h3>
//                   </div>
//                   <p className="text-easyoft-darkBlue text-sm leading-relaxed">{faq.answer}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Contact() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
//       <ContactContent />
//     </Suspense>
//   )
// }


/*********************************************************************** */

// 'use client';

// import { Suspense } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, Users, Shield, Headphones, ShoppingCart } from "lucide-react"
// import { db, type ContactPage, type ContactInfo } from "@/lib/db"
// import Link from "next/link"
// import { useState, useEffect } from "react"
// import Image from "next/image"

// import { SearchDialog } from "@/components/search-dialog"
// import { MobileNav } from "@/components/mobile-nav"
// import { useCart } from "@/hooks/use-cart"
// import { type Category } from "@/lib/db"

// const services = [
//   {
//     icon: Shield,
//     title: "أنظمة الأمان",
//     description: "تركيب وصيانة أنظمة الأمان المتطورة",
//   },
//   {
//     icon: Users,
//     title: "الاستشارات التقنية",
//     description: "استشارات متخصصة في حلول التكنولوجيا الذكية",
//   },
//   {
//     icon: Headphones,
//     title: "الدعم الفني",
//     description: "دعم فني متواصل على مدار الساعة",
//   },
// ]

// const faqs = [
//   {
//     question: "ما هي مدة الضمان على المنتجات؟",
//     answer: "نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية.",
//   },
//   {
//     question: "هل تقدمون خدمة التركيب؟",
//     answer: "نعم، لدينا فريق متخصص لتركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة.",
//   },
//   {
//     question: "كم يستغرق وقت التسليم؟",
//     answer: "عادة ما يتم التسليم خلال 3-5 أيام عمل داخل المدن الرئيسية.",
//   },
// ]

// function ContactContent() {
//   const [contactPage, setContactPage] = useState<ContactPage | null>(null)
//   const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
//   const [categories, setCategories] = useState<Category[]>([])
//   const { cart } = useCart()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [pageData, infoData, categoriesData] = await Promise.all([
//           db.getContactPage(),
//           db.getContactInfo(),
//           db.getCategories()
//         ])
//         setContactPage(pageData)
//         setContactInfo(infoData)
//         setCategories(categoriesData)
//       } catch (error) {
//         console.error("Error loading data:", error)
//       }
//     }

//     fetchData()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-lightBlue/20">
//       {/* Header */}
//       <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <Link href="/" className="flex items-center space-x-4 space-x-reverse group">
//               <div className="relative">
//                 <Image
//                   src="/easyoft-logo.png"
//                   alt="EASYoft Logo"
//                   width={120}
//                   height={60}
//                   className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 animate-shimmer"></div>
//               </div>
//             </Link>

//             <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
//               <Link
//                 href="/"
//                 className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
//               >
//                 الرئيسية
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue"></span>
//               </Link>
//               {categories.map((category) => (
//                 <Link
//                   key={category.id}
//                   href={`/category/${category.slug}`}
//                   className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
//                 >
//                   {category.name}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//               ))}
//               <Link
//                 href="/products"
//                 className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//               >
//                 كل المنتجات
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//               >
//                 من نحن
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//               >
//                 تواصل معنا
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//               </Link>
//             </nav>

//             <div className="flex items-center space-x-4 space-x-reverse">
//               <SearchDialog />
//               <Link href="/cart">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="relative group hover:bg-easyoft-sky transition-all duration-300"
//                 >
//                   <ShoppingCart className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
//                   {cart.itemCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
//                       {cart.itemCount}
//                     </span>
//                   )}
//                 </Button>
//               </Link>
//               <span className="text-sm font-semibold text-easyoft-darkBlue bg-easyoft-sky px-3 py-1 rounded-full">
//                 {cart.total.toLocaleString()} ر.س
//               </span>
//               <MobileNav categories={categories} />
//             </div>
//           </div>
//         </div>
//       </header>
      
//       {/* Hero Section */}

//       <div className="container mx-auto px-4 py-16">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader className="text-center pb-8">
//                 <CardTitle className="text-3xl font-bold text-easyoft-navy mb-2">
//                   {contactPage?.form_title || "أرسل لنا رسالة"}
//                 </CardTitle>
//                 <CardDescription className="text-lg text-easyoft-darkBlue">
//                   {contactPage?.form_subtitle || "سنقوم بالرد عليك في أقرب وقت ممكن"}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <form className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="name" className="text-easyoft-navy font-medium">
//                         الاسم الكامل
//                       </Label>
//                       <Input
//                         id="name"
//                         placeholder="أدخل اسمك الكامل"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-easyoft-navy font-medium">
//                         البريد الإلكتروني
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-easyoft-navy font-medium">
//                         رقم الهاتف
//                       </Label>
//                       <Input
//                         id="phone"
//                         placeholder="+966 50 123 4567"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="subject" className="text-easyoft-navy font-medium">
//                         الموضوع
//                       </Label>
//                       <Input
//                         id="subject"
//                         placeholder="موضوع الرسالة"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="message" className="text-easyoft-navy font-medium">
//                       الرسالة
//                     </Label>
//                     <Textarea
//                       id="message"
//                       placeholder="اكتب رسالتك هنا..."
//                       rows={6}
//                       className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300 resize-none"
//                     />
//                   </div>
//                   <Button className="w-full bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
//                     <Send className="w-5 h-5 ml-2" />
//                     إرسال الرسالة
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-easyoft-navy flex items-center gap-2">
//                   <Phone className="w-6 h-6 text-brand-primary" />
//                   {contactPage?.info_title || "معلومات التواصل"}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center">
//                       <Phone className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">الهاتف</p>
//                       <p className="text-easyoft-darkBlue">{contactInfo?.phone || "+966 50 123 4567"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
//                       <Mail className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">البريد الإلكتروني</p>
//                       <p className="text-easyoft-darkBlue">{contactInfo?.email || "info@easyoft.com"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                       <MapPin className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">العنوان</p>
//                       <p className="text-easyoft-darkBlue">
//                         {contactInfo?.address || "الرياض، المملكة العربية السعودية"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
//                       <Clock className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">ساعات العمل</p>
//                       <p className="text-easyoft-darkBlue">
//                         {contactPage?.office_hours || "الأحد - الخميس: 9:00 ص - 6:00 م"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-6 border-t border-easyoft-sky">
//                   <div className="flex items-center gap-2 text-brand-primary mb-2">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">وقت الاستجابة</span>
//                   </div>
//                   <p className="text-easyoft-darkBlue">{contactPage?.response_time || "نرد خلال 24 ساعة"}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Services */}
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-easyoft-navy">خدماتنا</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {services.map((service, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 rounded-lg hover:bg-easyoft-sky/30 transition-all duration-300"
//                   >
//                     <service.icon className="w-6 h-6 text-brand-primary mt-1" />
//                     <div>
//                       <h4 className="font-semibold text-easyoft-navy">{service.title}</h4>
//                       <p className="text-sm text-easyoft-darkBlue">{service.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* FAQ Section */}
//         <div className="mt-20">
//           <div className="text-center mb-12">
//             <Badge className="mb-4 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
//               الأسئلة الشائعة
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold text-easyoft-navy mb-4">أسئلة يتكرر طرحها</h2>
//             <p className="text-lg text-easyoft-darkBlue max-w-2xl mx-auto">
//               إجابات على الأسئلة الأكثر شيوعاً من عملائنا
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {faqs.map((faq, index) => (
//               <Card
//                 key={index}
//                 className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <CardContent className="p-6">
//                   <div className="flex items-start gap-3 mb-4">
//                     <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center flex-shrink-0">
//                       <span className="text-white font-bold text-sm">؟</span>
//                     </div>
//                     <h3 className="font-semibold text-easyoft-navy">{faq.question}</h3>
//                   </div>
//                   <p className="text-easyoft-darkBlue text-sm leading-relaxed">{faq.answer}</p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Contact() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
//       <ContactContent />
//     </Suspense>
//   )
// }






/************************************************************************* */

// 'use client';

// import { Suspense, useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ShoppingCart } from "lucide-react";
// import { db, type ContactPage, type ContactInfo, type Category } from "@/lib/db";
// import Link from "next/link";
// import Image from "next/image";
// import { SearchDialog } from "@/components/search-dialog";
// import { MobileNav } from "@/components/mobile-nav";
// import { useCart } from "@/hooks/use-cart";
// import { toast } from "@/hooks/use-toast";

// function ContactContent() {
//   const [contactPage, setContactPage] = useState<ContactPage | null>(null);
//   const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const { cart } = useCart();
  
//   // States for form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: ""
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [pageData, infoData, categoriesData] = await Promise.all([
//           db.getContactPage(),
//           db.getContactInfo(),
//           db.getCategories()
//         ]);
//         setContactPage(pageData);
//         setContactInfo(infoData);
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate API call delay
//     setTimeout(() => {
//       // Construct WhatsApp message
//       const whatsappMessage = `*رسالة جديدة من موقع EASYoft*
      
// *الاسم:* ${formData.name}
// *البريد الإلكتروني:* ${formData.email}
// *رقم الهاتف:* ${formData.phone}
// *الموضوع:* ${formData.subject}

// *الرسالة:*
// ${formData.message}

// _تم إرسال هذه الرسالة عبر نموذج التواصل على الموقع_`;
      
//       const encodedMessage = encodeURIComponent(whatsappMessage);
//       const whatsappNumber = contactInfo?.whatsapp || contactInfo?.phone || "+966501234567";
//       const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
//       // Open WhatsApp in new tab
//       window.open(whatsappUrl, '_blank');
      
//       // Show success message
//       setIsSubmitted(true);
//       setIsSubmitting(false);
//       toast({
//         title: "تم إرسال الرسالة بنجاح!",
//         description: "سيتم التواصل معك قريباً عبر الواتساب.",
//         variant: "success"
//       });
      
//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: ""
//       });
      
//       // Reset success state after 5 seconds
//       setTimeout(() => setIsSubmitted(false), 5000);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-lightBlue/20">
//       {/* Header */}
//       <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <Link href="/" className="flex items-center space-x-4 space-x-reverse group">
//               <div className="relative">
//                 <Image
//                   src="/easyoft-logo.png"
//                   alt="EASYoft Logo"
//                   width={120}
//                   height={60}
//                   className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 animate-shimmer"></div>
//               </div>
//             </Link>

//             <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
//               <Link
//                 href="/"
//                 className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
//               >
//                 الرئيسية
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue"></span>
//               </Link>
//               {categories.map((category) => (
//                 <Link
//                   key={category.id}
//                   href={`/category/${category.slug}`}
//                   className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
//                 >
//                   {category.name}
//                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//               ))}
//               <Link
//                 href="/products"
//                 className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//               >
//                 كل المنتجات
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link
//                 href="/about"
//                 className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//               >
//                 من نحن
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//               </Link>
//               <Link
//                 href="/contact"
//                 className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
//               >
//                 تواصل معنا
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
//               </Link>
//             </nav>

//             <div className="flex items-center space-x-4 space-x-reverse">
//               <SearchDialog />
//               <Link href="/cart">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="relative group hover:bg-easyoft-sky transition-all duration-300"
//                 >
//                   <ShoppingCart className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
//                   {cart.itemCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
//                       {cart.itemCount}
//                     </span>
//                   )}
//                 </Button>
//               </Link>
//               <span className="text-sm font-semibold text-easyoft-darkBlue bg-easyoft-sky px-3 py-1 rounded-full">
//                 {cart.total.toLocaleString()} ر.س
//               </span>
//               <MobileNav categories={categories} />
//             </div>
//           </div>
//         </div>
//       </header>
      
//       {/* Hero Section */}
//       <section className="relative py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-easyoft-navy/90 to-easyoft-darkBlue/90"></div>
//         <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20"></div>
//         <div className="relative container mx-auto px-4 text-center text-white">
//           <div className="animate-fade-in">
//             <Badge className="mb-6 bg-brand-primary/20 text-brand-primary border-brand-primary/30 hover:bg-brand-primary/30">
//               <MessageCircle className="w-4 h-4 ml-2" />
//               {contactPage?.hero_subtitle || "نحن هنا لمساعدتك"}
//             </Badge>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-easyoft-lightBlue bg-clip-text text-transparent">
//               {contactPage?.hero_title || "تواصل معنا"}
//             </h1>
//             <p className="text-xl text-easyoft-lightBlue max-w-2xl mx-auto leading-relaxed">
//               {contactPage?.hero_description || "لا تتردد في التواصل معنا لأي استفسار أو طلب خدمة"}
//             </p>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-16">
//         <div className="grid lg:grid-cols-3 gap-12">
//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader className="text-center pb-8">
//                 <CardTitle className="text-3xl font-bold text-easyoft-navy mb-2">
//                   {contactPage?.form_title || "أرسل لنا رسالة"}
//                 </CardTitle>
//                 <CardDescription className="text-lg text-easyoft-darkBlue">
//                   {contactPage?.form_subtitle || "سنقوم بالرد عليك في أقرب وقت ممكن"}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <form className="space-y-6" onSubmit={handleSubmit}>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="name" className="text-easyoft-navy font-medium">
//                         الاسم الكامل
//                       </Label>
//                       <Input
//                         id="name"
//                         placeholder="أدخل اسمك الكامل"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email" className="text-easyoft-navy font-medium">
//                         البريد الإلكتروني
//                       </Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="your@email.com"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <Label htmlFor="phone" className="text-easyoft-navy font-medium">
//                         رقم الهاتف
//                       </Label>
//                       <Input
//                         id="phone"
//                         placeholder="+966 50 123 4567"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="subject" className="text-easyoft-navy font-medium">
//                         الموضوع
//                       </Label>
//                       <Input
//                         id="subject"
//                         placeholder="موضوع الرسالة"
//                         className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
//                         value={formData.subject}
//                         onChange={handleInputChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="message" className="text-easyoft-navy font-medium">
//                       الرسالة
//                     </Label>
//                     <Textarea
//                       id="message"
//                       placeholder="اكتب رسالتك هنا..."
//                       rows={6}
//                       className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300 resize-none"
//                       value={formData.message}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <Button 
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         جارٍ الإرسال...
//                       </span>
//                     ) : (
//                       <span className="flex items-center">
//                         <Send className="w-5 h-5 ml-2" />
//                         إرسال الرسالة
//                       </span>
//                     )}
//                   </Button>
                  
//                   {isSubmitted && (
//                     <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
//                       <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
//                       <span>تم إرسال رسالتك بنجاح! سيتم التواصل معك قريباً.</span>
//                     </div>
//                   )}
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-8">
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-easyoft-navy flex items-center gap-2">
//                   <Phone className="w-6 h-6 text-brand-primary" />
//                   {contactPage?.info_title || "معلومات التواصل"}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-easyoft-blue rounded-full flex items-center justify-center">
//                       <Phone className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">الهاتف</p>
//                       <p className="text-easyoft-darkBlue">{contactInfo?.phone || "+966 50 123 4567"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
//                       <Mail className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">البريد الإلكتروني</p>
//                       <p className="text-easyoft-darkBlue">{contactInfo?.email || "info@easyoft.com"}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//                       <MapPin className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">العنوان</p>
//                       <p className="text-easyoft-darkBlue">
//                         {contactInfo?.address || "الرياض، المملكة العربية السعودية"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-easyoft-sky/50 to-transparent rounded-xl hover:from-easyoft-sky/70 transition-all duration-300">
//                     <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
//                       <Clock className="w-6 h-6 text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-easyoft-navy">ساعات العمل</p>
//                       <p className="text-easyoft-darkBlue">
//                         {contactPage?.office_hours || "الأحد - الخميس: 9:00 ص - 6:00 م"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-6 border-t border-easyoft-sky">
//                   <div className="flex items-center gap-2 text-brand-primary mb-2">
//                     <CheckCircle className="w-5 h-5" />
//                     <span className="font-semibold">وقت الاستجابة</span>
//                   </div>
//                   <p className="text-easyoft-darkBlue">{contactPage?.response_time || "نرد خلال 24 ساعة"}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* WhatsApp Section */}
//             <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
//               <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-easyoft-navy flex items-center gap-2">
//                   <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                   </svg>
//                   تواصل عبر الواتساب
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <p className="text-easyoft-darkBlue">
//                     يمكنك التواصل معنا مباشرة عبر الواتساب للاستفسارات السريعة
//                   </p>
//                   <Link 
//                     href={`https://wa.me/${contactInfo?.whatsapp || contactInfo?.phone || "+966501234567"}`} 
//                     target="_blank"
//                     className="block"
//                   >
//                     <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
//                       <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                       </svg>
//                       ابدأ المحادثة الآن
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Contact() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
//       <ContactContent />
//     </Suspense>
//   );
// }


/*************************** */
'use client';

import { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ShoppingCart } from "lucide-react";
import { db, type ContactPage, type ContactInfo, type Category } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { SearchDialog } from "@/components/search-dialog";
import { MobileNav } from "@/components/mobile-nav";
import { useCart } from "@/hooks/use-cart";
import { toast } from "@/hooks/use-toast";

function ContactContent() {
  const [contactPage, setContactPage] = useState<ContactPage | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { cart } = useCart();
  
  // States for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pageData, infoData, categoriesData] = await Promise.all([
          db.getContactPage(),
          db.getContactInfo(),
          db.getCategories()
        ]);
        setContactPage(pageData);
        setContactInfo(infoData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct WhatsApp message
    const whatsappMessage = `*رسالة جديدة من موقع EASYoft*
    
*الاسم:* ${formData.name}
*البريد الإلكتروني:* ${formData.email}
*رقم الهاتف:* ${formData.phone}
*الموضوع:* ${formData.subject}

*الرسالة:*
${formData.message}

_تم إرسال هذه الرسالة عبر نموذج التواصل على الموقع_`;
    
    // Clean phone number for WhatsApp
    const cleanPhone = (contactInfo?.whatsapp || contactInfo?.phone || "+966501234567")
      .replace(/[\s\(\)\-]/g, '') // Remove spaces, parentheses, dashes
      .replace(/^\+?0?/, ''); // Remove leading + and 0
    
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    toast({
      title: "تم إرسال الرسالة بنجاح!",
      description: "سيتم التواصل معك قريباً عبر الواتساب.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-lightBlue/20">
      {/* Header */}
      {/* <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse group">
              <div className="relative">
                <Image
                  src="/easyoft-logo.png"
                  alt="EASYoft Logo"
                  width={120}
                  height={60}
                  className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 animate-shimmer"></div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
              <Link
                href="/"
                className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
              >
                الرئيسية
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue"></span>
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Link
                href="/products"
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                كل المنتجات
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/about"
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                من نحن
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
              >
                تواصل معنا
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <SearchDialog />
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative group hover:bg-easyoft-sky transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
                  {cart.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
                      {cart.itemCount}
                    </span>
                  )}
                </Button>
              </Link>
              <span className="text-sm font-semibold text-easyoft-darkBlue bg-easyoft-sky px-3 py-1 rounded-full">
                {cart.total.toLocaleString()} ر.س
              </span>
              <MobileNav categories={categories} />
            </div>
          </div>
        </div>
      </header>
       */}
             <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-easyoft-sky sticky top-0 z-50">
               <div className="container mx-auto px-4">
                 <div className="flex items-center justify-between h-16">
                   <Link href="/" className="flex items-center space-x-4 space-x-reverse group">
                     <div className="relative">
                       <Image
                         src="/easyoft-logo.png"
                         alt="EASYoft Logo"
                         width={120}
                         height={60}
                         className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                       />
                       <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 animate-shimmer"></div>
                     </div>
                   </Link>
       
       <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
         <Link
           href="/"
           className="text-brand-primary font-semibold hover:text-easyoft-lightBlue transition-all duration-300 relative group"
         >
           الرئيسية
           <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue"></span>
         </Link>
         
         {/* عرض أول 3 فئات فقط */}
         {categories.slice(0, 3).map((category) => (
           <Link
             key={category.id}
             href={`/category/${category.slug}`}
             className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative group"
           >
             {category.name}
             <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
           </Link>
         ))}
         
         {/* عرض قائمة "المزيد" عند وجود أكثر من 3 فئات */}
         {categories.length > 3 && (
           <div className="relative group">
             <button className="text-easyoft-darkBlue hover:text-brand-primary whitespace-nowrap transition-all duration-300 relative">
               المزيد
               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
             </button>
             
             {/* القائمة المنسدلة */}
             <div className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl bg-white border border-easyoft-sky overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
               {categories.slice(3).map((category) => (
                 <Link
                   key={category.id}
                   href={`/category/${category.slug}`}
                   className="block px-4 py-3 text-sm text-easyoft-darkBlue hover:bg-easyoft-sky/50 hover:text-brand-primary transition-colors duration-200 border-b border-easyoft-sky/20 last:border-0"
                 >
                   {category.name}
                 </Link>
               ))}
             </div>
           </div>
         )}
         
         {/* الروابط الثابتة */}
         <Link
           href="/products"
           className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
         >
           كل المنتجات
           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
         </Link>
         <Link
           href="/about"
           className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
         >
           من نحن
           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
         </Link>
         <Link
           href="/contact"
           className="text-easyoft-darkBlue hover:text-brand-primary transition-all duration-300 relative group"
         >
           تواصل معنا
           <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-easyoft-lightBlue group-hover:w-full transition-all duration-300"></span>
         </Link>
       </nav>
       
                   <div className="flex items-center space-x-4 space-x-reverse">
                     <SearchDialog />
                     <Link href="/cart">
                       <Button
                         variant="ghost"
                         size="icon"
                         className="relative group hover:bg-easyoft-sky transition-all duration-300"
                       >
                         <ShoppingCart className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
                         {cart.itemCount > 0 && (
                           <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-lg">
                             {cart.itemCount}
                           </span>
                         )}
                       </Button>
                     </Link>
                     <span className="text-sm font-semibold text-easyoft-darkBlue bg-easyoft-sky px-3 py-1 rounded-full">
                       {cart.total.toLocaleString()} ر.س
                     </span>
                     <MobileNav categories={categories} />
                   </div>
                 </div>
               </div>
             </header>
      {/* Hero Section */}
      {/* <section className="relative py-20 overflow-hidden">
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
      </section> */}

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
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-easyoft-navy font-medium">
                        الاسم الكامل
                      </Label>
                      <Input
                        id="name"
                        placeholder="أدخل اسمك الكامل"
                        className="border-easyoft-sky focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-300"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
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
                        value={formData.email}
                        onChange={handleInputChange}
                        required
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
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
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
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
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
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جارٍ الإرسال...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-5 h-5 ml-2" />
                        إرسال الرسالة
                      </span>
                    )}
                  </Button>
                  
                  {isSubmitted && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span>تم إرسال رسالتك بنجاح! سيتم التواصل معك قريباً.</span>
                    </div>
                  )}
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

            {/* WhatsApp Section
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-easyoft-navy flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  تواصل عبر الواتساب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-easyoft-darkBlue">
                    يمكنك التواصل معنا مباشرة عبر الواتساب للاستفسارات السريعة
                  </p>
                  <Link 
                    href={`https://wa.me/${(contactInfo?.whatsapp || contactInfo?.phone || "966501234567").replace(/[\s\(\)\-]/g, '')}`} 
                    target="_blank"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      ابدأ المحادثة الآن
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
      <ContactContent />
    </Suspense>
  );
}
