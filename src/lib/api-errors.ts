import { ApiError } from "@/lib/api"

// Laravel returns English messages; the legacy app translated them with this map (legacy/src/locales/pl.json).
const translations: Record<string, string> = {
  "The email field must be a valid email address.": "Podaj prawidłowy adres e-mail.",
  "The email field is required.": "Podaj adres e-mail.",
  "The password field is required.": "Podaj hasło.",
  "The first name field is required.": "Podaj imię.",
  "The last name field is required.": "Podaj nazwisko.",
  "The phone field is required.": "Podaj numer telefonu.",
  "The phone field must be at least 9 characters.": "Numer telefonu musi mieć co najmniej 9 znaków.",
  "The phone field must not be greater than 15 characters.": "Numer telefonu może mieć najwyżej 15 znaków.",
  "The email has already been taken.": "Konto z tym adresem e-mail już istnieje.",
  "The password field must be at least 8 characters.": "Hasło musi mieć co najmniej 8 znaków.",
  "The password field confirmation does not match.": "Hasła nie są takie same.",
  "Too Many Attempts.": "Zbyt wiele prób. Spróbuj ponownie za minutę.",
  "Your email address is not verified.": "Twój adres e-mail nie został jeszcze potwierdzony.",
  "The selected email is invalid.": "Podany adres e-mail jest nieprawidłowy lub nie istnieje.",
  "No user found with this email.": "Nie znaleziono konta z tym adresem e-mail.",
  "Password reset failed.": "Nie udało się zmienić hasła. Link mógł wygasnąć – wyślij go ponownie.",
  "Invalid or expired refresh token": "Sesja wygasła. Zaloguj się ponownie.",
  "Nieprawidłowe dane": "Nieprawidłowy e-mail lub hasło.",
  "The selected term is not available.": "Wybrany termin jest już niedostępny.",
  "Visit not found.": "Wizyta nie została znaleziona.",
  "Only available visits can be deleted.": "Można usunąć tylko dostępne wizyty.",
  "Visit status can only be updated from pending to confirmed.": "Status wizyty można zmienić tylko z oczekującej na potwierdzoną.",
}

const GENERIC = "Coś poszło nie tak. Spróbuj ponownie."

export const translate = (message: string) => translations[message] ?? message

/** Field-level messages from a 422 response, keyed by field name (first message per field). */
export function fieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiError) || !error.body?.errors) return {}
  return Object.fromEntries(Object.entries(error.body.errors).map(([field, messages]) => [field, translate(messages[0] ?? "")]))
}

/** One message suitable for a toast or a form-level alert. */
export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const first = Object.values(error.body?.errors ?? {})[0]?.[0] ?? error.body?.message
    if (error.status === 429) return translate("Too Many Attempts.")
    return first ? translate(first) : GENERIC
  }
  if (error instanceof TypeError) return "Brak połączenia z serwerem. Sprawdź internet i spróbuj ponownie."
  return GENERIC
}
