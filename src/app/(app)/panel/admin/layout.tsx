import { AuthGuard } from "@/components/panel/auth-guard"

export default function AdminLayout({ children }: LayoutProps<"/panel/admin">) {
  return <AuthGuard admin>{children}</AuthGuard>
}
