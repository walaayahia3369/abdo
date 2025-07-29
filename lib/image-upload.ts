export interface UploadedImage {
  id: string
  filename: string
  originalName: string
  filePath: string
  fileSize: number
  mimeType: string
  altText?: string
  category: string
  createdAt: string
}

class ImageUploadManager {
  private storageKey = "easyoft_uploaded_images"

  // حفظ صورة جديدة
  saveImage(file: File, category = "general", altText?: string): Promise<UploadedImage> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const result = e.target?.result as string
          const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

          const uploadedImage: UploadedImage = {
            id: imageId,
            filename: `${imageId}_${file.name}`,
            originalName: file.name,
            filePath: result, // Base64 data URL
            fileSize: file.size,
            mimeType: file.type,
            altText: altText || file.name,
            category,
            createdAt: new Date().toISOString(),
          }

          // حفظ في localStorage
          const existingImages = this.getAllImages()
          existingImages.push(uploadedImage)
          localStorage.setItem(this.storageKey, JSON.stringify(existingImages))

          resolve(uploadedImage)
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error("فشل في قراءة الملف"))
      reader.readAsDataURL(file)
    })
  }

  // الحصول على جميع الصور
  getAllImages(): UploadedImage[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error loading images:", error)
      return []
    }
  }

  // الحصول على الصور حسب الفئة
  getImagesByCategory(category: string): UploadedImage[] {
    return this.getAllImages().filter((img) => img.category === category)
  }

  // الحصول على صورة بالمعرف
  getImageById(id: string): UploadedImage | null {
    return this.getAllImages().find((img) => img.id === id) || null
  }

  // حذف صورة
  deleteImage(id: string): boolean {
    try {
      const images = this.getAllImages()
      const filteredImages = images.filter((img) => img.id !== id)
      localStorage.setItem(this.storageKey, JSON.stringify(filteredImages))
      return true
    } catch (error) {
      console.error("Error deleting image:", error)
      return false
    }
  }

  // تحديث معلومات الصورة
  updateImage(id: string, updates: Partial<UploadedImage>): boolean {
    try {
      const images = this.getAllImages()
      const imageIndex = images.findIndex((img) => img.id === id)

      if (imageIndex === -1) return false

      images[imageIndex] = { ...images[imageIndex], ...updates }
      localStorage.setItem(this.storageKey, JSON.stringify(images))
      return true
    } catch (error) {
      console.error("Error updating image:", error)
      return false
    }
  }

  // البحث في الصور
  searchImages(query: string): UploadedImage[] {
    const searchTerm = query.toLowerCase()
    return this.getAllImages().filter(
      (img) =>
        img.originalName.toLowerCase().includes(searchTerm) ||
        img.altText?.toLowerCase().includes(searchTerm) ||
        img.category.toLowerCase().includes(searchTerm),
    )
  }

  // الحصول على حجم التخزين المستخدم
  getStorageSize(): number {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? new Blob([stored]).size : 0
    } catch (error) {
      return 0
    }
  }

  // تنظيف الصور القديمة (أكثر من 30 يوم)
  cleanupOldImages(): number {
    try {
      const images = this.getAllImages()
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const recentImages = images.filter((img) => new Date(img.createdAt) > thirtyDaysAgo)

      const deletedCount = images.length - recentImages.length

      if (deletedCount > 0) {
        localStorage.setItem(this.storageKey, JSON.stringify(recentImages))
      }

      return deletedCount
    } catch (error) {
      console.error("Error cleaning up images:", error)
      return 0
    }
  }
}

export const imageUploadManager = new ImageUploadManager()
