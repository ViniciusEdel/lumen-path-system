import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Brand } from "@/components/app/primitives";
import { Check } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
  head: () => ({ meta: [{ title: "Configuração inicial — EcclesiaOS" }] }),
});

const steps = [
  { key: "church", title: "Dados da igreja", desc: "Nome, endereço, denominação, contato." },
  { key: "brand", title: "Identidade visual", desc: "Logo, cores, tom de comunicação." },
  { key: "users", title: "Administradores", desc: "Convide pastores, secretaria e tesouraria." },
  { key: "ministries", title: "Ministérios & células", desc: "Estrutura inicial de liderança." },
  { key: "members", title: "Importar membros", desc: "Excel, Google Sheets ou cadastro manual." },
  { key: "finance", title: "Financeiro & doações", desc: "Contas, categorias e método de recebimento." },
  { key: "review", title: "Revisão final", desc: "Pronto para lançar." },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <Brand />
          <Link to="/admin/dashboard" className="text-xs text-muted-foreground hover:text-foreground">Pular por ora</Link>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ol className="glass-panel space-y-1 rounded-2xl p-3">
            {steps.map((s, i) => {
              const state = i < step ? "done" : i === step ? "current" : "todo";
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setStep(i)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      state === "current" ? "bg-primary/10 ring-1 ring-inset ring-primary/25" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${
                      state === "done" ? "bg-primary text-primary-foreground" :
                      state === "current" ? "bg-primary/20 text-primary ring-1 ring-primary/40" :
                      "bg-white/5 text-muted-foreground"
                    }`}>
                      {state === "done" ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    <span>
                      <span className="block text-foreground">{s.title}</span>
                      <span className="block text-[11px] text-muted-foreground">{s.desc}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs uppercase tracking-wider text-primary">Passo {step + 1} de {steps.length}</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">{steps[step].title}</h2>
            <p className="mt-2 text-muted-foreground">{steps[step].desc}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Nome da igreja", "Denominação", "CNPJ", "Cidade / Estado", "Site atual", "Telefone principal"].map(f => (
                <div key={f}>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{f}</label>
                  <input placeholder={f} className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-primary/40 focus:outline-none" />
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-foreground disabled:opacity-40" disabled={step === 0}>Voltar</button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep(step + 1)} className="rounded-xl bg-gradient-to-r from-primary to-primary-glow px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Continuar</button>
              ) : (
                <Link to="/admin/dashboard" className="rounded-xl bg-gradient-to-r from-primary to-primary-glow px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">Concluir e entrar</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
