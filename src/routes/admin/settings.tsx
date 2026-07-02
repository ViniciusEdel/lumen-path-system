import { createFileRoute } from "@tanstack/react-router";
import { AdminPagePlaceholder } from "@/components/app/Placeholder";

export const Route = createFileRoute("/admin/settings")({ component: () => (
  <AdminPagePlaceholder title="Configurações" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Configurações" }]} description="Papéis, permissões, integrações, dados da igreja e auditoria." />
) });
