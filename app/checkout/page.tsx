"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, CreditCard, Truck, Shield, ArrowRight, ArrowLeft } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { SearchDialog } from "@/components/search-dialog"
import { useCart } from "@/hooks/use-cart"
import { db } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const categories = db.getCategories()

  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const shippingCost = cart.total > 500 ? 0 : 50
  const tax = cart.total * 0.15
  const finalTotal = cart.total + shippingCost + tax

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">سلة التسوق فارغة</h2>
          <p className="text-gray-600 mb-8">لا يمكن المتابعة إلى الدفع بدون منتجات</p>
          <Link href="/products">
            <Button className="bg-red-600 hover:bg-red-700">
              تسوق الآن
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">تم تأكيد طلبك!</h2>
            <p className="text-gray-600 mb-6">شكراً لك على طلبك. سيتم التواصل معك قريباً لتأكيد التفاصيل.</p>
            <div className="space-y-3">
              <Link href="/products">
                <Button className="w-full bg-red-600 hover:bg-red-700">متابعة التسوق</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 space-x-reverse">
              <Image src="/logo.png" alt="EazySoft Logo" width={50} height={50} className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">EazySoft</h1>
                <p className="text-sm text-gray-600">حلول الأمان والمنازل الذكية</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4 space-x-reverse">
              <SearchDialog />
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.itemCount}
                  </span>
                </Button>
              </Link>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600">
            الرئيسية
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-red-600">
            سلة التسوق
          </Link>
          <span>/</span>
          <span className="text-gray-900">الدفع</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className={`flex items-center ${step >= 1 ? "text-red-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-red-600 text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <span className="mr-2">معلومات الشحن</span>
            </div>
            <ArrowLeft className="text-gray-400" />
            <div className={`flex items-center ${step >= 2 ? "text-red-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-red-600 text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <span className="mr-2">طريقة الدفع</span>
            </div>
            <ArrowLeft className="text-gray-400" />
            <div className={`flex items-center ${step >= 3 ? "text-red-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-red-600 text-white" : "bg-gray-200"}`}
              >
                3
              </div>
              <span className="mr-2">مراجعة الطلب</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="ml-2 h-5 w-5" />
                    معلومات الشحن
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                        placeholder="أدخل الاسم الأول"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                        placeholder="أدخل الاسم الأخير"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">العنوان</Label>
                    <Textarea
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="أدخل العنوان الكامل"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">المدينة</Label>
                      <Select
                        value={shippingInfo.city}
                        onValueChange={(value) => setShippingInfo((prev) => ({ ...prev, city: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="riyadh">الرياض</SelectItem>
                          <SelectItem value="jeddah">جدة</SelectItem>
                          <SelectItem value="dammam">الدمام</SelectItem>
                          <SelectItem value="mecca">مكة المكرمة</SelectItem>
                          <SelectItem value="medina">المدينة المنورة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">الرمز البريدي</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="12345"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                    <Textarea
                      id="notes"
                      value={shippingInfo.notes}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="أي ملاحظات خاصة بالطلب"
                      rows={2}
                    />
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={
                      !shippingInfo.firstName ||
                      !shippingInfo.lastName ||
                      !shippingInfo.email ||
                      !shippingInfo.phone ||
                      !shippingInfo.address ||
                      !shippingInfo.city
                    }
                  >
                    متابعة إلى الدفع
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="ml-2 h-5 w-5" />
                    طريقة الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span>بطاقة ائتمان / خصم</span>
                          <div className="flex space-x-2 space-x-reverse">
                            <Badge variant="outline">Visa</Badge>
                            <Badge variant="outline">Mastercard</Badge>
                            <Badge variant="outline">Mada</Badge>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        الدفع عند الاستلام
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse p-4 border rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 cursor-pointer">
                        تحويل بنكي
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">رقم البطاقة</Label>
                        <Input
                          id="cardNumber"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo((prev) => ({ ...prev, number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                          <Input
                            id="cardName"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="الاسم كما يظهر على البطاقة"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardExpiry">تاريخ الانتهاء</Label>
                          <Input
                            id="cardExpiry"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo((prev) => ({ ...prev, expiry: e.target.value }))}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                      </div>

                      <div className="w-32">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 space-x-reverse">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      <ArrowLeft className="ml-2 h-4 w-4" />
                      السابق
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1 bg-red-600 hover:bg-red-700">
                      مراجعة الطلب
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>مراجعة الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Info Review */}
                  <div>
                    <h3 className="font-semibold mb-2">معلومات الشحن</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.email}</p>
                      <p>{shippingInfo.phone}</p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.postalCode}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div>
                    <h3 className="font-semibold mb-2">طريقة الدفع</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {paymentMethod === "card" && "بطاقة ائتمان / خصم"}
                      {paymentMethod === "cash" && "الدفع عند الاستلام"}
                      {paymentMethod === "bank" && "تحويل بنكي"}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-2">المنتجات</h3>
                    <div className="space-y-3">
                      {cart.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 space-x-reverse p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="relative w-12 h-12">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                          </div>
                          <p className="font-bold">{(item.price * item.quantity).toLocaleString()} ر.س</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      أوافق على{" "}
                      <Link href="/terms" className="text-red-600 hover:underline">
                        الشروط والأحكام
                      </Link>
                    </Label>
                  </div>

                  <div className="flex space-x-4 space-x-reverse">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      <ArrowLeft className="ml-2 h-4 w-4" />
                      السابق
                    </Button>
                    <Button
                      onClick={handleSubmitOrder}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          جاري المعالجة...
                        </>
                      ) : (
                        <>
                          تأكيد الطلب
                          <Shield className="mr-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toLocaleString()} ر.س</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{cart.total.toLocaleString()} ر.س</span>
                  </div>

                  <div className="flex justify-between">
                    <span>الشحن:</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "مجاني" : `${shippingCost} ر.س`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة:</span>
                    <span>{tax.toLocaleString()} ر.س</span>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>المجموع الكلي:</span>
                      <span className="text-red-600">{finalTotal.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      ✓ دفع آمن
                    </Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      ✓ ضمان الجودة
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
