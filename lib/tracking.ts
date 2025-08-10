/**
 * Tracking helpers for GTM/GA4/TikTok + UTM capture.
 * Use NEXT_PUBLIC_GTM_ID / NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_TIKTOK_PIXEL on Vercel project settings.
 */
export function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== "undefined") {
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ event: name, ...(params || {}) })
    const ttq = (window as any).ttq
    if (ttq && typeof ttq.track === "function") {
      try {
        ttq.track(name, params || {})
      } catch {}
    }
  }
}

export function useScrollDepthTracking() {
  if (typeof window === "undefined") return
  const sent = new Set<number>()
  function onScroll() {
    const h = document.documentElement
    const depth = Math.round(((h.scrollTop + h.clientHeight) / h.scrollHeight) * 100)
    ;[25, 50, 75, 100].forEach((d) => {
      if (depth >= d && !sent.has(d)) {
        sent.add(d)
        trackEvent("scroll_depth", { depth: d })
      }
    })
  }
  window.removeEventListener("scroll", onScroll)
  window.addEventListener("scroll", onScroll, { passive: true })
}

export function captureAndStoreUTM() {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
  const entries: Record<string, string> = {}
  let found = false
  keys.forEach((k) => {
    const v = params.get(k)
    if (v) {
      entries[k] = v
      found = true
    }
  })
  if (found) sessionStorage.setItem("almrakb:utm", JSON.stringify(entries))
}

export function buildWhatsAppUrl({ phone, message }: { phone: string; message: string }) {
  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem("almrakb:utm")
    if (raw) {
      const utm = JSON.parse(raw) as Record<string, string>
      const utmQuery = new URLSearchParams(utm).toString()
      url += `%0A%0A${encodeURIComponent("بيانات الحملة:")}%0A${encodeURIComponent(utmQuery)}`
    }
  }
  return url
}
