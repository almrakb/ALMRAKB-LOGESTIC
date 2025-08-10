"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BadgePercent, CheckCircle2, Clock, Factory, Globe, LineChart, MapPin, MessageCircle, Package, Phone, Play, ShieldCheck, Star, Truck, Warehouse, Rocket } from 'lucide-react'
import { trackEvent, useScrollDepthTracking, buildWhatsAppUrl, captureAndStoreUTM } from "@/lib/tracking"
import { defaultContent, type SiteContent } from "@/lib/content"

function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "lg",
  ariaLabel,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "outline"
  size?: "sm" | "md" | "lg"
  ariaLabel?: string
}) {
  const base =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white"
      : "bg-white/80 text-blue-700 border border-blue-200 hover:bg-white"
  const pad = size === "lg" ? "px-8 py-3 text-lg" : size === "md" ? "px-5 py-2.5" : "px-4 py-2 text-sm"
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`rounded-lg inline-flex items-center justify-center font-semibold transition-colors ${base} ${pad}`}
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`rounded-lg inline-flex items-center justify-center font-semibold transition-colors ${base} ${pad}`}
    >
      {children}
    </button>
  )
}

function Countdown({ endsAt }: { endsAt: string }) {
  const [delta, setDelta] = useState(() => Math.max(0, new Date(endsAt).getTime() - Date.now()))
  useEffect(() => {
    const id = setInterval(() => setDelta(Math.max(0, new Date(endsAt).getTime() - Date.now())), 1000)
    return () => clearInterval(id)
  }, [endsAt])
  const d = Math.floor(delta / (1000 * 60 * 60 * 24))
  const h = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((delta % (1000 * 60)) / 1000)
  if (delta <= 0) return <span className="font-bold text-yellow-200">انتهى العرض</span>
  return (
    <div aria-live="polite" className="flex items-center gap-2 text-white">
      <div className="bg-white/20 rounded-md px-3 py-1 font-bold tabular-nums shadow-sm">{d}ي</div>
      <div className="bg-white/20 rounded-md px-3 py-1 font-bold tabular-nums shadow-sm">{h}س</div>
      <div className="bg-white/20 rounded-md px-3 py-1 font-bold tabular-nums shadow-sm">{m}د</div>
      <div className="bg-white/20 rounded-md px-3 py-1 font-bold tabular-nums shadow-sm">{s}ث</div>
    </div>
  )
}

export default function Page() {
  // content state (editable from /admin)
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("almrakb:content")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return defaultContent
        }
      }
    }
    return defaultContent
  })

  // sticky header state
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    captureAndStoreUTM()
  }, [])
  useScrollDepthTracking()

  const { toast } = useToast()

  const waHref = useMemo(() => {
    return buildWhatsAppUrl({
      phone: content.company.whatsappIntl,
      message: `مرحباً، أود الحصول على عرض سعر للشحن مع ${content.company.name}.`,
    })
  }, [content.company.name, content.company.whatsappIntl])

  // Quote form state + validation
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    fromCity: "الرياض",
    toCity: "جدة",
    details: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const submittingRef = useRef(false)

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "الاسم مطلوب"
    if (!form.phone.trim()) e.phone = "رقم الهاتف مطلوب"
    if (!form.fromCity.trim()) e.fromCity = "المدينة مطلوبة"
    if (!form.toCity.trim()) e.toCity = "المدينة مطلوبة"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmitQuote(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      toast({ title: "يرجى إكمال الحقول المطلوبة", description: "تحقق من الحقول باللون الأحمر", variant: "destructive" })
      return
    }
    if (submittingRef.current) return
    submittingRef.current = true

    try {
      const msg = `طلب عرض سعر:
الاسم: ${form.name}
الهاتف: ${form.phone}
البريد: ${form.email || "-"}
من: ${form.fromCity} ➝ إلى: ${form.toCity}
التفاصيل: ${form.details || "-"}`

      const url = buildWhatsAppUrl({ phone: content.company.whatsappIntl, message: msg })
      trackEvent("form_submit", { form: "instant_quote" })
      toast({ title: "سيتم فتح واتساب لإرسال التفاصيل", description: "شكراً لتواصلك معنا." })
      window.open(url, "_blank", "noopener,noreferrer")
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <main className="bg-white" dir="rtl">
      {/* Sticky Header with translucent bg when scrolled */}
      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled ? "bg-white/85 backdrop-blur border-b shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt={content.company.name} width={120} height={48} className="h-10 w-auto" priority />
            <span className="sr-only">{content.company.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#services" className="text-gray-700 hover:text-blue-700">
              خدماتنا
            </Link>
            <Link href="#why" className="text-gray-700 hover:text-blue-700">
              لماذا نحن
            </Link>
            <Link href="#testimonials" className="text-gray-700 hover:text-blue-700">
              الآراء
            </Link>
            <Link href="#faq" className="text-gray-700 hover:text-blue-700">
              الأسئلة
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <CTAButton
              ariaLabel="تواصل عبر واتساب"
              variant="outline"
              size="md"
              href={waHref}
              onClick={() => trackEvent("whatsapp_click", { position: "header" })}
            >
              <MessageCircle className="w-5 h-5 ml-2" /> واتساب
            </CTAButton>
            <CTAButton size="md" href="#quote" onClick={() => trackEvent("cta_click", { position: "header" })}>
              احصل على عرض سعر
            </CTAButton>
          </div>
        </div>
      </header>

      {/* Hero with background image + gradient overlay */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/custom/hq-building.png"
            alt="مبنى الشركة الرئيسي المراكب للشحن"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 inline-flex items-center gap-2">
                <Rocket className="w-4 h-4" /> التوصيل السريع والآمن
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                {content.hero.title}
                <span className="text-blue-700"> {content.hero.highlight}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700">{content.hero.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <CTAButton
                  ariaLabel="احجز شحنتك الآن"
                  href="#quote"
                  onClick={() => trackEvent("cta_click", { position: "hero" })}
                  size="lg"
                >
                  احجز شحنتك الآن
                </CTAButton>
                <CTAButton
                  ariaLabel="تواصل واتساب"
                  variant="outline"
                  href={waHref}
                  onClick={() => trackEvent("whatsapp_click", { position: "hero" })}
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  تواصل واتساب
                </CTAButton>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-700">تقييم 4.9/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">ضمان وصول</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">خدمة 24/7</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/custom/control-room.png"
                  alt="مركز التحكم والمتابعة"
                  width={900}
                  height={650}
                  className="h-auto w-full"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <button
                  onClick={() => trackEvent("hero_media_click")}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 shadow flex items-center gap-2 text-sm"
                >
                  <Play className="w-4 h-4" /> نظرة سريعة
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited offer with countdown */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BadgePercent className="w-6 h-6" />
            <p className="font-semibold text-lg">عرض محدود: {content.offer.text}</p>
          </div>
          <Countdown endsAt={content.offer.endsAt} />
          <CTAButton
            href="#quote"
            onClick={() => trackEvent("cta_click", { position: "countdown_banner" })}
            variant="primary"
            size="md"
          >
            احصل على الخصم الآن
          </CTAButton>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-18 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
              <Truck className="w-8 h-8 text-blue-600" /> خدماتنا
            </h2>
            <p className="text-gray-600 text-lg">{content.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.items.map((s) => (
              <Card key={s.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mb-3 mx-auto">
                    {s.icon === "Package" && <Package className="w-7 h-7" />}
                    {s.icon === "Clock" && <Clock className="w-7 h-7" />}
                    {s.icon === "ShieldCheck" && <ShieldCheck className="w-7 h-7" />}
                    {s.icon === "Warehouse" && <Warehouse className="w-7 h-7" />}
                    {s.icon === "Truck" && <Truck className="w-7 h-7" />}
                    {s.icon === "Factory" && <Factory className="w-7 h-7" />}
                  </div>
                  <CardTitle className="text-center">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{s.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <CTAButton href="#quote" onClick={() => trackEvent("cta_click", { position: "services_bottom" })}>
              احصل على عرض سعر فوري
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-18 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center flex items-center justify-center gap-3">
            <LineChart className="w-8 h-8 text-blue-600" /> خطوات الشحن لدينا
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {content.steps.map((st, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm border">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-1">{st.title}</h3>
                <p className="text-gray-600 text-sm">{st.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <CTAButton href="#quote" onClick={() => trackEvent("cta_click", { position: "steps_bottom" })}>
              اطلب شاحنة الآن
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Fleet Gallery */}
      <section className="py-18 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">أسطولنا ومرافقنا</h2>
            <p className="text-gray-600">شاحنات حديثة ومستودعات مجهزة لضمان خدمة ممتازة</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
    { src: "/images/custom/blue-trucks-offer.png", title: "أسطول الشاحنات" },
    { src: "/images/custom/warehouse-aerial-branded.png", title: "مستودعاتنا" },
    { src: "/images/custom/control-room.png", title: "مركز التحكم" },
    { src: "/images/custom/truck-dock-branded.png", title: "تحميل وتفريغ احترافي" },
    { src: "/images/custom/warehouse-interior-branded.png", title: "تخزين آمن" },
    { src: "/images/custom/night-street-truck.png", title: "توصيل ليلي" },
    { src: "/images/custom/white-trucks-yard.png", title: "جاهزية الأسطول" },
    { src: "/images/custom/hq-building.png", title: "المقر الرئيسي" },
  ].map((g) => (
              <div key={g.src} className="relative group overflow-hidden rounded-xl shadow">
                <Image
                  src={g.src || "/placeholder.svg"}
                  alt={g.title}
                  width={500}
                  height={350}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 right-3 text-white font-semibold">{g.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-18 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">لماذا تختار {content.company.name}؟</h2>
              <div className="space-y-5">
                {content.why.map((w) => (
                  <div key={w.title} className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-700 rounded-full p-2 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{w.title}</h3>
                      <p className="text-gray-600 text-sm">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <CTAButton href="#quote" onClick={() => trackEvent("cta_click", { position: "why_us" })}>
                  احصل على عرض السعر
                </CTAButton>
                <CTAButton
                  variant="outline"
                  href={waHref}
                  onClick={() => trackEvent("whatsapp_click", { position: "why_us" })}
                >
                  تواصل واتساب
                </CTAButton>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/blue-trucks.webp"
                alt="أسطول الشاحنات"
                width={700}
                height={520}
                className="rounded-2xl shadow-xl"
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -top-5 -left-5 bg-white shadow px-4 py-2 rounded-xl flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="font-semibold">4.9/5 تقييم العملاء</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients logos */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">شركات نتعامل معها</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {content.clients.map((c) => (
              <div key={c.name} className="flex items-center justify-center">
                <Image
                  src={c.src || "/placeholder.svg"}
                  alt={`شعار ${c.name}`}
                  width={140}
                  height={60}
                  className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-18 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">آراء عملائنا</h2>
            <p className="text-gray-600">ثقة تمتد عبر آلاف الشحنات</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {content.testimonials.map((t) => (
              <Card key={t.name} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt={`صورة ${t.name}`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-base">{t.name}</CardTitle>
                      <CardDescription>{t.city}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex text-yellow-400 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700">{t.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <CTAButton href="#quote" onClick={() => trackEvent("cta_click", { position: "testimonials_bottom" })}>
              جرّبنا اليوم
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Map and Cities */}
      <section className="py-18 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-7 h-7 text-blue-600" /> المدن التي نخدمها
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {content.cities.map((c) => (
                  <div key={c} className="bg-white rounded-lg p-4 shadow border text-center">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <p className="font-medium">{c}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border shadow bg-white">
              <iframe
                title="خريطة مناطق الخدمة"
                src="https://maps.google.com/maps?q=Riyadh%2C%20Saudi%20Arabia&t=&z=6&ie=UTF8&iwloc=&output=embed"
                className="w-full h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instant Quote Form */}
      <section id="quote" className="py-18 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                احصل على عرض سعر فوري
              </h2>
              <p className="text-gray-600 mb-6">
                املأ البيانات التالية وسيتم توجيهك مباشرة إلى واتساب لإرسال التفاصيل لفريقنا.
              </p>

              <form className="space-y-4" onSubmit={onSubmitQuote} noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">الاسم الكامل</label>
                    <Input
                      required
                      aria-invalid={!!errors.name}
                      className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="أدخل اسمك"
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">رقم الهاتف</label>
                    <Input
                      required
                      aria-invalid={!!errors.phone}
                      className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="05xxxxxxxx"
                    />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">البريد الإلكتروني</label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">من مدينة</label>
                    <Input
                      required
                      aria-invalid={!!errors.fromCity}
                      className={errors.fromCity ? "border-red-500 focus-visible:ring-red-500" : ""}
                      value={form.fromCity}
                      onChange={(e) => setForm((p) => ({ ...p, fromCity: e.target.value }))}
                      placeholder="الرياض"
                    />
                    {errors.fromCity && <p className="text-red-600 text-xs mt-1">{errors.fromCity}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">إلى مدينة</label>
                    <Input
                      required
                      aria-invalid={!!errors.toCity}
                      className={errors.toCity ? "border-red-500 focus-visible:ring-red-500" : ""}
                      value={form.toCity}
                      onChange={(e) => setForm((p) => ({ ...p, toCity: e.target.value }))}
                      placeholder="جدة"
                    />
                    {errors.toCity && <p className="text-red-600 text-xs mt-1">{errors.toCity}</p>}
                  </div>
                  <div>
                    <label className="text-sm text-gray-700">نوع الشحنة</label>
                    <Input
                      placeholder="أثاث، طرود، بضائع..."
                      onChange={(e) => setForm((p) => ({ ...p, details: `${p.details}` }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700">تفاصيل إضافية</label>
                  <Textarea
                    rows={4}
                    placeholder="الوزن، الحجم، ملاحظات خاصة..."
                    value={form.details}
                    onChange={(e) => setForm((p) => ({ ...p, details: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 px-8 py-6 text-lg">
                    إرسال عبر واتساب
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      trackEvent("whatsapp_click", { position: "quote_secondary" })
                      window.open(waHref, "_blank", "noopener,noreferrer")
                    }}
                  >
                    تواصل مباشرة
                  </Button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" /> ضمان الجودة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    نلتزم بسلامة الشحنة من التحميل حتى التسليم، مع تغليف احترافي وتتبع مستمر.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" /> سرعة في نفس اليوم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">خدمة في نفس اليوم أو خلال 24 ساعة حسب المدينة.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-600" /> دعم على مدار الساعة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">فريق خدمة العملاء جاهز لمساعدتك في أي وقت.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-18 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">الأسئلة الشائعة</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {content.faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-right">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-gray-700">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="text-center mt-10">
            <CTAButton href="#quote" onClick={() => trackEvent("cta_click", { position: "faq_bottom" })}>
              احصل على عرض الآن
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Image src="/logo.png" alt={content.company.name} width={120} height={48} className="h-10 w-auto" />
              <p className="text-gray-400 mt-4">{content.company.blurb}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">خدماتنا</h3>
              <ul className="text-gray-300 space-y-2">
                {content.services.items.slice(0, 6).map((s) => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">تواصل</h3>
              <ul className="text-gray-300 space-y-2">
                <li>الهاتف: {content.company.phone}</li>
                <li>البريد: {content.company.email}</li>
                <li>العنوان: {content.company.address}</li>
              </ul>
              <div className="flex gap-3 mt-3">
                {content.company.social.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">روابط مهمة</h3>
              <ul className="text-gray-300 space-y-2">
                <li>
                  <Link href="#quote">عرض السعر</Link>
                </li>
                <li>
                  <Link href="#services">الخدمات</Link>
                </li>
                <li>
                  <Link href="#faq">الأسئلة الشائعة</Link>
                </li>
                <li>
                  <Link href={waHref} target="_blank" rel="noopener noreferrer">
                    واتساب
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {content.company.name}. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button with gentle pulse */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href={waHref}
          aria-label="زر واتساب عائم"
          onClick={() => trackEvent("whatsapp_click", { position: "floating" })}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden md:inline font-medium">واتساب</span>
        </a>
      </div>
    </main>
  )
}
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-780NLK51R0`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-780NLK51R0', { debug_mode: true });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
