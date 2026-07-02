import { createFileRoute } from "@tanstack/react-router";
import { AdminPagePlaceholder } from "@/components/app/Placeholder";
import { pastoralCare as pastoralRecords } from "@/mocks/data";
import type { PastoralCareRecord } from "@/types";
import { StatusBadge } from "@/components/app/primitives";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/pastoral-care")({ component: Page, head: () => ({ meta: [{ title: "Cuidado pastoral — EcclesiaOS" }] }) });

function Page() {
  return (
    <AdminPagePlaceholder title="Cuidado pastoral" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Cuidado pastoral" }]}>
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-primary"><Lock className="h-4 w-4" /> Conteúdo confidencial · acesso registrado em auditoria</div>
      <div className="grid gap-3 md:grid-cols-2">
        {pastoralRecords.map((r: PastoralCareRecord) => (
          <div key={r.id} className="glass-panel rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div><div className="text-foreground">{r.personName}</div><div className="text-[11px] text-muted-foreground">{r.type} · {r.openedAt}</div></div>
              <StatusBadge tone={r.privacy === "confidencial" ? "danger" : r.privacy === "restrito" ? "warning" : "info"}>{r.privacy}</StatusBadge>
            </div>
            <p className="mt-3 text-sm text-foreground/80">{r.summary}</p>
            <div className="mt-3 flex items-center justify-between text-[11px]"><span className="text-muted-foreground">Responsável: {r.assignedTo}</span><StatusBadge tone={r.status === "aberto" ? "warning" : r.status === "em_andamento" ? "info" : "success"}>{r.status}</StatusBadge></div>
          </div>
        ))}
      </div>
    </AdminPagePlaceholder>
  );
}
