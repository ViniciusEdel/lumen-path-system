import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { StatusBadge } from "@/components/app/primitives";
import { ministries, schedules } from "@/mocks/data";

export const Route = createFileRoute("/admin/ministries")({ component: Page, head: () => ({ meta: [{ title: "Ministérios — EcclesiaOS" }] }) });

function Page() {
  return (
    <AdminShell title="Ministérios & escalas" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Ministérios" }]}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-3 text-sm font-medium text-foreground">Ministérios da igreja</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ministries.map(m => (
              <div key={m.id} className="glass-panel rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-xl" style={{ background: `${m.color}30`, border: `1px solid ${m.color}55` }} />
                  <div className="min-w-0 flex-1">
                    <div className="text-foreground">{m.name}</div>
                    <div className="text-[11px] text-muted-foreground">{m.leader} · {m.volunteers} voluntários</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-lg text-foreground">Escala próximo culto</div>
            <span className="text-xs text-muted-foreground">Domingo · 10h</span>
          </div>
          {schedules.map(s => (
            <div key={s.id} className="flex items-center justify-between border-b border-white/5 py-2.5 text-sm last:border-0">
              <div><div className="text-foreground">{s.personName}</div><div className="text-[11px] text-muted-foreground">{s.role}</div></div>
              <StatusBadge tone={s.status === "confirmado" ? "success" : s.status === "pendente" ? "warning" : "info"}>{s.status}</StatusBadge>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
