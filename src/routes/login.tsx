import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Brand } from "@/components/app/primitives";
import { authService } from "@/services";
import { API_CONFIG } from "@/lib/api/config";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Entrar — EcclesiaOS" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("daniel@novaalianca.org");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await authService.login(email, "demo");
    if (typeof window !== "undefined") window.localStorage.setItem(API_CONFIG.tokenStorageKey, res.token);
    setLoading(false);
    navigate({ to: "/select-church" });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-8 px-6 py-12 lg:grid-cols-2">
        <div className="hidden lg:block">
          <Brand />
          <h1 className="mt-10 font-display text-4xl font-semibold tracking-tight text-foreground">
            Bem-vindo de volta, <span className="text-gradient">pastor</span>.
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Acesse o dashboard da sua igreja, acompanhe pedidos pastorais, escalas e o crescimento da sua comunidade.
          </p>
          <div className="glass-panel mt-10 max-w-md rounded-2xl p-4 text-sm">
            <div className="flex items-center gap-2 text-primary">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Última sessão · há 3h
            </div>
            <div className="mt-2 text-muted-foreground">Você tem 3 pedidos pastorais aguardando triagem.</div>
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-8">
          <div className="lg:hidden"><Brand /></div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">Entrar na plataforma</h2>
          <p className="mt-1 text-sm text-muted-foreground">Use o e-mail de acesso da sua igreja.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">E-mail</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input value={email} onChange={e => setEmail(e.target.value)} className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm text-foreground focus:border-primary/40 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Senha</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="password" defaultValue="demo1234" className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-3 text-sm text-foreground focus:border-primary/40 focus:outline-none" />
              </div>
            </div>
            <button disabled={loading} className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground shadow-glow transition disabled:opacity-70">
              {loading ? "Entrando…" : (<>Entrar <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></>)}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Voltar</Link>
            <a className="hover:text-foreground">Esqueci minha senha</a>
          </div>
        </div>
      </div>
    </div>
  );
}
