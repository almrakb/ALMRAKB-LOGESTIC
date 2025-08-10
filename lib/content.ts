export type ServiceIcon = "Package" | "Clock" | "ShieldCheck" | "Warehouse" | "Truck" | "Factory"

export type SiteContent = {
  company: {
    name: string
    phone: string
    email: string
    address: string
    whatsappIntl: string
    blurb: string
    social: { label: string; href: string }[]
  }
  hero: { title: string; highlight: string; subtitle: string }
  offer: { text: string; endsAt: string }
  services: { subtitle: string; items: { title: string; desc: string; icon: ServiceIcon }[] }
  steps: { title: string; desc: string }[]
  why: { title: string; desc: string }[]
  testimonials: { name: string; city: string; text: string }[]
  faq: { q: string; a: string }[]
  cities: string[]
  clients: { name: string; src: string }[]
}

export const defaultContent: SiteContent = {
  company: {
    name: "المراكب للشحن",
    phone: "0594890045",
    email: "almrakb2030@gmail.com",
    address: "الرياض، المملكة العربية السعودية",
    whatsappIntl: "966594890045",
    blurb: "نقدم خدمات الشحن والتوصيل الأكثر موثوقية داخل المملكة بأساطيل حديثة ودعم مستمر.",
    social: [
      { label: "WhatsApp", href: "https://wa.me/966594890045" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "Twitter/X", href: "https://x.com" },
    ],
  },
  hero: {
    title: "شحن سريع وآمن لجميع مدن المملكة",
    highlight: "في نفس اليوم أو خلال 24 ساعة",
    subtitle:
      "نشحن الأثاث والطرود والبضائع داخل المملكة مع تغليف احترافي، تتبع مستمر، وأسعار تنافسية. نخدم القطعة الواحدة والكميات الكبيرة مع توفير شاحنات خاصة.",
  },
  offer: {
    text: "احجز اليوم واحصل على خصم 10٪ على شحنات الرياض ↔ جدة",
    endsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  services: {
    subtitle: "حلول شاملة للشحن والتخزين",
    items: [
      { title: "شحن الطرود والبضائع", desc: "شحن تجاري آمن لجميع أنواع البضائع.", icon: "Package" },
      { title: "تسليم سريع 24 ساعة", desc: "خدمة في نفس اليوم أو خلال 24 ساعة.", icon: "Clock" },
      { title: "شاحنات خاصة", desc: "شاحنات مخصصة للشحنات الكبيرة.", icon: "Truck" },
      { title: "حماية وتأمين", desc: "تغليف احترافي وضمان سلامة الشحنة.", icon: "ShieldCheck" },
      { title: "خدمة التخزين", desc: "إيجار شهري بمستودعات آمنة.", icon: "Warehouse" },
      { title: "تعاقدات الشركات", desc: "عقود مرنة للقطاعين الحكومي والتجاري.", icon: "Factory" },
    ],
  },
  steps: [
    { title: "طلب الخدمة", desc: "قدّم الطلب عبر النموذج أو واتساب." },
    { title: "تأكيد التفاصيل", desc: "نؤكد الموعد والتكلفة ونوع المركبة." },
    { title: "الاستلام والنقل", desc: "تحميل احترافي وتتبع مستمر." },
    { title: "التسليم والدفع", desc: "تسليم آمن وإصدار الفاتورة." },
  ],
  why: [
    { title: "سرعة في نفس اليوم", desc: "أسطول جاهز يغطي جميع المدن الرئيسية." },
    { title: "أمان وتغليف احترافي", desc: "معدات حديثة وفريق متخصص." },
    { title: "أفضل سعر مقابل القيمة", desc: "عروض مرنة وأسعار تنافسية." },
    { title: "تغطية لكل المملكة", desc: "نصل إلى جميع المناطق والمحافظات." },
  ],
  testimonials: [
    { name: "محمد العتيبي", city: "الرياض", text: "خدمة ممتازة وسريعة، وصل الأثاث بأمان وفي الموعد." },
    { name: "أميرة القحطاني", city: "جدة", text: "أسعار مناسبة وتعامل راقٍ. أنصح بشدة." },
    { name: "شركة التقوى", city: "جيزان", text: "تعاقد سلس والتزام بالمواعيد. شكراً لكم." },
  ],
  faq: [
    { q: "هل تقدمون خدمة في نفس اليوم؟", a: "نعم، تتوفر داخل عدة مدن رئيسية وحسب التوفر." },
    { q: "هل تغلفون الأثاث؟", a: "نوفر خدمة التغليف الاحترافي عند الطلب." },
    { q: "هل يمكن تتبع الشحنة؟", a: "نزوّدك بتحديثات مستمرة حتى التسليم." },
    { q: "طرق الدفع المتاحة؟", a: "تحويل بنكي أو نقداً عند التسليم وفق الاتفاق." },
    { q: "هل يوجد تأمين على الشحنة؟", a: "نوفر خيارات تأمين حسب نوع الشحنة وقيمتها." },
    { q: "هل تخدمون القطعة الواحدة؟", a: "نعم، نخدم القطعة الواحدة والكميات." },
    { q: "هل لديكم مستودعات للتخزين؟", a: "نعم، تتوفر خدمة التخزين بالإيجار الشهري." },
    { q: "هل تتعاملون مع الجهات الحكومية والشركات؟", a: "نعم، لدينا تعاقدات مرنة وسلسة." },
  ],
  cities: ["الرياض", "جدة", "جيزان", "خميس مشيط", "مكة", "المدينة", "الدمام", "الخبر", "أبها", "الطائف", "تبوك", "نجران"],
  clients: [
    { name: "Client A", src: "/images/clients/client-a.webp" },
    { name: "Client B", src: "/images/clients/client-b.webp" },
    { name: "Client C", src: "/images/clients/client-c.webp" },
    { name: "Client D", src: "/images/clients/client-d.webp" },
    { name: "Client E", src: "/images/clients/client-e.webp" },
    { name: "Client F", src: "/images/clients/client-f.webp" },
  ],
}
