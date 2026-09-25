# Model treści – Flotiq (przestrzeń „Terapia”)

Flotiq opisuje **strukturę strony**, nie tylko treść: strona (`page`) to uporządkowana lista sekcji, a nawigacja i stopka pochodzą z layoutu (`layout`). Dzięki temu administrator może dodać nową podstronę, zmienić kolejność sekcji albo użyć tej samej sekcji na kilku stronach – bez zmian w kodzie.

Dane rezerwacji (terminy, wizyty, pacjenci, kody wejścia do gabinetów) zostają w Laravelu. Łącznikiem jest `office.backendLocationId`.

## Zasada podziału odpowiedzialności

> **Flotiq decyduje CO i W JAKIEJ KOLEJNOŚCI. Kod decyduje JAK to wygląda.**

- Każdy typ sekcji (`section_*`) ma dokładnie jeden komponent React w `src/components/sections/`.
- Warianty wyglądu to pola `select` z opcjami zatwierdzonymi w design systemie (np. dekoracja tła `brak / przesunięta w lewo / w prawo`). Żadnych dowolnych kolorów, fontów ani CSS w CMS.
- Wewnętrzne typy Flotiqa `_page`, `_layout`, `_navigation`, `_site` **nie są używane** – należą do kreatora Flotiq Sites (treść jako JSON w polu tekstowym, własne fonty/kolory, hosting `sites.flotiq.com`) i kłóciłyby się z design systemem. Budujemy własne typy o tym samym wzorcu.

## Konwencje

- **Draft & Public** we wszystkich typach. Front w trybie podglądu wysyła nagłówek `X-MODE: preview` (zwraca też wersje robocze), bez niego API zwraca tylko opublikowane obiekty.
- **Kursywa w nagłówkach**: fragment w `*gwiazdkach*` → `<em>` (np. `Znajdź przestrzeń, by *zrozumieć siebie*`).
- **Długie treści**: `richtext` (HTML), sanityzowany i stylizowany na froncie.
- **Link** (CTA, pozycje menu) zawsze jako para: `page` (relacja do `page`, preferowane – nie psuje się przy zmianie sluga) **albo** `url` (ścieżka aplikacji, np. `/panel/rezerwacja`, `tel:`, zewnętrzny adres).
- **Obrazy**: relacja do `_media`; tekst alternatywny w bibliotece mediów.
- **SEO** na poziomie `page` (i szablonów kolekcji): `seoTitle`, `seoDescription`, `ogImage`, `noIndex`.

Legenda: `text`, `textarea`, `richtext`, `number`, `checkbox`, `select`, `media`, `relation → typ`, `list` (lista obiektów), `geo`, `dateTime`. ⭐ wymagane. „Link” = trzy pola z tym samym prefiksem: `…Label` (text) + `…Page` (relation → `page`) + `…Url` (text), np. `ctaLabel` / `ctaPage` / `ctaUrl`, `primaryCtaLabel` / …, `moreLabel` / …. W listach (`items`, `links`) pola to `label`, `page`, `url`.

**Status: wszystkie typy utworzone w przestrzeni „Terapia” (2026-09-24).**

---

## A. Struktura strony

### `settings` – Ustawienia (singleton)

| Pole | Typ | Uwagi |
|---|---|---|
| `siteName` ⭐ | text | „Katarzyna Trzeciakiewicz” |
| `tagline` ⭐ | text | „Gabinet psychoterapii” |
| `city` | text | JSON-LD, tytuły |
| `phone`, `email` | text | używane przez navbar, sticky pasek, CTA, stopkę |
| `defaultLayout` ⭐ | relation → `layout` | layout dla stron bez własnego i dla szablonów kolekcji |
| `titleTemplate` | text | `%s \| Katarzyna Trzeciakiewicz` |
| `seoDescription` ⭐, `ogImage` | textarea, media | domyślne SEO |
| `cancellationPolicy` | textarea | dialog odwołania wizyty w panelu |
| `bookingNote` | textarea | informacja nad kalendarzem rezerwacji |

### `layout` – Layout

| Pole | Typ | Uwagi |
|---|---|---|
| `name` ⭐ | text | „Główny”, „Minimalny (landing)” |
| `navbar` ⭐ | relation → `navbar` | |
| `footer` ⭐ | relation → `footer` | |
| `mobileStickyBar` | checkbox | dolny pasek „Zadzwoń / Umów wizytę” na mobile |

### `navbar` – Nawigacja

| Pole | Typ | Uwagi |
|---|---|---|
| `name` ⭐ | text | |
| `items` ⭐ | list: `label` ⭐, `page`, `url` | pozycje menu (kolejność = lista); aktywna pozycja wyliczana ze ścieżki |
| `showLogin` | checkbox | link „Zaloguj” do panelu |
| `showPhone` | checkbox | telefon z `settings` |
| `ctaLabel` / `ctaPage` / `ctaUrl` | Link | „Umów wizytę” → `/panel/rezerwacja` |

Stany wizualne (przezroczysty na hero / mglisty po przewinięciu) wynikają z kodu: navbar jest przezroczysty, gdy pierwszą sekcją strony jest `section_hero`.

### `footer` – Stopka

| Pole | Typ | Uwagi |
|---|---|---|
| `name` ⭐ | text | |
| `headline` | text | „Katarzyna *Trzeciakiewicz*\nGabinet psychoterapii” |
| `links` | list: `label` ⭐, `page`, `url` | kolumna nawigacji |
| `legalLinks` | list: `label` ⭐, `page`, `url` | polityka prywatności, regulamin |
| `showContact` | checkbox | telefon, e-mail z `settings` |
| `ctaLabel` / `ctaPage` / `ctaUrl` | Link | |

### `page` – Strona

| Pole | Typ | Uwagi |
|---|---|---|
| `title` ⭐ | text | nazwa robocza + domyślny `<title>` |
| `slug` ⭐ | text, unikalny | ścieżka bez ukośnika: `o-mnie`, `kontakt`; **strona główna: `index`**. Zarezerwowane: `panel`, `login`, `register`, `password`, `api`, `obszary-pomocy/*`, `gabinety/*`, `artykuly/*` |
| `layout` | relation → `layout` | puste = `settings.defaultLayout` |
| `sections` ⭐ | relation (wiele, kolejność, dowolny typ) | obiekty `section_*` w kolejności wyświetlania |
| `seoTitle`, `seoDescription`, `ogImage` | | |
| `noIndex` | checkbox | np. strony podziękowań |

---

## B. Sekcje

Każda sekcja to osobny obiekt – można go użyć na wielu stronach (np. ta sama `section_cta` na stronie głównej i „O mnie”). Wspólne pola opcjonalne we wszystkich sekcjach:

| Pole | Typ | Uwagi |
|---|---|---|
| `name` ⭐ | text | nazwa robocza w panelu Flotiqa („Hero – strona główna”) |
| `anchor` | text | `id` sekcji – kotwice i scroll-spy w navbarze (`#obszary-pomocy`) |

| Typ | Komponent (makieta) | Pola |
|---|---|---|
| `section_hero` | Hero z wideo lub animacją | `eyebrow`, `title` ⭐, `lead`, `video` (media, pierwszeństwo), `animation` (media, GIF), `image` ⭐ (media – poster i wersja przy `prefers-reduced-motion`), `primaryCta` (Link), `secondaryCta` (Link) |
| `section_statement` | Duże zdanie pod hero | `eyebrow`, `text` ⭐, `fogRings` (checkbox) |
| `section_help_areas` | Obszary pomocy (sticky scroll / akordeon) | `eyebrow`, `title`, `areas` (relation wiele → `help_area`; puste = wszystkie wg `order`), `more…` (Link) |
| `section_image_banner` | Baner zdjęciowy z cytatem | `image` ⭐, `quote` ⭐, `cta…` (Link), `backdrop` (select: `brak`, `pas-od-polowy`) |
| `section_about` | O mnie z zakładkami | `eyebrow`, `personName` ⭐, `role`, `portrait` ⭐, `badgeTitle`, `badgeText`, `tabs` ⭐ (list: `label` ⭐, `body` richtext, `facts` textarea – `Psychologia \| Uniwersytet Wrocławski` w liniach), `decoration` (select: `brak`, `przesuniete-tlo`) |
| `section_cta` | CTA band | `title` ⭐, `text`, `cta…` ⭐ (Link), `showPhone` (checkbox) |
| `section_offices` | Gabinety | `eyebrow`, `title`, `offices` (relation wiele → `office`; puste = wszystkie) |
| `section_rich_text` | Treść tekstowa | `eyebrow`, `title`, `body` ⭐ (richtext), `width` (select: `waska`, `szeroka`) |
| `section_faq` | FAQ (akordeon + JSON-LD) | `eyebrow`, `title`, `items` ⭐ (relation wiele → `faq_item`) |
| `section_contact` | Kontakt | `eyebrow`, `title`, `text`, `showOffices` (checkbox) – dane z `settings` |
| `section_articles` | Lista artykułów | `title`, `limit` (number), `helpArea` (relation → `help_area`, filtr) |

---

## C. Dane (kolekcje)

Obiekty wielokrotnego użytku, wskazywane przez sekcje. `help_area`, `office`, `article` mają też **własne podstrony z szablonu w kodzie** (`/obszary-pomocy/[slug]`, `/gabinety/[slug]`, `/artykuly/[slug]`) – layout z `settings.defaultLayout`, opcjonalne sekcje doklejane pod treścią (`extraSections`).

### `help_area` – Obszar pomocy

| Pole | Typ | Uwagi |
|---|---|---|
| `name` ⭐ | text | |
| `slug` ⭐ | text, unikalny | auto z `name` |
| `order` ⭐ | number | |
| `summary` ⭐ | textarea | **max ~280 znaków** (panel sekcji ma stałą wysokość, 5 linii) |
| `illustration` ⭐ | select | `circles`, `waves`, `ripples`, `relations`, `path`, `sprout` – SVG w kodzie |
| `body` | richtext | podstrona |
| `extraSections` | relation wiele → `section_*` | np. FAQ lub CTA pod treścią |
| `seoTitle`, `seoDescription`, `ogImage` | | |

### `office` – Gabinet

| Pole | Typ | Uwagi |
|---|---|---|
| `name` ⭐, `slug` ⭐ | text | |
| `backendLocationId` ⭐ | number, unikalny | `locations.id` w Laravelu |
| `street` ⭐, `postalCode` ⭐, `city` ⭐ | text | |
| `location` | geo | mapa, link nawigacji |
| `photos` | media (wiele) | |
| `directions` | richtext | dojazd – **bez kodów wejścia** (zostają w backendzie) |
| `accessibility` | textarea | |
| `order` ⭐ | number | |
| `extraSections`, SEO | | |

### `faq_item`

`question` ⭐ (text), `answer` ⭐ (richtext), `order` ⭐ (number).

### `article`

`title` ⭐, `slug` ⭐, `lead` ⭐, `cover`, `body` ⭐ (richtext), `publishedAt` ⭐, `helpAreas` (relation → `help_area`), `extraSections`, SEO.

---

## D. Jak to składa Next.js

```
src/app/(marketing)/[[...slug]]/page.tsx       jedna trasa dla wszystkich stron z CMS
src/app/(marketing)/obszary-pomocy/[slug]/     szablon help_area
src/app/(marketing)/gabinety/[slug]/           szablon office
src/app/(marketing)/artykuly/[slug]/           szablon article
src/components/sections/                       komponent na każdy typ section_*
src/components/sections/section-renderer.tsx   rejestr { section_hero: HeroSection, ... }
src/components/layout/                         SiteFrame, Navbar, Footer, MobileStickyBar
src/lib/flotiq.ts                              klient SDK + loadery (getPage, getSettings, getLayout …)
```

1. `[[...slug]]` → `slug` (`index` dla `/`) → pobranie `page` z `hydrate=2` (sekcje + ich relacje: obszary, gabinety, FAQ).
2. Layout: `page.layout` ?? `settings.defaultLayout` → Navbar + sekcje + Footer (+ sticky pasek).
3. Sekcje renderowane przez rejestr po `internal.contentType`; **nieznany typ jest pomijany** (w dev z ostrzeżeniem) – można dodać typ we Flotiqu przed komponentem bez psucia strony.
4. `generateStaticParams` z listy stron, `generateMetadata` z pól SEO + `settings`.
5. Cache: `@flotiq/nextjs-addon` taguje zapytania (`flotiq-content`, `flotiq-content-<typ>`), w draft mode wysyła `x-mode: preview`; webhook przy publikacji dowolnego obiektu unieważnia całość (mała strona – prościej i bezpieczniej niż śledzenie zależności sekcja → strona).
6. Typy TS generowane z definicji Flotiqa (`flotiq-api-typegen` z SDK) do `flotiq-api.d.ts` – po zmianie modelu `npm run flotiq:types`.
7. Panel (`/panel/*`) ma własny, stały layout w kodzie – nie korzysta z `layout` z CMS.

## Wyniki weryfikacji (2026-09-24)

1. **Relacja do wielu typów działa**: pole relacji z pustym „typem docelowym” (`relationContenttype: ""`) przyjmuje obiekty dowolnych typów. Tak są zdefiniowane `page.sections` i `extraSections`.
2. **Kolejność** relacji wielokrotnej jest zachowana w API (także po `hydrate`).
3. **`hydrate=1`** rozwija sekcje strony razem z `internal.contentType` – to klucz rejestru komponentów. Głębokość `hydrate=2` (np. `section_help_areas.areas`) do sprawdzenia z poziomu Nexta.
4. **Wersje robocze**: nagłówek `X-MODE: preview` zwraca obiekty w każdym statusie; bez niego API zwraca tylko opublikowane.

Ceny (`service`) – nie publikujemy, typ nie został utworzony.
