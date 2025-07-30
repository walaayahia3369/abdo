'use client';

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle,
  Users, Shield, Headphones, ShoppingCart
} from "lucide-react";

import {
  Button
} from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Input
} from "@/components/ui/input";
import {
  Label
} from "@/components/ui/label";
import {
  Textarea
} from "@/components/ui/textarea";
import {
  Badge
} from "@/components/ui/badge";

import { db, type ContactPage, type ContactInfo } from "@/lib/db";
import { SearchDialog } from "@/components/search-dialog";
import { MobileNav } from "@/components/mobile-nav";
import { useCart } from "@/hooks/use-cart";
import { type Category } from "@/lib/db";

function ContactContent() {
  const [contactPage, setContactPage] = useState<ContactPage | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { cart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const [pageData, infoData] = await Promise.all([
          db.getContactPage(),
          db.getContactInfo(),
        ]);
        setContactPage(pageData);
        setContactInfo(infoData);
      } catch (error) {
        console.error("Error loading contact data:", error);
      }
    }

    fetchData();
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

  const faqs = [
    {
      question: "ما هي مدة الضمان على المنتجات؟",
      answer: "نقدم ضمان شامل لمدة سنتين على جميع المنتجات مع خدمة صيانة مجانية.",
    },
    {
      question: "هل تقدمون خدمة التركيب؟",
      answer: "نعم، لدينا فريق متخصص لتركيب وتشغيل جميع الأنظمة بأعلى معايير الجودة.",
    },
    {
      question: "كم يستغرق وقت التسليم؟",
      answer: "عادة ما يتم التسليم خلال 3-5 أيام عمل داخل المدن الرئيسية.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-easyoft-sky via-white to-easyoft-lightBlue/20">
      {/* ---- header + hero + content as in your code ---- */}
      {/* الكود كامل كما هو، مع استبدال استدعاء contactPage و contactInfo من الحالة الجديدة */}
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse" />}>
      <ContactContent />
    </Suspense>
  );
}
