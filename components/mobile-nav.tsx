"use client"

import { useState } from "react"
import { Menu, X, Home, Package, ShoppingCart, Phone, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { SearchDialog } from "./search-dialog"
import type { Category } from "@/lib/db"

interface MobileNavProps {
  categories?: Category[]
}

export function MobileNav({ categories = [] }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { itemCount } = useCart()

  const navigation = [
    { name: "الرئيسية", href: "/", icon: Home, color: "text-brand-primary" },
    { name: "كل المنتجات", href: "/products", icon: Package, color: "text-easyoft-blue" },
    { name: "المتجر", href: "/shop", icon: Package, color: "text-easyoft-darkBlue" },
    {
      name: "السلة",
      href: "/cart",
      icon: ShoppingCart,
      badge: itemCount,
      color: "text-green-600",
    },
    { name: "اتصل بنا", href: "/contact", icon: Phone, color: "text-easyoft-lightBlue" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 hover:bg-easyoft-sky transition-all duration-200 group"
            >
              <div className="relative">
                <Menu
                  className={`h-6 w-6 text-easyoft-blue transition-all duration-300 ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                />
                <X
                  className={`h-6 w-6 text-easyoft-blue absolute inset-0 transition-all duration-300 ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
                />
              </div>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80 bg-white border-l-2 border-easyoft-sky">
            <SheetHeader className="pb-4">
              <SheetTitle className="flex items-center justify-center">
                <div className="animate-fade-in">
                  <Image src="/easyoft-logo.png" alt="EASYoft" width={120} height={40} className="h-10 w-auto" />
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 animate-slide-in">
              {/* Search Button */}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-easyoft-sky to-white border-easyoft-blue/20 hover:border-easyoft-blue hover:bg-easyoft-sky transition-all duration-300 group"
                onClick={() => {
                  setSearchOpen(true)
                  setOpen(false)
                }}
              >
                <Search className="h-5 w-5 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-easyoft-darkBlue">البحث في المنتجات</span>
              </Button>

              <Separator className="bg-easyoft-sky" />

              {/* Navigation Links */}
              <nav className="space-y-2">
                <h3 className="text-sm font-semibold text-easyoft-navy mb-3 px-2">القائمة الرئيسية</h3>
                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-easyoft-sky hover:to-white transition-all duration-300 group animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        <Icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-all duration-200`} />
                        {item.badge && item.badge > 0 && (
                          <div className="absolute -top-2 -right-2 animate-bounce-gentle">
                            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full shadow-lg">
                              {item.badge}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-easyoft-navy group-hover:text-easyoft-blue transition-colors duration-200">
                        {item.name}
                      </span>
                    </Link>
                  )
                })}
              </nav>

              <Separator className="bg-easyoft-sky" />

              {/* Categories */}
              {categories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-easyoft-navy mb-3 px-2">الفئات</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {categories.map((category, index) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-easyoft-sky transition-all duration-200 group animate-fade-in"
                        style={{ animationDelay: `${(index + navigation.length) * 0.1}s` }}
                      >
                        <div className="w-2 h-2 bg-easyoft-lightBlue rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                        <span className="text-sm text-easyoft-darkBlue group-hover:text-easyoft-blue transition-colors duration-200">
                          {category.name}
                        </span>
                        <Badge variant="outline" className="mr-auto text-xs border-easyoft-blue/30 text-easyoft-blue">
                          {category.product_count}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="bg-easyoft-sky" />

              {/* Admin Link */}
              <div className="pt-2">
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-easyoft-sky hover:to-white transition-all duration-300 group"
                >
                  <User className="h-4 w-4 text-easyoft-blue group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm text-easyoft-darkBlue group-hover:text-easyoft-blue transition-colors duration-200">
                    لوحة التحكم
                  </span>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
