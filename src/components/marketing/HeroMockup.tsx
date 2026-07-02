// Layered product mockup for the hero — pure CSS/SVG, no images.
import { Users, TrendingUp, Wallet, Bell } from "lucide-react";

export function HeroMockup() {
  const bars = [42, 68, 55, 78, 92, 84, 96];
  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-gradient-to-br from-primary/20 via-transparent to-amber-300/10 blur-3xl" />

      {/* Main dashboard panel */}
      <div className="glass-strong relative overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <div className="mx-auto rounded-md bg-white/5 px-3 py-0.5 text-[10px] font-mono text-muted-foreground">app.ecclesiaos.com/admin</div>
          <span className="text-[10px] text-muted-foreground">Nova Aliança</span>
        </div>

        <div className="grid grid-cols-12 gap-3 p-4">
          {/* Sidebar */}
          <div className="col-span-3 hidden flex-col gap-1.5 md:flex">
            {["Dashboard","Pessoas","Visitantes","Células","Ministérios","Financeiro","Comunicação","Infantil"].map((l, i) => (
              <div key={l} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${i === 0 ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/25" : "text-muted-foreground"}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                {l}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="col-span-12 flex flex-col gap-3 md:col-span-9">
            {/* Metric cards */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { l: "Membros ativos", v: "842", d: "+18 esta semana", i: <Users className="h-3.5 w-3.5" />, tone: "text-primary" },
                { l: "Frequência", v: "620", d: "+9,4%", i: <TrendingUp className="h-3.5 w-3.5" />, tone: "text-emerald-300" },
                { l: "Doações do mês", v: "R$ 168k", d: "meta 82%", i: <Wallet className="h-3.5 w-3.5" />, tone: "text-amber-300" },
              ].map(c => (
                <div key={c.l} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
                    {c.l} <span className={c.tone}>{c.i}</span>
                  </div>
                  <div className="mt-1.5 font-display text-lg font-semibold text-foreground">{c.v}</div>
                  <div className="text-[10px] text-emerald-300/80">{c.d}</div>
                </div>
              ))}
            </div>

            {/* Chart + agenda */}
            <div className="grid grid-cols-5 gap-2.5">
              <div className="col-span-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-medium text-foreground">Frequência por culto</div>
                  <div className="text-[10px] text-muted-foreground">últimas 7 semanas</div>
                </div>
                <div className="mt-3 flex h-24 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <div key={i} className="flex-1">
                      <div className="w-full rounded-t-md bg-gradient-to-t from-primary/70 to-primary/30" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <div className="text-[11px] font-medium text-foreground">Agenda</div>
                <div className="mt-2 space-y-1.5">
                  {[
                    { t: "10h", n: "Culto Celebração", c: "bg-primary" },
                    { t: "19h", n: "Encontro Casais", c: "bg-amber-300" },
                    { t: "20h", n: "Célula Vila M.", c: "bg-purple-400" },
                  ].map(a => (
                    <div key={a.n} className="flex items-center gap-2 rounded-lg bg-white/[0.02] px-2 py-1.5">
                      <span className={`h-6 w-1 rounded-full ${a.c}`} />
                      <div className="text-[10px]">
                        <div className="text-muted-foreground">{a.t}</div>
                        <div className="text-foreground">{a.n}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating card: pipeline */}
      <div className="glass-strong absolute -left-4 -top-4 hidden w-56 rotate-[-4deg] rounded-2xl p-3 shadow-elegant md:block animate-float">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pipeline de visitantes</div>
        <div className="mt-2 space-y-1.5">
          {[
            { s: "Novo", n: 12, c: "bg-sky-400" },
            { s: "1º contato", n: 8, c: "bg-primary" },
            { s: "Célula", n: 14, c: "bg-emerald-400" },
            { s: "Membresia", n: 4, c: "bg-amber-300" },
          ].map(row => (
            <div key={row.s} className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${row.c}`} />
              <span className="flex-1 text-[11px] text-foreground">{row.s}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{row.n}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating: check-in kids */}
      <div className="glass-strong absolute -bottom-6 -right-4 hidden w-64 rotate-[3deg] rounded-2xl p-3 shadow-elegant md:block">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Check-in infantil</div>
          <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-300">seguro</span>
        </div>
        <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/[0.03] p-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-pink-400/40 to-primary/40 text-xs font-semibold">MS</div>
          <div className="flex-1">
            <div className="text-[11px] text-foreground">Miguel Souza</div>
            <div className="text-[9px] text-amber-300">alergia: amendoim</div>
          </div>
          <div className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary">MS-8412</div>
        </div>
      </div>

      {/* Notification pill */}
      <div className="glass-strong absolute -right-6 top-16 hidden items-center gap-2 rounded-full px-3 py-2 shadow-elegant lg:flex animate-pulse-glow">
        <Bell className="h-3.5 w-3.5 text-amber-300" />
        <span className="text-[11px] text-foreground">3 pedidos pastorais</span>
      </div>
    </div>
  );
}
