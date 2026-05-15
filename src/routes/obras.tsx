import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Users, Calendar } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { employees, sites } from "@/lib/employees";

export const Route = createFileRoute("/obras")({
  head: () => ({ meta: [{ title: "Obras · Buca Geral RH" }] }),
  component: Obras,
});

const meta: Record<string, { status: string; start: string; manager: string }> = {
  "Residencial Vila Nova": { status: "Em execução", start: "2023-08-01", manager: "Antônio Silva" },
  "Edifício Atlântico": { status: "Estrutura", start: "2024-02-12", manager: "Marina Lima" },
  "Galpão Industrial Sul": { status: "Fundação", start: "2025-01-20", manager: "Marina Lima" },
  "Sede Administrativa": { status: "Operação", start: "2015-03-01", manager: "Carla Mendes" },
};

function Obras() {
  return (
    <PageShell
      eyebrow="Canteiros"
      title="Obras ativas"
      description="Gestão de equipes alocadas por canteiro de obras."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {sites.map((s) => {
          const team = employees.filter((e) => e.site === s);
          const m = meta[s];
          return (
            <Card key={s} className="overflow-hidden">
              <div className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-accent/20 p-2">
                    <HardHat className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Obra</p>
                    <h3 className="font-display text-lg">{s}</h3>
                  </div>
                </div>
                <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent">
                  {m.status}
                </Badge>
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Equipe</p>
                    <p className="mt-1 flex items-center gap-1 font-display text-xl">
                      <Users className="h-4 w-4 text-accent" />{team.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Início</p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                      <Calendar className="h-4 w-4 text-accent" />
                      {new Date(m.start).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Responsável</p>
                    <p className="mt-1 truncate text-sm font-medium">{m.manager}</p>
                  </div>
                </div>

                <div className="flex -space-x-2 pt-2">
                  {team.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      title={p.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-semibold text-secondary-foreground"
                    >
                      {p.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                    </div>
                  ))}
                  {team.length > 6 && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-semibold">
                      +{team.length - 6}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
