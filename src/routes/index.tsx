import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Users, UserPlus, Home, HeartHandshake, Calendar, Wallet, Send,
  Baby, HandHeart, BarChart3, Shield, Globe, ArrowRight, Check,
  Sparkles, Lock, Fingerprint,
} from "lucide-react";
import { Brand, SectionHeader, StatusBadge } from "@/components/app/primitives";
import { HeroMockup } from "@/components/marketing/HeroMockup";

export const Route = createFileRoute("/")({
  component: Landing,
});

const modules = [
  { icon: Users, name: "Pessoas & Famílias", desc: "Cadastro completo, tags, famílias e ciclo do membro.", color: "text-primary" },
  { icon: UserPlus, name: "Visitantes CRM", desc: "Pipeline visual do primeiro contato à membresia.", color: "text-sky-300" },
  { icon: Home, name: "Células & PGs", desc: "Mapa, relatórios de líder e indicador de multiplicação.", color: "text-emerald-300" },
  { icon: HeartHandshake, name: "Ministérios & Escalas", desc: "Voluntários, disponibilidade e troca de escala.", color: "text-purple-300" },
  { icon: Calendar, name: "Eventos & Cultos", desc: "Inscrições, check-in e relatório pós-evento.", color: "text-amber-300" },
  { icon: Wallet, name: "Financeiro & Doações", desc: "Dízimos, ofertas, campanhas, Pix e recibos.", color: "text-emerald-300" },
  { icon: Send, name: "Comunicação", desc: "E-mail, WhatsApp, SMS e push com segmentação.", color: "text-sky-300" },
  { icon: Baby, name: "Ministério Infantil", desc: "Check-in seguro, alergias e código de retirada.", color: "text-pink-300" },
  { icon: HandHeart, name: "Cuidado Pastoral", desc: "Pedidos, aconselhamento e confidencialidade real.", color: "text-primary" },
  { icon: BarChart3, name: "Relatórios & BI", desc: "Crescimento, engajamento e saúde das células.", color: "text-amber-300" },
  { icon: Globe, name: "Site da Igreja", desc: "Presença digital pronta para cada tenant.", color: "text-primary" },
  { icon: Shield, name: "LGPD & Permissões", desc: "RBAC granular, consentimentos e auditoria.", color: "text-emerald-300" },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Hero background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px]" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[900px] grid-bg opacity-40" />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Brand />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#produto" className="hover:text-foreground">Produto</a>
          <a href="#modulos" className="hover:text-foreground">Módulos</a>
          <a href="#jornada" className="hover:text-foreground">Jornada</a>
          <a href="#seguranca" className="hover:text-foreground">Segurança</a>
          <a href="#planos" className="hover:text-foreground">Planos</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">Entrar</Link>
          <Link to="/admin/dashboard" className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95">
            Ver demo <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-10 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Sacred-tech · plataforma completa para igrejas
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-[68px]">
              Um <span className="text-gradient">sistema operacional</span> para a sua igreja.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Pastoreie pessoas, não planilhas. EcclesiaOS unifica membros, células, escalas, doações, cuidado pastoral e o site público da igreja em uma única plataforma — feita para pastores, secretaria e líderes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/admin/dashboard" className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-95">
                Explorar demo navegável <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/church-site-preview" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-foreground transition hover:bg-white/[0.06]">
                Ver site da igreja
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Lock className="h-3.5 w-3.5 text-primary" />LGPD-first</div>
              <div className="flex items-center gap-2"><Fingerprint className="h-3.5 w-3.5 text-primary" />Multi-tenant seguro</div>
              <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-primary" />Auditoria completa</div>
            </div>
          </div>

          <HeroMockup />
        </div>

        {/* Trust bar */}
        <div className="mt-24 grid grid-cols-2 gap-6 border-y border-white/5 py-8 text-center md:grid-cols-4">
          {[
            { n: "+120", l: "igrejas ativas" },
            { n: "58k", l: "membros gerenciados" },
            { n: "R$ 12M", l: "em doações processadas" },
            { n: "99,98%", l: "uptime nos últimos 12m" },
          ].map(s => (
            <div key={s.l}>
              <div className="font-display text-3xl font-semibold text-gradient-gold">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* "Não é só um site" */}
      <section id="produto" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <SectionHeader
          eyebrow="não é só um site — é o sistema"
          title="A gestão da sua igreja em uma única superfície."
          sub="Enquanto plataformas de site cuidam apenas da vitrine, EcclesiaOS entrega o back-office pastoral, o portal do membro e o site público da igreja — conectados por dentro."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: "Vitrine + operação", desc: "O site público da igreja é um módulo — não um projeto separado. Toda inscrição, doação e visitante volta para o CRM.", tag: "Site + admin sincronizados" },
            { title: "Portal do membro", desc: "Cada pessoa tem sua área com contribuições, escalas, eventos e pedidos de oração — no navegador ou mobile.", tag: "Experiência dedicada" },
            { title: "Multi-tenant sério", desc: "Cada igreja é um tenant isolado. Dados, permissões, financeiro e auditoria segregados por design.", tag: "Isolamento por tenant" },
          ].map(c => (
            <div key={c.title} className="glass-panel rounded-2xl p-6">
              <StatusBadge tone="gold">{c.tag}</StatusBadge>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modules grid */}
      <section id="modulos" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <SectionHeader eyebrow="módulos" title="Tudo que a igreja precisa. Nada que ela não usa." />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(m => {
            const Icon = m.icon;
            return (
              <div key={m.name} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white/[0.04]">
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10 ${m.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{m.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dashboard mockups showcase */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <SectionHeader eyebrow="prévia do admin" title="Um painel que os pastores realmente abrem toda semana." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <MockPanel title="Dashboard pastoral" tag="tempo real">
            <div className="grid grid-cols-3 gap-2">
              {[["842","Membros"], ["48","Visitantes"], ["620","Frequência"]].map(([v, l]) => (
                <div key={l} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                  <div className="mt-1 font-display text-xl text-foreground">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="mb-2 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Doações · últimos 6 meses</span><span className="text-emerald-300">+27% YoY</span>
              </div>
              <svg viewBox="0 0 300 80" className="h-20 w-full">
                <defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5eead4" stopOpacity="0.5" /><stop offset="1" stopColor="#5eead4" stopOpacity="0" /></linearGradient></defs>
                <path d="M0,60 L50,52 L100,45 L150,38 L200,30 L250,20 L300,12 L300,80 L0,80 Z" fill="url(#g1)" />
                <path d="M0,60 L50,52 L100,45 L150,38 L200,30 L250,20 L300,12" fill="none" stroke="#5eead4" strokeWidth="1.5" />
              </svg>
            </div>
          </MockPanel>

          <MockPanel title="Pipeline de visitantes" tag="CRM">
            <div className="grid grid-cols-3 gap-2">
              {[
                { s: "Novo", n: 12, c: "border-sky-400/30 bg-sky-400/5" },
                { s: "Célula", n: 14, c: "border-primary/30 bg-primary/5" },
                { s: "Membro", n: 4, c: "border-amber-300/30 bg-amber-300/5" },
              ].map(col => (
                <div key={col.s} className={`rounded-lg border p-2.5 ${col.c}`}>
                  <div className="mb-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                    {col.s}<span className="font-mono">{col.n}</span>
                  </div>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="mt-1 rounded-md bg-white/[0.04] p-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-white/20" />
                      <div className="mt-1 h-1 w-10 rounded-full bg-white/10" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </MockPanel>

          <MockPanel title="Escala do próximo culto" tag="ministérios">
            {[
              { r: "Vocal principal", n: "Rafael C.", s: "confirmado" },
              { r: "Backing vocal", n: "Mariana O.", s: "confirmado" },
              { r: "Guitarra", n: "Lucas F.", s: "pendente" },
              { r: "Direção câmera", n: "Bruno F.", s: "confirmado" },
              { r: "Berçário", n: "Fernanda B.", s: "trocado" },
            ].map(row => (
              <div key={row.r} className="flex items-center justify-between border-b border-white/5 py-2 text-xs last:border-0">
                <div>
                  <div className="text-foreground">{row.r}</div>
                  <div className="text-muted-foreground text-[10px]">{row.n}</div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider ${
                  row.s === "confirmado" ? "bg-emerald-400/10 text-emerald-300" :
                  row.s === "pendente" ? "bg-amber-300/10 text-amber-200" : "bg-sky-400/10 text-sky-300"
                }`}>{row.s}</span>
              </div>
            ))}
          </MockPanel>

          <MockPanel title="Check-in infantil" tag="segurança">
            {[
              { n: "Miguel Souza", c: "Explorers 5-6", code: "MS-8412", allergy: "amendoim" },
              { n: "Helena Oliveira", c: "Little Kids 3-4", code: "HO-2214" },
              { n: "Alice Rocha", c: "Berçário 0-2", code: "AR-1108", allergy: "lactose" },
            ].map(k => (
              <div key={k.n} className="mb-2 flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-pink-400/40 to-primary/40 text-xs font-semibold">{k.n.split(" ").map(s => s[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-foreground">{k.n}</div>
                  <div className="text-[10px] text-muted-foreground">{k.c}</div>
                </div>
                {k.allergy && <span className="rounded-full bg-amber-300/10 px-2 py-0.5 text-[9px] text-amber-200">⚠ {k.allergy}</span>}
                <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary">{k.code}</span>
              </div>
            ))}
          </MockPanel>
        </div>
      </section>

      {/* Journey */}
      <section id="jornada" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <SectionHeader eyebrow="jornada" title="Do visitante ao membro engajado — sem cair pelas frestas." />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6">
          {[
            { s: "01", t: "Chega ao culto", d: "Cartão ou QR." },
            { s: "02", t: "1º contato", d: "Follow-up em 48h." },
            { s: "03", t: "Integração", d: "Curso de novos." },
            { s: "04", t: "Célula", d: "Vida em grupo." },
            { s: "05", t: "Membresia", d: "Batismo e voto." },
            { s: "06", t: "Servindo", d: "Escalado em ministério." },
          ].map((step, i) => (
            <div key={step.s} className="glass-panel relative rounded-2xl p-4">
              <div className="text-[10px] font-mono text-primary">{step.s}</div>
              <div className="mt-2 font-display text-sm text-foreground">{step.t}</div>
              <div className="text-[11px] text-muted-foreground">{step.d}</div>
              {i < 5 && <div className="pointer-events-none absolute -right-2 top-1/2 hidden h-px w-4 bg-gradient-to-r from-primary/50 to-transparent md:block" />}
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section id="seguranca" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="glass-strong grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-12">
          <div>
            <StatusBadge tone="gold">Segurança & LGPD</StatusBadge>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Dados sensíveis da igreja tratados com o cuidado que eles merecem.
            </h3>
            <p className="mt-4 text-muted-foreground">
              Áreas como financeiro, ministério infantil e cuidado pastoral têm controle de acesso granular, registros de auditoria e consentimentos por pessoa. Você decide quem vê o quê.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              "Papéis: Owner, Admin, Pastor, Secretaria, Tesouraria, Líder de Ministério, Líder de Célula, Voluntário, Membro.",
              "Áreas confidenciais isoladas — cuidado pastoral tem trilha própria de acesso.",
              "Consentimentos por pessoa: imagem, comunicação, dados sensíveis.",
              "Auditoria imutável de tudo que muda: quem, quando, de qual IP.",
              "Dados por tenant — sua igreja nunca vê a igreja do outro.",
              "Backups diários e criptografia em repouso.",
            ].map(t => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section id="planos" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <SectionHeader eyebrow="planos" title="Cresce com a sua igreja." sub="Comece grátis por 30 dias. Cancele quando quiser. Sem taxa de setup." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {[
            { name: "Starter", price: "R$ 149", desc: "Igrejas até 200 membros", feats: ["Pessoas & visitantes","Células e ministérios","Comunicação por e-mail","Site básico"] },
            { name: "Growth", price: "R$ 349", desc: "Igrejas de 200 a 1.000 membros", feats: ["Tudo do Starter","Financeiro completo + Pix","WhatsApp e SMS","Cuidado pastoral","Ministério infantil"], featured: true },
            { name: "Enterprise", price: "Sob consulta", desc: "Redes e igrejas 1.000+", feats: ["Multi-congregação","SSO / SAML","API & webhooks","Onboarding dedicado","SLA 99,99%"] },
          ].map(p => (
            <div key={p.name} className={`relative rounded-3xl p-6 ${p.featured ? "border border-primary/40 bg-gradient-to-b from-primary/10 to-transparent shadow-glow" : "glass-panel"}`}>
              {p.featured && <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-primary-glow px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Mais escolhido</div>}
              <h3 className="font-display text-xl font-semibold text-foreground">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-foreground">{p.price}</span>
                {p.price.startsWith("R$") && <span className="text-sm text-muted-foreground">/mês</span>}
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.feats.map(f => <li key={f} className="flex items-start gap-2 text-foreground/85"><Check className="mt-0.5 h-4 w-4 text-primary" />{f}</li>)}
              </ul>
              <Link to="/login" className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition ${p.featured ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:opacity-95" : "border border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06]"}`}>
                Começar 30 dias grátis
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <h3 className="font-display text-3xl font-semibold text-foreground md:text-5xl">Pronto para pastorear com clareza?</h3>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Agende uma demonstração de 30 minutos com nosso time. Sem compromisso, sem cartão.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/admin/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">Ver a demo agora <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/login" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-foreground">Agendar apresentação</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <Brand />
          <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Produto</div>
              <div className="space-y-1 text-foreground/80"><div><a href="#modulos">Módulos</a></div><div><Link to="/admin/dashboard">Demo</Link></div><div><Link to="/church-site-preview">Site da igreja</Link></div></div>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Empresa</div>
              <div className="space-y-1 text-foreground/80"><div>Sobre</div><div>Blog</div><div>Contato</div></div>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Legal</div>
              <div className="space-y-1 text-foreground/80"><div>Termos</div><div>Privacidade</div><div>LGPD</div></div>
            </div>
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Status</div>
              <div className="flex items-center gap-2 text-foreground/80"><span className="h-2 w-2 rounded-full bg-emerald-400" />Todos os sistemas online</div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-6 text-xs text-muted-foreground">© {new Date().getFullYear()} EcclesiaOS. Feito com cuidado pastoral.</div>
      </footer>
    </div>
  );
}

function MockPanel({ title, tag, children }: { title: string; tag: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="font-display text-sm font-medium text-foreground">{title}</div>
        <span className="rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">{tag}</span>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

