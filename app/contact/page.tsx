'use client';

import { Shield, Users, Headphones } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  const services = [
    {
      icon: Shield,
      title: "أنظمة الأمان",
      description: "تركيب وصيانة أنظمة الأمان المتطورة.",
    },
    {
      icon: Users,
      title: "استشارات تقنية",
      description: "استشارات مخصصة لحلول التكنولوجيا الحديثة.",
    },
    {
      icon: Headphones,
      title: "دعم فني",
      description: "دعم مستمر للإجابة على كل استفساراتك.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">تواصل معنا</h1>
        <p className="text-gray-600">نحن هنا للرد على استفساراتك ومساعدتك.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* نموذج التواصل */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <div>
            <label className="block mb-1 font-medium">الاسم</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">الرسالة</label>
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            إرسال
          </button>
          {sent && <p className="text-green-600">تم إرسال الرسالة بنجاح!</p>}
        </form>

        {/* معلومات التواصل + الخدمات */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">معلومات الاتصال</h2>
            <p><strong>الهاتف:</strong> 01001234567</p>
            <p><strong>البريد:</strong> info@academy.com</p>
            <p><strong>العنوان:</strong> القاهرة، مصر</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">خدماتنا</h2>
            {services.map((service, index) => (
              <div key={index} className="flex items-start gap-3 mb-4">
                <service.icon className="w-5 h-5 text-blue-600 mt-1" />
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
