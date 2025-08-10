import type React from "react"
import type { Metadata } from "next"
import { Cairo } from 'next/font/google'
import "./globals.css"
import Script from "next/script"

const cairo = Cairo({ subsets: ["arabic"], display: "swap", preload: true, weight: ["400", "600", "700", "800"] })

export const metadata: Metadata = {
  title: "المراكب للشحن – أسرع خدمة شحن موثوقة لجميع مدن المملكة",
  description:
    "شحن أثاث، طرود، وبضائع بسرعة وأمان وبأفضل الأسعار – تواصل معنا الآن.",
  metadataBase: new URL("https://al6-vk76.vercel.app/"),
  openGraph: {
    title: "المراكب للشحن – خدمة موثوقة داخل السعودية",
    description: "شحن سريع وآمن لجميع المدن مع تغليف احترافي وتتبع مستمر.",
    type: "website",
    locale: "ar_SA",
  },
  alternates: { canonical: "/" },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "المراكب للشحن",
  url: "https://al6-vk76.vercel.app/",
  email: "almrakb2030@gmail.com",
  telephone: "+966594890045",
  address: { "@type": "PostalAddress", addressLocality: "الرياض", addressCountry: "SA" },
  sameAs: ["https://instagram.com", "https://facebook.com", "https://x.com", "https://tiktok.com"],
  openingHours: "Sa-Th 08:00-22:00",
  areaServed: "Saudi Arabia",
  priceRange: "$$",
  makesOffer: [{ "@type": "Offer", name: "شحن الأثاث والطرود والبضائع" }],
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID
const gaId = process.env.NEXT_PUBLIC_GA_ID
const ttId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {gtmId && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}</Script>
        )}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); gtag('config', '${gaId}');
            `}</Script>
          </>
        )}
        {ttId && (
          <Script id="tiktok" strategy="afterInteractive">{`
            !function (w, d, t) {w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
            ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
            ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } };
            for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
            ttq.load = function (e, n) { var i = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {};
            ttq._i[e] = []; ttq._t = ttq._t || {}; ttq._t[e] = +new Date; ttq._o = ttq._o || {}; ttq._o[e] = n || {};
            var o = document.createElement("script"); o.type = "text/javascript"; o.async = !0; o.src = i + "?sdkid=" + e + "&lib=" + t;
            var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a) };
            ttq.load('${ttId}'); ttq.page();}(window, document, 'ttq');
          `}</Script>
        )}
      </head>
      <body className={cairo.className}>
        {gtmId && (
          <noscript>
            {`<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}
          </noscript>
        )}
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}
