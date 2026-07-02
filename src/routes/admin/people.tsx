import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { StatusBadge } from "@/components/app/primitives";
import { people } from "@/mocks/data";
import { Search, Filter, Download } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/admin/people")({
  component: PeoplePage,
  head: () => ({ meta: [{ title: "Pessoas — EcclesiaOS" }] }),
});

function PeoplePage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "member" | "visitor">("all");

  const filtered = useMemo(() => people.filter(p =>
    (filter === "all" || p.status === filter) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase())),
  ), [q, filter]);

  return (
    <AdminShell title="Pessoas" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Pessoas" }]}
      actions={<>
        <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"><Download className="inline h-3.5 w-3.5" /> Exportar</button>
        <button className="rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow">+ Nova pessoa</button>
      </>}>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[{ l: "Total", v: people.length }, { l: "Membros", v: people.filter(p => p.status === "member").length }, { l: "Visitantes", v: people.filter(p => p.status === "visitor").length }, { l: "Aniversariantes", v: 4 }].map(s => (
          <div key={s.l} className="glass-panel rounded-2xl p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
            <div className="mt-1 font-display text-2xl text-foreground">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel mt-6 rounded-2xl">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 p-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nome, e-mail ou tag" className="h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-sm text-foreground focus:border-primary/40 focus:outline-none" />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
            {(["all", "member", "visitor"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-md px-3 py-1 text-xs transition ${filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {f === "all" ? "Todos" : f === "member" ? "Membros" : "Visitantes"}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground"><Filter className="h-3 w-3" /> Filtros</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Pessoa</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Bairro</th>
                <th className="px-4 py-3">Tag</th>
                <th className="px-4 py-3">Desde</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-white/5 transition hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary/40 to-amber-300/30 text-xs font-semibold text-primary-foreground">
                        {p.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-foreground">{p.name}</div>
                        <div className="text-[11px] text-muted-foreground">{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={p.status === "member" ? "success" : "info"}>{p.status === "member" ? "Membro" : "Visitante"}</StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.address?.neighborhood}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground">{p.tags[0]}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{p.memberSince ?? "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link to="/admin/people/$id" params={{ id: p.id }} className="text-xs text-primary hover:underline">Ver perfil</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
