"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { db, type Product } from "@/lib/db"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [allProducts, setAllProducts] = useState<Product[]>([])

  // Load all products on mount
  useEffect(() => {
    const loadProducts = async () => {
      const products = await db.getProducts()
      setAllProducts(products)
    }
    loadProducts()
  }, [])

  // Search products when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)

    // Simple search implementation
    const searchResults = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    )

    setResults(searchResults.slice(0, 10)) // Limit to 10 results
    setLoading(false)
  }, [query, allProducts])

  const handleClose = () => {
    setQuery("")
    setResults([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            البحث في المنتجات
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="ابحث عن المنتجات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
              dir="rtl"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-easyoft-dark mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">جاري البحث...</p>
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">لا توجد نتائج للبحث "{query}"</p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={handleClose}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-gray-600 truncate">{product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-easyoft-dark text-sm">{product.price} ر.س</span>
                        {product.badge && <Badge className="bg-easyoft-aqua text-white text-xs">{product.badge}</Badge>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loading && !query && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-600">ابدأ بكتابة اسم المنتج أو الفئة للبحث</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
