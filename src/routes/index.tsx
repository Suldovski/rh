import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  HardHat,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  CalendarClock,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { employees, sites } from "@/lib/employees";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel · Buca Geral RH" },
      { name: "description", content: "Visão geral do RH da construtora — funcionários, obras e NRs." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const ativos = employees.filter((e) => e.status === "ativo").length;
  const ferias = employees.filter((e) => e.status === "ferias").length;
  const afastados = employees.filter((e) => e.status === "afastado").length;

  const kpis = [
    { label: "Funcionários ativos", value: ativos, hint: "+2 este mês", icon: Users, tone: "text-accent" },
    { label: "Obras em andamento", value: sites.length, hint: "4 canteiros", icon: HardHat, tone: "text-primary" },
    { label: "Em férias", value: ferias, hint: "este período", icon: CalendarClock, tone: "text-success" },
    { label: "NRs a vencer (30d)", value: 7, hint: "ação requerida", icon: AlertTriangle, tone: "text-destructive" },
  ];

  const recentes = [...employees].slice(0, 5);

  return (
    <PageShell
      eyebrow="Painel geral"
      title="Bom dia, Carla"
      description="Acompanhe os indicadores de pessoal, certificações de segurança e movimentações nos canteiros."
      actions={
        <>
          <Button variant="outline" asChild>
            <Link to="/funcionarios">Ver funcionários</Link>
          </Button>
          <Button asChild>
            <Link to="/funcionarios/novo">
              <Plus className="mr-1 h-4 w-4" /> Novo cadastro
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-l-4 border-l-accent shadow-sm">
            <CardContent className="flex items-start justify-between p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {k.label}
                </p>
                <p className="mt-2 font-display text-4xl">{k.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.hint}</p>
              </div>
              <div className="rounded-md bg-muted p-2">
                <k.icon className={`h-5 w-5 ${k.tone}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-lg">Funcionários recentes</CardTitle>
              <p className="text-xs text-muted-foreground">Últimos cadastros e movimentações</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/funcionarios">
                Ver todos <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <ul className="divide-y divide-border">
              {recentes.map((e) => (
                <li key={e.id} className="flex items-center gap-4 px-6 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {e.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/funcionarios/$id"
                      params={{ id: e.id }}
                      className="block truncate font-semibold hover:text-accent"
                    >
                      {e.name}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">
                      {e.role} · {e.site}
                    </p>
                  </div>
                  <StatusBadge status={e.status} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Distribuição por obra</CardTitle>
            <p className="text-xs text-muted-foreground">Pessoal alocado por canteiro</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {sites.map((s) => {
              const count = employees.filter((e) => e.site === s).length;
              const pct = (count / employees.length) * 100;
              return (
                <div key={s}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{s}</span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="mt-4 flex items-center gap-2 rounded-md border border-border bg-muted/40 p-3 text-xs">
              <TrendingUp className="h-4 w-4 text-success" />
              <span>Crescimento de 12% no quadro vs trimestre anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-start gap-3 p-5">
            <div className="rounded-md bg-destructive/10 p-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-semibold">3 NR-35 vencem em 7 dias</p>
              <p className="text-xs text-muted-foreground">Trabalho em altura — reciclagem obrigatória.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-3 p-5">
            <div className="rounded-md bg-warning/20 p-2">
              <ShieldCheck className="h-5 w-5 text-warning-foreground" />
            </div>
            <div>
              <p className="font-semibold">Entrega de EPIs pendente</p>
              <p className="text-xs text-muted-foreground">5 colaboradores no Edifício Atlântico.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-3 p-5">
            <div className="rounded-md bg-accent/15 p-2">
              <CalendarClock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold">{afastados} afastamento(s) ativo(s)</p>
              <p className="text-xs text-muted-foreground">Acompanhar perícias e retornos.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
