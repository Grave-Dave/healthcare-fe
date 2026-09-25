# Design system – Gabinet psychoterapii

Źródło prawdy dla nowego frontu w Next.js (Tailwind CSS v4 + shadcn/ui).
Makieta referencyjna: plansza **D · Las** na https://claude.ai/artifact/1ycKr8LDd4pvwNrPjLqTwf

## 1. Motyw przewodni

**Spokój, mgła, wyciszenie** – wszystko nawiązuje do hero (poranny las we mgle).

- Dużo pustej przestrzeni; sekcje oddychają (200–220 px pionowo na desktopie).
- Przejścia między sekcjami „rozmywają się” – zdjęcia i hero delikatnie wtapiają się w tło gradientem mgły (`mist-50`): hero ~110 px u dołu, banery ~80 px do 85% krycia. Mgła ma sugerować, nie zasłaniać zdjęcia.
- Wyróżnienie sekcji: miękkie bloki tła (`::before`/`::after`) przesunięte względem sekcji – zaczynają się w jej połowie i wchodzą w następną, a zdjęcia i karty na nie nachodzą. Do tego przesunięte obrysy (portret, CTA band). Szczegóły w sekcji 5.
- Kontrolki minimalistyczne. Stany hover/active opierają się na **transition + opacity**, delikatnie na **kolorze** i miękkim **box-shadow**. Bez skoków, obramowań akcentowych, jaskrawych kolorów.
- Ruch powolny i miękki; zawsze respektuje `prefers-reduced-motion`.

## 2. Kolory

Trzy grupy: **mist** (tła, powierzchnie, linie), **moss** (tekst, primary, ilustracje), **dawn** (ciepłe światło – główne CTA na ciemnym tle, akcenty ilustracji).

| Token | Hex | Użycie |
|---|---|---|
| `mist-50` | `#F7F7F3` | tło strony, kolor mgły w gradientach |
| `mist-100` | `#EEF0EA` | panele, tło ilustracji, placeholdery zdjęć |
| `mist-200` | `#DDE1D8` | linie, separatory, dolna krawędź tabów |
| `mist-300` | `#CDD3C9` | obramowania pól formularzy |
| `moss-950` | `#1A2620` | tekst główny, stopka, nakładka na hero (38%) |
| `moss-900` | `#24362D` | hover primary, tekst dużych cytatów |
| `moss-800` | `#30473B` | **primary** – przyciski, banner CTA, linki |
| `moss-700` | `#3A4D42` | tekst drugorzędny w panelach |
| `moss-600` | `#486152` | linie ilustracji SVG |
| `moss-500` | `#56695D` | tekst wyciszony, eyebrow, numery (≥4.5:1 na mist-50) |
| `moss-400` | `#647C6C` | akcent kursywy w nagłówkach – **tylko tekst ≥24 px** |
| `moss-300` | `#8FA396` | focus ring |
| `moss-200` | `#B7C4B9` | tekst w stopce (na moss-950) |
| `moss-100` | `#CFD9D1` | tekst drugorzędny na moss-800 |
| `dawn-300` | `#EBD9B1` | eyebrow na hero, hover `dawn-400` |
| `dawn-400` | `#E4CE9D` | **CTA na ciemnym tle** (tekst moss-950) |
| `dawn-500` | `#D6BC85` | akcent (kropka/słońce) w ilustracjach |

Zasady kontrastu:
- Biały tekst tylko na `moss-800` i ciemniejszych albo na hero z nakładką.
- Na `dawn-*` zawsze tekst `moss-950`.
- `moss-400` nie spełnia 4.5:1 dla drobnego tekstu – wyłącznie nagłówki.

### Tailwind v4 (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-mist-50: #F7F7F3;
  --color-mist-100: #EEF0EA;
  --color-mist-200: #DDE1D8;
  --color-mist-300: #CDD3C9;

  --color-moss-100: #CFD9D1;
  --color-moss-200: #B7C4B9;
  --color-moss-300: #8FA396;
  --color-moss-400: #647C6C;
  --color-moss-500: #56695D;
  --color-moss-600: #486152;
  --color-moss-700: #3A4D42;
  --color-moss-800: #30473B;
  --color-moss-900: #24362D;
  --color-moss-950: #1A2620;

  --color-dawn-300: #EBD9B1;
  --color-dawn-400: #E4CE9D;
  --color-dawn-500: #D6BC85;

  --font-display: var(--font-newsreader), Georgia, serif;
  --font-sans: var(--font-karla), system-ui, sans-serif;

  --radius-card: 28px;
  --radius-panel: 36px;

  --shadow-rest: 0 1px 2px rgb(26 38 32 / 0.06);
  --shadow-float: 0 18px 44px -24px rgb(26 38 32 / 0.28);
  --shadow-lift: 0 26px 60px -30px rgb(26 38 32 / 0.32);
  --shadow-glow: 0 14px 34px -12px rgb(26 38 32 / 0.45);

  --ease-mist: cubic-bezier(0.22, 0.61, 0.36, 1);
}
```

Mapowanie na zmienne shadcn/ui (`:root`): `--background` = mist-50, `--foreground` = moss-950, `--primary` = moss-800, `--primary-foreground` = białe, `--muted` = mist-100, `--muted-foreground` = moss-500, `--border` / `--input` = mist-200, `--ring` = moss-300, `--accent` = dawn-400.

Panel (kalendarz, wizyty) używa tej samej palety; kolory statusów wizyt – sekcja 8.

## 3. Typografia

| Rola | Font | Uwagi |
|---|---|---|
| Display / nagłówki | **Newsreader** (300, 400 + italic) | lekka waga 300; kursywa jako akcent w nagłówkach |
| Tekst, UI | **Karla** (400, 500, 700) | 500 dla przycisków i linków |

Ładowanie przez `next/font/google` (self-hosting, brak zapytań do Google w runtime):

```ts
import { Newsreader, Karla } from "next/font/google";

export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});
export const karla = Karla({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-karla",
});
```

`latin-ext` jest wymagany dla polskich znaków.

Skala (desktop → mobile):

| Styl | Desktop | Mobile | Font |
|---|---|---|---|
| `display` (hero) | 92/1.02, 300 | 48/1.08 | Newsreader |
| `h1` | 64/1.05, 300 | 40/1.1 | Newsreader |
| `h2` | 52–60/1.1, 300 | 34/1.15 | Newsreader |
| `h3` | 36/1.2, 400 | 26/1.25 | Newsreader |
| `statement` (duże zdanie/cytat) | 50–52/1.25, 300 | 30/1.3 | Newsreader |
| `lead` | 21/1.6 | 18/1.6 | Karla |
| `body` | 18–19/1.75 | 17/1.7 | Karla |
| `eyebrow` | 13, uppercase, tracking 0.18em | 12 | Karla |
| `nav` (linki w nawigacji desktop) | 18 | – | Karla |
| `ui` (przyciski) | 15–16, 500 | 15 | Karla |

## 4. Layout i rytm

- Kontener: 1440 px makiety → `max-w-[1200px]` treści, padding boczny 120 px (desktop) / 20 px (mobile).
- Siatka 12 kolumn, gap 32 px. Typowe układy: 5 + 6 z przerwą (lista + panel, zdjęcie + tekst), 3 + 9 (eyebrow + statement).
- Odstępy sekcji: `py-[200px]`–`py-[220px]` desktop, `py-24` mobile.
- Hero: pełna wysokość okna (`min-h-svh`, referencyjnie 1440×900).
- Promienie: pill (przyciski, taby) · 18–20 px (małe karty) · 28 px (karty) · 36–40 px (panele, banery) · łuk `999px 999px 36px 36px` (portret).

## 5. Ruch i interakcje

Wspólne zasady dla wszystkich kontrolek:

| Stan | Zmiana |
|---|---|
| spoczynek | opacity 0.4–0.75 (elementy drugorzędne), `shadow-rest` |
| hover | opacity → ~0.8–1, delikatne przyciemnienie koloru, cień `float`/`lift`/`glow`, strzałka przesuwa się o 4 px |
| active (wciśnięcie) | `translateY(1px)`, opacity 0.88, czas 100 ms |
| selected (tab, element listy) | opacity 1, białe tło + `shadow-float` lub linia rysowana `scaleX` |
| focus-visible | outline 2 px `moss-300`, offset 2–6 px |

### Przyciski CTA – efekt „dociśnięcia”

Odwrotnie niż zwykle: przycisk **w spoczynku jest uniesiony**, a hover go **dociska**.

Kształt i wymiary przycisku **nie zmieniają się** – zmienia się tylko cień, pozycja w osi Y i minimalnie kolor tła.

| Stan | Cień | Transform | Tło |
|---|---|---|---|
| spoczynek | `14px 18px 34px -14px` + `3px 5px 10px -6px` (uniesiony) | `translateY(-3px)` | `--bg` |
| hover | `2px 4px 10px -6px` + `0 1px 2px` (dociśnięty) | `0` | `--bg-press` (o ton ciemniejsze) |
| active | `0 1px 2px` | `translateY(1px)`, 120 ms | `--bg-press` |

Strzałka `.btn-arrow` (span: `::before` = linia 1.5 px, `::after` = grot z obróconych obramowań) ma stałą długość 34 px.

Warianty ustawiają tylko zmienne `--bg`, `--bg-press` i `--sh` (RGB cienia): `btn-primary` (`#30473B` → `#2A4034`), `btn-dawn` (`#E4CE9D` → `#D9C08A`), `btn-light` (`#F7F7F3` → `#ECEEE7`, cień czarny). `btn-ghost` nie używa efektu. Czas 600 ms (cień, transform), 500 ms (kolor), active 120 ms.

### Dekoracje sekcji (`::before` / `::after`)

Wzór: bloki tła zaczynają się **w połowie sekcji i wchodzą w następną**, a zdjęcia i karty na nie nachodzą. Wszystkie dekoracje to pseudo-elementy z `pointer-events: none`, treść sekcji ma `z-index: 1`.

| Miejsce | Dekoracja |
|---|---|
| Statement pod hero | pierścienie mgły (SVG, `moss-300`, 55% krycia) przy prawej krawędzi; część wchodząca na hero jest **pod hero** (hero ma `z-index: 2`) |
| Obszary pomocy | brak dekoracji tła – sekcja ma być czysta |
| Baner zdjęciowy | wsunięty (margines 120 px, radius 40); `::before` pas `#E6EBE3` od połowy wysokości do dołu na całą szerokość |
| O mnie | `::before` kontynuuje pas u góry sekcji (portret na niego nachodzi); `::after` `mist-100` z prawej, schodzi 200 px pod CTA band |
| Portret | łuk maks. 440 × 600 px (mobile 326 × 440), `::before` łuk-obrys `moss-300` przesunięty o 28 px (mobile 14 px) |
| CTA band | `::before` obrys zaokrąglony przesunięty o 28 px w prawo-dół |
| Karty gabinetów | `::after` obrys `moss-300` pojawia się na hover (opacity) |

Na mobile przesunięcia skalujemy do ~12–16 px, a bloki wchodzące w kolejną sekcję do ~60 px.

- Easing zawsze `--ease-mist`. Czasy: 300 ms (opacity), 400 ms (kolor), 500–600 ms (cień, transform), 700 ms (linia taba).
- Zmiana treści (tab, obszar pomocy): fade + 8 px w górę, 600 ms.
- Hero: powolny zoom tła (24 s, alternate), wejście tekstu 1.4 s, biały wskaźnik scrolla (myszka 28×46, na mobile 24×38, kropka w środku, ruch 8 px w pionie co 2.4 s).
- `prefers-reduced-motion: reduce` → wyłącza animacje i transition.

## 6. Komponenty

### Podstawowe (shadcn/ui + własne warianty)

| Komponent | Warianty / uwagi |
|---|---|
| `Button` | `primary` (moss-800), `dawn` (CTA na ciemnym), `light` (na zdjęciach) – wszystkie z efektem „dociśnięcia” (sekcja 5); `ghost-on-dark` (inset ring biały 45%); rozmiary `md`/`lg`; zawsze pill |
| `PhoneLink` | `tel:`; warianty: nawigacja (sama ikona słuchawki bez ringu, 15 px), wyróżniony (ikona w ringu, Newsreader 38 px w CTA band), stopka (26 px, bez ikony). Numer ma być widoczny w nagłówku, CTA band i stopce |
| `SectionDeco` | dekoracje sekcji z pseudo-elementów (sekcja 5, „Dekoracje sekcji”) |
| `TextLink` | opacity 0.75 → 1, strzałka `→` z przesunięciem |
| `NavLink` | opacity 0.72 → 1; wariant jasny (na hero) i ciemny |
| `Tabs` | tekstowe: numer + etykieta Newsreader 20 px, nieaktywne opacity 0.38, aktywny rysuje linię pod spodem; treść z fade (na bazie Radix Tabs). Etykiety `white-space: nowrap`, lista `flex` z gap 28 px i wspólnym `border-bottom`; linia aktywnego taba pozycjonowana absolutnie na `bottom: -1px`, żeby leżała na wspólnej krawędzi. Przy braku miejsca (mobile) lista przewija się poziomo zamiast zawijać |
| `SelectableList` | pionowa lista „obszarów”: nieaktywne 0.42, aktywny na białym tle z `shadow-float`, strzałka pojawia się; semantyka tablist |
| `Card` | białe tło, `radius-card`, `shadow-rest` → hover `shadow-lift` + `-2px` |
| `Eyebrow` | mała etykieta sekcji |
| `SectionHeading` | eyebrow + h2 z opcjonalną kursywą + link „wszystkie →” |
| `MistFade` | gradient wtapiający element w `mist-50` (góra/dół) |
| `Badge` | plakietka na zdjęciu (np. „Członkini PTPP”) |
| Formularze | `Input`, `Textarea`, `Select`, `Checkbox`, `Label` – shadcn z paletą mist/moss (kontakt, logowanie, panel) |

### Sekcje strony (marketing)

| Sekcja | Opis | Dane |
|---|---|---|
| `SiteHeader` | Dwa stany. **Na hero:** przezroczysty, biały tekst, wysokość ~112 px; kontrast zapewnia scrim u góry hero (gradient `rgb(14 22 18 / .5)` → 0 na 200 px desktop / 140 px mobile), a ogólna nakładka hero spada do 34% (mobile 38%). **Po przewinięciu** (próg ~80 px lub wyjście hero z viewportu – IntersectionObserver): `position: sticky`, wysokość 76 px, tło `mist-50/82` + `backdrop-filter: blur(18px) saturate(1.1)`, linia 1 px `moss-950/6%` i miękki cień w dół; ciemny tekst; telefon z ikoną; CTA „Umów wizytę” jako `btn-primary` w rozmiarze sm (15 px, strzałka 22 px). Przejście stanów: tło i kolor 400–500 ms `--ease-mist`, bez zmiany położenia elementów. Aktywny link = sekcja w widoku (scroll-spy): opacity 1 + linia 1.5 px. Belka jest zawsze widoczna (nie chowa się przy przewijaniu w dół) – CTA rezerwacji ma być pod ręką. Link „Zaloguj” zmienia się w „Konto” (→ Moje wizyty), gdy użytkownik jest zalogowany; sesja na stronach publicznych jest sprawdzana tylko, jeśli przeglądarka miała wcześniej sesję (znacznik w localStorage), żeby nie wysyłać zapytania do API przy każdej wizycie gościa. Mobile: to samo, bez telefonu w belce (telefon jest w dolnym sticky pasku) | Flotiq: nawigacja |
| `HeroVideo` | pętla wideo MP4/WebM (≤600 kB) z posterem, nakładka moss-950/38%, mgła u dołu, dwa CTA | Flotiq: tytuł, lead, media |
| `Statement` | jedno duże zdanie z kursywą | Flotiq |
| `AreasExplorer` | Strona „stoi”, dopóki nie przejdziemy przez wszystkie obszary. Implementacja: sekcja o wysokości ~`100vh + N × 35vh` (krótki skok – jeden obszar na ok. 1/3 ekranu), nagłówek sekcji + lista + panel przypięte razem (`position: sticky`, bez przerwy między nagłówkiem a listą), aktywny obszar = postęp przewijania sekcji (`useScroll` / IntersectionObserver). Działa dla kółka, touchpada, klawiatury i dotyku, bez przechwytywania `wheel`. (Makieta symuluje to przechwyceniem `wheel` z `passive: false` – nie przenosić do produkcji.) Szyna postępu obok listy, klik w pozycję przewija do jej progu. Panel ma **stałą wysokość** (`min(560px, 100vh − 340px)`) – zmiana obszaru nie może przesuwać treści poniżej. W panelu: ilustracja do 220 px (`flex-shrink: 0`), opis przycięty do 5 linii (`line-clamp`), link „Dowiedz się więcej” przyklejony do dołu (`margin-top: auto`). W CMS limit opisu skrótowego ~280 znaków. Mobile: zwykła lista rozwijana bez sticky | Flotiq: typ „Obszar pomocy” (nazwa, opis, ilustracja, slug) |
| `ImageBanner` | pełnoszerokie zdjęcie z mgłą góra/dół, cytat, przycisk | Flotiq |
| `AboutTabs` | portret w łuku + badge, `Tabs` z akapitami lub listą kart | Flotiq: „O mnie” (zakładki jako lista) |
| `CtaBand` | ciemny zaokrąglony baner z CTA do kalendarza | Flotiq |
| `LocationCard` | zdjęcie/mapa, nazwa, adres, link „Dojazd”. Karty w **karuzeli** (scroll-snap): desktop 2 karty + fragment trzeciej, strzałki ←/→ przy nagłówku (tylko gdy jest co przewijać); mobile 1 karta + fragment następnej, przewijanie palcem. Karuzela wychodzi do krawędzi ekranu | Flotiq: „Gabinet” + `backendLocationId` |
| `SiteFooter` | nazwa, nawigacja, kontakt, linki prawne | Flotiq: ustawienia globalne |

### Ilustracje

Stroke-only SVG, linia 1.25 px `moss-600`, pojedynczy wypełniony akcent `dawn-500`, bez wypełnień powierzchni. Obecne szkice w makiecie są tymczasowe – docelowo spójny zestaw per obszar pomocy.

### Media

- Hero: wideo z darmowej biblioteki z licencją komercyjną (Pexels, Coverr) – **nie** GIF z makiety (znak wodny, 2.2 MB).
- Zdjęcia przez `next/image`, lekko obniżona saturacja (`saturate(0.75)`) w banerach.

## 7. Mobile (referencja: plansze „D · Mobile” 390 px)

| Element | Mobile |
|---|---|
| Nagłówek | nazwa w dwóch liniach + ikony 44×44: telefon (`tel:`) i menu (dwie kreski, dolna krótsza) |
| Menu | pełnoekranowa nakładka `mist-50`: pozycje numerowane, Newsreader 34 px, wejście kaskadowe (opacity + 14 px, co 50 ms); na dole telefon i CTA; pierścienie mgły w tle |
| Hero | 100svh, treść przy dolnej krawędzi, CTA jeden pod drugim na pełną szerokość (min. 56 px wysokości) |
| Przyciski | pełna szerokość, tekst z lewej, strzałka z prawej (`justify-content: space-between`); ten sam efekt „dociśnięcia” (na dotyku działa przez `:active`) |
| Obszary pomocy | akordeon: jeden otwarty naraz, otwarta pozycja na białej karcie z `shadow-float`, ilustracja 140 px + opis + link; szewron obraca się o 180° |
| Baner | wsunięty 20 px, radius 28, cytat i CTA przy dolnej krawędzi |
| O mnie | portret na pełną szerokość z obrysem łuku przesuniętym o 14 px, badge PTPP na dole portretu; taby przewijane poziomo (bez zawijania), wspólna linia na dole. Wskazówka przewijania: prawa krawędź listy wygasa (`mask-image`, 56 px), znika po dojechaniu do końca; `scroll-snap` na tabach; wybrany tab przewija się do widoku (`scrollIntoView({ inline: "nearest" })`) |
| Sticky pasek | pojawia się po przewinięciu hero (IntersectionObserver na hero), wjazd opacity + 24 px w górę. Zawiera okrągły przycisk „Zadzwoń” 56×56 (`tel:`, `aria-label` z numerem) i CTA „Umów wizytę” na resztę szerokości. Tło `mist-50/90` + `backdrop-filter: blur(16px)`, miękki cień w górę, dolny padding z `env(safe-area-inset-bottom)`. Ukrywa się, gdy widoczna jest stopka (ma własne CTA) lub otwarte menu. Treść strony dostaje dolny padding równy wysokości paska |
| Nagłówek po przewinięciu | kompaktowy, `mist-50/86` + blur, bez ikony telefonu (telefon jest w pasku) |
| CTA band | CTA na pełną szerokość, telefon pod separatorem; obrys przesunięty o 14 px |
| Gabinety | karty jedna pod drugą |
| Stopka | telefon Newsreader 26 px, linki w 2 kolumnach, CTA „Umów wizytę” |

Dekoracje sekcji skalowane: przesunięcia 14 px zamiast 28 px, pas tła za portretem 300 px, pierścienie mgły 260 px.

## 8. Panel – rezerwacja (referencja: plansze „Panel · Rezerwacja”)

Panel używa tych samych tokenów, fontów i kontrolek co landing – bez hero, dekoracji sekcji i dużych odstępów. Jedyny ozdobnik: pierścienie mgły przy prawej krawędzi (35% krycia).

**Przepływ** (zgodny z obecnym API): wybór dnia w kalendarzu → lista wolnych terminów (godzina + gabinet) z filtrem gabinetu → wybór terminu → „Zarezerwuj” → potwierdzenie (data, godzina, gabinet) → sukces ze statusem „oczekuje na potwierdzenie”. Warunki z obecnej aplikacji zostają: niezalogowany → logowanie, brak telefonu → uzupełnienie w Koncie (przed otwarciem potwierdzenia).

| Element | Desktop | Mobile |
|---|---|---|
| Nagłówek | nazwa, nawigacja Rezerwacja / Moje wizyty / Konto (aktywna: opacity 1 + linia 2 px), avatar z inicjałami, Wyloguj | nazwa, avatar, menu |
| Kalendarz | biała karta radius 32, dni 52 px (pill): bez terminów opacity 0.3, z terminami kropka `dawn-500`, hover `mist-100`, wybrany `moss-800` + biały tekst + `shadow-float`. Legenda pod siatką | karta radius 28, dni 44 px |
| Filtr gabinetu | chipy pill: nieaktywne opacity 0.55 + obrys `mist-300`, aktywny `moss-950` z jasnym tekstem | chipy przewijane poziomo z wygaszeniem krawędzi |
| Terminy | siatka 2 kolumny, stała wysokość obszaru (bez skakania); karta: godzina Newsreader 30 px + gabinet z ikoną pinezki; hover `shadow-lift` + `-2px`; wybrany: obrys 1.5 px `moss-800` (`::after`, opacity) + znacznik ✓ | 2 kolumny, godzina 26 px |
| Stan pusty | obrys `mist-200`, ilustracja mgły, „Brak wolnych terminów w tym gabinecie” + wskazówka | to samo, bez ilustracji |
| Podsumowanie | pas `mist-100` radius 28 pod listą: „Wybrany termin” + CTA „Zarezerwuj” (disabled: opacity 0.4, bez cienia i uniesienia) | sticky pasek na dole (jak na landingu): skrót terminu + CTA na pełną szerokość |
| Potwierdzenie | modal 580 px, tło `mist-50`, radius 36, zasłona `moss-950/32` + blur 6 px; wiersze danych na białych kartach; „Wróć” (quiet) + „Potwierdzam rezerwację” (press) | bottom sheet z uchwytem, przyciski jeden pod drugim |
| Sukces | ikona ✓ w kółku `#E6EBE3`, badge statusu, info o e-mailu, CTA „Moje wizyty” | to samo w bottom sheet |

**Implementacja (`/panel/rezerwacja`):** strona jest publiczna – gość przegląda kalendarz i godziny, logowanie dopiero przy „Zarezerwuj” (powrót z `?next=`). Wybór jest w adresie (`?date=&term=`), więc przetrwa logowanie i odświeżenie. Po wejściu wybierany jest pierwszy dzień z terminami. Nazwy gabinetów z Flotiqa (`backendLocationId`), awaryjnie z adresu z API. Dzisiejsze godziny są ukrywane (backend przyjmuje rezerwacje od jutra).

`btn-quiet` – przycisk drugorzędny w panelu: przezroczysty, obrys `mist-300`, hover białe tło + obrys `moss-300`.

### Statusy wizyt

| Status (API) | Tło | Tekst | Kropka |
|---|---|---|---|
| `0` oczekuje na potwierdzenie | `#F3EAD6` | `#6B5A33` | `dawn-500` |
| `1` potwierdzona | `#E6EBE3` | `moss-800` | `moss-600` |
| `2` odwołana | `mist-100` | `moss-500`, przekreślona data | `mist-300` |

Badge: pill, 13–14 px, `font-weight: 500`, kropka 8 px. Kolor nigdy nie jest jedynym nośnikiem statusu – zawsze jest też tekst.

Status „Odbyta” w zakładce Zakończone to status wyliczany na froncie (wizyta potwierdzona z datą w przeszłości) – API ma tylko 0/1/2. Styl jak „odwołana”, kropka `moss-300`, bez przekreślenia.

### Akcje nieodwracalne (odwołanie wizyty, usunięcie konta)

Jedyny kolor spoza palety mgły – stonowana czerwień ziemi, używana wyłącznie dla akcji nieodwracalnych:

| Token | Hex | Użycie |
|---|---|---|
| `ember-700` | `#8E4335` | tekst i tło przycisku `btn-danger` (biały tekst 6.6:1), link „Odwołaj” |
| `ember-800` | `#7E3A2E` | hover `btn-danger` |
| `ember-200` | `#E3C4BC` | obrys `btn-quiet-danger`, ramka strefy usuwania (`#E8D3CD`) |
| `ember-50` | `#FBF1EE` | hover `btn-quiet-danger` |

Zasady: w widoku akcja jest drugorzędna (link lub `btn-quiet-danger`); właściwy `btn-danger` pojawia się dopiero w dialogu `role="alertdialog"`, zawsze obok bezpiecznej opcji po lewej („Zostaw wizytę”, „Anuluj”). Usunięcie konta wymaga zaznaczenia checkboxa potwierdzenia – do tego czasu przycisk jest disabled.

## 9. Panel – moje wizyty i konto

**Moje wizyty** (desktop / mobile):
- Nagłówek strony + CTA „Umów kolejną wizytę”.
- Taby tekstowe „Nadchodzące” / „Zakończone” z licznikiem (ten sam komponent `Tabs`).
- Nadchodzące: wyróżniona karta **najbliższej wizyty** (data Newsreader 48 px, dzień + godzina, gabinet z pinezką, badge statusu, „Jak dojechać”, „Odwołaj wizytę”), pod nią lista kolejnych jako wiersze (desktop: siatka data / godzina / gabinet / status / akcja; mobile: karty).
- Zakończone: wiersze bez tła, z obrysem `mist-200`; odwołane z przekreśloną datą.
- Stan pusty: obrys, komunikat, CTA do rezerwacji.
- Odwołanie: `alertdialog` z danymi wizyty i informacją, że termin zwolni się dla innych (zgodne z API: `DELETE /visits/{id}` przywraca termin jako dostępny; tylko wizyty przyszłe). Po odwołaniu wizyta przechodzi do Zakończonych jako „Odwołana”.

**Konto** (desktop / mobile):
- Lewa kolumna: tytuł, avatar z inicjałami (lub zdjęcie z Google, gdy jest), nawigacja sekcji (Dane osobowe / Hasło / Usuń konto) – styl jak lista obszarów pomocy (opacity + biała karta aktywnej). Mobile: chipy przewijane poziomo.
- Karty formularzy: „Dane osobowe” (Imię, Nazwisko, E-mail, Telefon z podpowiedzią, że jest wymagany do rezerwacji) i „Zmiana hasła” (Nowe / Powtórz, przełącznik widoczności).
- Pola: wysokość 56 px, radius 16, tło `mist-50`, obrys `mist-200` → hover `moss-200` → focus białe tło, obrys 1.5 px `moss-600` + miękki cień; błąd: obrys `#B0624F`, komunikat `ember-700` pod polem, `aria-invalid` + `aria-describedby`.
- Zapis: „Anuluj zmiany” (quiet) + „Zapisz zmiany” (press) pod formularzami; potwierdzenie toastem (pill `moss-950`, ikona ✓ `dawn-400`, `role="status"`, znika po ~3 s).
- Strefa usuwania: ramka `ember`, opis, `btn-quiet-danger` → dialog z checkboxem.

## 10. Panel administratora (referencja: plansze „Admin · …”)

Ten sam język co panel pacjenta. Różnice: plakietka „Administrator” przy nazwie, nawigacja **Wizyty / Terminy / Pacjenci**, licznik oczekujących wizyt przy „Wizyty” (pill `dawn-400`, z `aria-label`).

**Wizyty** (start po zalogowaniu; odpowiada `AdminVisitOverview`):
- Powitanie z datą + trzy kafle liczbowe (do potwierdzenia, wizyty w tym tygodniu, wolne terminy): białe karty, liczba Newsreader 34 px.
- „Do potwierdzenia”: karty pacjentów – avatar, imię i nazwisko, telefon, kontekst („pierwsza wizyta” / „6. wizyta” – wyliczane z historii), termin, gabinet; akcje „Odrzuć” (link `ember`) i „Potwierdź” (`btn-press` sm). Potwierdzenie działa od razu (bez dialogu) + toast „pacjent dostanie e-mail” (API wysyła `VisitConfirmedNotification`).
- „Nadchodzące”: wiersze pogrupowane po dniach (nagłówek dnia jak eyebrow), godzina / pacjent / gabinet / status / „Odwołaj”.
- Odrzucenie i odwołanie: `alertdialog` z przełącznikiem **„Zwolnij termin dla innych pacjentów”** (domyślnie włączony). Zastępuje obecne pytanie „Usunąć także termin?” (wyłączony przełącznik = usunięcie terminu). Informacja, że pacjent dostanie e-mail (`VisitCanceledByAdminNotificationToUser`).
- Stan pusty: „Wszystkie wizyty są potwierdzone.”

**Terminy** (odpowiada `VisitManager` w trybie admina + `AddNewTermDialog`):
- Kalendarz jak u pacjenta, ale w każdym dniu do 4 kropek w kolorach statusów terminów: wolny `dawn-500`, oczekuje `#B08A3E`, potwierdzona `moss-600`; legenda pod siatką.
- Grafik wybranego dnia: wiersze godzina / pacjent / gabinet / status. Wolne terminy bez tła (obrys) z przyciskiem usuwania (×, hover `ember`); zajętych nie da się usunąć z tego widoku.
- „Dodaj terminy” – panel `mist-100` pod grafikiem (zamiast dialogu): wybór gabinetu (chipy), siatka godzin 08:00–20:00 (toggle; zajęte godziny przekreślone i wyłączone), podsumowanie wyboru i CTA z liczbą („Dodaj 2 terminy”).

**Pacjenci** (odpowiada `AdminPanel` – historia + wyszukiwarka + impersonacja):
- Lewa kolumna: wyszukiwarka pill (imię, nazwisko, e-mail, telefon) i lista wyników w stylu listy obszarów (opacity, aktywny na białej karcie), z liczbą wizyt.
- Karta pacjenta: avatar, imię, „pacjent od”, dane kontaktowe (telefon jako `tel:`), statystyka wizyt, historia wizyt z badge'ami.
- Impersonacja jako `btn-quiet` „Zobacz panel jako pacjent” z ikoną oka (bez emoji). Po wejściu w tryb pacjenta w panelu powinien być widoczny pasek „Przeglądasz panel jako [imię] – wróć do panelu administratora” (do zaprojektowania przy implementacji).

**Mobile** – priorytetem jest potwierdzanie wizyt: kafle liczbowe w rzędzie, karty „Do potwierdzenia” z klikalnym telefonem i dwoma przyciskami na pełną szerokość (Odrzuć / Potwierdź), lista nadchodzących po dniach. Terminy i Pacjenci na mobile układają się w jedną kolumnę (kalendarz → grafik → dodawanie).

Przełącznik (`switch`): tor 44×26 `mist-300` → `moss-800` po włączeniu, gałka biała z cieniem, `role="switch"` + `aria-checked`, przejście 450 ms.

## 11. Logowanie i rejestracja

Ekrany `/login`, `/register`, `/password/reset/link`, `/password/reset/[token]`, `/login/google` (adresy zgodne ze starym frontem – linkują do nich e-maile i Google OAuth).

- **Powłoka:** tło `mist-50`, pierścienie mgły w rogach, nagłówek z nazwą i linkiem „← Strona główna”; jedna biała karta (maks. 480 px, radius 28/32, cień jak karty panelu) wyśrodkowana na desktopie, u góry na mobile.
- **Karta:** eyebrow, tytuł Newsreader 34/40 px z kursywą, lead 15 px `moss-500`, formularz, linki pomocnicze pod spodem.
- **Pola:** jak w „Konto” (sekcja 9) – etykieta nad polem, podpowiedź pod polem, błąd pola w `ember-700` zamiast podpowiedzi (`aria-invalid` + `aria-describedby`). Hasło z przełącznikiem widoczności (ikona oka, `aria-pressed`).
- **Błąd formularza** (np. zły e-mail lub hasło): `FormAlert` – tło `ember-50`, obrys `ember-200`, `role="alert"`. Informacja: tło `mist-100`, `role="status"`.
- **Google:** przycisk pełnej szerokości, biały z obrysem `mist-300`, kolorowe logo, oddzielony separatorem „lub”.
- **Rejestracja:** imię i nazwisko w dwóch kolumnach (od 640 px), e-mail, telefon, hasło ×2, zgoda na regulamin i politykę prywatności (checkbox, linki w nowej karcie).
- **Niepotwierdzony e-mail:** w panelu zamiast treści karta „Potwierdź adres e-mail” – „Potwierdziłem – przejdź dalej” (ponowne sprawdzenie), „Wyślij link ponownie” (quiet), „Wyloguj się”.
- **Toast** (`ToastProvider` w głównym layoucie): pill `moss-950` z ✓ `dawn-400` (sukces) lub `ember-700` z ! (błąd), ok. 3,5 s.

Komunikaty z Laravela (angielskie) tłumaczy `src/lib/api-errors.ts`.

## 12. Otwarte kwestie

- **Backend – terminy:** `/month-terms` nie filtruje po terapeucie, a `/terms` tak (`MAIN_THERAPIST_ID`) – kalendarz mógłby pokazać dzień bez godzin, gdyby terminy dodał inny terapeuta. `/new-terms` przyjmuje **przedział** godzin `[od, do]`, nie listę – panel admina (zaznaczanie pojedynczych godzin) musi to uwzględnić.

- Pasek trybu impersonacji w panelu pacjenta.
- **Usuwanie konta w backendzie to soft delete** (`User` używa `SoftDeletes`): dane zostają w bazie, a nadchodzące wizyty nie są odwoływane (kaskada FK nie działa przy soft delete). Trzeba zdecydować, co ma się dziać (RODO – prawo do usunięcia danych; zwolnienie terminów) i dopiero wtedy doprecyzować tekst w dialogu. Makieta ma neutralny tekst z placeholderem.
- Zasady odwoływania wizyt (np. minimalne wyprzedzenie) – placeholder w dialogu odwołania.
- Teksty oznaczone w makiecie `[Szkic do CMS]` – do weryfikacji przez Kasię.

## Uwagi implementacyjne

- **Tailwind 4 – przejścia przesunięć:** klasy `translate-*` ustawiają właściwość CSS `translate`, nie `transform`. W listach `transition-[…]` trzeba podawać `translate` (nie `transform`), inaczej element „skacze” zamiast płynnie się przesuwać. Dotyczy przycisków `press`, kart i paska na mobile.
- **Media z Flotiqa:** obrazy (także animowane GIF) z `/image/0x0/…` (oryginał), inne pliki (wideo) z `/file/…` – `getMediaUrl()` dobiera ścieżkę po typie medium.
- **Dekoracje sekcji a warstwy:** tła wychodzące poza sekcję (`::before`/`::after` z `-z-10`) muszą należeć do kontekstu warstw `<main>` (ma `isolate`). Sekcja z takim tłem **nie może** mieć własnego `isolate` ani `z-index` – wtedy jej dekoracja przykrywa treść kolejnych sekcji (np. FAQ pod „O mnie”). `isolate` stosujemy tylko na małych elementach wewnątrz sekcji (portret z obrysem, CTA z ramką).
- **Siatki na mobile:** każda siatka responsywna musi mieć kolumnę bazową `grid-cols-1` (`minmax(0, 1fr)`), np. `grid grid-cols-1 lg:grid-cols-12`. Samo `grid` tworzy kolumnę `auto`, którą rozpycha najszersza zawartość (np. przewijana poziomo lista zakładek) – przeglądarka mobilna poszerza wtedy całą stronę i ją ucina.
