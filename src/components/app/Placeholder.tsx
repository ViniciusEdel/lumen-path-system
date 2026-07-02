import { AdminShell } from "./AdminShell";
import { EmptyState } from "./primitives";
import type { ReactNode } from "react";

export function AdminPagePlaceholder({ title, breadcrumbs, description, children }: {
  title: string; breadcrumbs?: Array<{ label: string; to?: string }>; description?: string; children?: ReactNode;
}) {
  return (
    <AdminShell title={title} breadcrumbs={breadcrumbs}>
      {children ?? (
        <EmptyState
          title={`${title} · em construção visual`}
          description={description ?? "Este módulo já tem seus dados mockados prontos no service correspondente. A interface completa está sendo montada."}
        />
      )}
    </AdminShell>
  );
}
