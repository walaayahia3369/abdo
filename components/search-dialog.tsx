"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/lib/db"

interface SearchDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const allProducts = db.getProducts()
  const filteredProducts = searchQuery
    ? allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 6)
    : []

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    if (onOpenChange) {
      onOpenChange(newOpen)
    }
    if (!newOpen) {
      setSearchQuery("")
    }
  }

  const currentOpen = open !== undefined ? open : isOpen

  return (
    <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-easyoft-sky transition-colors duration-200">
          <Search className="h-5 w-5 text-easyoft-blue" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">البحث في المنتجات</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن منتج، فئة، أو علامة تجارية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 text-right"
              autoFocus
            />
          </div>

          {searchQuery && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 mb-3">تم العثور على {filteredProducts.length} منتج</p>
                  {filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => handleOpenChange(false)}
                      className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate group-hover:text-brand-primary transition-colors duration-200">
                          {product.name}
                        </h4>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{product.brand}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-brand-primary">
                            {product.price.toLocaleString()} ر.س
                          </span>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {allProducts.filter(
                    (product) =>
                      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length > 6 && (
                    <Link
                      href={`/products?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => handleOpenChange(false)}
                    >
                      <Button variant="outline" className="w-full mt-3 bg-transparent">
                        عرض جميع النتائج
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">لم يتم العثور على منتجات مطابقة</p>
                  <p className="text-sm text-gray-500 mt-1">جرب البحث بكلمات مختلفة</p>
                </div>
              )}
            </div>
          )}

          {!searchQuery && (
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">ابدأ بكتابة اسم المنتج للبحث</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
