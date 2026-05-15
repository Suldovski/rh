import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const docs = [
  { name: "Modelo de contrato CLT", type: "PDF", size: "248 KB", category: "Contratos" },
  { name: "Recibo de EPI", type: "PDF", size: "92 KB", category: "Segurança" },
  { name: "ASO admissional", type: "DOCX", size: "76 KB", category: "Saúde" },
  { name: "Termo de rescisão", type: "PDF", size: "182 KB", category: "Contratos" },
  { name: "Folha de ponto mensal", type: "XLSX", size: "54 KB", category: "Jornada" },
  { name: "Ficha de registro", type: "PDF", size: "120 KB", category: "Cadastro" },
];

export const Route = createFileRoute("/documentos")({
  head: () => ({ meta: [{ title: "Documentos · Buca Geral RH" }] }),
  component: () => (
    <PageShell eyebrow="Modelos" title="Documentos" description="Modelos e formulários do RH para canteiros e administrativo.">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {docs.map((d) => (
          <Card key={d.name}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.category} · {d.type} · {d.size}</p>
              </div>
              <Button size="icon" variant="ghost"><Download className="h-4 w-4" /></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  ),
});
