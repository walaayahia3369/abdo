"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, ImageIcon, Trash2, Search, FolderOpen } from "lucide-react"
import Image from "next/image"
import { imageUploadManager, type UploadedImage } from "@/lib/image-upload"
import { toast } from "@/hooks/use-toast"

interface ImageUploadDialogProps {
  onImageSelect: (imagePath: string) => void
  category?: string
  currentImage?: string
  trigger?: React.ReactNode
}

export function ImageUploadDialog({
  onImageSelect,
  category = "general",
  currentImage,
  trigger,
}: ImageUploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadImages = () => {
    const allImages = imageUploadManager.getAllImages()
    setImages(allImages)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        // التحقق من نوع الملف
        if (!file.type.startsWith("image/")) {
          toast({
            title: "خطأ في نوع الملف",
            description: "يرجى اختيار ملف صورة صالح",
            variant: "destructive",
          })
          continue
        }

        // التحقق من حجم الملف (5MB كحد أقصى)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "حجم الملف كبير جداً",
            description: "يرجى اختيار صورة أصغر من 5 ميجابايت",
            variant: "destructive",
          })
          continue
        }

        await imageUploadManager.saveImage(file, selectedCategory, file.name)
      }

      loadImages()
      toast({
        title: "تم رفع الصور بنجاح! 📸",
        description: `تم رفع ${files.length} صورة`,
      })
    } catch (error) {
      console.error("Error uploading images:", error)
      toast({
        title: "خطأ في رفع الصور",
        description: "حدث خطأ أثناء رفع الصور",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleImageSelect = (imagePath: string) => {
    onImageSelect(imagePath)
    setOpen(false)
    toast({
      title: "تم اختيار الصورة! ✅",
      description: "تم تحديد الصورة بنجاح",
    })
  }

  const handleDeleteImage = (imageId: string) => {
    if (imageUploadManager.deleteImage(imageId)) {
      loadImages()
      toast({
        title: "تم حذف الصورة",
        description: "تم حذف الصورة بنجاح",
      })
    }
  }

  const filteredImages = images.filter((img) => {
    const matchesSearch =
      searchQuery === "" ||
      img.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.altText?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || img.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = ["all", "products", "categories", "hero", "team", "general"]
  const categoryLabels: Record<string, string> = {
    all: "الكل",
    products: "المنتجات",
    categories: "الفئات",
    hero: "الهيرو",
    team: "الفريق",
    general: "عام",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full bg-transparent">
            <ImageIcon className="h-4 w-4 ml-2" />
            اختيار صورة
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            مكتبة الصور
          </DialogTitle>
          <DialogDescription>اختر صورة من المكتبة أو ارفع صورة جديدة</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="gallery" className="w-full" onValueChange={() => loadImages()}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">المكتبة</TabsTrigger>
            <TabsTrigger value="upload">رفع جديد</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">اسحب الصور هنا أو انقر للاختيار</p>
              <p className="text-sm text-gray-500 mb-4">PNG, JPG, GIF حتى 5MB</p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-gradient-to-r from-brand-primary to-easyoft-blue hover:from-easyoft-blue hover:to-brand-primary"
              >
                {uploading ? "جاري الرفع..." : "اختيار الصور"}
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">الفئة</Label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {categories
                  .filter((cat) => cat !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat]}
                    </option>
                  ))}
              </select>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            {/* البحث والفلترة */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الصور..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabels[cat]}
                  </option>
                ))}
              </select>
            </div>

            {/* عرض الصور */}
            <ScrollArea className="h-96">
              {filteredImages.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد صور في هذه الفئة</p>
                  <p className="text-sm text-gray-400 mt-2">انتقل إلى تبويب "رفع جديد" لإضافة صور</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-square relative">
                        <Image
                          src={image.filePath || "/placeholder.svg"}
                          alt={image.altText || image.originalName}
                          fill
                          className="object-cover"
                        />
                        {currentImage === image.filePath && (
                          <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500">
                            <Badge className="absolute top-2 right-2 bg-blue-500">محدد</Badge>
                          </div>
                        )}
                      </div>

                      <div className="p-2">
                        <p className="text-xs font-medium truncate" title={image.originalName}>
                          {image.originalName}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {categoryLabels[image.category]}
                          </Badge>
                          <span className="text-xs text-gray-500">{(image.fileSize / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>

                      {/* أزرار التحكم */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleImageSelect(image.filePath)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          اختيار
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteImage(image.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* معلومات التخزين */}
            <div className="text-sm text-gray-500 text-center">
              إجمالي الصور: {images.length} | حجم التخزين:{" "}
              {(imageUploadManager.getStorageSize() / 1024 / 1024).toFixed(2)} MB
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
