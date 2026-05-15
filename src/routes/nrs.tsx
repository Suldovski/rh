import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const nrs = [
  { code: "NR-06", title: "Equipamentos de Proteção Individual (EPI)", trained: 38, total: 42 },
  { code: "NR-10", title: "Segurança em Instalações Elétricas", trained: 6, total: 8 },
  { code: "NR-18", title: "Condições e Meio Ambiente da Construção", trained: 35, total: 42 },
  { code: "NR-33", title: "Espaços Confinados", trained: 12, total: 18 },
  { code: "NR-35", title: "Trabalho em Altura", trained: 28, total: 34 },
];

export const Route = createFileRoute("/nrs")({
  head: () => ({ meta: [{ title: "NRs & Treinamentos · Buca Geral RH" }] }),
  component: () => (
    <PageShell
      eyebrow="Segurança do trabalho"
      title="NRs & Treinamentos"
      description="Acompanhe a aderência das equipes às normas regulamentadoras."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {nrs.map((nr) => {
          const pct = Math.round((nr.trained / nr.total) * 100);
          const ok = pct >= 90;
          return (
            <Card key={nr.code}>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-accent/10 p-2">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-base">{nr.code}</CardTitle>
                    <p className="text-xs text-muted-foreground">{nr.title}</p>
                  </div>
                </div>
                <Badge variant="outline" className={ok ? "border-success/40 bg-success/10 text-success" : "border-warning/40 bg-warning/15 text-warning-foreground"}>
                  {ok ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <AlertTriangle className="mr-1 h-3 w-3" />}
                  {pct}%
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Treinados</span>
                  <span className="font-medium">{nr.trained} / {nr.total}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${ok ? "bg-success" : "bg-warning"}`} style={{ width: `${pct}%` }} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  ),
});
