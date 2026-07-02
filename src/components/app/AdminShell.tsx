import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Brand } from "./primitives";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, UserPlus, Home as HomeIcon, HeartHandshake,
  Calendar, Wallet, Send, Baby, HandHeart, BarChart3, Settings,
  Search, Bell, ChevronDown, LogOut, ExternalLink,
} from "lucide-react";
import { tenants, currentUser } from "@/mocks/data";

const nav = [
  { group: "Operação",
    items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/people", label: "Pessoas", icon: Users },
      { to: "/admin/visitors", label: "Visitantes", icon: UserPlus },
      { to: "/admin/groups", label: "Células", icon: HomeIcon },
      { to: "/admin/ministries", label: "Ministérios & escalas", icon: HeartHandshake },
      { to: "/admin/events", label: "Eventos & cultos", icon: Calendar },
    ] },
  { group: "Gestão",
    items: [
      { to: "/admin/finance", label: "Financeiro", icon: Wallet, restricted: true },
      { to: "/admin/communications", label: "Comunicação", icon: Send },
      { to: "/admin/children", label: "Ministério infantil", icon: Baby, restricted: true },
      { to: "/admin/pastoral-care", label: "Cuidado pastoral", icon: HandHeart, restricted: true },
      { to: "/admin/reports", label: "Relatórios & BI", icon: BarChart3 },
      { to: "/admin/settings", label: "Configurações", icon: Settings },
    ] },
] as const;

export function AdminShell({ children, title, breadcrumbs, actions }: {
  children: ReactNode; title: string; breadcrumbs?: Array<{ label: string; to?: string }>; actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false);
  const tenant = tenants[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/5 bg-sidebar transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex h-16 items-center px-5">
          <Brand />
        </div>

        {/* Tenant selector */}
        <button className="mx-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left transition hover:bg-white/[0.06]">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary/40 to-amber-300/30 font-display text-sm font-semibold text-primary-foreground">NA</span>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-foreground">{tenant.name}</div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Plano {tenant.plan} · {tenant.members} membros
              </div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>

        <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-6">
          {nav.map(section => (
            <div key={section.group} className="mb-5">
              <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">{section.group}</div>
              <ul className="space-y-0.5">
                {section.items.map(item => {
                  const active = pathname.startsWith(item.to);
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                          active
                            ? "bg-primary/10 text-foreground ring-1 ring-inset ring-primary/25"
                            : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground",
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                        <span className="truncate">{item.label}</span>
                        {"restricted" in item && item.restricted && (
                          <span className="ml-auto rounded-full bg-amber-300/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-200 ring-1 ring-inset ring-amber-300/20">
                            restrito
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom user card */}
        <div className="border-t border-white/5 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary/60 to-amber-300/50 text-sm font-semibold text-primary-foreground">DR</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-foreground">{currentUser.name}</div>
              <div className="truncate text-[11px] text-muted-foreground">Owner · Pastor</div>
            </div>
            <Link to="/login" className="rounded-md p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
          <Link to="/member/dashboard" className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-white/5 bg-transparent px-3 py-2 text-xs text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground">
            Ir para portal do membro <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-black/60 lg:hidden" />}

      {/* Main */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-white/5 bg-background/70 px-4 backdrop-blur-xl md:px-6">
          <button onClick={() => setOpen(true)} className="rounded-md p-2 text-muted-foreground hover:bg-white/5 lg:hidden">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" /></svg>
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Buscar membros, visitantes, células…" className="h-9 w-full rounded-lg border border-white/5 bg-white/[0.03] pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/40 focus:outline-none" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative rounded-lg border border-white/5 bg-white/[0.03] p-2 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">3</span>
            </button>
            <button className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/15">
              + Novo membro
            </button>
          </div>
        </header>

        {/* Page header */}
        <div className="border-b border-white/5 px-4 py-6 md:px-8">
          {breadcrumbs && (
            <nav className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              {breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {b.to ? <Link to={b.to} className="hover:text-foreground">{b.label}</Link> : <span>{b.label}</span>}
                  {i < breadcrumbs.length - 1 && <span>/</span>}
                </span>
              ))}
            </nav>
          )}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
          </div>
        </div>

        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
