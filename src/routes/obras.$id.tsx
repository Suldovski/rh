import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, HardHat, Calendar, MapPin, User, Users, Pencil, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { employees } from "@/lib/employees";
import { sitesStore, useSite } from "@/lib/sites-store";

export const Route = createFileRoute("/obras/$id")({
  head: ({ params }) => ({ meta: [{ title: `Obra · Buca Geral RH` }] }),
  component: ObraDetail,
});

function ObraDetail() {
  const { id } = Route.useParams();
  const obra = useSite(id);
  const navigate = useNavigate();
  const [confirmDel, setConfirmDel] = useState(false);

  if (!obra) {
    return (
      <PageShell title="Obra não encontrada" eyebrow="Canteiro">
        <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">
          Esta obra não existe ou foi removida.
          <div className="mt-4"><Button asChild><Link to="/obras">Voltar para Obras</Link></Button></div>
        </CardContent></Card>
      </PageShell>
    );
  }

  const team = employees.filter((e) => e.site === obra.name);

  return (
    <PageShell
      eyebrow="Canteiro de obras"
      title={obra.name}
      description={obra.description || "Detalhes da obra e equipe alocada."}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link to="/obras"><ArrowLeft className="mr-1 h-4 w-4" /> Voltar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/obras"><Pencil className="mr-1 h-4 w-4" /> Editar</Link>
          </Button>
          <Button variant="destructive" onClick={() => setConfirmDel(true)}>
            <Trash2 className="mr-1 h-4 w-4" /> Excluir
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md bg-accent/15">
              <HardHat className="h-7 w-7 text-accent" />
            </div>
            <Badge variant="outline" className="border-accent/40 bg-accent/10 text-accent">
              {obra.status}
            </Badge>
            <h2 className="mt-3 font-display text-xl">{obra.name}</h2>

            <div className="mt-6 space-y-3 text-sm">
              <Row icon={Calendar} label={`Início: ${new Date(obra.start).toLocaleDateString("pt-BR")}`} />
              <Row icon={User} label={`Responsável: ${obra.manager}`} />
              {obra.address && <Row icon={MapPin} label={obra.address} />}
              <Row icon={Users} label={`${team.length} colaborador(es) alocado(s)`} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Equipe alocada</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              {team.length === 0 ? (
                <p className="px-6 py-6 text-sm text-muted-foreground">Nenhum colaborador alocado nesta obra.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {team.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/funcionarios/$id"
                        params={{ id: p.id }}
                        className="flex items-center gap-3 px-6 py-3 hover:bg-muted/50"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                          {p.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-sm">{p.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{p.role} · {p.department === "Seguranca" ? "Segurança" : p.department}</p>
                        </div>
                        <StatusBadge status={p.status} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg">Documentos da obra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[`Termo de confidencialidade — ${obra.name}.pdf`, `Ficha de registro — ${obra.name}.pdf`].map((d) => (
                <div key={d} className="flex items-center gap-3 rounded-md border border-border px-4 py-3">
                  <FileText className="h-4 w-4 text-accent" />
                  <span className="flex-1 text-sm">{d}</span>
                  <Button size="sm" variant="ghost" asChild>
                    <Link to="/documentos">Abrir</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={confirmDel} onOpenChange={setConfirmDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir {obra.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              sitesStore.remove(obra.id);
              toast.success("Obra excluída.");
              navigate({ to: "/obras" });
            }}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageShell>
  );
}

function Row({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-start gap-2 text-muted-foreground">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="text-foreground">{label}</span>
    </div>
  );
}
