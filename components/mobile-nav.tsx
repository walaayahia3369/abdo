"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/lib/db"

interface MobileNavProps {
  categories?: Category[]
}

export function MobileNav({ categories = [] }: MobileNavProps) {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80" dir="rtl">
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-6">
              <Image src="/easyoft-logo.png" alt="EASYoft" width={120} height={40} className="h-8 w-auto" />
            </div>

            <nav className="flex-1 space-y-4">
              <Link
                href="/"
                className="block py-2 px-4 text-lg font-medium text-brand-primary bg-brand-primary/10 rounded-lg"
              >
                الرئيسية
              </Link>

              <div className="space-y-2">
                <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">الفئات</h3>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block py-2 px-4 text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/products"
                className="block py-2 px-4 text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg"
              >
                كل المنتجات
              </Link>

              <Link
                href="/about"
                className="block py-2 px-4 text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg"
              >
                من نحن
              </Link>

              <Link
                href="/contact"
                className="block py-2 px-4 text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg"
              >
                تواصل معنا
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
