import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/app/AdminShell";
import { StatusBadge } from "@/components/app/primitives";
import { people } from "@/mocks/data";
import { useState } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { brl } from "@/lib/utils/format";

export const Route = createFileRoute("/admin/people/$id")({
  component: PersonDetail,
});

const tabs = ["Dados gerais", "Família", "Participação", "Contribuições", "Histórico", "Consentimentos"] as const;

function PersonDetail() {
  const { id } = Route.useParams();
  const person = people.find(p => p.id === id) ?? people[0];
  const [tab, setTab] = useState<(typeof tabs)[number]>("Dados gerais");

  return (
    <AdminShell title={person.name} breadcrumbs={[{ label: "Pessoas", to: "/admin/people" }, { label: person.name }]}>
      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="glass-panel rounded-2xl p-6">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-primary/40 to-amber-300/30 font-display text-3xl text-primary-foreground">
            {person.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
          </div>
          <div className="mt-4 text-center">
            <div className="font-display text-xl text-foreground">{person.name}</div>
            <div className="mt-1 flex justify-center"><StatusBadge tone={person.status === "member" ? "success" : "info"}>{person.status === "member" ? "Membro" : "Visitante"}</StatusBadge></div>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{person.email}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{person.phone}</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />{person.address?.neighborhood}, {person.address?.city}</li>
            <li className="flex items-center gap-2"><Calendar className="h-4 w-4" />Membro desde {person.memberSince ?? "—"}</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {person.tags.map(t => <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>)}
          </div>
          <div className="mt-6 space-y-2">
            <button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-glow py-2 text-sm font-medium text-primary-foreground shadow-glow">Enviar mensagem</button>
            <button className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 text-sm text-foreground hover:bg-white/[0.06]">Registrar cuidado pastoral</button>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap gap-1 border-b border-white/5 pb-2">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} className={`rounded-lg px-3 py-1.5 text-sm transition ${tab === t ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tab === "Dados gerais" && (<>
              {[["Data de nascimento", person.birthDate], ["Gênero", person.gender === "F" ? "Feminino" : "Masculino"], ["Estado civil", "—"], ["Batismo", "12/03/2022"]].map(([l, v]) => (
                <div key={l} className="glass-panel rounded-xl p-4">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
                  <div className="mt-1 text-foreground">{v}</div>
                </div>
              ))}
            </>)}
            {tab === "Família" && (
              <div className="glass-panel rounded-2xl p-5 md:col-span-2">
                <div className="font-display text-lg text-foreground">Família Souza</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {people.slice(0, 3).map(m => (
                    <div key={m.id} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-xs">{m.name.split(" ")[0][0]}</div>
                      <div><div className="text-sm text-foreground">{m.name}</div><div className="text-[11px] text-muted-foreground">{m.status}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "Participação" && (
              <div className="glass-panel rounded-2xl p-5 md:col-span-2">
                {[
                  { d: "Culto 07/12", p: "presente" }, { d: "Célula 04/12", p: "presente" }, { d: "Culto 30/11", p: "faltou" }, { d: "Escola Bíblica 24/11", p: "presente" },
                ].map(r => (
                  <div key={r.d} className="flex items-center justify-between border-b border-white/5 py-2 text-sm last:border-0">
                    <span className="text-foreground">{r.d}</span>
                    <StatusBadge tone={r.p === "presente" ? "success" : "danger"}>{r.p}</StatusBadge>
                  </div>
                ))}
              </div>
            )}
            {tab === "Contribuições" && (
              <div className="glass-panel rounded-2xl p-5 md:col-span-2">
                {[[brl(500), "Dízimo · Pix", "01/12"], [brl(150), "Oferta · Pix", "24/11"], [brl(300), "Campanha Reforma · Cartão", "10/11"]].map(([v, d, dt]) => (
                  <div key={d} className="flex items-center justify-between border-b border-white/5 py-2 text-sm last:border-0">
                    <div><div className="text-foreground">{v}</div><div className="text-[11px] text-muted-foreground">{d}</div></div>
                    <span className="text-muted-foreground">{dt}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "Histórico" && (
              <div className="glass-panel rounded-2xl p-5 md:col-span-2 text-sm text-muted-foreground">Sem eventos recentes.</div>
            )}
            {tab === "Consentimentos" && (
              <div className="glass-panel rounded-2xl p-5 md:col-span-2">
                {[["Uso de imagem", true], ["Comunicação por e-mail", true], ["Comunicação por WhatsApp", true], ["Compartilhamento de dados sensíveis", false]].map(([l, on]) => (
                  <div key={l as string} className="flex items-center justify-between border-b border-white/5 py-3 text-sm last:border-0">
                    <span className="text-foreground">{l}</span>
                    <StatusBadge tone={on ? "success" : "danger"}>{on ? "Autorizado" : "Recusado"}</StatusBadge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 text-xs text-muted-foreground">
            <Link to="/admin/people" className="hover:text-foreground">← Voltar para pessoas</Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
