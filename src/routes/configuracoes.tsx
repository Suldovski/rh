import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações · Buca Geral RH" }] }),
  component: () => (
    <PageShell eyebrow="Sistema" title="Configurações" description="Preferências da conta e da empresa.">
      <Card>
        <CardHeader><CardTitle className="font-display text-lg">Em breve</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Personalização de campos, integrações com folha de pagamento e permissões de equipe estarão disponíveis aqui.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  ),
});
