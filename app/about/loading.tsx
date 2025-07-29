import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Skeleton */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-6 w-20 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-16 w-80 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-8 w-96 mx-auto mb-8 bg-white/20" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32 bg-white/20" />
            <Skeleton className="h-12 w-32 bg-white/20" />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* About Content Skeleton */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Card>
            <CardContent className="p-0">
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Services Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-32 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center space-y-4">
                  <Skeleton className="h-8 w-8 mx-auto" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Skeleton */}
        <Card className="mb-16 p-8">
          <Skeleton className="h-8 w-40 mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-12 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </Card>

        {/* Team Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-8 w-32 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-20 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Skeleton */}
        <div>
          <Skeleton className="h-8 w-24 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center space-y-4">
                  <Skeleton className="h-12 w-12 mx-auto" />
                  <Skeleton className="h-6 w-24 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
