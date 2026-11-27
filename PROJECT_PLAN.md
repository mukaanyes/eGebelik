# 🤰 eGebelik — Proje Planı ve Teknik Yol Haritası

> **Vizyon:** Gebelik sürecinin bilimsel, magazinsel, sosyal ve klinik takip yönlerini tek bir çatı altında buluşturan; anne adaylarının tüm bilgi, sağlık, eğlence ve duygusal ihtiyaçlarına yanıt verirken **kadın doğum uzmanlarıyla hasta takibi köprüsü kuran** yeni nesil **PWA Web & Mobil Yaşam Alanı**.

## 1. Proje Özeti ve Konumlandırma

**eGebelik**, yalnızca bir "hafta hafta gebelik hesaplayıcısı" değil; anne adayının 40 hafta (ve doğum sonrası erken dönem) boyunca her gün açmak isteyeceği bütüncül bir dijital ekosistemdir. Uygulama dört temel sütun üzerine inşa edilir:

1. **🔬 Bilimsel & Güvenilir (Akıl):** Kanıta dayalı tıbbi içerikler, akıllı sağlık takip araçları, doktor kontrolü/test takvimi ve güvenli yapay zeka asistanı.

2. **🩺 Klinik Köprü & Doktor Takibi (Güven):** Kadın doğum uzmanlarının kendi hastalarının gelişimlerini canlı olarak izleyebildiği, kişiye özel öneriler iletip randevuları yönetebildiği kapalı devre doktor-hasta alanı.

3. **✨ Magazinsel & Yaşam Tarzı (Keyif):** Hamile modası, bebek odası ilhamları, ünlü annelerden trendler, eşle oynanabilen isim bulma oyunları ve eğlenceli testler.

4. **🤝 Sosyal & Duygusal (Kalp):** Aynı ay doğum yapacak anneler kulüpleri, yargısız anonim soru-cevap alanı, ruh hali takibi, meditasyon ve bebeğe mektuplar.

## 2. Hedef Kitle ve Kullanıcı Personaları

| Persona | İhtiyaçlar | eGebelik'te En Çok Kullanacağı Özellikler | 
| ----- | ----- | ----- | 
| **İlk Kez Anne Adayı** | Yüksek kaygı, her belirtiyi araştırma, doktoruyla bağlantıda kalma | Hafta hafta rehber, doktor öneri kartları, anonim forum, hastane çantası listesi | 
| **Deneyimli Anne Adayı** | Pratiklik, hızlı takip, zaman yönetimi | Tekme/kasılma sayacı, doktor randevu takvimi, hızlı kontrol listeleri | 
| **Baba Adayı / Eş** | Sürece dahil olma, eşini anlama | "Eş Modu" (haftalık empati özetleri), ortak isim seçme oyunu, alışveriş listesi | 
| **Kadın Doğum Uzmanı (Doktor)** | Hastalarının ara dönem verilerini (tansiyon, kilo, semptom) düzenli görme, randevu ve öneri yönetimi | **Doktor Portalı:** Hasta listesi, haftalık gelişim grafikleri, randevu oluşturma, hastaya özel öneri/not gönderme | 
| **İçerik Uzmanı / Editör** | Topluma güvenilir içerik üretme | Doğrulanmış makale yazarlığı (Diyetisyen, Doula, Psikolog, Ebe) | 

## 3. Özellik Mimarisi (Modüller)

### 3.1. Çekirdek Takip ve Bilimsel Modül

* **Kişiselleştirilmiş Ana Ekran:** Son adet tarihi (SAT) veya tahmini doğum tarihine (TDT) göre dinamik hafta/gün sayacı, bebeğin boyut benzetmesi (meyve/nesne + özgün illüstrasyonlar), anne ve bebekteki haftalık değişimler.

* **Sağlık & Ölçüm Araçları:**

  * **Tekme Sayacı:** Oturum bazlı hareket kaydı ve grafiksel geçmiş.

  * **Kasılma Zamanlayıcı:** Sıklık ve süre takibi, "hastaneye gitme zamanı" uyarı algoritması (5-1-1 kuralı).

  * **Kilo, Su ve Tansiyon Takibi:** Trimester bazlı sağlıklı aralık görselleştirmesi (onay verilirse takip eden doktorun paneline anlık yansır).

* **Takvim & Hatırlatıcılar:** Doktor randevuları, tarama testleri (ikili/üçlü test, şeker yüklemesi vb.), vitamin/ilaç hatırlatıcıları (Push Notification destekli).

* **AI Gebelik Asistanı (Güvenli Mod):** Kullanıcının bulunduğu haftayı bilen, tıbbi teşhis koymadan bilgilendirme yapan ve kırmızı bayrak belirtilerde (kanama, şiddetli baş ağrısı vb.) derhal kendi doktoruna veya acile yönlendiren yapay zeka sohbeti.

### 3.2. Sosyal Yaşam Alanı & Topluluk

* **Doğum Ayı Kulüpleri:** Örn. *"Eylül 2027 Anneleri"* — Aynı haftalarda olan anne adaylarının otomatik eşleştiği topluluk akışları.

* **Anonim Dertleşme & Soru-Cevap:** Kimliğini gizleyerek hassas soruları (cinsellik, aile içi stres, korkular) sorabilme.

* **Aşerme & Anı Duvarı:** Mizahi, sıcak ve etkileşimli mikro paylaşımlar.

* **Güvenli Alan Moderasyonu:** Yapay zeka destekli toksik içerik/tıbbi yanlış yönlendirme filtresi + kullanıcı raporlama sistemi.

### 3.3. Magazin, Eğlence & Yaşam Tarzı

* **İsim Bulucu (Eşleşmeli):** Tinder mantığıyla sağa/sola kaydırmalı isim keşfi. Eş hesabı bağlandığında ikisinin de beğendiği isimler "Ortak Favoriler" listesine düşer.

* **Keşfet & Magazin Akışı:** Hamile stili, bebek odası dekorasyonu, ürün incelemeleri, popüler anne-bebek haberleri, kısa okuma kartları.

* **Eğlencelik Araçlar:** Çin takvimi (tamamen eğlence amaçlı olduğu belirtilerek), haftalık göbek fotoğrafı kolaj oluşturucu (Time-lapse).

### 3.4. Duygusal Destek & Hazırlık

* **Duygu Durumu (Mood) Günlüğü:** Günlük his kaydı ve ruh haline göre önerilen mikro içerikler.

* **Zihin & Nefes:** Gebeliğe özel nefes egzersizleri, uyku ve doğum korkusu (tokofobi) için sesli rehberler.

* **Bebeğime Mektuplar:** Fotoğraflı dijital anı günlüğü (doğum sonrası PDF olarak dışa aktarılabilir).

* **Akıllı Listeler:** Hastane çantası (anne, bebek, refakatçi), yenidoğan alışveriş listesi ve doğum planı oluşturucu.

### 3.5. Kadın Doğum Uzmanı Portalı & Hasta Takip Modülü (Doktor Rolü)

Kadın doğum uzmanlarının hesapları; sosyal akış, magazin veya topluluk özelliklerinden arındırılmış, tamamen **doktor-hasta ilişkisini ve klinik takibi yönetmeye odaklı** ayrı bir arayüz ve yetki yapısına sahiptir:

* **Doğrulanmış Hekim Profili:** Diploma/uzmanlık tescil doğrulaması yapılmış, çalıştığı hastane/klinik ve iletişim bilgilerini içeren profesyonel hekim kimliği (topluluk içi genel içerik üreticilerinden ayrı rol: `obgyn_doctor`).

* **Güvenli Hasta Eşleştirme (Davet & Rıza):**

  * Doktorun kendine özel **Davet Kodu / QR Kodu** bulunur.

  * Anne adayı bu kodu uygulamaya girerek veya doktorun gönderdiği daveti onaylayarak **"Doktorumla Veri Paylaşımını Aç"** iznini verir.

  * Anne adayı dilediği zaman paylaşım kapsamını (örn. ruh hali günlüğünü gizleyip sadece tansiyon, kilo ve semptomları açma) güncelleyebilir veya eşleşmeyi sonlandırabilir.

* **Hasta Takip Paneli (Klinik Dashboard):**

  * Tüm aktif gebelerin haftaya, tahmini doğum tarihine ve risk/uyarı durumuna göre filtrelenebilir listesi.

  * **Hasta Detay Görünümü:** Hastanın girdiği kilo değişim grafiği, tansiyon ölçümleri, semptom kayıtları, tekme sayacı geçmişi ve yaklaşan tarama testlerinin (ikili test, detaylı USG, OGTT vb.) tek ekranda özeti.

  * **Akıllı Uyarı Göstergeleri:** Hastanın girdiği kritik değerlerde (örn. yüksek tansiyon kaydı, ani kilo artışı veya sık kasılma kaydı) doktor panelinde görsel dikkat işareti (triage flag).

* **Kişiselleştirilmiş Öneri & Bakım Planı:**

  * Doktorun hastaya özel not, beslenme/aktivite önerisi, tahlil istem hatırlatması veya kontrol sonrası özet göndermesi.

  * Gönderilen öneriler anne adayının ana ekranında **"Doktorumun Önerileri"** kartında öncelikli olarak görünür ve anlık bildirim (Push) ile iletilir.

  * Doktorun yalnızca kendisinin görebileceği **Özel Klinik Notlar** (hastaya kapalı dahili takip notları).

* **Randevu Oluşturma ve Yönetimi:**

  * Doktorun belirli bir hasta için muayene, ultrason veya tahlil kontrolü randevusu oluşturması, tarih/saat güncellemesi veya iptal etmesi.

  * Oluşturulan randevu anne adayının uygulama içi takvimine otomatik işlenir; randevu öncesi (örn. 1 gün ve 2 saat önce) otomatik hatırlatma ve hazırlık notu (örn. *"Aç karnına geliniz"*) gönderilir.

  * Hastanın randevuya katılım onayı ("Geleceğim" / "Tarih Değişikliği Talebi") doktor takvimine anlık düşer.

## 4. Teknoloji Yığını (Tech Stack)

Claude Code ile maksimum hız, tip güvenliği ve tek kod tabanından hem **PWA** (anne adayları + masaüstü/tablet doktor paneli) hem **iOS/Android** çıkışı için optimize edilmiş modern mimari:

| Katman | Teknoloji | Seçim Nedeni | 
| ----- | ----- | ----- | 
| **Framework** | **Next.js 15+ (App Router)** + TypeScript | SEO, SSR, API Routes ve Route Groups ile `(patient)` ve `(doctor)` arayüzlerinin tek projede temiz ayrımı. | 
| **Stil & UI** | **Tailwind CSS** + **shadcn/ui** + Framer Motion | Anne adayları için mobil öncelikli sıcak UI, doktorlar için veri yoğunluklu masaüstü/tablet klinik tabloları ve grafikler (`Recharts`). | 
| **PWA Katmanı** | **Serwist** (Service Worker) + Web App Manifest | Çevrimdışı çalışma (offline tekme/kasılma sayacı), ana ekrana ekleme, randevu ve doktor önerisi Web Push bildirimleri. | 
| **Mobil Uygulama** | **Capacitor.js** | Mevcut Next.js/PWA kod tabanını iOS App Store ve Google Play Store'a native özelliklerle (Push, Haptics, Kamera, QR Tarayıcı) paketleme. | 
| **Backend & DB** | **Supabase** (PostgreSQL + Auth + Realtime + Storage) | Hızlı MVP, sıkı **Row Level Security (RLS)** ile hasta-doktor veri izolasyonu ve anlık randevu/veri senkronizasyonu. | 
| **ORM / Veri** | **Drizzle ORM** veya Supabase JS Client + Zod | Uçtan uca tip güvenliği ve şema validasyonu. | 
| **Yapay Zeka** | **Anthropic Claude API** (Vercel AI SDK ile) | Güvenli sistem promptları, Türkçe dil kalitesi ve akışlı (streaming) yanıtlar. | 
| **Test & Kalite** | **Vitest** (Unit) + **Playwright** (E2E) + ESLint/Prettier | Claude Code'un kendi yazdığı kodu ve özellikle RLS güvenlik sınırlarını otomatik doğrulaması için zorunlu. | 
| **Hosting & CI/CD** | **Vercel** + **GitHub Actions** | PR bazlı önizleme linkleri (Preview Deployments) ve otomatik dağıtım. | 

## 5. Veritabanı Mimarisi (Özet Şema)

```
users (id, email, full_name, role[mother|partner|obgyn_doctor|content_expert|admin], avatar_url, created_at)

-- Anne Adayı ve Gebelik Verileri
pregnancies (id, user_id, partner_id, lmp_date, due_date, baby_nickname, is_active)
  ├── health_logs (id, pregnancy_id, type[weight|water|bp|symptom], value_json, logged_at)
  ├── kick_sessions (id, pregnancy_id, started_at, ended_at, kick_count)
  ├── contractions (id, pregnancy_id, started_at, duration_sec, intensity)
  ├── mood_entries (id, pregnancy_id, mood_score, tags[], note, created_at)
  ├── checklists (id, pregnancy_id, category[hospital|shopping], item_title, is_checked)
  └── letters (id, pregnancy_id, title, content, photo_url, week_number, created_at)

-- Kadın Doğum Uzmanı & Hasta Takip İlişkisi
doctor_profiles (id, user_id, title, diploma_no, clinic_name, city, invite_code, verification_status[pending|verified|rejected], verified_at)
  └── doctor_patient_links (id, doctor_id, pregnancy_id, patient_user_id, status[pending|active|revoked], share_permissions_json, linked_at, revoked_at)
        ├── appointments (id, link_id, doctor_id, patient_user_id, scheduled_at, duration_min, type[routine|usg|lab|online], prep_note, status[scheduled|confirmed|reschedule_requested|completed|cancelled])
        ├── doctor_recommendations (id, link_id, doctor_id, patient_user_id, title, body, category[nutrition|activity|test|general], is_read, created_at)
        └── doctor_private_notes (id, link_id, doctor_id, content, updated_at) -- Sadece doktorun görebildiği dahili notlar

-- Sosyal Topluluk
community_clubs (id, slug, name, due_month_year)
  └── posts (id, club_id, author_id, is_anonymous, category, content, media_urls[], status, created_at)
        ├── comments (id, post_id, author_id, is_anonymous, content, created_at)
        └── reactions (id, post_id, user_id, type[heart|hug|laugh])

-- Magazin, Bilimsel İçerik & Eğlence
articles (id, slug, title, category[science|magazine|lifestyle], target_week, body_mdx, author_expert_id, published_at)
baby_names (id, name, gender, origin, meaning)
  └── name_swipes (id, pregnancy_id, user_id, name_id, liked[bool])
```

## 6. Tasarım Sistemi ve UX İlkeleri

Uygulama kullanıcı rolüne göre iki farklı deneyim dili sunar:

### 6.1. Anne Adayı Arayüzü (Sıcak, Yatıştırıcı & Mobil Öncelikli)

* **Renk Paleti:**

  * *Ana Arka Plan:* Sıcak Krem (`#FAF7F2`) — Göz yormayan okuma deneyimi.

  * *Birincil Vurgu:* Yumuşak Şeftali / Mercan (`#E8998D`) — Şefkat ve sıcaklık.

  * *İkincil Vurgu:* Adaçayı Yeşili (`#8FA895`) — Sağlık, doğallık ve denge.

  * *Gece Modu (Dark Mode):* Koyu Antrasit / Gece Laciverti (`#161922`) — Gece uykusuzluk ve emzirme anlarında mavi ışığı azaltmak için zorunlu.

* **Navigasyon:** Alt gezinme çubuğu (Bottom Tab Bar — 5 sekme): `Bugün` | `Araçlar` | `Topluluk` | `Keşfet` | `Profil`. (Doktorla eşleşmiş anne adaylarında `Bugün` sekmesinin en üstünde "Doktorum & Yaklaşan Randevum" özet kartı yer alır.)

### 6.2. Kadın Doğum Uzmanı Arayüzü (Klinik, Net & Masaüstü/Tablet Uyumlu)

* **Tasarım Dili:** Sıcak krem yerine klinik netlik sağlayan açık nötr zemin (`#F8FAFC`), yüksek kontrastlı veri grafikleri ve adaçayı/petrol mavisi vurgu tonları.

* **Navigasyon:** Masaüstü ve tabletlerde sol yan menü (Sidebar), mobilde sadeleştirilmiş alt çubuk: `Hastalarım` | `Takvim & Randevular` | `Uyarılar` | `Klinik Profilim`.

* **Hız ve Ergonomi:** Doktorun muayene aralarında 2–3 dokunuşla randevu oluşturabilmesi veya hazır şablonlardan kişiselleştirilmiş öneri gönderebilmesi için hızlı aksiyon modalları.

## 7. Hukuki, Güvenlik ve Etik Gereksinimler (Türkiye)

1. **KVKK Uyumu (6698 Sayılı Kanun) & Veri Paylaşım Rızası:**

   * Gebelik ve sağlık verileri **"Özel Nitelikli Kişisel Veri"** kapsamındadır.

   * Kayıt sırasında genel aydınlatma/açık rıza metnine ek olarak, **bir doktorla eşleşirken ikinci ve ayrı bir "Hekimle Sağlık Verisi Paylaşımı Açık Rıza Onayı"** alınmalıdır.

   * Anne adayı paylaşım iznini tek tıkla geri çekebilmeli (erişim anında kesilir) ve "Hesabımı & Tüm Verilerimi Sil" hakkını kullanabilmelidir.

2. **Hekim Doğrulama ve Yetki Sınırları:**

   * `obgyn_doctor` rolü kayıt anında otomatik aktif olmaz; yönetici onayıyla (diploma tescil numarası / uzmanlık doğrulaması) `verified` statüsüne geçer. Doğrulanmamış doktorlar hasta eşleştiremez.

   * **Klinik Sınırlar:** eGebelik bir hasta takip, bilgilendirme ve randevu destek platformudur; resmi HBYS, e-Nabız veya e-Reçete yerine geçmez. Uygulama üzerinden reçete yazılmaz ve acil müdahale taahhüdü verilmez.

3. **Tıbbi Sorumluluk Reddi (Medical Disclaimer):**

   * Tüm bilimsel içerikler, sayaçlar, doktor öneri alanı ve AI asistan ekranları belirgin biçimde *"Bu platform acil tıbbi müdahale amaçlı değildir. Acil durumlarda 112'yi arayın veya en yakın sağlık kuruluşuna başvurun."* uyarısını taşımalıdır.

4. **Sıkı Veri İzolasyonu (Zero-Trust RLS):**

   * Supabase **Row Level Security (RLS)** politikaları her tabloda aktif olmalıdır.

   * Bir doktor **yalnızca** `doctor_patient_links` tablosunda `status = 'active'` olan ve ilgili veri kategorisine izin verilmiş (`share_permissions_json`) hastaların sağlık verilerini okuyabilir.

   * `doctor_private_notes` tablosuna hastalar veya başka doktorlar kesinlikle erişemez.

## 8. GitHub & Claude Code Geliştirme İş Akışı

Bu proje, **Claude Code**'un otonom ve yüksek kaliteli kod üretmesi için özel olarak yapılandırılmış bir GitHub disipliniyle geliştirilecektir.

### 8.1. Önerilen Dizin Yapısı

```
egebelik/
├── .github/
│   ├── workflows/          # CI: Lint, Typecheck, Vitest, Playwright
│   └── ISSUE_TEMPLATE/     # Feature ve Bug şablonları
├── docs/                   # Mimari kararlar (ADR), proje planı
├── public/                 # PWA manifest.json, ikonlar, illüstrasyonlar
├── src/
│   ├── app/
│   │   ├── (patient)/      # Anne adayı & eş arayüzü (Mobile-First)
│   │   ├── (doctor)/       # Kadın doğum uzmanı portalı (Dashboard-First)
│   │   ├── (auth)/         # Giriş, kayıt, rol seçimi ve doktor doğrulama
│   │   └── api/            # API Route'ları (AI, bildirim, webhook)
│   ├── components/         # UI (shadcn) ve ortak bileşenler
│   ├── features/           # Modül bazlı kod (tracker/, community/, magazine/, ai/, doctor-portal/)
│   ├── lib/                # Supabase client, AI SDK, tarih/gebelik hesaplama yardımcıları
│   └── types/              # TypeScript ve DB tipleri
├── supabase/
│   └── migrations/         # SQL migrasyon dosyaları ve RLS politikaları
├── tests/                  # Unit, E2E ve RLS güvenlik testleri
├── CLAUDE.md               # Claude Code için proje anayasası (KRİTİK)
└── PROJECT_PLAN.md         # Bu dosya
```

### 8.2. `CLAUDE.md` Dosyası (Proje Başlangıcında Oluşturulmalı)

Claude Code her oturumda kök dizindeki `CLAUDE.md` dosyasını otomatik okur. Aşağıdaki temel kuralları `CLAUDE.md` içine ekleyin:

* **Dil:** Tüm UI metinleri doğal ve sıcak bir **Türkçe**, kod/değişken/commit isimleri **İngilizce** olmalıdır.

* **Kod Standartları:** Strict TypeScript (`any` yasak), Server Components öncelikli, form doğrulamalarında `zod` kullanımı zorunlu.

* **Rol ve Güvenlik Kuralı:**

  * Yeni bir Supabase tablosu eklendiğinde mutlaka RLS politikası içeren migration dosyası yazılmalıdır.

  * Doktor portalı endpoint'leri ve Server Action'ları hem oturum rolünü (`obgyn_doctor`) hem doğrulama durumunu (`verified`) hem de aktif hasta bağlantısını (`doctor_patient_links.status = 'active'`) doğrulamadan veri dönmemelidir.

* **Doğrulama Komutları:** Her görev bitiminde Claude Code şu komutları çalıştırıp geçmeden işi tamamlamamalıdır:

  * `npm run typecheck`

  * `npm run lint`

  * `npm run test`

* **Tıbbi Etik Kuralı:** AI promptlarında ve sağlık ekranlarında kesin teşhis dili kullanılmamalıdır.

### 8.3. GitHub Branch & Issue Stratejisi

* `main`: Her zaman canlıya (production) hazır, korumalı dal. Doğrudan push kapalı.

* `develop`: Entegrasyon dalı.

* Özellik dalları: `feat/kick-counter`, `feat/doctor-patient-pairing`, `feat/doctor-appointments`, `fix/pwa-offline-cache`.

* **Commit Standardı (Conventional Commits):** `feat(doctor): add appointment scheduler with patient push sync`, `fix(rls): restrict revoked doctor access to health logs`.

### 8.4. Claude Code Çalışma Döngüsü (Önerilen Rutin)

Her yeni özellik için şu adımları izleyin:

1. GitHub'da net kabul kriterleri (Acceptance Criteria) olan bir **Issue** açın (örn. `#24 Doktor-Hasta Davet Kodu ile Eşleştirme`).

2. Terminalde yeni branch oluşturun: `git checkout -b feat/doctor-patient-pairing`.

3. Claude Code'u **Plan Mode** ile başlatın:

   > *"PROJECT_PLAN.md ve CLAUDE.md dosyalarını oku. GitHub #24 numaralı issue kapsamında Doktor-Hasta Eşleştirme modülünü ve RLS politikalarını planla. Önce sadece teknik planı çıkar, onayımı bekle."*

4. Planı onayladıktan sonra kodlamayı, unit/RLS testlerini ve Supabase migration dosyasını yaptırın.

5. `npm run typecheck && npm run test` çıktılarını kontrol edin.

6. Claude Code'a PR açıklaması hazırlatıp GitHub CLI (`gh pr create`) ile Pull Request açın.

## 9. Fazlandırılmış Yol Haritası (Roadmap)

### Faz 0: Temel Altyapı ve Kurulum (Hafta 1)

* \[ \] GitHub reposunun açılması, branch koruma kuralları ve CI workflow'larının (`lint`, `typecheck`, `test`) kurulması.

* \[ \] Next.js + TypeScript + Tailwind + shadcn/ui + Serwist (PWA) iskeletinin ve `(patient)` / `(doctor)` route gruplarının oluşturulması.

* \[ \] `CLAUDE.md` dosyasının yazılması.

* \[ \] Supabase projesinin bağlanması, çoklu rol destekli Auth (`mother`, `partner`, `obgyn_doctor`) ve KVKK onay akışının tamamlanması.

* \[ \] Temel tasarım sistemi (renkler, fontlar, Dark Mode, rol bazlı navigasyon).

### Faz 1: MVP — Çekirdek Gebelik Takibi (Hafta 2–5)

* \[ \] Onboarding sihirbazı (SAT/TDT hesaplama, bebek takma adı).

* \[ \] Hafta hafta gelişim ana ekranı (40 haftalık içerik veritabanı + boyut benzetmeleri).

* \[ \] Offline çalışabilen **Tekme Sayacı** ve **Kasılma Zamanlayıcı**.

* \[ \] Kilo, su, tansiyon ve semptom günlüğü + basit grafikler.

* \[ \] Hastane çantası ve alışveriş kontrol listeleri.

* \[ \] PWA kurulum testi (iOS Safari ve Android Chrome'da "Ana Ekrana Ekle" + Push bildirim altyapısı).

### Faz 2: Sosyal Yaşam Alanı ve Topluluk (Hafta 6–9)

* \[ \] Doğum ayına göre otomatik kulüp ataması (*"X Ayı Anneleri"*).

* \[ \] Gönderi oluşturma, fotoğraf yükleme, anonim paylaşım ve yorum/tepki sistemi.

* \[ \] İçerik şikayet mekanizması ve AI destekli ön moderasyon.

* \[ \] Kullanıcı profilleri ve bildirim merkezi.

### Faz 3: Magazin, Eğlence ve Duygusal Destek (Hafta 10–13)

* \[ \] Magazin & bilimsel makale CMS / MDX altyapısı ve Keşfet akışı.

* \[ \] **Eş Modu** davet sistemi ve ortak **İsim Bulucu** (swipe mekaniği).

* \[ \] AI Gebelik Asistanı (haftaya duyarlı, tıbbi güvenlik bariyerli).

* \[ \] Duygu durumu günlüğü, nefes egzersizi zamanlayıcısı ve "Bebeğime Mektuplar" (PDF çıktılı).

### Faz 4: Kadın Doğum Uzmanı Portalı & Hasta Takip Ekosistemi (Hafta 14–17)

* \[ \] Doktor kayıt akışı, hekim doğrulama (admin onay) paneli ve klinik profil oluşturma.

* \[ \] QR / Davet Kodu ile hasta-doktor eşleştirme, KVKK paylaşım onayı ve izin yönetimi.

* \[ \] **Doktor Dashboard'u:** Aktif hasta listesi, haftaya göre filtreleme, kilo/tansiyon/semptom grafikleri ve kritik değer uyarıları.

* \[ \] **Öneri & Bakım Planı:** Doktorun hastaya özel öneri göndermesi, hazır şablonlar, anne adayı ana ekranında "Doktorumun Önerileri" kartı ve dahili doktor notları.

* \[ \] **Randevu Yönetimi:** Doktor tarafından randevu oluşturma, anne adayı takvimiyle çift yönlü senkronizasyon, katılım onayı ve otomatik Push hatırlatmaları.

* \[ \] Doktor-hasta RLS güvenlik testlerinin (erişim iptali, çapraz hasta izolasyonu) tamamlanması.

### Faz 5: Mobil Mağaza Yayını ve Büyüme (Hafta 18+)

* \[ \] **Capacitor.js** entegrasyonu ile iOS ve Android derlemelerinin (QR okuyucu ve native Push dahil) alınması.

* \[ \] App Store ve Google Play Store yayın süreçleri.

* \[ \] Performans optimizasyonu, SEO çalışması (magazin ve haftalık rehber sayfaları için organik trafik).

* \[ \] Gelir modeli bileşenlerinin (eGebelik Plus + Klinik SaaS) devreye alınması.

## 10. Sürdürülebilir Gelir Modeli (Monetizasyon)

Anne adaylarının ve hekimlerin güvenini zedelemeyecek **çift taraflı (B2C + B2B) etik gelir stratejisi**:

1. **eGebelik Plus (B2C Freemium Abonelik):** Temel takip, doktor bağlantısı ve topluluk tamamen ücretsiz; sınırsız AI asistanı, uzman canlı yayınları, reklamsız deneyim, eşle gelişmiş senkronizasyon ve sınırsız anı kitabı PDF çıktısı abonelik kapsamında.

2. **eGebelik Klinik (B2B Doktor/Klinik SaaS):** Kadın doğum uzmanları için belirli bir aktif hasta sayısına kadar ücretsiz kullanım; sınırsız hasta takibi, çoklu sekreter/asistan desteği, gelişmiş grafik raporlama (PDF hasta özeti) ve otomatik SMS/Push randevu hatırlatma paketleri için aylık klinik aboneliği.

3. **Anı Kitabı Baskı Hizmeti:** Gebelik boyunca tutulan *"Bebeğime Mektuplar"* ve göbek fotoğraflarının tek tıkla basılı hatıra kitabına dönüştürülmesi.

4. **Seçkin Marka İş Birlikleri:** Yalnızca gebelik ve bebek güvenliği onaylı markalarla doğal (native) içerik ve indirim kuponu iş birlikleri.

## 11. İlk Adım Kontrol Listesi (Hemen Başlamak İçin)

1. GitHub'da `egebelik` adında yeni bir repository oluşturun.

2. Bu dosyayı `PROJECT_PLAN.md` adıyla repo kök dizinine ekleyin.

3. Terminalde `claude` komutunu çalıştırıp ilk görev olarak **Faz 0** kurulumunu ve `CLAUDE.md` dosyasının oluşturulmasını isteyin.