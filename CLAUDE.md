# CLAUDE.md — eGebelik Proje Anayasası

Bu dosya, bu repoda çalışan her Claude Code oturumu için bağlayıcı kurallardır. Ürün kapsamı, özellikler ve yol haritası için **`PROJECT_PLAN.md`** dosyasını oku; bu dosya ise *nasıl* çalışacağını tanımlar. İkisi çelişirse bu dosyadaki kurallar geçerlidir ve çelişkiyi kullanıcıya bildir.

## 1. Proje Özeti

eGebelik; anne adayları (`mother`), eşler (`partner`), kadın doğum uzmanları (`obgyn_doctor`), içerik uzmanları (`content_expert`) ve yöneticiler (`admin`) için çok dilli bir gebelik takip PWA'sıdır. Özel nitelikli sağlık verisi işler (KVKK). Tamamen **kendi VPS'imizde** (Docker Compose + self-hosted Supabase) çalışır.

**Yığın:** Next.js 15+ (App Router, `output: 'standalone'`) · TypeScript (strict) · next-intl · Tailwind CSS + shadcn/ui · Serwist (PWA) · self-hosted Supabase (Postgres, Auth, Realtime, Storage) · Supabase JS Client + Zod · Anthropic Claude API (AI SDK) · Vitest + Playwright · Docker + Caddy + GitHub Actions.

## 2. Dil Kuralları

* **Kod, değişken, fonksiyon, dosya, DB tablo/sütun isimleri, commit mesajları ve PR başlıkları İngilizce.**
* **UI metinleri doğal, sıcak ve yargısız bir Türkçeyle yazılır** ve her zaman çeviri dosyalarından gelir. `messages/tr.json` kaynak dosyadır.
* Kod yorumları İngilizce, kısa ve yalnızca "neden"i açıklamak için.
* Plan ve kullanıcıya yönelik dokümanlar (`PROJECT_PLAN.md`, `docs/`) Türkçe olabilir; ADR'ler Türkçe veya İngilizce olabilir.

## 3. Çoklu Dil (i18n) Kuralları

* Desteklenen diller yalnızca `src/i18n/config.ts` içinde tanımlanır (`locales = ['tr', 'en']`, `defaultLocale = 'tr'`). Başka yerde dil listesi sabit yazma.
* **Bileşenlerde, Server Action'larda, bildirimlerde, e-postalarda ve hata mesajlarında sabit (hard-coded) kullanıcı metni yasaktır.** Her metin `useTranslations` / `getTranslations` ile bir anahtardan gelir.
* Yeni bir metin anahtarı eklediğinde **aynı commit'te** tüm dil dosyalarına (`tr.json`, `en.json`, ...) ekle. Çevirisini bilmediğin dil için anahtarı İngilizce metinle ekle ve PR açıklamasında "çeviri gözden geçirilmeli" olarak listele.
* Anahtarlar modül bazlı ad alanlarıyla: `tracker.kickCounter.title`, `doctor.appointments.create.submit`. Anahtar adları İngilizce camelCase.
* Çoğul/cinsiyet/değişken içeren metinlerde ICU MessageFormat kullan; string birleştirme yapma.
* Tarih, saat, sayı, birim: her zaman `Intl` / next-intl biçimlendiricileri (`useFormatter`, `getFormatter`). `toLocaleUpperCase(locale)` kullan (Türkçe `i/İ`).
* Sayfalar `src/app/[locale]/...` altında; `src/app/api/` dil öneki almaz. İç linkler next-intl'in `Link`/`redirect`/`useRouter` sarmalayıcılarıyla yapılır (`src/i18n/routing.ts`).
* CSS'te yalnızca mantıksal yön sınıfları: `ms-/me-/ps-/pe-/start-/end-/text-start/text-end`. `ml-/mr-/pl-/pr-/left-/right-/text-left/text-right` kullanma (RTL hazırlığı).
* **Veritabanı:**
  * Editoryal içerik (haftalık içerik, makaleler, şablonlar, isim anlamları, kulüp adları) `<table>` + `<table>_translations (parent_id, locale, ...)` deseniyle saklanır; PK `(parent_id, locale)`.
  * Kullanıcı içeriği (gönderi, yorum, mektup, doktorun serbest notu) çevrilmez; `locale` sütunuyla yazıldığı dilde saklanır.
  * Semptom, ruh hali etiketi, randevu türü, kategori gibi değerler **kod/enum** olarak saklanır; görüntülerken çevrilir. Veritabanına çevrilmiş etiket metni yazma.
  * Çeviri yoksa varsayılan dile (`tr`) düş ve UI'da bunu belirt. Tıbbi içerikte yalnızca `review_status = 'approved'` çeviriler gösterilir.
* Bildirim/e-posta/SMS **alıcının** `users.preferred_locale` diliyle üretilir.
* Dil ≠ ülke: acil numara (112), tarama takvimi ve yasal metinlerin bağlayıcılığı ülkeye (Türkiye) bağlıdır, dile değil.

## 4. Kod Standartları

* Strict TypeScript. **`any` yasak** (`unknown` + daraltma kullan). `@ts-ignore` yasak; zorunluysa `@ts-expect-error` + gerekçe.
* Varsayılan olarak **Server Components**. `'use client'` yalnızca etkileşim, tarayıcı API'si veya offline gerektiren yerlerde.
* Tüm dış girdiler (form, Server Action, API route, URL parametresi, webhook) **Zod** ile doğrulanır.
* Modül kodu `src/features/<module>/` altında (`tracker`, `community`, `magazine`, `ai`, `doctor-portal`, ...). Ortak UI `src/components/`, altyapı yardımcıları `src/lib/`.
* Gebelik haftası/tarih hesaplamaları tek bir yerde (`src/lib/pregnancy/`) ve birim testli. Zamanlar DB'de `timestamptz` (UTC); kullanıcı saat dilimiyle gösterilir (varsayılan `Europe/Istanbul`).
* Ölçümler DB'de tek birimde (kg, ml, mmHg); dönüşüm yalnızca gösterimde.
* Yeni bağımlılık eklemeden önce mevcut yığınla çözülebilir mi kontrol et; eklediysen PR'da gerekçesini yaz.

## 5. Güvenlik ve Veri İzolasyonu (Kırmızı Çizgiler)

* **Her yeni tablo, aynı migration dosyasında `ENABLE ROW LEVEL SECURITY` ve gerekli politikalarla gelir.** RLS'siz tablo yasaktır. Her yeni politika için `tests/rls/` altında en az bir izin verilen ve bir reddedilen senaryo testi yaz.
* Doktor portalı endpoint'leri, Server Action'ları ve sorguları, veri dönmeden önce şunların **üçünü de** doğrular:
  1. Oturum rolü `obgyn_doctor`,
  2. `doctor_profiles.verification_status = 'verified'`,
  3. İlgili hasta için `doctor_patient_links.status = 'active'` **ve** istenen veri kategorisinin `share_permissions_json` içinde izinli olması.
* `doctor_private_notes` yalnızca onu yazan doktor tarafından okunur/yazılır. Hastalar ve diğer doktorlar asla erişemez.
* Paylaşım iptal edildiğinde (`revoked`) doktorun erişimi **anında** kesilir; önbellekte (cache) sağlık verisi tutma.
* `SUPABASE_SERVICE_ROLE_KEY` yalnızca sunucu tarafında, RLS'i bilinçli olarak aşması gereken ve gerekçesi yorumla yazılmış yönetim işlemlerinde kullanılır. İstemci paketine (`NEXT_PUBLIC_*`) asla girmez.
* Loglara, hata takip servisine, analitiğe ve AI promptlarına **ad, e-posta, telefon gibi tanımlayıcılar ve gereksiz sağlık verisi gönderme.**
* Sırlar (`.env`, anahtarlar, şifreler) repoya asla commit edilmez. Yeni ortam değişkeni eklediğinde `infra/.env.example` dosyasına açıklamalı, değersiz bir satır ekle.
* KVKK onayları `consents` tablosuna metin sürümü ve dil ile kaydedilir. Hekimle paylaşım için **ayrı** açık rıza gerekir.

## 6. Altyapı ve Self-Hosting Kuralları

* Uygulama **yalnızca Docker Compose ile kendi VPS'imizde** çalışır. Vercel'e özgü servisler (Vercel KV, Blob, Cron, Edge Config, Image Optimization'a bağımlılık, `@vercel/*` barındırma paketleri) ve Supabase Cloud'a özgü özellikler (Cloud yönetim API'si, Cloud'a özel eklentiler) **kullanılmaz**. AI SDK (`ai` paketi) bir kütüphane olarak kullanılabilir.
* Zamanlanmış işler (hatırlatmalar, yedekler) Vercel Cron yerine Postgres `pg_cron`, bir worker container'ı veya sunucu cron'u ile yapılır; çözümü ADR ile kaydet.
* Edge Runtime'a bağımlı kod yazma; Node.js runtime varsayılandır.
* Migrasyonların **tek doğru kaynağı** `supabase/migrations/*.sql`'dir. Studio'dan veya elle şema değişikliği yapma. Migrasyonlar geriye dönük uyumlu yazılır (expand → migrate → contract); yıkıcı değişiklikleri (kolon/tablo silme) ayrı bir sürüme bırak ve PR'da açıkça belirt.
* Yerel geliştirme: `supabase start` + `npm run dev`. `supabase/seed.sql` gerçek kişisel veri içermez.
* Altyapı dosyaları `infra/` altındadır (`docker-compose.yml`, `supabase/`, `Caddyfile`, `.env.example`, `scripts/`). Postgres ve Supabase Studio dışarıya port açmaz.
* Önemli mimari kararlar `docs/adr/NNNN-<slug>.md` olarak kaydedilir.
* **Production'a dokunan hiçbir komutu (deploy, migration, yedekten geri yükleme, sunucuda `docker compose` işlemleri) kullanıcının açık onayı olmadan çalıştırma.**

## 7. Tıbbi Etik Kuralları

* AI promptlarında, sağlık ekranlarında ve bildirimlerde — hangi dilde olursa olsun — **kesin teşhis dili kullanma** ("Sizde preeklampsi var" değil, "Bu değer doktorunuzla görüşmeyi gerektirebilir").
* Kırmızı bayrak belirtilerde (kanama, şiddetli baş ağrısı, görme bozukluğu, bebek hareketlerinde belirgin azalma, sıvı gelmesi vb.) kullanıcı her zaman doktoruna veya **112**'ye yönlendirilir.
* Sağlık araçları, doktor öneri alanı ve AI asistan ekranlarında tıbbi sorumluluk reddi (`legal.medicalDisclaimer` anahtarı) görünür olmalıdır.
* Uygulama reçete yazmaz, ilaç dozu önermez, acil müdahale taahhüdü vermez.
* Tıbbi içerik çevirisi makine çevirisiyle doğrudan yayına alınmaz; uzman onayı (`review_status = 'approved'`) gerekir.
* AI asistan güvenlik bariyerleri desteklenen **her dil** için testle doğrulanır.

## 8. Doğrulama Komutları (Görev Bitiş Kriteri)

Bir görevi tamamlandı saymadan önce şu komutları çalıştır; hepsi geçmeden işi bitirme ve kullanıcıya "bitti" deme:

```bash
npm run typecheck
npm run lint
npm run test
npm run i18n:check
```

* DB/RLS değiştiyse ek olarak: `npm run test:rls` (yerel Supabase üzerinde).
* UI akışı değiştiyse ve ilgili E2E testi varsa: `npm run test:e2e`.
* Bu script'ler henüz yoksa (Faz 0 öncesi) bunu açıkça belirt; ilk kurulum görevinde bu script'leri `package.json`'a ekle.
* Bir test başarısız olursa testi atlama, silme veya devre dışı bırakma; kök nedeni düzelt.

## 9. Git ve PR Akışı

* Dallar: `main` (production, korumalı), `develop` (staging), özellik dalları `feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`.
* **Conventional Commits**, İngilizce: `feat(tracker): add offline kick counter`, `fix(rls): restrict revoked doctor access to health logs`, `feat(i18n): add english translations for onboarding`, `chore(infra): add caddy reverse proxy`.
* Küçük, odaklı commit'ler. Bir PR tek bir issue'yu çözer.
* PR açıklaması: ne değişti, neden, nasıl test edildi, eklenen migration/RLS politikaları, eklenen çeviri anahtarları ve çevirisi gözden geçirilmesi gerekenler, yeni ortam değişkenleri.
* Yeni bir özelliğe başlamadan önce Plan Mode'da teknik planı çıkar ve kullanıcının onayını bekle.

## 10. Yapma Listesi (Özet)

* ❌ RLS'siz tablo · ❌ `any` · ❌ Sabit UI metni · ❌ Fiziksel yön CSS sınıfları (`ml-`, `left-`)
* ❌ Vercel/Supabase Cloud'a özgü servis · ❌ Repoya sır commit'lemek · ❌ Loglarda sağlık verisi
* ❌ Teşhis dili · ❌ Onaysız production işlemi · ❌ Test atlayarak "bitti" demek
