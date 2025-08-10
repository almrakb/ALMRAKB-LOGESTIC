"use client"

import { useEffect, useState } from "react"
import { defaultContent, type SiteContent } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPage() {
  const [json, setJson] = useState(JSON.stringify(defaultContent, null, 2))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("almrakb:content")
    if (saved) setJson(JSON.stringify(JSON.parse(saved), null, 2))
  }, [])

  function save() {
    try {
      const parsed: SiteContent = JSON.parse(json)
      localStorage.setItem("almrakb:content", JSON.stringify(parsed))
      setError(null)
      alert("تم الحفظ. قم بإعادة تحميل الصفحة الرئيسية لمشاهدة التغييرات.")
    } catch (e: any) {
      setError("JSON غير صالح. تأكد من الصيغة.")
    }
  }

  function reset() {
    localStorage.removeItem("almrakb:content")
    setJson(JSON.stringify(defaultContent, null, 2))
    alert("تمت إعادة التعيين.")
  }

  return (
    <div className="container mx-auto px-4 py-10" dir="rtl">
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم المبسطة (محلية)</h1>
      <p className="text-gray-600 mb-4">حرر محتوى الصفحة عبر JSON واحفظه في المتصفح (LocalStorage).</p>
      <Textarea value={json} onChange={(e) => setJson(e.target.value)} rows={28} className="font-mono" />
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <div className="flex gap-3 mt-4">
        <Button onClick={save}>حفظ</Button>
        <Button variant="outline" onClick={reset}>إعادة تعيين</Button>
      </div>
    </div>
  )
}
