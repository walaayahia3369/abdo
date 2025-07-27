"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { db, type Product } from "@/lib/db"

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const searchProducts = async () => {
      setLoading(true)
      try {
        const products = await db.getProducts()
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered.slice(0, 6))
      } catch (error) {
        console.error("Error searching products:", error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>البحث في المنتجات</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="ابحث عن منتج..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10"
              autoFocus
            />
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-primary mx-auto"></div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} onClick={() => setOpen(false)}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{product.name}</h4>
                          <p className="text-xs text-gray-600">{product.category}</p>
                          <p className="text-sm font-bold text-brand-primary">{product.price.toLocaleString()} ر.س</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>لم يتم العثور على منتجات</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
