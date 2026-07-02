import { createFileRoute, Link } from "@tanstack/react-router";
import { events } from "@/mocks/data";

export const Route = createFileRoute("/church-site-preview")({ component: Page, head: () => ({ meta: [{ title: "Site da igreja — EcclesiaOS" }] }) });

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-white/5 bg-background/80 px-6 py-2 text-center text-[11px] text-muted-foreground">
        Prévia · site gerado automaticamente pelo EcclesiaOS · <Link to="/" className="text-primary">voltar</Link>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-10 shadow-2xl">
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="font-display text-lg text-white">✟ Igreja Nova Aliança</div>
            <nav className="hidden gap-6 md:flex"><a>Home</a><a>Agenda</a><a>Conteúdos</a><a>Doações</a><a>Contato</a></nav>
            <button className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white">Sou visitante</button>
          </div>
          <div className="mt-16 max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-amber-300/80">Culto de Celebração · Domingo 10h e 19h</div>
            <h1 className="mt-3 font-display text-5xl leading-tight text-white">Uma família de fé no coração da cidade.</h1>
            <p className="mt-4 text-white/70">Somos uma igreja acolhedora. Venha nos visitar — reservamos um lugar especial para você.</p>
            <div className="mt-6 flex gap-3">
              <button className="rounded-xl bg-gradient-to-r from-amber-300 to-amber-400 px-5 py-3 text-sm font-medium text-slate-900">Planeje sua visita</button>
              <button className="rounded-xl border border-white/20 px-5 py-3 text-sm text-white">Assista online</button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.slice(0, 3).map(e => (
            <div key={e.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="h-2 w-12 rounded-full" style={{ background: e.color }} />
              <div className="mt-3 font-display text-lg text-foreground">{e.title}</div>
              <div className="text-xs text-muted-foreground">{e.date} · {e.time} · {e.location}</div>
              <button className="mt-4 text-xs text-primary">Quero participar →</button>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="font-display text-xl text-foreground">Formulário de visitante</div>
            <div className="mt-4 space-y-2">
              {["Nome", "WhatsApp", "E-mail"].map(l => <input key={l} placeholder={l} className="w-full rounded-xl border border-white/10 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary/40" />)}
              <button className="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Quero visitar</button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="font-display text-xl text-foreground">Contribua com nossa missão</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["R$ 50", "R$ 150", "R$ 500"].map(v => <button key={v} className="rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm hover:border-primary/40">{v}</button>)}
            </div>
            <div className="mt-3 text-[11px] text-muted-foreground">Pix · Cartão · Boleto — integração via gateway seguro</div>
          </div>
        </div>
      </div>
    </div>
  );
}
