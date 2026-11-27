# 🤰 eGebelik — Proje Planı ve Teknik Yol Haritası

> **Vizyon:** Gebelik sürecinin bilimsel, magazinsel, sosyal ve klinik takip yönlerini tek bir çatı altında buluşturan; anne adaylarının tüm bilgi, sağlık, eğlence ve duygusal ihtiyaçlarına yanıt verirken **kadın doğum uzmanlarıyla hasta takibi köprüsü kuran** yeni nesil, **çok dilli** ve **kendi sunucumuzda barındırılan** **PWA Web & Mobil Yaşam Alanı**.

## 1. Proje Özeti ve Konumlandırma

**eGebelik**, yalnızca bir "hafta hafta gebelik hesaplayıcısı" değil; anne adayının 40 hafta (ve doğum sonrası erken dönem) boyunca her gün açmak isteyeceği bütüncül bir dijital ekosistemdir. Uygulama dört temel sütun üzerine inşa edilir:

1. **🔬 Bilimsel & Güvenilir (Akıl):** Kanıta dayalı tıbbi içerikler, akıllı sağlık takip araçları, doktor kontrolü/test takvimi ve güvenli yapay zeka asistanı.

2. **🩺 Klinik Köprü & Doktor Takibi (Güven):** Kadın doğum uzmanlarının kendi hastalarının gelişimlerini canlı olarak izleyebildiği, kişiye özel öneriler iletip randevuları yönetebildiği kapalı devre doktor-hasta alanı.

3. **✨ Magazinsel & Yaşam Tarzı (Keyif):** Hamile modası, bebek odası ilhamları, ünlü annelerden trendler, eşle oynanabilen isim bulma oyunları ve eğlenceli testler.

4. **🤝 Sosyal & Duygusal (Kalp):** Aynı ay doğum yapacak anneler kulüpleri, yargısız anonim soru-cevap alanı, ruh hali takibi, meditasyon ve bebeğe mektuplar.

İki çapraz ilke tüm sütunları kapsar:

* **🌍 Çok Dilli (Varsayılan Türkçe):** Arayüz, bildirimler, e-postalar, AI asistan ve içerikler birden fazla dilde sunulabilecek şekilde tasarlanır. İlk sürümde **Türkçe (varsayılan) + İngilizce**; yeni dil eklemek kod değişikliği değil, çeviri dosyası ve içerik çevirisi işidir (bkz. Bölüm 5).

* **🏠 Kendi Altyapımız (Self-Hosted):** Uygulama kodu ve veritabanı, üçüncü taraf bulut platformları (Vercel, Supabase Cloud) yerine **kendi VPS sunucumuzda** Docker Compose ile çalışır. Sağlık verisi kendi kontrolümüzdeki sunucuda kalır (bkz. Bölüm 6).

## 2. Hedef Kitle ve Kullanıcı Personaları

| Persona | İhtiyaçlar | eGebelik'te En Çok Kullanacağı Özellikler | 
| ----- | ----- | ----- | 
| **İlk Kez Anne Adayı** | Yüksek kaygı, her belirtiyi araştırma, doktoruyla bağlantıda kalma | Hafta hafta rehber, doktor öneri kartları, anonim forum, hastane çantası listesi | 
| **Deneyimli Anne Adayı** | Pratiklik, hızlı takip, zaman yönetimi | Tekme/kasılma sayacı, doktor randevu takvimi, hızlı kontrol listeleri | 
| **Baba Adayı / Eş** | Sürece dahil olma, eşini anlama | "Eş Modu" (haftalık empati özetleri), ortak isim seçme oyunu, alışveriş listesi | 
| **Türkiye'de Yaşayan Yabancı Anne Adayı** | Türkçe bilmeden Türk sağlık sistemine uyum, doktoruyla anlaşabilme | Kendi dilinde arayüz ve haftalık rehber, doktor önerilerinin kendi dilinde arayüzle sunulması, randevu hatırlatmaları | 
| **Kadın Doğum Uzmanı (Doktor)** | Hastalarının ara dönem verilerini (tansiyon, kilo, semptom) düzenli görme, randevu ve öneri yönetimi | **Doktor Portalı:** Hasta listesi, haftalık gelişim grafikleri, randevu oluşturma, hastaya özel öneri/not gönderme | 
| **İçerik Uzmanı / Editör / Çevirmen** | Topluma güvenilir içerik üretme ve doğru çeviri | Doğrulanmış makale yazarlığı (Diyetisyen, Doula, Psikolog, Ebe), içerik çevirisi ve dil bazlı tıbbi gözden geçirme | 

## 3. Özellik Mimarisi (Modüller)

### 3.1. Çekirdek Takip ve Bilimsel Modül

* **Kişiselleştirilmiş Ana Ekran:** Son adet tarihi (SAT) veya tahmini doğum tarihine (TDT) göre dinamik hafta/gün sayacı, bebeğin boyut benzetmesi (meyve/nesne + özgün illüstrasyonlar), anne ve bebekteki haftalık değişimler. Haftalık içerikler kullanıcının seçtiği dilde gösterilir.

* **Sağlık & Ölçüm Araçları:**

  * **Tekme Sayacı:** Oturum bazlı hareket kaydı ve grafiksel geçmiş.

  * **Kasılma Zamanlayıcı:** Sıklık ve süre takibi, "hastaneye gitme zamanı" uyarı algoritması (5-1-1 kuralı).

  * **Kilo, Su ve Tansiyon Takibi:** Trimester bazlı sağlıklı aralık görselleştirmesi (onay verilirse takip eden doktorun paneline anlık yansır). Ölçüler veritabanında tek birimde (kg, ml, mmHg) saklanır; gösterim yerel ayara göre biçimlendirilir.

* **Takvim & Hatırlatıcılar:** Doktor randevuları, tarama testleri (ikili/üçlü test, şeker yüklemesi vb.), vitamin/ilaç hatırlatıcıları (Push Notification destekli, kullanıcının dilinde).

* **AI Gebelik Asistanı (Güvenli Mod):** Kullanıcının bulunduğu haftayı ve tercih ettiği dili bilen, tıbbi teşhis koymadan bilgilendirme yapan ve kırmızı bayrak belirtilerde (kanama, şiddetli baş ağrısı vb.) derhal kendi doktoruna veya acile yönlendiren yapay zeka sohbeti.

### 3.2. Sosyal Yaşam Alanı & Topluluk

* **Doğum Ayı Kulüpleri:** Örn. *"Eylül 2027 Anneleri"* — Aynı haftalarda olan anne adaylarının otomatik eşleştiği topluluk akışları. Kulüp adları çevrilebilir; gönderiler yazıldığı dilde kalır ve gönderinin dili (`locale`) kaydedilir (ileride dil filtresi / otomatik çeviri için).

* **Anonim Dertleşme & Soru-Cevap:** Kimliğini gizleyerek hassas soruları (cinsellik, aile içi stres, korkular) sorabilme.

* **Aşerme & Anı Duvarı:** Mizahi, sıcak ve etkileşimli mikro paylaşımlar.

* **Güvenli Alan Moderasyonu:** Yapay zeka destekli toksik içerik/tıbbi yanlış yönlendirme filtresi (desteklenen tüm dillerde) + kullanıcı raporlama sistemi.

### 3.3. Magazin, Eğlence & Yaşam Tarzı

* **İsim Bulucu (Eşleşmeli):** Tinder mantığıyla sağa/sola kaydırmalı isim keşfi. Eş hesabı bağlandığında ikisinin de beğendiği isimler "Ortak Favoriler" listesine düşer. İsimlerin anlamları çevrilebilir; köken (origin) filtresiyle farklı kültürlerden isimler sunulabilir.

* **Keşfet & Magazin Akışı:** Hamile stili, bebek odası dekorasyonu, ürün incelemeleri, popüler anne-bebek haberleri, kısa okuma kartları. Yalnızca kullanıcının dilinde mevcut içerikler (veya açıkça işaretlenmiş varsayılan dil yedeği) gösterilir.

* **Eğlencelik Araçlar:** Çin takvimi (tamamen eğlence amaçlı olduğu belirtilerek), haftalık göbek fotoğrafı kolaj oluşturucu (Time-lapse).

### 3.4. Duygusal Destek & Hazırlık

* **Duygu Durumu (Mood) Günlüğü:** Günlük his kaydı ve ruh haline göre önerilen mikro içerikler.

* **Zihin & Nefes:** Gebeliğe özel nefes egzersizleri, uyku ve doğum korkusu (tokofobi) için sesli rehberler (dil bazlı ses dosyaları).

* **Bebeğime Mektuplar:** Fotoğraflı dijital anı günlüğü (doğum sonrası PDF olarak dışa aktarılabilir).

* **Akıllı Listeler:** Hastane çantası (anne, bebek, refakatçi), yenidoğan alışveriş listesi ve doğum planı oluşturucu. Hazır liste maddeleri çeviri anahtarlarıyla, kullanıcının eklediği maddeler serbest metinle tutulur.

### 3.5. Kadın Doğum Uzmanı Portalı & Hasta Takip Modülü (Doktor Rolü)

Kadın doğum uzmanlarının hesapları; sosyal akış, magazin veya topluluk özelliklerinden arındırılmış, tamamen **doktor-hasta ilişkisini ve klinik takibi yönetmeye odaklı** ayrı bir arayüz ve yetki yapısına sahiptir:

* **Doğrulanmış Hekim Profili:** Diploma/uzmanlık tescil doğrulaması yapılmış, çalıştığı hastane/klinik ve iletişim bilgilerini içeren profesyonel hekim kimliği (topluluk içi genel içerik üreticilerinden ayrı rol: `obgyn_doctor`). Hekim, konuşabildiği dilleri profilinde belirtebilir.

* **Güvenli Hasta Eşleştirme (Davet & Rıza):**

  * Doktorun kendine özel **Davet Kodu / QR Kodu** bulunur.

  * Anne adayı bu kodu uygulamaya girerek veya doktorun gönderdiği daveti onaylayarak **"Doktorumla Veri Paylaşımını Aç"** iznini verir.

  * Anne adayı dilediği zaman paylaşım kapsamını (örn. ruh hali günlüğünü gizleyip sadece tansiyon, kilo ve semptomları açma) güncelleyebilir veya eşleşmeyi sonlandırabilir.

* **Hasta Takip Paneli (Klinik Dashboard):**

  * Tüm aktif gebelerin haftaya, tahmini doğum tarihine ve risk/uyarı durumuna göre filtrelenebilir listesi.

  * **Hasta Detay Görünümü:** Hastanın girdiği kilo değişim grafiği, tansiyon ölçümleri, semptom kayıtları, tekme sayacı geçmişi ve yaklaşan tarama testlerinin (ikili test, detaylı USG, OGTT vb.) tek ekranda özeti. Semptomlar serbest metin yerine kod (enum) olarak saklandığından doktor bunları kendi dilinde görür.

  * **Akıllı Uyarı Göstergeleri:** Hastanın girdiği kritik değerlerde (örn. yüksek tansiyon kaydı, ani kilo artışı veya sık kasılma kaydı) doktor panelinde görsel dikkat işareti (triage flag).

* **Kişiselleştirilmiş Öneri & Bakım Planı:**

  * Doktorun hastaya özel not, beslenme/aktivite önerisi, tahlil istem hatırlatması veya kontrol sonrası özet göndermesi.

  * Hazır öneri şablonları çok dillidir: doktor şablonu kendi dilinde seçer, hasta kendi dilinde görür. Serbest metin öneriler yazıldığı dilde iletilir (otomatik çeviri ileride, tıbbi sorumluluk notuyla birlikte değerlendirilecektir).

  * Gönderilen öneriler anne adayının ana ekranında **"Doktorumun Önerileri"** kartında öncelikli olarak görünür ve anlık bildirim (Push) ile iletilir.

  * Doktorun yalnızca kendisinin görebileceği **Özel Klinik Notlar** (hastaya kapalı dahili takip notları).

* **Randevu Oluşturma ve Yönetimi:**

  * Doktorun belirli bir hasta için muayene, ultrason veya tahlil kontrolü randevusu oluşturması, tarih/saat güncellemesi veya iptal etmesi.

  * Oluşturulan randevu anne adayının uygulama içi takvimine otomatik işlenir; randevu öncesi (örn. 1 gün ve 2 saat önce) otomatik hatırlatma ve hazırlık notu (örn. *"Aç karnına geliniz"*) gönderilir.

  * Hastanın randevuya katılım onayı ("Geleceğim" / "Tarih Değişikliği Talebi") doktor takvimine anlık düşer.

  * Tüm zamanlar veritabanında UTC (`timestamptz`) olarak saklanır, kullanıcının saat dilimine göre gösterilir (varsayılan `Europe/Istanbul`).

## 4. Teknoloji Yığını (Tech Stack)

Claude Code ile maksimum hız, tip güvenliği ve tek kod tabanından hem **PWA** (anne adayları + masaüstü/tablet doktor paneli) hem **iOS/Android** çıkışı için optimize edilmiş, **tamamen kendi VPS'imizde çalışabilen** modern mimari:

| Katman | Teknoloji | Seçim Nedeni | 
| ----- | ----- | ----- | 
| **Framework** | **Next.js 15+ (App Router)** + TypeScript, `output: 'standalone'` | SEO, SSR, API Routes ve Route Groups ile `(patient)` ve `(doctor)` arayüzlerinin tek projede temiz ayrımı. Standalone çıktı, Vercel'e bağımlı olmadan küçük bir Docker imajı olarak çalışır. | 
| **Çoklu Dil (i18n)** | **next-intl** + ICU MessageFormat | App Router ve Server Components ile yerel uyum, dil önekli rotalar (`/tr/...`, `/en/...`), tip güvenli mesaj anahtarları, çoğul/cinsiyet kuralları, tarih/sayı biçimlendirme. | 
| **Stil & UI** | **Tailwind CSS** + **shadcn/ui** + Framer Motion | Anne adayları için mobil öncelikli sıcak UI, doktorlar için veri yoğunluklu masaüstü/tablet klinik tabloları ve grafikler (`Recharts`). Mantıksal CSS sınıfları (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) ile ileride sağdan sola (RTL) dil desteğine hazır. | 
| **PWA Katmanı** | **Serwist** (Service Worker) + Web App Manifest | Çevrimdışı çalışma (offline tekme/kasılma sayacı), ana ekrana ekleme, randevu ve doktor önerisi Web Push bildirimleri (kendi VAPID anahtarlarımızla). | 
| **Mobil Uygulama** | **Capacitor.js** | Mevcut Next.js/PWA kod tabanını iOS App Store ve Google Play Store'a native özelliklerle (Push, Haptics, Kamera, QR Tarayıcı) paketleme. Uygulama, kendi sunucumuzdaki canlı adrese bağlanır. | 
| **Backend & DB** | **Self-hosted Supabase** (Docker Compose: PostgreSQL + GoTrue Auth + PostgREST + Realtime + Storage) | Supabase Cloud ile aynı API ve geliştirici deneyimi, sıkı **Row Level Security (RLS)** ile hasta-doktor veri izolasyonu, anlık senkronizasyon; ancak tüm veri kendi VPS'imizde. Ayrıntı ve alternatif: Bölüm 6. | 
| **ORM / Veri** | **Supabase JS Client** (oluşturulmuş DB tipleriyle) + **Zod** | Uçtan uca tip güvenliği ve şema validasyonu. Migrasyonların tek doğru kaynağı `supabase/migrations/` altındaki SQL dosyalarıdır. | 
| **Yapay Zeka** | **Anthropic Claude API** (Vercel AI SDK kütüphanesiyle) | Güvenli sistem promptları, çok dilli yanıt kalitesi ve akışlı (streaming) yanıtlar. AI SDK yalnızca bir npm kütüphanesidir; Vercel barındırması gerektirmez. | 
| **E-posta** | SMTP sağlayıcısı (ör. kendi posta sunucusu veya bir SMTP servisi) | Auth doğrulama/şifre sıfırlama e-postaları ve randevu hatırlatmaları; şablonlar dil bazlı. | 
| **Test & Kalite** | **Vitest** (Unit) + **Playwright** (E2E) + ESLint/Prettier | Claude Code'un kendi yazdığı kodu ve özellikle RLS güvenlik sınırlarını otomatik doğrulaması için zorunlu. Eksik çeviri anahtarı kontrolü CI'da çalışır. | 
| **Hosting & CI/CD** | **Kendi VPS'imiz** + **Docker Compose** + **Caddy** (reverse proxy, otomatik TLS) + **GitHub Actions** + **GitHub Container Registry (GHCR)** | Vercel yerine: CI imajı derler, GHCR'ye yükler, SSH ile VPS'te `docker compose pull && up -d` çalıştırır. Önizleme (preview) yerine `develop` dalından beslenen bir **staging** ortamı. | 

## 5. Çoklu Dil Desteği (i18n) Mimarisi

### 5.1. Diller ve Yerel Ayar (Locale) Stratejisi

* **Varsayılan dil:** Türkçe (`tr`). **İlk ek dil:** İngilizce (`en`). Hangi dillerin ekleneceği bir iş kararıdır (bkz. Bölüm 14 — Açık Sorular); mimari herhangi bir sayıda dili destekler.

* **Desteklenen diller tek bir yerde tanımlanır:** `src/i18n/config.ts` içinde `locales = ['tr', 'en'] as const` ve `defaultLocale = 'tr'`. Yeni dil eklemek: bu listeye eklemek + `messages/<locale>.json` dosyası + içerik çevirileri.

* **Dil ≠ ülke:** Dil seçimi yalnızca metinleri değiştirir. Acil numara (112), tarama testi takvimi ve hukuki metinler **ülkeye** (ilk aşamada Türkiye) bağlıdır; İngilizce kullanan biri de Türkiye'deki acil numarayı görür.

### 5.2. Rotalama ve Dil Tespiti

* Tüm sayfalar dil önekli rotalar altında: `src/app/[locale]/(patient)/...`, `src/app/[locale]/(doctor)/...`, `src/app/[locale]/(auth)/...`. API rotaları (`src/app/api/`) dil önekinden bağımsızdır.

* `next-intl` middleware'i dil tespitini şu sırayla yapar: URL öneki → kayıtlı kullanıcının `preferred_locale` değeri → `NEXT_LOCALE` çerezi → `Accept-Language` başlığı → varsayılan `tr`.

* SEO için her sayfada `hreflang` alternatifleri ve dil bazlı `sitemap.xml`; magazin ve haftalık rehber sayfalarının slug'ları dil bazlıdır (örn. `/tr/hafta/12`, `/en/week/12`).

* PWA manifest'i dil bazlı (`name`, `short_name`, `description`) sunulur.

### 5.3. Arayüz Metinleri

* Tüm UI metinleri `messages/tr.json`, `messages/en.json` dosyalarında, modül bazlı ad alanlarıyla (`tracker.kickCounter.title`, `doctor.patients.empty` vb.) tutulur. **Bileşenlerde sabit (hard-coded) metin yasaktır.**

* `tr.json` kaynak (source of truth) dosyadır; tipler buradan üretilir, böylece eksik/yanlış anahtar derleme hatası verir. CI, diğer dillerde eksik anahtar olup olmadığını kontrol eder.

* Çoğul, cinsiyet ve değişken içeren metinler ICU MessageFormat ile yazılır (`{count, plural, one {# tekme} other {# tekme}}`).

* Tarih, saat, sayı ve ölçü birimleri her zaman `Intl` / next-intl biçimlendiricileriyle gösterilir; elle string birleştirme yapılmaz.

* Zod doğrulama hata mesajları da çeviri anahtarlarıyla döner.

### 5.4. Veritabanındaki Çevrilebilir İçerik

İki tür içerik birbirinden ayrılır:

1. **Editoryal içerik (çevrilir):** Haftalık gelişim içerikleri, makaleler, hazır liste maddeleri, öneri şablonları, isim anlamları, kulüp adları. Bunlar **ana tablo + `*_translations` tablosu** desenini kullanır (bkz. Bölüm 7). Çeviri bulunamazsa varsayılan dile (`tr`) düşülür ve arayüzde bunu belirten küçük bir etiket gösterilir.

2. **Kullanıcı içeriği (çevrilmez):** Gönderiler, yorumlar, mektuplar, doktorun serbest metin önerileri ve notları. Yazıldığı dilde saklanır; ilgili tablolarda isteğe bağlı `locale` sütunu tutulur.

* Sağlık kayıtlarında semptom, ruh hali etiketleri, randevu türü gibi alanlar **kod (enum/anahtar)** olarak saklanır, görüntülenirken çevrilir. Böylece Türkçe kullanan hasta ile İngilizce kullanan doktor aynı veriyi kendi dillerinde görür.

* **Tıbbi içerik çevirisi:** Bilimsel ve tıbbi içerikler makine çevirisiyle doğrudan yayına alınmaz; her dil için uzman (ebe/hekim/editör) gözden geçirmesi zorunludur. `*_translations` tablolarında `review_status[draft|in_review|approved]` alanı bulunur ve yalnızca `approved` çeviriler yayınlanır.

### 5.5. Bildirimler, E-postalar ve AI Asistan

* Push bildirimleri, e-postalar ve SMS'ler **alıcının** `preferred_locale` değerine göre gönderilir (gönderenin değil). Bildirim içerikleri sunucu tarafında, aynı mesaj dosyalarından üretilir.

* AI asistanın sistem promptu, kullanıcının dili ile yanıt vermesini ve kırmızı bayrak yönlendirmelerini o dilde yapmasını sağlar. Güvenlik bariyerleri (teşhis koymama, acile yönlendirme) her dil için test edilir.

* Yasal metinler (KVKK aydınlatma, açık rıza) her dilde sunulur; **hukuken bağlayıcı sürüm Türkçe** metindir ve bu durum çeviride belirtilir. Kullanıcının hangi metin sürümüne ve hangi dilde onay verdiği kaydedilir.

### 5.6. Sağdan Sola (RTL) Hazırlığı

* İlk sürümde RTL dil yoktur, ancak ileride Arapça/Farsça eklenebilmesi için: `<html lang dir>` locale'e göre ayarlanır, CSS'te yalnızca mantıksal yön sınıfları kullanılır, yön belirten ikonlar (oklar) locale'e göre çevrilir.

## 6. Altyapı: Kendi VPS'imizde Barındırma (Self-Hosting)

### 6.1. Mimari Karar ve Gerekçe

**Seçim: Self-hosted Supabase + Next.js standalone, tek VPS üzerinde Docker Compose.**

* **Neden:** Planın güvenlik modeli tamamen Postgres **RLS** ve Supabase Auth (`auth.uid()`) üzerine kurulu. Self-hosted Supabase, Cloud sürümüyle aynı API'yi sunduğu için güvenlik modeli, Realtime, Storage ve Auth hiç değişmeden korunur; yerel geliştirmede `supabase start` ile birebir aynı ortam kullanılır.

* **Bedeli (trade-off):** Supabase yığını ~10 container çalıştırır (Postgres, GoTrue, PostgREST, Realtime, Storage, imgproxy, Kong, Studio, meta, analytics/vector). RAM ihtiyacı yüksektir (production için en az 4 GB, staging ile birlikte 8 GB önerilir) ve güncelleme, yedekleme, güvenlik yamaları bizim sorumluluğumuzdadır. Supabase Cloud'daki otomatik yedek, PITR ve yönetim paneli kolaylıkları kendimiz kurmamız gereken parçalardır.

* **Değerlendirilen alternatif:** Düz PostgreSQL + Auth.js/Better Auth + Drizzle + MinIO (S3 uyumlu depolama). Daha hafif ve daha az hareketli parça içerir; ancak RLS'i oturum değişkenleriyle (`set_config('app.user_id', ...)`) elle kurmak, Realtime için ayrı bir çözüm (ör. Postgres `LISTEN/NOTIFY` + SSE) yazmak gerekir. VPS kaynakları çok kısıtlıysa (≤ 2 GB RAM) bu alternatife geçilir; karar bir ADR (`docs/adr/`) ile kaydedilir.

* **KVKK avantajı:** VPS'in **Türkiye'deki bir veri merkezinde** olması, özel nitelikli sağlık verisinin yurt dışına aktarılması (KVKK md. 9) yükümlülüklerini büyük ölçüde ortadan kaldırır. Yedekler de Türkiye'de veya şifreli olarak tutulmalıdır (bkz. 6.5).

### 6.2. Sunucu Topolojisi

```
                   İnternet (yalnızca 80/443 açık, SSH 22 sadece anahtar ile)
                                   │
                           ┌───────▼────────┐
                           │     Caddy      │  Otomatik Let's Encrypt TLS, HTTP→HTTPS, güvenlik başlıkları
                           └───┬───────┬────┘
              egebelik.com     │       │   api.egebelik.com
                     ┌─────────▼──┐ ┌──▼──────────────────────────────┐
                     │  Next.js   │ │  Supabase Kong API Gateway      │
                     │ standalone │ │  ├─ GoTrue (Auth)               │
                     │ (web app)  │ │  ├─ PostgREST (REST)            │
                     └─────┬──────┘ │  ├─ Realtime (WebSocket)        │
                           │        │  └─ Storage (+ imgproxy)        │
                           │        └──────────────┬──────────────────┘
                           └──────────┬────────────┘
                              ┌───────▼────────┐
                              │  PostgreSQL    │  Yalnızca Docker iç ağında; dışarıya port açılmaz
                              └────────────────┘
   Supabase Studio: dışarıya açılmaz, yalnızca SSH tüneli ile erişilir.
   Staging: aynı sunucuda ayrı Compose projesi (staging.egebelik.com / api.staging.egebelik.com), ayrı DB ve anahtarlar.
```

* **Varsayılan sunucu:** Ubuntu 24.04 LTS (veya güncel bir LTS Linux dağıtımı), Docker Engine + Compose eklentisi. VPS özellikleri henüz bilinmediği için plan genel tutulmuştur; öneri: **4 vCPU / 8 GB RAM / 80+ GB SSD** (production + staging).

* **Repo içi altyapı dosyaları (Faz 0'da oluşturulacak):**

  * `Dockerfile` — Next.js standalone, çok aşamalı (multi-stage) imaj.

  * `infra/docker-compose.yml` — Next.js + Caddy; Supabase servisleri resmi self-hosting Compose dosyasından türetilmiş `infra/supabase/` altında.

  * `infra/Caddyfile` — alan adları, TLS, güvenlik başlıkları (HSTS, CSP).

  * `infra/.env.example` — tüm gerekli ortam değişkenleri (gerçek değerler **asla** repoya girmez).

  * `infra/scripts/` — `backup.sh`, `restore.sh`, `deploy.sh`.

### 6.3. Ortamlar

| Ortam | Nerede | Kaynak Dal | Amaç |
| ----- | ----- | ----- | ----- |
| **Local** | Geliştirici makinesi / Claude Code oturumu | feature dalları | `supabase start` (Docker) + `npm run dev`; test verisi `supabase/seed.sql` |
| **Staging** | VPS, ayrı Compose projesi | `develop` | Vercel preview'larının yerini alır; PR birleştirildikten sonra manuel/otomatik test |
| **Production** | VPS | `main` (etiketli sürüm) | Canlı kullanıcılar |

### 6.4. CI/CD (GitHub Actions)

1. **Her PR'da:** `lint`, `typecheck`, `test` (Vitest), RLS testleri (CI içinde `supabase start` ile geçici DB), eksik çeviri kontrolü, Playwright E2E.

2. **`develop`'a birleştirmede:** Docker imajı derlenir → `ghcr.io/mukaanyes/egebelik:<sha>` olarak GHCR'ye yüklenir → SSH ile staging'e deploy → migrasyonlar staging DB'ye uygulanır.

3. **`main`'e birleştirmede / sürüm etiketinde:** Aynı imaj production'a deploy edilir. Migrasyonlar deploy öncesi uygulanır; **önce yedek alınır**.

4. **Migrasyonlar:** `supabase/migrations/*.sql` dosyaları `supabase db push --db-url` ile, DB'ye SSH tüneli üzerinden uygulanır. Migrasyonlar geriye dönük uyumlu (expand → migrate → contract) yazılır ki eski imaj yeni şemayla çalışmaya devam edebilsin.

5. **Gizli bilgiler:** SSH deploy anahtarı, sunucu adresi vb. GitHub Actions **Environment Secrets** içinde (`staging`, `production`); uygulama anahtarları (JWT secret, service role key, Anthropic API key, VAPID, SMTP) yalnızca VPS'teki `.env` dosyasında. Production deploy'u için GitHub Environment onayı (manual approval) açılır.

6. **Geri alma (rollback):** Önceki imaj etiketine `docker compose up -d` ile dönülür; DB için son yedekten geri yükleme prosedürü `infra/scripts/restore.sh` ile belgelenir.

### 6.5. Yedekleme, İzleme ve Güvenlik Sıkılaştırma

* **Yedekleme:**

  * Günlük `pg_dump` (şifreli, ör. `age`/`gpg`) + Storage dosyalarının senkronizasyonu, sunucu dışındaki bir depolamaya (tercihen Türkiye'de; değilse uçtan uca şifreli).

  * Saklama: 7 günlük + 4 haftalık + 6 aylık. Daha sıkı RPO gerekirse WAL arşivleme (ör. `wal-g`/`pgBackRest`) eklenir.

  * **Geri yükleme her ay staging'de test edilir** — test edilmemiş yedek, yedek sayılmaz.

* **İzleme:** Uptime izleme (ör. Uptime Kuma), container sağlık kontrolleri (`healthcheck`), disk/RAM uyarıları, uygulama hataları için self-hosted hata takibi (ör. GlitchTip) veya Sentry (sağlık verisi göndermeyecek şekilde yapılandırılmış). Loglarda kişisel/sağlık verisi tutulmaz.

* **Sıkılaştırma:** Güvenlik duvarı (ufw: yalnızca 22/80/443), SSH'ta parola girişi kapalı, `fail2ban`, otomatik güvenlik güncellemeleri (`unattended-upgrades`), Docker imajlarının düzenli güncellenmesi, Postgres ve Studio'nun dışarıya kapalı olması, varsayılan Supabase anahtar/şifrelerinin kuruluşta mutlaka değiştirilmesi.

* **Disk şifreleme:** Sağlayıcı destekliyorsa disk seviyesinde şifreleme açılır (KVKK teknik tedbir).

## 7. Veritabanı Mimarisi (Özet Şema)

```
users (id, email, full_name, role[mother|partner|obgyn_doctor|content_expert|admin], avatar_url,
       preferred_locale[tr|en|...] default 'tr', timezone default 'Europe/Istanbul', created_at)

-- Onay Kayıtları (KVKK)
consents (id, user_id, type[kvkk_notice|explicit_health|doctor_sharing|marketing], document_version, locale, granted_at, revoked_at)

-- Anne Adayı ve Gebelik Verileri
pregnancies (id, user_id, partner_id, lmp_date, due_date, baby_nickname, is_active)
  ├── health_logs (id, pregnancy_id, type[weight|water|bp|symptom], value_json, logged_at)   -- semptomlar kod olarak (ör. 'nausea')
  ├── kick_sessions (id, pregnancy_id, started_at, ended_at, kick_count)
  ├── contractions (id, pregnancy_id, started_at, duration_sec, intensity)
  ├── mood_entries (id, pregnancy_id, mood_score, tags[], note, created_at)                  -- tags kod olarak
  ├── checklists (id, pregnancy_id, category[hospital|shopping], template_item_id NULL, custom_title NULL, is_checked)
  └── letters (id, pregnancy_id, title, content, photo_url, week_number, created_at)

-- Kadın Doğum Uzmanı & Hasta Takip İlişkisi
doctor_profiles (id, user_id, title, diploma_no, clinic_name, city, spoken_locales[], invite_code, verification_status[pending|verified|rejected], verified_at)
  └── doctor_patient_links (id, doctor_id, pregnancy_id, patient_user_id, status[pending|active|revoked], share_permissions_json, linked_at, revoked_at)
        ├── appointments (id, link_id, doctor_id, patient_user_id, scheduled_at timestamptz, duration_min, type[routine|usg|lab|online], prep_note, status[scheduled|confirmed|reschedule_requested|completed|cancelled])
        ├── doctor_recommendations (id, link_id, doctor_id, patient_user_id, template_id NULL, title, body, locale, category[nutrition|activity|test|general], is_read, created_at)
        └── doctor_private_notes (id, link_id, doctor_id, content, updated_at) -- Sadece doktorun görebildiği dahili notlar

recommendation_templates (id, category, created_by NULL)
  └── recommendation_template_translations (template_id, locale, title, body, review_status)

-- Sosyal Topluluk
community_clubs (id, slug, due_month_year)
  └── community_club_translations (club_id, locale, name)
  └── posts (id, club_id, author_id, is_anonymous, category, content, locale, media_urls[], status, created_at)
        ├── comments (id, post_id, author_id, is_anonymous, content, locale, created_at)
        └── reactions (id, post_id, user_id, type[heart|hug|laugh])

-- Haftalık Gelişim İçeriği (Çevrilebilir)
pregnancy_weeks (week_number PK 1..42, baby_length_mm, baby_weight_g, size_comparison_key, illustration_url)
  └── pregnancy_week_translations (week_number, locale, baby_summary, mother_summary, tips_mdx, review_status, reviewed_by, reviewed_at)

-- Magazin, Bilimsel İçerik & Eğlence (Çevrilebilir)
articles (id, category[science|magazine|lifestyle], target_week, author_expert_id, cover_url, published_at)
  └── article_translations (article_id, locale, slug, title, summary, body_mdx, review_status, reviewed_by, published_at)   -- UNIQUE(locale, slug)
checklist_templates (id, category, sort_order)
  └── checklist_template_translations (template_id, locale, title)
baby_names (id, name, gender, origin)
  ├── baby_name_translations (name_id, locale, meaning)
  └── name_swipes (id, pregnancy_id, user_id, name_id, liked[bool])

-- Bildirimler
push_subscriptions (id, user_id, endpoint, keys_json, user_agent, created_at)
```

**Kurallar:** Tüm `*_translations` tablolarının birincil anahtarı `(parent_id, locale)` şeklindedir; `locale` değeri uygulamadaki `locales` listesiyle doğrulanır (CHECK veya referans tablo). Her tabloda RLS açıktır; editoryal içerik herkese okunur (yalnızca `approved` çeviriler), yazma yetkisi `content_expert`/`admin` rollerindedir.

## 8. Tasarım Sistemi ve UX İlkeleri

Uygulama kullanıcı rolüne göre iki farklı deneyim dili sunar:

### 8.1. Anne Adayı Arayüzü (Sıcak, Yatıştırıcı & Mobil Öncelikli)

* **Renk Paleti:**

  * *Ana Arka Plan:* Sıcak Krem (`#FAF7F2`) — Göz yormayan okuma deneyimi.

  * *Birincil Vurgu:* Yumuşak Şeftali / Mercan (`#E8998D`) — Şefkat ve sıcaklık.

  * *İkincil Vurgu:* Adaçayı Yeşili (`#8FA895`) — Sağlık, doğallık ve denge.

  * *Gece Modu (Dark Mode):* Koyu Antrasit / Gece Laciverti (`#161922`) — Gece uykusuzluk ve emzirme anlarında mavi ışığı azaltmak için zorunlu.

* **Navigasyon:** Alt gezinme çubuğu (Bottom Tab Bar — 5 sekme): `Bugün` | `Araçlar` | `Topluluk` | `Keşfet` | `Profil`. (Doktorla eşleşmiş anne adaylarında `Bugün` sekmesinin en üstünde "Doktorum & Yaklaşan Randevum" özet kartı yer alır.)

* **Dil Seçimi:** Onboarding'in ilk ekranında ve `Profil > Ayarlar` altında dil seçici. Seçim hesaba (`preferred_locale`) kaydedilir ve tüm cihazlarda geçerli olur.

### 8.2. Kadın Doğum Uzmanı Arayüzü (Klinik, Net & Masaüstü/Tablet Uyumlu)

* **Tasarım Dili:** Sıcak krem yerine klinik netlik sağlayan açık nötr zemin (`#F8FAFC`), yüksek kontrastlı veri grafikleri ve adaçayı/petrol mavisi vurgu tonları.

* **Navigasyon:** Masaüstü ve tabletlerde sol yan menü (Sidebar), mobilde sadeleştirilmiş alt çubuk: `Hastalarım` | `Takvim & Randevular` | `Uyarılar` | `Klinik Profilim`.

* **Hız ve Ergonomi:** Doktorun muayene aralarında 2–3 dokunuşla randevu oluşturabilmesi veya hazır şablonlardan kişiselleştirilmiş öneri gönderebilmesi için hızlı aksiyon modalları. Hasta listesinde hastanın tercih ettiği dil küçük bir etiketle gösterilir.

### 8.3. Çok Dilli Tasarım İlkeleri

* Metin uzunlukları dile göre değişir (Almanca/İngilizce bazı metinlerde Türkçeden %30'a kadar uzun olabilir); butonlar ve kartlar sabit genişlik yerine esnek tasarlanır.

* Görsellerin üzerine metin gömülmez; metin her zaman HTML katmanındadır.

* Fontlar desteklenen tüm dillerin karakter setlerini kapsamalıdır (Türkçe `ğ, ı, İ, ş` dahil); büyük/küçük harf dönüşümleri `toLocaleUpperCase(locale)` ile yapılır (Türkçe `i/İ` sorunu).

## 9. Hukuki, Güvenlik ve Etik Gereksinimler (Türkiye)

1. **KVKK Uyumu (6698 Sayılı Kanun) & Veri Paylaşım Rızası:**

   * Gebelik ve sağlık verileri **"Özel Nitelikli Kişisel Veri"** kapsamındadır.

   * Kayıt sırasında genel aydınlatma/açık rıza metnine ek olarak, **bir doktorla eşleşirken ikinci ve ayrı bir "Hekimle Sağlık Verisi Paylaşımı Açık Rıza Onayı"** alınmalıdır.

   * Anne adayı paylaşım iznini tek tıkla geri çekebilmeli (erişim anında kesilir) ve "Hesabımı & Tüm Verilerimi Sil" hakkını kullanabilmelidir. Silme işlemi yedeklerdeki verinin de saklama süresi sonunda yok olacağı şekilde belgelenir.

   * Aydınlatma ve rıza metinleri her desteklenen dilde sunulur; bağlayıcı sürüm Türkçedir. Onaylar `consents` tablosunda metin sürümü ve dil bilgisiyle saklanır.

2. **Veri Yerelliği ve Barındırma:**

   * Uygulama, veritabanı, dosya depolama ve yedekler **kendi VPS'imizde**, tercihen **Türkiye'deki bir veri merkezinde** tutulur. Bu, sağlık verisinin yurt dışına aktarımını en aza indirir.

   * Yurt dışına veri gönderebilecek üçüncü taraf servisler (AI API, e-posta/SMS sağlayıcısı, hata takip servisi) envanterde listelenir. **AI asistana** gönderilen mesajlar için kullanıcıya açık bilgilendirme yapılır, ad/iletişim gibi tanımlayıcı veriler prompta eklenmez ve gerekirse ayrı açık rıza alınır.

   * VERBİS kaydı ve veri işleme envanteri, canlıya çıkıştan önce hukuk danışmanıyla netleştirilir.

3. **Hekim Doğrulama ve Yetki Sınırları:**

   * `obgyn_doctor` rolü kayıt anında otomatik aktif olmaz; yönetici onayıyla (diploma tescil numarası / uzmanlık doğrulaması) `verified` statüsüne geçer. Doğrulanmamış doktorlar hasta eşleştiremez.

   * **Klinik Sınırlar:** eGebelik bir hasta takip, bilgilendirme ve randevu destek platformudur; resmi HBYS, e-Nabız veya e-Reçete yerine geçmez. Uygulama üzerinden reçete yazılmaz ve acil müdahale taahhüdü verilmez.

4. **Tıbbi Sorumluluk Reddi (Medical Disclaimer):**

   * Tüm bilimsel içerikler, sayaçlar, doktor öneri alanı ve AI asistan ekranları belirgin biçimde *"Bu platform acil tıbbi müdahale amaçlı değildir. Acil durumlarda 112'yi arayın veya en yakın sağlık kuruluşuna başvurun."* uyarısını, kullanıcının dilinde taşımalıdır. Acil numara dile değil ülkeye göre belirlenir.

5. **Sıkı Veri İzolasyonu (Zero-Trust RLS):**

   * Postgres **Row Level Security (RLS)** politikaları her tabloda aktif olmalıdır (self-hosted Supabase'de de Cloud'daki gibi geçerlidir).

   * Bir doktor **yalnızca** `doctor_patient_links` tablosunda `status = 'active'` olan ve ilgili veri kategorisine izin verilmiş (`share_permissions_json`) hastaların sağlık verilerini okuyabilir.

   * `doctor_private_notes` tablosuna hastalar veya başka doktorlar kesinlikle erişemez.

   * `service_role` anahtarı yalnızca sunucu tarafında, açıkça gerekçelendirilmiş yönetim işlemlerinde kullanılır; istemciye asla gönderilmez.

## 10. GitHub & Claude Code Geliştirme İş Akışı

Bu proje, **Claude Code**'un otonom ve yüksek kaliteli kod üretmesi için özel olarak yapılandırılmış bir GitHub disipliniyle geliştirilecektir.

### 10.1. Önerilen Dizin Yapısı

```
egebelik/
├── .github/
│   ├── workflows/          # CI: lint, typecheck, test, i18n kontrolü, E2E; CD: staging & production deploy
│   └── ISSUE_TEMPLATE/     # Feature ve Bug şablonları
├── docs/
│   └── adr/                # Mimari karar kayıtları (ör. 0001-self-hosted-supabase.md)
├── infra/
│   ├── docker-compose.yml  # Next.js + Caddy (production/staging)
│   ├── supabase/           # Self-hosted Supabase Compose dosyaları ve yapılandırma
│   ├── Caddyfile           # Reverse proxy & TLS
│   ├── .env.example        # Ortam değişkeni şablonu (gerçek değerler repoya girmez)
│   └── scripts/            # backup.sh, restore.sh, deploy.sh
├── messages/
│   ├── tr.json             # Kaynak (varsayılan) çeviri dosyası
│   └── en.json
├── public/                 # PWA ikonları, illüstrasyonlar
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (patient)/  # Anne adayı & eş arayüzü (Mobile-First)
│   │   │   ├── (doctor)/   # Kadın doğum uzmanı portalı (Dashboard-First)
│   │   │   └── (auth)/     # Giriş, kayıt, rol seçimi ve doktor doğrulama
│   │   └── api/            # API Route'ları (AI, bildirim, webhook) — dil öneki yok
│   ├── components/         # UI (shadcn) ve ortak bileşenler
│   ├── features/           # Modül bazlı kod (tracker/, community/, magazine/, ai/, doctor-portal/)
│   ├── i18n/               # next-intl yapılandırması: config.ts, routing.ts, request.ts
│   ├── lib/                # Supabase client, AI SDK, tarih/gebelik hesaplama yardımcıları
│   ├── middleware.ts       # Dil tespiti + oturum yenileme
│   └── types/              # TypeScript ve DB tipleri
├── supabase/
│   ├── migrations/         # SQL migrasyon dosyaları ve RLS politikaları (tek doğru kaynak)
│   └── seed.sql            # Yerel geliştirme test verisi (gerçek kişisel veri içermez)
├── tests/                  # Unit, E2E ve RLS güvenlik testleri
├── Dockerfile              # Next.js standalone imajı
├── CLAUDE.md               # Claude Code için proje anayasası (KRİTİK)
└── PROJECT_PLAN.md         # Bu dosya
```

### 10.2. `CLAUDE.md` Dosyası

Claude Code her oturumda kök dizindeki `CLAUDE.md` dosyasını otomatik okur. Bu dosya repoda oluşturulmuştur ve şu temel kuralları içerir (güncel hali için dosyanın kendisine bakın):

* **Dil:** Tüm UI metinleri çeviri dosyalarından gelir; varsayılan ve kaynak dil doğal ve sıcak bir **Türkçe**dir. Kod/değişken/commit isimleri **İngilizce** olmalıdır. Bileşenlerde sabit metin yasaktır.

* **Kod Standartları:** Strict TypeScript (`any` yasak), Server Components öncelikli, form doğrulamalarında `zod` kullanımı zorunlu.

* **Rol ve Güvenlik Kuralı:**

  * Yeni bir tablo eklendiğinde mutlaka RLS politikası içeren migration dosyası yazılmalıdır.

  * Doktor portalı endpoint'leri ve Server Action'ları hem oturum rolünü (`obgyn_doctor`) hem doğrulama durumunu (`verified`) hem de aktif hasta bağlantısını (`doctor_patient_links.status = 'active'`) doğrulamadan veri dönmemelidir.

* **Self-Hosting Kuralı:** Vercel'e veya Supabase Cloud'a özgü servisler (Vercel KV/Blob/Cron/Edge Config, Supabase Cloud'a özel özellikler) kullanılmaz; her şey Docker Compose ile VPS'te çalışabilmelidir.

* **Doğrulama Komutları:** Her görev bitiminde Claude Code şu komutları çalıştırıp geçmeden işi tamamlamamalıdır:

  * `npm run typecheck`

  * `npm run lint`

  * `npm run test`

  * `npm run i18n:check`

* **Tıbbi Etik Kuralı:** AI promptlarında ve sağlık ekranlarında, hangi dilde olursa olsun, kesin teşhis dili kullanılmamalıdır.

### 10.3. GitHub Branch & Issue Stratejisi

* `main`: Her zaman canlıya (production) hazır, korumalı dal. Doğrudan push kapalı. Birleştirme production deploy'unu tetikler.

* `develop`: Entegrasyon dalı. Birleştirme staging deploy'unu tetikler.

* Özellik dalları: `feat/kick-counter`, `feat/doctor-patient-pairing`, `feat/doctor-appointments`, `feat/i18n-setup`, `chore/vps-deploy`, `fix/pwa-offline-cache`.

* **Commit Standardı (Conventional Commits):** `feat(doctor): add appointment scheduler with patient push sync`, `fix(rls): restrict revoked doctor access to health logs`, `feat(i18n): add english translations for tracker`.

### 10.4. Claude Code Çalışma Döngüsü (Önerilen Rutin)

Her yeni özellik için şu adımları izleyin:

1. GitHub'da net kabul kriterleri (Acceptance Criteria) olan bir **Issue** açın (örn. `#24 Doktor-Hasta Davet Kodu ile Eşleştirme`). Kabul kriterlerine "tüm metinler `tr` ve `en` dosyalarında" maddesini ekleyin.

2. Terminalde yeni branch oluşturun: `git checkout -b feat/doctor-patient-pairing`.

3. Claude Code'u **Plan Mode** ile başlatın:

   > *"PROJECT_PLAN.md ve CLAUDE.md dosyalarını oku. GitHub #24 numaralı issue kapsamında Doktor-Hasta Eşleştirme modülünü ve RLS politikalarını planla. Önce sadece teknik planı çıkar, onayımı bekle."*

4. Planı onayladıktan sonra kodlamayı, unit/RLS testlerini, migration dosyasını ve çevirileri yaptırın.

5. `npm run typecheck && npm run lint && npm run test && npm run i18n:check` çıktılarını kontrol edin.

6. Claude Code'a PR açıklaması hazırlatıp Pull Request açın. `develop`'a birleştikten sonra staging ortamında kontrol edin.

## 11. Fazlandırılmış Yol Haritası (Roadmap)

### Faz 0: Temel Altyapı ve Kurulum (Hafta 1–2)

* \[x\] GitHub reposunun açılması.

* \[x\] `CLAUDE.md` dosyasının yazılması.

* \[ \] Branch koruma kuralları ve CI workflow'larının (`lint`, `typecheck`, `test`, `i18n:check`) kurulması.

* \[ \] Next.js + TypeScript + Tailwind + shadcn/ui + Serwist (PWA) iskeletinin ve `[locale]/(patient)` / `[locale]/(doctor)` / `[locale]/(auth)` route gruplarının oluşturulması.

* \[ \] **i18n altyapısı:** next-intl kurulumu, `tr`/`en` mesaj dosyaları, dil tespiti middleware'i, dil seçici, tip güvenli anahtarlar ve eksik anahtar kontrol betiği.

* \[ \] **Yerel geliştirme ortamı:** Supabase CLI (`supabase start`), `supabase/migrations/` ve `seed.sql` yapısı.

* \[ \] **VPS kurulumu:** Sunucu sıkılaştırma (ufw, SSH anahtarı, fail2ban, otomatik güncellemeler), Docker, alan adı DNS kayıtları.

* \[ \] **Self-hosted Supabase + Next.js + Caddy** Docker Compose kurulumu (production ve staging), TLS, Studio'nun dışarıya kapatılması, varsayılan anahtarların değiştirilmesi.

* \[ \] **CD pipeline:** GitHub Actions → GHCR → SSH deploy (staging otomatik, production onaylı), migrasyon adımı.

* \[ \] **Yedekleme:** Günlük şifreli `pg_dump` + Storage yedeği, sunucu dışı hedef, ilk geri yükleme testi.

* \[ \] Çoklu rol destekli Auth (`mother`, `partner`, `obgyn_doctor`), SMTP ile e-posta doğrulama ve KVKK onay akışının (dil bazlı metinler + `consents` tablosu) tamamlanması.

* \[ \] Temel tasarım sistemi (renkler, fontlar, Dark Mode, rol bazlı navigasyon, mantıksal CSS yön sınıfları).

### Faz 1: MVP — Çekirdek Gebelik Takibi (Hafta 3–6)

* \[ \] Onboarding sihirbazı (dil seçimi, SAT/TDT hesaplama, bebek takma adı).

* \[ \] Hafta hafta gelişim ana ekranı (40 haftalık **çevrilebilir** içerik veritabanı + boyut benzetmeleri; ilk aşamada Türkçe içerik tam, İngilizce içerik uzman onaylı oldukça yayına).

* \[ \] Offline çalışabilen **Tekme Sayacı** ve **Kasılma Zamanlayıcı**.

* \[ \] Kilo, su, tansiyon ve semptom günlüğü (kod bazlı semptomlar) + basit grafikler.

* \[ \] Hastane çantası ve alışveriş kontrol listeleri (çevrilebilir şablonlar + özel maddeler).

* \[ \] PWA kurulum testi (iOS Safari ve Android Chrome'da "Ana Ekrana Ekle" + kendi VAPID anahtarlarımızla Push bildirim altyapısı, dil bazlı bildirim metinleri).

### Faz 2: Sosyal Yaşam Alanı ve Topluluk (Hafta 7–10)

* \[ \] Doğum ayına göre otomatik kulüp ataması (*"X Ayı Anneleri"*).

* \[ \] Gönderi oluşturma, fotoğraf yükleme (self-hosted Storage), anonim paylaşım ve yorum/tepki sistemi.

* \[ \] İçerik şikayet mekanizması ve AI destekli, çok dilli ön moderasyon.

* \[ \] Kullanıcı profilleri ve bildirim merkezi.

### Faz 3: Magazin, Eğlence ve Duygusal Destek (Hafta 11–14)

* \[ \] Magazin & bilimsel makale CMS / MDX altyapısı (çeviri ve uzman onay iş akışı dahil) ve Keşfet akışı.

* \[ \] **Eş Modu** davet sistemi ve ortak **İsim Bulucu** (swipe mekaniği).

* \[ \] AI Gebelik Asistanı (haftaya ve dile duyarlı, tıbbi güvenlik bariyerli, her dil için güvenlik testleri).

* \[ \] Duygu durumu günlüğü, nefes egzersizi zamanlayıcısı ve "Bebeğime Mektuplar" (PDF çıktılı).

### Faz 4: Kadın Doğum Uzmanı Portalı & Hasta Takip Ekosistemi (Hafta 15–18)

* \[ \] Doktor kayıt akışı, hekim doğrulama (admin onay) paneli ve klinik profil oluşturma.

* \[ \] QR / Davet Kodu ile hasta-doktor eşleştirme, KVKK paylaşım onayı ve izin yönetimi.

* \[ \] **Doktor Dashboard'u:** Aktif hasta listesi, haftaya göre filtreleme, kilo/tansiyon/semptom grafikleri ve kritik değer uyarıları.

* \[ \] **Öneri & Bakım Planı:** Doktorun hastaya özel öneri göndermesi, çok dilli hazır şablonlar, anne adayı ana ekranında "Doktorumun Önerileri" kartı ve dahili doktor notları.

* \[ \] **Randevu Yönetimi:** Doktor tarafından randevu oluşturma, anne adayı takvimiyle çift yönlü senkronizasyon, katılım onayı ve alıcının dilinde otomatik Push hatırlatmaları.

* \[ \] Doktor-hasta RLS güvenlik testlerinin (erişim iptali, çapraz hasta izolasyonu) tamamlanması.

### Faz 5: Mobil Mağaza Yayını ve Büyüme (Hafta 19+)

* \[ \] **Capacitor.js** entegrasyonu ile iOS ve Android derlemelerinin (QR okuyucu ve native Push dahil) alınması.

* \[ \] App Store ve Google Play Store yayın süreçleri (mağaza açıklamaları ve ekran görüntüleri her dilde).

* \[ \] Performans optimizasyonu, SEO çalışması (dil bazlı magazin ve haftalık rehber sayfaları, `hreflang`).

* \[ \] Yeni dillerin eklenmesi (Bölüm 14'teki karara göre) ve ölçeklenme ihtiyacına göre altyapının ayrıştırılması (ör. veritabanının ayrı sunucuya taşınması).

* \[ \] Gelir modeli bileşenlerinin (eGebelik Plus + Klinik SaaS) devreye alınması.

## 12. Sürdürülebilir Gelir Modeli (Monetizasyon)

Anne adaylarının ve hekimlerin güvenini zedelemeyecek **çift taraflı (B2C + B2B) etik gelir stratejisi**:

1. **eGebelik Plus (B2C Freemium Abonelik):** Temel takip, doktor bağlantısı ve topluluk tamamen ücretsiz; sınırsız AI asistanı, uzman canlı yayınları, reklamsız deneyim, eşle gelişmiş senkronizasyon ve sınırsız anı kitabı PDF çıktısı abonelik kapsamında.

2. **eGebelik Klinik (B2B Doktor/Klinik SaaS):** Kadın doğum uzmanları için belirli bir aktif hasta sayısına kadar ücretsiz kullanım; sınırsız hasta takibi, çoklu sekreter/asistan desteği, gelişmiş grafik raporlama (PDF hasta özeti) ve otomatik SMS/Push randevu hatırlatma paketleri için aylık klinik aboneliği. Çok dilli arayüz, yabancı hasta kabul eden klinikler (sağlık turizmi) için ek bir değer önerisidir.

3. **Anı Kitabı Baskı Hizmeti:** Gebelik boyunca tutulan *"Bebeğime Mektuplar"* ve göbek fotoğraflarının tek tıkla basılı hatıra kitabına dönüştürülmesi.

4. **Seçkin Marka İş Birlikleri:** Yalnızca gebelik ve bebek güvenliği onaylı markalarla doğal (native) içerik ve indirim kuponu iş birlikleri.

## 13. İlk Adım Kontrol Listesi (Hemen Başlamak İçin)

1. ✅ GitHub'da `eGebelik` repository'si oluşturuldu; `PROJECT_PLAN.md` ve `CLAUDE.md` eklendi.

2. VPS'i hazırlayın: Türkiye'de bir veri merkezi tercih edin, Ubuntu LTS kurun, SSH anahtarınızı ekleyin ve bir alan adının DNS kayıtlarını (`@`, `api`, `staging`, `api.staging`) sunucuya yönlendirin.

3. Terminalde `claude` komutunu çalıştırıp ilk görev olarak **Faz 0**'ın uygulama iskeletini (Next.js + i18n + Supabase yerel ortamı + CI) isteyin; ardından ayrı bir görevle VPS deploy altyapısını (`infra/`) kurdurun.

## 14. Açık Sorular

1. **Diller:** İlk sürümde Türkçe + İngilizce varsayıldı. Başka diller (ör. Arapça — Türkiye'deki büyük Arapça konuşan nüfus nedeniyle, RTL gerektirir; Rusça, Almanca, Farsça) hedefleniyor mu? Hangi sırayla?

2. **VPS:** Sağlayıcı, konum (Türkiye mi?), işletim sistemi ve kaynaklar (CPU/RAM/disk) nedir? 4 GB RAM'in altındaysa Bölüm 6.1'deki hafif alternatife geçilmesi gerekebilir.

3. **Alan adı:** Kullanılacak alan adı (ör. `egebelik.com`) ve e-posta gönderimi için SMTP sağlayıcısı.

4. **Yedek hedefi:** Sunucu dışı yedekler nerede tutulacak (ikinci bir Türkiye VPS'i, nesne depolama vb.)?

5. **AI asistan ve KVKK:** Anthropic API'ye gönderilecek sohbet içerikleri için hukuki değerlendirme (yurt dışı aktarım, ayrı açık rıza ihtiyacı).
