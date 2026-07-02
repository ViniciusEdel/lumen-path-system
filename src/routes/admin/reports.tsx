import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { MetricCard } from "@/components/app/primitives";
import { attendanceSeries, donationSeries } from "@/mocks/data";
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { Users, TrendingUp, HeartHandshake, Wallet } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({ component: Page, head: () => ({ meta: [{ title: "Relatórios & BI — EcclesiaOS" }] }) });

function Page() {
  return (
    <AdminShell title="Relatórios & BI" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Relatórios" }]}>
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Crescimento anual" value="+18%" delta="vs 2023" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <MetricCard label="Conversão visitante→membro" value="34%" delta="+6pp" tone="gold" icon={<Users className="h-4 w-4" />} />
        <MetricCard label="Voluntários engajados" value="212" delta="68% do corpo" tone="info" icon={<HeartHandshake className="h-4 w-4" />} />
        <MetricCard label="Ticket médio doação" value="R$ 187" delta="+12%" tone="gold" icon={<Wallet className="h-4 w-4" />} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-3 font-display text-lg text-foreground">Frequência de cultos</div>
          <div className="h-64"><ResponsiveContainer><LineChart data={attendanceSeries}>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" fontSize={11} /><YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={{ background: "#1a1f2b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
            <Line dataKey="manha" stroke="#5eead4" strokeWidth={2} /><Line dataKey="noite" stroke="#fbbf24" strokeWidth={2} />
          </LineChart></ResponsiveContainer></div>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <div className="mb-3 font-display text-lg text-foreground">Receita consolidada</div>
          <div className="h-64"><ResponsiveContainer><AreaChart data={donationSeries}>
            <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5eead4" stopOpacity={0.5} /><stop offset="100%" stopColor="#5eead4" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={11} /><YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
            <Tooltip contentStyle={{ background: "#1a1f2b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
            <Area dataKey="dizimos" stroke="#5eead4" fill="url(#rev)" />
          </AreaChart></ResponsiveContainer></div>
        </div>
      </div>
    </AdminShell>
  );
}
