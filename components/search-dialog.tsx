"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart } from "lucide-react"
import { db, type Product } from "@/lib/db"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import Link from "next/link"

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate API delay
    const timer = setTimeout(() => {
      const allProducts = db.getProducts()
      const filtered = allProducts
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 8) // Limit to 8 results

      setResults(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      brand: product.brand,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]" dir="rtl">
        <DialogHeader>
          <DialogTitle>البحث في المنتجات</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن المنتجات..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">جاري البحث...</p>
              </div>
            )}

            {!isLoading && query.trim().length >= 2 && results.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">لم يتم العثور على نتائج</p>
                <p className="text-sm text-gray-500">جرب كلمات مختلفة أو تحقق من الإملاء</p>
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="space-y-3">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 space-x-reverse p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${product.id}`} onClick={() => setOpen(false)} className="block">
                        <h3 className="font-semibold text-gray-900 truncate hover:text-red-600">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {product.category} • {product.brand}
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          <span className="font-bold text-red-600">{product.price.toLocaleString()} ر.س</span>
                          {product.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                      </Link>
                    </div>

                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 flex-shrink-0"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {query.trim().length < 2 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">ابدأ بكتابة كلمة للبحث</p>
                <p className="text-sm text-gray-500">يمكنك البحث بالاسم أو الفئة أو العلامة التجارية</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
