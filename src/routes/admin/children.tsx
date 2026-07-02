import { createFileRoute } from "@tanstack/react-router";
import { AdminPagePlaceholder } from "@/components/app/Placeholder";
import { children } from "@/mocks/data";
import { StatusBadge } from "@/components/app/primitives";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/admin/children")({ component: Page, head: () => ({ meta: [{ title: "Ministério infantil — EcclesiaOS" }] }) });

function Page() {
  return (
    <AdminPagePlaceholder title="Ministério infantil" breadcrumbs={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Ministério infantil" }]}>
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-xs text-amber-200"><ShieldAlert className="h-4 w-4" /> Área restrita · check-in seguro com código único de retirada</div>
      <div className="glass-panel rounded-2xl">
        <table className="w-full text-sm"><thead><tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
          <th className="p-4">Criança</th><th>Idade</th><th>Turma</th><th>Responsável</th><th>Alergias</th><th>Status</th><th className="p-4 text-right">Código</th>
        </tr></thead><tbody>
          {children.map(c => (
            <tr key={c.id} className="border-t border-white/5">
              <td className="p-4 text-foreground">{c.name}</td>
              <td className="text-muted-foreground">{c.age}</td>
              <td className="text-muted-foreground">{c.classroom}</td>
              <td className="text-muted-foreground">{c.guardian}</td>
              <td>{c.allergies?.length ? <StatusBadge tone="danger">{c.allergies.join(", ")}</StatusBadge> : <span className="text-muted-foreground text-xs">—</span>}</td>
              <td><StatusBadge tone={c.checkedIn ? "success" : "info"}>{c.checkedIn ? "Check-in" : "aguardando"}</StatusBadge></td>
              <td className="p-4 text-right font-mono text-primary">{c.pickupCode}</td>
            </tr>
          ))}
        </tbody></table>
      </div>
    </AdminPagePlaceholder>
  );
}
