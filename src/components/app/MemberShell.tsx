import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Brand } from "./primitives";
import { cn } from "@/lib/utils";
import { User, Heart, Calendar, Wallet, HandHeart, Home } from "lucide-react";

const items = [
  { to: "/member/dashboard", label: "Início", icon: Home },
  { to: "/member/profile", label: "Meu perfil", icon: User },
  { to: "/member/events", label: "Eventos", icon: Calendar },
  { to: "/member/giving", label: "Contribuições", icon: Wallet },
  { to: "/member/prayer", label: "Oração", icon: HandHeart },
] as const;

export function MemberShell({ children, title }: { children: ReactNode; title: string }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <Brand />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Igreja Nova Aliança</span>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 md:px-8">
          {items.map(i => {
            const Icon = i.icon;
            const active = pathname === i.to;
            return (
              <Link
                key={i.to}
                to={i.to}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition",
                  active
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-white/5 text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {i.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h1 className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        {children}
      </main>
    </div>
  );
}
