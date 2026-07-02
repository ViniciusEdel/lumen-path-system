import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth={2.4}>
          <path d="M12 3 L12 21 M5 8 L19 8 M7 14 L17 14" strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
      </span>
      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">EcclesiaOS</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">sistema operacional para igrejas</span>
        </div>
      )}
    </Link>
  );
}

export function StatusBadge({
  tone = "default", children, dot = true,
}: { tone?: "default" | "success" | "warning" | "info" | "danger" | "gold"; children: ReactNode; dot?: boolean }) {
  const tones: Record<string, string> = {
    default: "bg-white/5 text-muted-foreground ring-white/10",
    success: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    warning: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
    info: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
    danger: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
    gold: "bg-amber-300/10 text-amber-200 ring-amber-300/25",
  };
  const dotColors: Record<string, string> = {
    default: "bg-muted-foreground",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    info: "bg-sky-400",
    danger: "bg-rose-400",
    gold: "bg-amber-300",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset", tones[tone])}>
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[tone])} />}
      {children}
    </span>
  );
}

export function MetricCard({
  label, value, delta, icon, tone = "primary",
}: { label: string; value: ReactNode; delta?: string; icon?: ReactNode; tone?: "primary" | "gold" | "info" | "success" }) {
  const glow: Record<string, string> = {
    primary: "from-primary/30 to-transparent",
    gold: "from-amber-300/30 to-transparent",
    info: "from-sky-400/30 to-transparent",
    success: "from-emerald-400/30 to-transparent",
  };
  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl p-5">
      <div className={cn("pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gradient-radial opacity-60 blur-2xl bg-gradient-to-br", glow[tone])} />
      <div className="relative flex items-start justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
        {icon && <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-primary ring-1 ring-white/10">{icon}</span>}
      </div>
      <div className="relative mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">{value}</div>
      {delta && <div className="relative mt-1 text-xs text-emerald-300">{delta}</div>}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-muted-foreground md:text-lg">{sub}</p>}
    </div>
  );
}

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
      {icon && <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-primary ring-1 ring-white/10">{icon}</div>}
      <h3 className="font-display text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-white/5", className)} />;
}

export function ErrorState({ message = "Não foi possível carregar os dados." }: { message?: string }) {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-6 text-sm text-rose-200">
      {message}
    </div>
  );
}

export function PermissionGate({ granted, children, note }: { granted: boolean; children: ReactNode; note?: string }) {
  if (granted) return <>{children}</>;
  return (
    <div className="glass-panel flex items-center gap-3 rounded-xl border-amber-300/20 p-4 text-sm text-amber-200">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
        <path d="M12 15v2M6 10V7a6 6 0 1 1 12 0v3M4 10h16v10H4z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <div className="font-medium">Área restrita</div>
        <div className="text-xs text-amber-200/80">{note ?? "Você não tem permissão para visualizar este conteúdo."}</div>
      </div>
    </div>
  );
}
