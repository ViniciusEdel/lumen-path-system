import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { MetricCard, StatusBadge } from "@/components/app/primitives";
import { Users, UserPlus, TrendingUp, Wallet, Home, HeartHandshake, ArrowUpRight } from "lucide-react";
import { attendanceSeries, donationSeries, auditLogs, visitors, events, pastoralCare } from "@/mocks/data";
import { brl, compact } from "@/lib/utils/format";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, LineChart, Line,
} from "recharts";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — EcclesiaOS" }] }),
});

function Dashboard() {
  const openVisitors = visitors.filter(v => v.stage !== "membro_ativo").length;
  const openPastoral = pastoralCare.filter(p => p.status !== "concluido").length;

  return (
    <AdminShell title="Bom dia, Pr. Daniel" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Dashboard" }]}
      actions={<>
        <button className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">Exportar</button>
        <button className="rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow">+ Novo culto</button>
      </>}>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Membros ativos" value="842" delta="+18 esta semana" icon={<Users className="h-4 w-4" />} />
        <MetricCard label="Visitantes semana" value="48" delta="+9" icon={<UserPlus className="h-4 w-4" />} tone="info" />
        <MetricCard label="Frequência" value="620" delta="+9,4%" icon={<TrendingUp className="h-4 w-4" />} tone="success" />
        <MetricCard label="Doações do mês" value={brl(168400)} delta="meta 82%" icon={<Wallet className="h-4 w-4" />} tone="gold" />
        <MetricCard label="Células ativas" value="34" delta="+2" icon={<Home className="h-4 w-4" />} />
        <MetricCard label="Voluntários escalados" value="96" delta="87% confirmados" icon={<HeartHandshake className="h-4 w-4" />} tone="gold" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Attendance chart */}
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-semibold text-foreground">Frequência por culto</div>
              <div className="text-xs text-muted-foreground">últimas 8 semanas · presentes vs visitantes</div>
            </div>
            <StatusBadge tone="success">+13% no período</StatusBadge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={attendanceSeries}>
                <defs>
                  <linearGradient id="a1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#5eead4" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="a2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#fbbf24" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1f2b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="presentes" stroke="#5eead4" fill="url(#a1)" strokeWidth={2} />
                <Area type="monotone" dataKey="visitantes" stroke="#fbbf24" fill="url(#a2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline mini */}
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-lg font-semibold text-foreground">Pipeline de visitantes</div>
            <span className="text-xs text-primary">{openVisitors} abertos</span>
          </div>
          {[
            { s: "Novo visitante", n: 12, c: "bg-sky-400" },
            { s: "1º contato", n: 8, c: "bg-primary" },
            { s: "Convidado integração", n: 6, c: "bg-purple-400" },
            { s: "Em célula/curso", n: 14, c: "bg-emerald-400" },
            { s: "Pedido de membresia", n: 4, c: "bg-amber-300" },
            { s: "Membro ativo", n: 3, c: "bg-emerald-500" },
          ].map((row, i) => (
            <div key={row.s} className="mb-3 last:mb-0">
              <div className="mb-1 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${row.c}`} />
                  <span className="text-foreground/90">{row.s}</span>
                </div>
                <span className="font-mono text-muted-foreground">{row.n}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full ${row.c} opacity-70`} style={{ width: `${(row.n / 15) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Donations chart */}
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="font-display text-lg font-semibold text-foreground">Contribuições</div>
              <div className="text-xs text-muted-foreground">dízimos, ofertas e campanhas · 6 meses</div>
            </div>
            <StatusBadge tone="gold">+27% YoY</StatusBadge>
          </div>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={donationSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickFormatter={compact} />
                <Tooltip formatter={(v: number) => brl(v)} contentStyle={{ background: "#1a1f2b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="dizimos" stackId="a" fill="#5eead4" radius={[0, 0, 0, 0]} />
                <Bar dataKey="ofertas" stackId="a" fill="#60a5fa" radius={[0, 0, 0, 0]} />
                <Bar dataKey="campanhas" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agenda */}
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-4 font-display text-lg font-semibold text-foreground">Agenda da semana</div>
          <ul className="space-y-2">
            {events.slice(0, 4).map(ev => (
              <li key={ev.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg text-xs" style={{ background: `${ev.color}22`, color: ev.color }}>
                  <span className="font-mono">{ev.date.slice(-2)}</span>
                  <span className="text-[9px] uppercase opacity-70">dez</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-foreground">{ev.title}</div>
                  <div className="text-[11px] text-muted-foreground">{ev.time} · {ev.location}</div>
                </div>
                <div className="text-right text-[11px] text-muted-foreground">{ev.confirmed}/{ev.expected}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Alerts */}
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-lg font-semibold text-foreground">Alertas pastorais</div>
            <StatusBadge tone="danger">{openPastoral} abertos</StatusBadge>
          </div>
          <ul className="space-y-2 text-sm">
            {pastoralCare.slice(0, 4).map(p => (
              <li key={p.id} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${p.status === "aberto" ? "bg-rose-400" : "bg-amber-300"}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-foreground">{p.personName}</div>
                  <div className="text-[11px] text-muted-foreground">{p.summary} · {p.assignedTo}</div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-amber-200">{p.privacy}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Audit */}
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-display text-lg font-semibold text-foreground">Atividades recentes</div>
            <span className="text-xs text-muted-foreground">Trilha de auditoria</span>
          </div>
          <ul className="relative space-y-4 border-l border-white/10 pl-6">
            {auditLogs.map(a => (
              <li key={a.id} className="relative">
                <span className="absolute -left-[27px] top-1 grid h-3 w-3 place-items-center rounded-full bg-primary/20 ring-4 ring-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <div className="text-sm text-foreground">{a.action}</div>
                <div className="text-[11px] text-muted-foreground">por {a.actor} · {new Date(a.at).toLocaleString("pt-BR")}{a.ip ? ` · ${a.ip}` : ""}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Financial indicator */}
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-4 font-display text-lg font-semibold text-foreground">Saúde financeira</div>
          <div className="h-40">
            <ResponsiveContainer>
              <LineChart data={donationSeries}>
                <XAxis dataKey="month" hide />
                <Line dataKey="dizimos" stroke="#5eead4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Receita 30d</div>
              <div className="font-display text-xl text-foreground">{brl(168400)}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Saldo</div>
              <div className="font-display text-xl text-emerald-300">{brl(106300)}</div>
            </div>
          </div>
          <button className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-foreground hover:bg-white/[0.06]">
            Ver financeiro <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
