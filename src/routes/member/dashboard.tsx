import { createFileRoute, Link } from "@tanstack/react-router";
import { events, donations } from "@/mocks/data";
import { brl } from "@/lib/utils/format";
import { Brand } from "@/components/app/primitives";

export const Route = createFileRoute("/member/dashboard")({ component: Page, head: () => ({ meta: [{ title: "Portal do membro — EcclesiaOS" }] }) });

function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/5 bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Brand />
          <div className="flex items-center gap-4 text-sm">
            <Link to="/admin/dashboard" className="text-muted-foreground hover:text-foreground">Admin</Link>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-xs">AS</div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="font-display text-3xl">Olá, Ana 👋</div>
        <div className="mt-1 text-sm text-muted-foreground">Bem-vinda ao seu portal na Igreja Nova Aliança</div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[["Próximo culto", "Domingo · 10h"], ["Sua célula", "Terça · 20h"], ["Sua escala", "Recepção · Dom"]].map(([l, v]) => (
            <div key={l} className="glass-panel rounded-2xl p-4"><div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div><div className="mt-1 text-foreground">{v}</div></div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="glass-panel rounded-2xl p-5">
            <div className="mb-3 font-display text-lg">Agenda da igreja</div>
            {events.slice(0, 4).map(e => (
              <div key={e.id} className="flex items-center justify-between border-b border-white/5 py-2 text-sm last:border-0">
                <div><div className="text-foreground">{e.title}</div><div className="text-[11px] text-muted-foreground">{e.date} · {e.time}</div></div>
                <button className="rounded-lg border border-white/10 px-2 py-1 text-xs text-foreground">Confirmar</button>
              </div>
            ))}
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <div className="mb-3 font-display text-lg">Minhas contribuições</div>
            {donations.slice(0, 4).map(d => (
              <div key={d.id} className="flex items-center justify-between border-b border-white/5 py-2 text-sm last:border-0">
                <div><div className="text-foreground">{d.type}</div><div className="text-[11px] text-muted-foreground">{d.date} · {d.method}</div></div>
                <span className="font-mono text-emerald-300">{brl(d.amount)}</span>
              </div>
            ))}
            <button className="mt-3 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-2 text-sm font-medium text-primary-foreground shadow-glow">Fazer nova doação</button>
          </div>
          <div className="glass-panel rounded-2xl p-5 md:col-span-2">
            <div className="mb-3 font-display text-lg">Pedido de oração</div>
            <textarea className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40" rows={3} placeholder="Compartilhe seu pedido com nossa equipe pastoral..." />
            <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground"><span>🔒 Confidencial</span><button className="rounded-lg bg-primary/10 px-3 py-1.5 text-primary">Enviar</button></div>
          </div>
        </div>
      </main>
    </div>
  );
}
