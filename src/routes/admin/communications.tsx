import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { StatusBadge } from "@/components/app/primitives";
import { communications } from "@/mocks/data";
import { Mail, MessageSquare, Smartphone, Bell } from "lucide-react";

export const Route = createFileRoute("/admin/communications")({ component: Page, head: () => ({ meta: [{ title: "Comunicação — EcclesiaOS" }] }) });

const icons = { email: Mail, whatsapp: MessageSquare, sms: Smartphone, push: Bell };

function Page() {
  return (
    <AdminShell title="Central de comunicação" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Comunicação" }]}
      actions={<button className="rounded-lg bg-gradient-to-r from-primary to-primary-glow px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow">+ Nova campanha</button>}>
      <div className="grid gap-3 md:grid-cols-4">
        {(["email","whatsapp","sms","push"] as const).map(ch => {
          const Icon = icons[ch];
          return <div key={ch} className="glass-panel rounded-2xl p-4"><div className="flex items-center gap-2 text-primary"><Icon className="h-4 w-4" /><span className="text-xs uppercase tracking-wider">{ch}</span></div><div className="mt-2 font-display text-xl text-foreground">{communications.filter(c => c.channel === ch).length}</div><div className="text-[11px] text-muted-foreground">envios</div></div>;
        })}
      </div>
      <div className="glass-panel mt-6 rounded-2xl">
        <table className="w-full text-sm"><thead><tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
          <th className="p-4">Assunto</th><th>Canal</th><th>Público</th><th>Status</th><th>Destinatários</th><th className="text-right p-4">Abertura</th>
        </tr></thead><tbody>
          {communications.map(c => {
            const Icon = icons[c.channel];
            return <tr key={c.id} className="border-t border-white/5">
              <td className="p-4 text-foreground">{c.subject}</td>
              <td><span className="inline-flex items-center gap-1 text-muted-foreground"><Icon className="h-3 w-3" />{c.channel}</span></td>
              <td className="text-muted-foreground">{c.audience}</td>
              <td><StatusBadge tone={c.status === "enviado" ? "success" : c.status === "agendado" ? "info" : c.status === "falhou" ? "danger" : "warning"}>{c.status}</StatusBadge></td>
              <td className="font-mono text-muted-foreground">{c.recipients}</td>
              <td className="p-4 text-right font-mono text-primary">{c.openRate ? `${Math.round(c.openRate*100)}%` : "—"}</td>
            </tr>;
          })}
        </tbody></table>
      </div>
    </AdminShell>
  );
}
