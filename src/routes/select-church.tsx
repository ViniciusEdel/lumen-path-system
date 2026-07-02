import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Brand, StatusBadge } from "@/components/app/primitives";
import { tenants } from "@/mocks/data";
import { authService } from "@/services";
import { ArrowRight, Users } from "lucide-react";

export const Route = createFileRoute("/select-church")({
  component: SelectChurch,
  head: () => ({ meta: [{ title: "Selecionar igreja — EcclesiaOS" }] }),
});

function SelectChurch() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute inset-0 dot-bg opacity-30" />
      <div className="relative mx-auto max-w-4xl px-6 py-16">
        <Brand />
        <div className="mt-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">Selecione a igreja</h1>
          <p className="mt-2 text-muted-foreground">Você tem acesso a {tenants.length} organizações.</p>
        </div>
        <div className="mt-8 grid gap-3">
          {tenants.map(t => {
            const tone = t.status === "active" ? "success" : t.status === "trial" ? "gold" : "danger";
            return (
              <button
                key={t.id}
                onClick={async () => { await authService.selectTenant(t.id); navigate({ to: "/admin/dashboard" }); }}
                className="group glass-panel flex items-center gap-4 rounded-2xl p-5 text-left transition hover:border-primary/30"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/40 to-amber-300/30 font-display text-lg font-semibold text-primary-foreground">
                  {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-display text-lg text-foreground">{t.name}</span>
                    <StatusBadge tone={tone}>{t.status === "active" ? "Ativo" : t.status === "trial" ? "Trial" : "Bloqueado"}</StatusBadge>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{t.city} · {t.state}</span>
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{t.members} membros</span>
                    <span>Plano {t.plan}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
          <Link to="/onboarding" className="hover:text-foreground">+ Adicionar nova igreja</Link>
          <Link to="/" className="hover:text-foreground">Sair</Link>
        </div>
      </div>
    </div>
  );
}
