import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { MetricCard, StatusBadge } from "@/components/app/primitives";
import { donations, transactions, donationSeries } from "@/mocks/data";
import { brl, compact } from "@/lib/utils/format";
import { Wallet, TrendingUp, ArrowDownRight, Target } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/finance")({ component: Page, head: () => ({ meta: [{ title: "Financeiro — EcclesiaOS" }] }) });

function Page() {
  const total = donations.reduce((s, d) => s + d.amount, 0);
  const despesas = transactions.filter(t => t.kind === "despesa").reduce((s, t) => s + t.amount, 0);
  return (
    <AdminShell title="Financeiro & doações" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Financeiro" }]}
      actions={<span className="rounded-full bg-amber-300/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-amber-200 ring-1 ring-inset ring-amber-300/20">área restrita · tesouraria</span>}>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Receita 30d" value={brl(168400)} delta="+12%" icon={<Wallet className="h-4 w-4" />} tone="success" />
        <MetricCard label="Doações mês" value={brl(total)} delta="82% da meta" icon={<TrendingUp className="h-4 w-4" />} tone="gold" />
        <MetricCard label="Despesas" value={brl(despesas)} icon={<ArrowDownRight className="h-4 w-4" />} tone="info" />
        <MetricCard label="Campanha Reforma" value="78%" delta={`${brl(31200)} de ${brl(40000)}`} icon={<Target className="h-4 w-4" />} tone="gold" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="glass-panel rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 font-display text-lg text-foreground">Receitas por mês</div>
          <div className="h-64"><ResponsiveContainer><BarChart data={donationSeries}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickFormatter={compact} />
            <Tooltip formatter={(v: number) => brl(v)} contentStyle={{ background: "#1a1f2b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
            <Bar dataKey="dizimos" stackId="a" fill="#5eead4" /><Bar dataKey="ofertas" stackId="a" fill="#60a5fa" /><Bar dataKey="campanhas" stackId="a" fill="#fbbf24" radius={[6,6,0,0]} />
          </BarChart></ResponsiveContainer></div>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-3 font-display text-lg text-foreground">Métodos aceitos</div>
          {[["Pix", "Ativo"], ["Cartão", "Planejado"], ["Boleto", "Planejado"], ["Dinheiro", "Ativo"]].map(([m, s]) => (
            <div key={m} className="flex items-center justify-between border-b border-white/5 py-2 text-sm last:border-0">
              <span className="text-foreground">{m}</span>
              <StatusBadge tone={s === "Ativo" ? "success" : "warning"}>{s}</StatusBadge>
            </div>
          ))}
          <div className="mt-3 text-[11px] text-muted-foreground">Nenhum dado de cartão é armazenado — integração via gateway.</div>
        </div>
        <div className="glass-panel rounded-2xl p-5 lg:col-span-3">
          <div className="mb-3 font-display text-lg text-foreground">Últimas doações</div>
          <table className="w-full text-sm"><thead><tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <th className="py-2">Contribuinte</th><th>Tipo</th><th>Método</th><th>Data</th><th className="text-right">Valor</th>
          </tr></thead><tbody>
            {donations.slice(0, 8).map(d => (
              <tr key={d.id} className="border-t border-white/5">
                <td className="py-2.5 text-foreground">{d.personName}</td>
                <td className="text-muted-foreground">{d.type}</td>
                <td className="text-muted-foreground uppercase text-[11px]">{d.method}</td>
                <td className="text-muted-foreground">{d.date}</td>
                <td className="text-right font-mono text-emerald-300">{brl(d.amount)}</td>
              </tr>
            ))}
          </tbody></table>
        </div>
      </div>
    </AdminShell>
  );
}
