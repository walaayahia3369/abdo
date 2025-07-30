'use client';

import { useState, useEffect, Suspense } from "react";
import { Shield, Users, Headphones } from "lucide-react";

export default function ContactPage() {
  const [contactPage, setContactPage] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    // مؤقتًا - بيانات ثابتة كمثال
    setContactPage({ title: "تواصل معنا", subtitle: "نحن هنا للرد على استفساراتك." });
    setContactInfo({
      phone: "+20123456789",
      email: "info@academy.com",
      address: "شارع المعرفة، القاهرة، مصر",
    });
  }, []);

  const services = [
    {
      icon: Shield,
      title: "أنظمة الأمان",
      description: "تركيب وصيانة أنظمة الأمان المتطورة",
    },
    {
      icon: Users,
      title: "الاستشارات التقنية",
      description: "استشارات متخصصة في حلول التكنولوجيا الذكية",
    },
    {
      icon: Headphones,
      title: "الدعم الفني",
      description: "دعم فني متواصل على مدار الساعة",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          {contactPage?.title || "تواصل معنا"}
        </h1>
        <p className="text-gray-600 mb-10">
          {contactPage?.subtitle || "نحن هنا لمساعدتك في أي وقت"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">الاسم</label>
            <input type="text" className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input type="email" className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">الرسالة</label>
            <textarea rows={4} className="w-full border px-3 py-2 rounded"></textarea>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">إرسال</button>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold mb-2">معلومات الاتصال</h2>
            <p><strong>الهاتف:</strong> {contactInfo?.phone}</p>
            <p><strong>البريد:</strong> {contactInfo?.email}</p>
            <p><strong>العنوان:</strong> {contactInfo?.address}</p>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h2 className="font-semibold mb-4">خدماتنا</h2>
            {services.map((service, idx) => (
              <div key={idx} className="flex items-start gap-3 mb-3">
                <service.icon className="w-5 h-5 mt-1 text-blue-600" />
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
