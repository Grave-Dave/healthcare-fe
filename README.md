# healthcare-fe

Frontend gabinetu psychoterapii Katarzyny Trzeciakiewicz – Next.js 16 (App Router), Tailwind CSS 4, shadcn/ui (Radix). Treści marketingowe z Flotiqa, rezerwacje przez API Laravela ([healthcare-be](../healthcare-be)).

## Start

```bash
cp .env.example .env.local   # uzupełnij wartości
npm install
npm run dev                  # http://localhost:3000
```

Backend lokalnie: `php artisan serve` w WSL (`http://localhost:8000`). W `.env` backendu `APP_URL` musi wskazywać na front (`http://localhost:3000`) – CORS bierze z niego dozwolony origin.

## Struktura

```
src/app/(marketing)/   strona publiczna – Server Components, treści z Flotiqa, draft mode
src/app/(app)/panel/   panel pacjenta i administratora – dane z Laravel API
src/app/api/draft      wejście w podgląd wersji roboczej (Flotiq preview URL)
src/app/api/revalidate webhook Flotiqa – unieważnia cache treści
src/components/ui      komponenty bazowe (shadcn/ui + warianty design systemu)
src/lib                flotiq.ts, api.ts (Laravel), env.ts, site.ts
legacy/                stary front (Vite) – źródło logiki do przeniesienia, do usunięcia po migracji
docs/design-system.md  kolory, typografia, komponenty, zachowania
```

## Flotiq

- Preview URL w Flotiqu: `https://<domena>/api/draft?secret=<DRAFT_MODE_SECRET>&slug=/<ścieżka>`
- Webhook po publikacji: `POST https://<domena>/api/revalidate?type=<nazwa_typu>` z nagłówkiem `x-revalidate-secret: <REVALIDATE_SECRET>`

## Produkcja

`output: "standalone"` – obraz z `Dockerfile` uruchamia `node server.js` na porcie 3000. Zmienne `NEXT_PUBLIC_*` podaje się jako `--build-arg`, pozostałe w runtime.
