import "server-only"

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const serverEnv = {
  get flotiqApiUrl() {
    return process.env.FLOTIQ_API_URL ?? "https://api.flotiq.com"
  },
  get flotiqApiKey() {
    return required("FLOTIQ_API_KEY")
  },
  get draftSecret() {
    return required("DRAFT_MODE_SECRET")
  },
  get revalidateSecret() {
    return required("REVALIDATE_SECRET")
  },
}
