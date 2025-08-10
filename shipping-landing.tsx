"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Truck,
  Package,
  Clock,
  Shield,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  MessageCircle,
  Building,
  Warehouse,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="المراكب للشحن" width={120} height={60} className="h-12 w-auto" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                خدماتنا
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                من نحن
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                اتصل بنا
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">احصل على عرض سعر</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">✨ الشحن السريع والآمن</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  المراكب للشحن
                  <span className="text-blue-600"> خدمة شحن موثوقة لجميع أنحاء المملكة</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  نشحن الأثاث والطرود والبضائع من الرياض إلى جدة وجيزان وخميس مشيط وجميع مدن المملكة. نخدم القطعة
                  الواحدة والكميات الكبيرة مع توفير شاحنات خاصة عند الطلب.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                  احجز شحنتك الآن
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600"
                  onClick={() => window.open("https://wa.me/966594890045", "_blank")}
                >
                  <MessageCircle className="h-5 w-5 ml-2" />
                  تواصل واتساب
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">+10K</div>
                  <div className="text-gray-600">شحنة شهرياً</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">خدمة العملاء</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">99%</div>
                  <div className="text-gray-600">معدل الرضا</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/company-building.png"
                alt="مبنى شركة المراكب للشحن"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">تم التسليم بنجاح</div>
                    <div className="text-sm text-gray-500">الرياض - جدة</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">خدماتنا المتميزة</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من خدمات الشحن والتوصيل لتلبية جميع احتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">شحن الأثاث</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  شحن آمن للأثاث والأجهزة المنزلية مع التغليف المتخصص
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">شحن الطرود والبضائع</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  شحن جميع أنواع الطرود والبضائع التجارية بأمان تام
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">القطعة الواحدة والكميات</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  نخدم القطعة الواحدة والكميات الكبيرة حسب احتياجاتك
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">شاحنات خاصة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  نوفر شاحنات خاصة عند الطلب للشحنات الكبيرة والمتخصصة
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">التعاقد مع القطاعات</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  تعاقد سلس مع القطاعات الحكومية والشركات التجارية
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Warehouse className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl">خدمة التخزين</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  خدمة التخزين بإيجار شهري في مستودعات آمنة ومجهزة
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fleet Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أسطولنا ومرافقنا</h2>
            <p className="text-xl text-gray-600">نمتلك أحدث الشاحنات والمستودعات المجهزة بأعلى المعايير</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/truck-fleet.png"
                alt="أسطول الشاحنات"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">أسطولنا الحديث</h3>
                  <p className="text-sm">شاحنات حديثة ومجهزة بأحدث التقنيات</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/warehouse-aerial.png"
                alt="المستودعات"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">مستودعات متطورة</h3>
                  <p className="text-sm">مساحات تخزين واسعة ومجهزة بأحدث المعدات</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/control-center.png"
                alt="مركز التحكم"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">مركز التحكم</h3>
                  <p className="text-sm">مراقبة وتتبع الشحنات على مدار الساعة</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/truck-loading.png"
                alt="تحميل البضائع"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">عمليات التحميل</h3>
                  <p className="text-sm">فريق متخصص في التعامل مع جميع أنواع البضائع</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/warehouse-interior.png"
                alt="داخل المستودع"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">التخزين الآمن</h3>
                  <p className="text-sm">أنظمة تخزين متقدمة وآمنة لجميع البضائع</p>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/night-delivery.png"
                alt="التوصيل الليلي"
                width={400}
                height={300}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">خدمة 24/7</h3>
                  <p className="text-sm">نعمل على مدار الساعة لضمان وصول شحناتكم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">المدن التي نخدمها</h2>
            <p className="text-xl text-gray-600">نغطي جميع المناطق الرئيسية في المملكة العربية السعودية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-bold text-lg">الرياض</h3>
              <p className="text-gray-600 text-sm">العاصمة</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg">جدة</h3>
              <p className="text-gray-600 text-sm">عروس البحر الأحمر</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">جيزان</h3>
              <p className="text-gray-600 text-sm">المنطقة الجنوبية</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg">خميس مشيط</h3>
              <p className="text-gray-600 text-sm">منطقة عسير</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md inline-block">
              <h3 className="font-bold text-xl text-blue-600 mb-2">+ جميع مدن المملكة</h3>
              <p className="text-gray-600">نصل إلى جميع المحافظات والمدن في أنحاء المملكة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">لماذا تختار المراكب للشحن؟</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">خبرة أكثر من 10 سنوات</h3>
                    <p className="text-gray-600">نخدم عملاءنا بخبرة واسعة في مجال الشحن والتوصيل</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">أسعار تنافسية</h3>
                    <p className="text-gray-600">أفضل الأسعار في السوق مع جودة خدمة عالية</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">شبكة توصيل واسعة</h3>
                    <p className="text-gray-600">نغطي جميع مناطق المملكة العربية السعودية</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">دعم فني متميز</h3>
                    <p className="text-gray-600">فريق دعم متاح 24/7 لمساعدتك في أي وقت</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/blue-trucks.png"
                alt="أسطول الشاحنات الزرقاء"
                width={500}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">تقييم العملاء</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">احصل على عرض سعر مجاني</h2>
              <p className="text-xl text-gray-600">املأ النموذج وسنتواصل معك خلال دقائق</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                      <Input placeholder="أدخل اسمك الكامل" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <Input placeholder="05xxxxxxxx" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <Input type="email" placeholder="example@email.com" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المدينة المرسل منها</label>
                      <Input placeholder="الرياض" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">المدينة المرسل إليها</label>
                      <Input placeholder="جدة" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تفاصيل الشحنة</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="اكتب تفاصيل الشحنة (الوزن، الحجم، نوع البضاعة...)"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">احصل على عرض السعر</Button>
                </form>
              </Card>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">تواصل معنا</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">الهاتف</div>
                        <div className="text-gray-600">0594890045</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <MessageCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">واتساب</div>
                        <div className="text-gray-600">
                          <a
                            href="https://wa.me/966594890045"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-600 transition-colors"
                          >
                            0594890045
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">البريد الإلكتروني</div>
                        <div className="text-gray-600">almrakb2030@gmail.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">العنوان</div>
                        <div className="text-gray-600">الرياض، المملكة العربية السعودية</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3">ساعات العمل</h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>السبت - الخميس</span>
                      <span>8:00 ص - 10:00 م</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الجمعة</span>
                      <span>2:00 م - 10:00 م</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="المراكب للشحن" width={120} height={60} className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 mb-4">
                المراكب للشحن - نقدم خدمات الشحن والتوصيل الأكثر موثوقية في المملكة العربية السعودية
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">خدماتنا</h3>
              <ul className="space-y-2 text-gray-400">
                <li>شحن الأثاث</li>
                <li>شحن الطرود والبضائع</li>
                <li>القطعة الواحدة والكميات</li>
                <li>شاحنات خاصة عند الطلب</li>
                <li>التعاقد مع القطاعات</li>
                <li>خدمة التخزين</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">روابط مهمة</h3>
              <ul className="space-y-2 text-gray-400">
                <li>تتبع الشحنة</li>
                <li>حاسبة الأسعار</li>
                <li>الشروط والأحكام</li>
                <li>سياسة الخصوصية</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">تواصل معنا</h3>
              <div className="space-y-2 text-gray-400">
                <div>0594890045</div>
                <div>almrakb2030@gmail.com</div>
                <div>الرياض، السعودية</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 المراكب للشحن. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="https://wa.me/966594890045"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden md:inline font-medium">واتساب</span>
        </a>
      </div>
    </div>
  )
}
