import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { events } from "@/mocks/data";
import { StatusBadge } from "@/components/app/primitives";

export const Route = createFileRoute("/admin/events")({ component: Page, head: () => ({ meta: [{ title: "Eventos — EcclesiaOS" }] }) });

function Page() {
  return (
    <AdminShell title="Eventos & cultos" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Eventos" }]}
      actions={<button className="rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow">+ Novo evento</button>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map(e => (
          <div key={e.id} className="glass-panel overflow-hidden rounded-2xl">
            <div className="h-2" style={{ background: e.color }} />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display text-lg text-foreground">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.date} · {e.time} · {e.location}</div>
                </div>
                <StatusBadge tone="info">{e.type}</StatusBadge>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-[11px] text-muted-foreground"><span>Confirmações</span><span>{e.confirmed}/{e.expected}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full bg-primary" style={{ width: `${(e.confirmed/e.expected)*100}%` }} /></div>
              </div>
              <div className="mt-4 flex gap-2"><button className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-xs text-foreground">Check-in</button><button className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-xs text-foreground">Relatório</button></div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
