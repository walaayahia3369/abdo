"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface HeroSlide {
  id: number
  title: string
  subtitle?: string
  description?: string
  image_url: string
  button_text?: string
  button_link?: string
  is_active: boolean
  sort_order: number
}

interface HeroSliderProps {
  slides: HeroSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function HeroSlider({ slides, autoPlay = true, autoPlayInterval = 5000, className }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isLoaded, setIsLoaded] = useState(false)

  const activeSlides = slides.filter((slide) => slide.is_active).sort((a, b) => a.sort_order - b.sort_order)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isPlaying || activeSlides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, activeSlides.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (activeSlides.length === 0) {
    return (
      <section className="relative h-[70vh] bg-gradient-to-l from-brand-primary via-easyoft-blue to-easyoft-darkBlue text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">حلول الأمان المتقدمة</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            نقدم أحدث تقنيات الأمان والمنازل الذكية لحماية ممتلكاتك وتوفير الراحة والأمان
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-brand-primary hover:bg-easyoft-sky">
              تصفح المنتجات
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className={cn("relative h-[70vh] overflow-hidden", className)}>
      {/* الشرائح */}
      <div className="relative h-full">
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105",
            )}
          >
            {/* صورة الخلفية */}
            <div className="absolute inset-0">
              <Image
                src={slide.image_url || "/placeholder.svg?height=600&width=1200"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
            </div>

            {/* المحتوى */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white" dir="rtl">
                  <div
                    className={cn(
                      "transform transition-all duration-1000 delay-300",
                      index === currentSlide && isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    )}
                  >
                    {slide.subtitle && (
                      <p className="text-lg md:text-xl text-easyoft-lightBlue mb-4 font-medium">{slide.subtitle}</p>
                    )}

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">{slide.title}</h1>

                    {slide.description && (
                      <p className="text-lg md:text-xl mb-8 text-gray-100 leading-relaxed max-w-2xl">
                        {slide.description}
                      </p>
                    )}

                    {slide.button_text && slide.button_link && (
                      <Link href={slide.button_link}>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary text-white text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                          {slide.button_text}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* أزرار التنقل */}
      {activeSlides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full h-12 w-12 transition-all duration-300"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full h-12 w-12 transition-all duration-300"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* مؤشرات الشرائح */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {/* أزرار التشغيل/الإيقاف */}
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-full h-8 w-8 p-0"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          {/* النقاط */}
          <div className="flex gap-2">
            {activeSlides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-3 w-3 rounded-full transition-all duration-300",
                  index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70",
                )}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* شريط التقدم */}
      {activeSlides.length > 1 && isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-brand-primary to-easyoft-blue transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / activeSlides.length) * 100}%`,
            }}
          />
        </div>
      )}
    </section>
  )
}
