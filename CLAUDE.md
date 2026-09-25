@AGENTS.md

# Project notes

- UI decisions live in `docs/design-system.md` (tokens, components, behaviours). Follow it; update it when a decision changes.
- `legacy/` is the old Vite app. Read it to port logic (API calls, auth flow, validation); never import from it. It is excluded from TS and ESLint.
- Keep `/login`, `/login/google`, `/register` and `/password/reset/:token` paths – backend e-mails and Google OAuth link to them.
- Laravel API auth lives in `src/lib/auth/session.ts` (module store + `useSession`): access token in memory only, httpOnly refresh cookie, `/auth/refresh` rotates the token so refreshes are single-flight. Use `authRequest()` for authenticated calls. The panel is client-side only (keep it static-export compatible – no server actions / route handlers for panel data).
- Flotiq: use `@flotiq/flotiq-api-sdk` via `src/lib/flotiq.ts` (client with `@flotiq/nextjs-addon` middleware – cache tags, draft `x-mode: preview`). After changing content types run `npm run flotiq:types` (writes `flotiq-api.d.ts`). Content model: `docs/content-model.md`.
- Next 16: `proxy.ts` replaces middleware, `revalidateTag(tag, "max")` needs the profile argument, `fetch` is not cached unless `cache: "force-cache"`.
- UI copy is Polish.
