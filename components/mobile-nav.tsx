"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/db"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const categories = db.getCategories()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0" dir="rtl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">القائمة الرئيسية</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex flex-col p-4 space-y-2 flex-1">
            <Link
              href="/"
              className="text-gray-900 hover:text-red-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(false)}
            >
              الرئيسية
            </Link>

            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-medium text-gray-500 mb-3 px-4">الأقسام الرئيسية</h3>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-red-600 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors block"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="border-t pt-4 mt-2">
              <Link
                href="/products"
                className="text-gray-700 hover:text-red-600 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors block"
                onClick={() => setOpen(false)}
              >
                كل المنتجات
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-600 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors block"
                onClick={() => setOpen(false)}
              >
                من نحن
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-red-600 py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors block"
                onClick={() => setOpen(false)}
              >
                تواصل معنا
              </Link>
            </div>

            <div className="border-t pt-4 mt-auto">
              <Link
                href="/admin"
                className="text-red-600 hover:text-red-700 font-medium py-3 px-4 rounded-lg hover:bg-red-50 transition-colors block"
                onClick={() => setOpen(false)}
              >
                لوحة التحكم
              </Link>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
