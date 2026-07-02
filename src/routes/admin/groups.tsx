import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { StatusBadge } from "@/components/app/primitives";
import { groups } from "@/mocks/data";
import { MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/admin/groups")({ component: Page, head: () => ({ meta: [{ title: "Células — EcclesiaOS" }] }) });

function Page() {
  return (
    <AdminShell title="Células & pequenos grupos" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Células" }]}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map(g => (
          <div key={g.id} className="glass-panel rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg text-foreground">Célula {g.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{g.neighborhood}</div>
              </div>
              <StatusBadge tone={g.status === "em_multiplicacao" ? "gold" : g.status === "pausada" ? "warning" : "success"}>
                {g.status.replace("_", " ")}
              </StatusBadge>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div><div className="text-xs text-muted-foreground">Líder</div><div className="text-foreground">{g.leader}</div></div>
              <div className="text-right"><div className="text-xs text-muted-foreground">{g.weekday} · {g.time}</div><div className="flex items-center gap-1 text-foreground"><Users className="h-3 w-3" />{g.members}</div></div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground"><span>Multiplicação</span><span className="font-mono text-primary">{g.multiplierScore}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-gradient-to-r from-primary to-amber-300" style={{ width: `${g.multiplierScore}%` }} /></div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
