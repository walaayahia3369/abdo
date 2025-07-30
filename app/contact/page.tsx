"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

// مكون فرعي خاص بالمحتوى
function ContactContent({
  message,
  setMessage,
  handleSubmit,
}: {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="اكتب رسالتك هنا"
          className="w-full border rounded p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          إرسال
        </button>
      </form>

      <div className="space-y-4 text-right">
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          <span>+20123456789</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          <span>contact@example.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>القاهرة، مصر</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>من 9 صباحًا إلى 5 مساءً</span>
        </div>
      </div>
    </div>
  );
}

// الصفحة الرئيسية
export default function ContactPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم إرسال الرسالة: " + message);
    setMessage("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">تواصل معنا</h1>
      <ContactContent
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
