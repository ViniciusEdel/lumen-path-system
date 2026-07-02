import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { visitors } from "@/mocks/data";
import type { VisitorStage } from "@/types";

export const Route = createFileRoute("/admin/visitors")({ component: Page, head: () => ({ meta: [{ title: "Visitantes — EcclesiaOS" }] }) });

const cols: { key: VisitorStage; label: string; color: string }[] = [
  { key: "novo", label: "Novo visitante", color: "border-sky-400/30 bg-sky-400/5" },
  { key: "primeiro_contato", label: "1º contato", color: "border-primary/30 bg-primary/5" },
  { key: "convidado_integracao", label: "Convidado integração", color: "border-purple-400/30 bg-purple-400/5" },
  { key: "em_celula", label: "Em célula/curso", color: "border-emerald-400/30 bg-emerald-400/5" },
  { key: "pedido_membresia", label: "Pedido de membresia", color: "border-amber-300/30 bg-amber-300/5" },
  { key: "membro_ativo", label: "Membro ativo", color: "border-emerald-500/30 bg-emerald-500/5" },
];

function Page() {
  return (
    <AdminShell title="Visitantes" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Visitantes" }]}
      actions={<button className="rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow">+ Novo visitante</button>}>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {cols.map(col => {
          const items = visitors.filter(v => v.stage === col.key);
          return (
            <div key={col.key} className={`rounded-2xl border p-3 ${col.color}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-medium text-foreground">{col.label}</div>
                <span className="font-mono text-[11px] text-muted-foreground">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map(v => (
                  <div key={v.id} className="glass-panel rounded-xl p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/20 text-[10px]">{v.name.split(" ").map(s => s[0]).slice(0, 2).join("")}</div>
                      <div className="min-w-0 flex-1"><div className="truncate text-foreground text-xs">{v.name}</div><div className="text-[10px] text-muted-foreground">{v.origin} · {v.firstVisit.slice(-2)}/11</div></div>
                    </div>
                    <div className="mt-2 text-[10px] text-muted-foreground">→ {v.nextAction}</div>
                    <div className="mt-1 text-[10px] text-primary">{v.assignedTo}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
